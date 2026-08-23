/* ==========================================================================
   Loading skeleton for the project lists.

   The real project markup is in the HTML. While the screenshots are still
   loading, CSS shows a skeleton that matches the same layout. As soon as the
   images are ready the skeleton is swapped for the real content.

   There is a 300ms minimum so the swap does not flicker on a fast connection,
   and a 2.5s maximum so a slow image can never hold the content hostage.
   ========================================================================== */

(function () {
  'use strict';

  var MINIMUM_VISIBLE = 300;
  var MAXIMUM_WAIT = 2500;

  var loaders = document.querySelectorAll('[data-work-loader]');
  if (!loaders.length) return;

  loaders.forEach(function (loader) {
    var startedAt = Date.now();
    var images = loader.querySelectorAll('.work-list img');

    function whenImageReady(image) {
      if (image.complete) return Promise.resolve();

      return new Promise(function (resolve) {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    }

    function reveal() {
      loader.classList.remove('is-loading');
      loader.classList.add('is-loaded');
    }

    var allImages = Promise.all(Array.prototype.map.call(images, whenImageReady));

    var timeLimit = new Promise(function (resolve) {
      window.setTimeout(resolve, MAXIMUM_WAIT);
    });

    Promise.race([allImages, timeLimit]).then(function () {
      var elapsed = Date.now() - startedAt;
      window.setTimeout(reveal, Math.max(0, MINIMUM_VISIBLE - elapsed));
    });
  });
})();
