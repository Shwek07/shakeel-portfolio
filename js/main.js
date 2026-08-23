/* ==========================================================================
   Shared behaviour for every page:

   1. Theme toggle
   2. Fullscreen mobile menu
   3. Fade-in on scroll (IntersectionObserver)
   4. Scroll-spy for the navigation
   5. The year in the footer
   ========================================================================== */

(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function reducedMotion() {
    return motionQuery.matches;
  }

  /* Small helper: the same text lookup i18n.js uses, with a safe fallback for
     the case where that script did not load. */
  function t(key, fallback) {
    return window.I18n ? window.I18n.t(key) : fallback;
  }

  function onLanguageChange(fn) {
    if (window.I18n) window.I18n.onChange(fn);
  }

  /* 1. Theme toggle -------------------------------------------------------- */
  function setUpThemeToggle() {
    var button = document.querySelector('[data-theme-toggle]');
    if (!button || !window.Theme) return;

    /* The label depends on both the theme and the language, so it is set here
       instead of through a data-i18n attribute. */
    function describe() {
      var next = window.Theme.current() === 'dark' ? 'theme.toLight' : 'theme.toDark';
      var label = t(next, next === 'theme.toLight' ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }

    describe();
    onLanguageChange(describe);

    button.addEventListener('click', function () {
      window.Theme.toggle();
      describe();
    });
  }

  /* 2. Fullscreen mobile menu ---------------------------------------------- */
  function setUpMenu() {
    var panel = document.querySelector('[data-menu]');
    var openButton = document.querySelector('[data-menu-open]');
    var closeButton = document.querySelector('[data-menu-close]');
    if (!panel || !openButton || !closeButton) return;

    /* Keep this the same as the transition in css/main.css. */
    var CLOSE_DURATION = 220;
    var closeTimer = null;
    var lastFocused = null;

    function focusable() {
      return panel.querySelectorAll('a[href], button:not([disabled])');
    }

    function isOpen() {
      return !panel.hidden;
    }

    function open() {
      window.clearTimeout(closeTimer);
      lastFocused = document.activeElement;

      panel.hidden = false;
      /* Reading a layout value forces the browser to apply the closed state
         first, so the opening transition actually runs. */
      void panel.offsetHeight;
      panel.classList.add('is-open');

      document.body.classList.add('has-menu-open');
      openButton.setAttribute('aria-expanded', 'true');
      closeButton.focus();
    }

    function close(returnFocus) {
      if (!isOpen()) return;

      panel.classList.remove('is-open');
      document.body.classList.remove('has-menu-open');
      openButton.setAttribute('aria-expanded', 'false');

      /* Hide it after the fade so it leaves the tab order completely. */
      closeTimer = window.setTimeout(function () {
        panel.hidden = true;
      }, reducedMotion() ? 0 : CLOSE_DURATION);

      if (returnFocus !== false) openButton.focus();
    }

    openButton.addEventListener('click', open);
    closeButton.addEventListener('click', function () {
      close();
    });

    /* Following a link closes the menu; the language buttons do not. */
    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        close();
        return;
      }

      /* Keep focus inside the menu while it is open. */
      if (event.key !== 'Tab') return;

      var items = focusable();
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* The menu is for small screens only, so close it if the window grows. */
    window.matchMedia('(min-width: 48rem)').addEventListener('change', function (event) {
      if (event.matches) close(false);
    });

    panel.hidden = true;
    panel.classList.remove('is-open');
    openButton.setAttribute('aria-expanded', 'false');
  }

  /* 3. Fade-in on scroll --------------------------------------------------- */
  function setUpScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    function showAll() {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
    }

    /* Nothing to animate for visitors who asked for reduced motion, and a
       plain fallback for browsers without IntersectionObserver. */
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    /* Reveals everything that has reached the fold. Sweeping the whole list
       on every callback also covers sections the visitor scrolled straight
       past, which a plain isIntersecting check misses when someone jumps
       down the page with the End key or a restored scroll position. */
    function revealWhatIsInView() {
      items.forEach(function (item) {
        if (item.classList.contains('is-visible')) return;
        if (item.getBoundingClientRect().top > window.innerHeight * 0.9) return;

        item.classList.add('is-visible');
        observer.unobserve(item);
      });
    }

    var observer = new IntersectionObserver(revealWhatIsInView, {
      /* Start the animation just before the element reaches the bottom edge,
         so it is already finished by the time it is properly in view. */
      rootMargin: '0px 0px -10% 0px',
      threshold: 0
    });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* 4. Scroll-spy ---------------------------------------------------------- */
  function setUpScrollSpy() {
    var sections = document.querySelectorAll('[data-spy-section]');
    var links = document.querySelectorAll('[data-spy-link]');

    /* Only the home page has sections to follow. Everywhere else the plain
       aria-current="page" underline stays in charge. */
    if (!sections.length || !links.length) return;

    var nav = document.querySelector('.nav');
    if (nav) nav.classList.add('has-spy');

    var header = document.querySelector('.site-header');
    var order = Array.prototype.slice.call(sections);
    var current = null;
    var queued = false;

    /* A section becomes the current one as soon as its top passes just under
       the sticky header.

       This reads the scroll position rather than watching intersections on
       purpose. The result is monotonic — it can only move one step at a time
       as you scroll — so the underline cannot flicker back and forth between
       two sections that sit close together. An IntersectionObserver band also
       cannot reach the last section: the page runs out of scroll before a
       short closing section ever gets high enough on the screen. */
    function activeSection() {
      /* Near the bottom the last section is what you are looking at, even
         though the page ran out of room to scroll it up to the line. */
      var BOTTOM_ZONE = 80;
      var reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_ZONE;
      if (reachedBottom) return order[order.length - 1];

      var line = (header ? header.offsetHeight : 60) + 24;
      var found = order[0];

      order.forEach(function (section) {
        if (section.getBoundingClientRect().top <= line) found = section;
      });

      return found;
    }

    function update() {
      queued = false;

      var section = activeSection();
      if (!section || section === current) return;
      current = section;

      var name = section.getAttribute('data-spy-section');
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('data-spy-link') === name);
      });
    }

    /* One measurement per frame at most, so scrolling stays cheap. */
    function schedule() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  }

  /* 5. Footer year --------------------------------------------------------- */
  function setUpYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (element) {
      element.textContent = year;
    });
  }

  setUpThemeToggle();
  setUpMenu();
  setUpScrollReveal();
  setUpScrollSpy();
  setUpYear();
})();
