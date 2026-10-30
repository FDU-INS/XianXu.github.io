(function () {
  'use strict';

  var button = document.getElementById('back-to-top');
  if (!button) return;

  var scheduled = false;
  function updateVisibility() {
    button.hidden = window.scrollY < 600;
    scheduled = false;
  }

  window.addEventListener('scroll', function () {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateVisibility);
    }
  }, { passive: true });
  window.addEventListener('pageshow', updateVisibility);

  button.addEventListener('click', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var firstNavigationLink = document.querySelector('#site-nav a');
    if (firstNavigationLink) firstNavigationLink.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  updateVisibility();
}());
