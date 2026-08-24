/* ==========================================================================
   Theme (light / dark)

   This file is loaded in the <head> WITHOUT defer, so the theme is applied
   before the page is painted. That prevents the white flash you would
   otherwise get when a returning visitor prefers dark mode.

   Order of preference:
   1. The theme the visitor picked before (saved in localStorage)
   2. The system setting (prefers-color-scheme)
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'shakeel-theme';
  var root = document.documentElement;
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* The theme we mean to be on. See applyAnimated for why the data-theme
     attribute cannot be trusted as the source of truth. */
  var chosen;

  /* Tells the stylesheet that JavaScript is available. Anything that would
     hide content (scroll reveals, the skeleton) is behind this class. */
  root.classList.add('js');

  /* localStorage can throw in private mode, so every call is guarded. */
  function readSaved() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Saving is a nice-to-have, not a requirement. */
    }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  /* Opens the new theme as a circle growing out of the toggle button.

     startViewTransition freezes a picture of the page, runs the callback, then
     cross-fades to a picture of the result. Replacing that cross-fade with a
     growing circular clip on the incoming picture gives the wipe. Chromium and
     Safari only; everywhere else the theme just flips, which is fine. */
  function applyAnimated(theme, origin) {
    if (!origin || motionQuery.matches || typeof document.startViewTransition !== 'function') {
      apply(theme);
      return;
    }

    /* Reach the furthest corner, so the circle always covers the viewport. */
    var radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    );

    var transition = document.startViewTransition(function () {
      apply(theme);
    });

    /* The circle is animated from here rather than from a stylesheet keyframe.
       Custom properties set on <html> do not reach the ::view-transition
       pseudo-element tree, so a keyframe cannot be told where the button is and
       silently falls back to the middle of the navbar. Addressing the pseudo
       directly is the only way to hand it a measured position.

       ready rejects when a transition is skipped, which happens on a second
       click while the first is still running. Nothing is wrong, so swallow it. */
    transition.ready.then(function () {
      root.animate(
        {
          clipPath: [
            'circle(0px at ' + origin.x + 'px ' + origin.y + 'px)',
            'circle(' + radius + 'px at ' + origin.x + 'px ' + origin.y + 'px)'
          ]
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    }).catch(function () {});
  }

  chosen = readSaved() || (darkQuery.matches ? 'dark' : 'light');
  apply(chosen);

  /* Small API used by js/main.js to wire up the button in the navigation. */
  window.Theme = {
    current: function () {
      return chosen;
    },

    /* origin is an optional { x, y } in viewport coordinates: the point the
       circular wipe grows from. Without it the theme switches instantly. */
    set: function (theme, origin) {
      chosen = theme;
      save(theme);
      applyAnimated(theme, origin);
    },

    toggle: function (origin) {
      var next = this.current() === 'dark' ? 'light' : 'dark';
      this.set(next, origin);
      return next;
    }
  };

  /* If the visitor never picked a theme, keep following their system setting. */
  darkQuery.addEventListener('change', function (event) {
    if (!readSaved()) {
      chosen = event.matches ? 'dark' : 'light';
      apply(chosen);
    }
  });
})();
