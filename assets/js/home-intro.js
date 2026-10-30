(function () {
  'use strict';

  var intro = document.getElementById('home-intro');
  var storageKey = 'xianxu-home-intro-seen-v9';
  if (!intro || window.location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    if (window.sessionStorage.getItem(storageKey)) return;
  } catch (error) {
    // The intro also works when browser storage is unavailable.
  }

  var skip = intro.querySelector('button');
  var closed = false;
  var timer;

  function dismiss() {
    if (closed) return;
    closed = true;
    window.clearTimeout(timer);
    document.documentElement.classList.remove('home-intro-active');
    document.removeEventListener('keydown', onKeyDown);
    intro.classList.add('is-leaving');
    if (intro.contains(document.activeElement)) {
      var heading = document.querySelector('#main .page__title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.removeAttribute('tabindex');
      }
    }
    intro.setAttribute('aria-hidden', 'true');
    try {
      window.sessionStorage.setItem(storageKey, '1');
    } catch (error) {
      // Storage restrictions must never prevent entry to the homepage.
    }
    window.setTimeout(function () { intro.hidden = true; }, 700);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') dismiss();
    if (event.key === 'Tab') {
      event.preventDefault();
      skip.focus();
    }
  }

  function start() {
    intro.hidden = false;
    document.documentElement.classList.add('home-intro-active');
    document.addEventListener('keydown', onKeyDown);
    skip.addEventListener('click', dismiss);
    intro.focus({ preventScroll: true });
    timer = window.setTimeout(dismiss, 2800);
  }

  var images = Array.prototype.slice.call(intro.querySelectorAll('.home-intro__seal img'));
  if (!images.length) {
    start();
  } else {
    // Decode both marks before the timed opening appears.
    Promise.all(images.map(function (image) {
      if (image.decode) return image.decode().catch(function () {});
      if (image.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    })).then(start);
  }
}());
