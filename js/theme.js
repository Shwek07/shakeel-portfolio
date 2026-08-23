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

  apply(readSaved() || (darkQuery.matches ? 'dark' : 'light'));

  /* Small API used by js/main.js to wire up the button in the navigation. */
  window.Theme = {
    current: function () {
      return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    },

    set: function (theme) {
      apply(theme);
      save(theme);
    },

    toggle: function () {
      var next = this.current() === 'dark' ? 'light' : 'dark';
      this.set(next);
      return next;
    }
  };

  /* If the visitor never picked a theme, keep following their system setting. */
  darkQuery.addEventListener('change', function (event) {
    if (!readSaved()) {
      apply(event.matches ? 'dark' : 'light');
    }
  });
})();
