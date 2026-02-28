/**
 * Decorative Photo Randomizer for Hona-Qahera Inner Pages
 * --------------------------------------------------------
 * On each page load, randomly selects a subset of decorative photos
 * and places them as subtle, low-opacity visual accents around the
 * page edges. Photos fade in with a staggered animation.
 *
 * Photos are positioned in predefined "slots" (left/right edges,
 * avoiding overlap with the main content area).
 */

(function () {
  'use strict';

  // Only run on inner pages
  if (!document.body.classList.contains('inner-page')) return;

  // ── Photo Pool ──────────────────────────────────────────────────────
  // Egyptian food, Cairo landmarks, and restaurant ambiance photos
  var photos = [
    { src: 'photos/photo-01.jpg', alt: 'Egyptian cuisine' },
    { src: 'photos/photo-02.jpg', alt: 'Cairo street food' },
    { src: 'photos/photo-03.jpg', alt: 'Gourmet platter' },
    { src: 'photos/photo-04.jpg', alt: 'Classic burger' },
    { src: 'photos/photo-05.jpg', alt: 'Egyptian spices' },
    { src: 'photos/photo-06.jpg', alt: 'Cairo skyline' },
    { src: 'photos/photo-07.jpg', alt: 'Restaurant interior' },
    { src: 'photos/photo-08.jpg', alt: 'Dining ambiance' },
    { src: 'photos/photo-09.jpg', alt: 'Fine dining plate' },
    { src: 'photos/photo-10.jpg', alt: 'Restaurant atmosphere' },
    { src: 'photos/photo-11.jpg', alt: 'Café terrace' },
    { src: 'photos/photo-12.jpg', alt: 'Elegant food presentation' }
  ];

  // ── Configuration ───────────────────────────────────────────────────
  var PHOTO_COUNT = 4;          // Number of photos to show per page load
  var PHOTO_SIZE = 140;         // Base size in px (will be responsive)
  var MOBILE_BREAKPOINT = 768;  // Below this, reduce count & size

  // Predefined placement slots (percentage-based for responsiveness)
  // Each slot: { top: '...', left/right: '...', rotate: deg }
  var slots = [
    { top: '12%',  left: '0',    rotate: -8  },
    { top: '35%',  right: '0',   rotate: 6   },
    { top: '55%',  left: '0',    rotate: 12  },
    { top: '75%',  right: '0',   rotate: -5  },
    { top: '20%',  right: '0',   rotate: 10  },
    { top: '45%',  left: '0',    rotate: -12 },
    { top: '65%',  right: '0',   rotate: 8   },
    { top: '88%',  left: '0',    rotate: -6  }
  ];

  // ── Helpers ─────────────────────────────────────────────────────────
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  // ── Create Container ────────────────────────────────────────────────
  var container = document.createElement('div');
  container.className = 'decor-photos-container';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  // ── Pick Random Photos & Slots ──────────────────────────────────────
  var count = isMobile() ? Math.min(2, PHOTO_COUNT) : PHOTO_COUNT;
  var chosenPhotos = shuffle(photos).slice(0, count);
  var chosenSlots  = shuffle(slots).slice(0, count);

  // ── Render Photos ───────────────────────────────────────────────────
  chosenPhotos.forEach(function (photo, i) {
    var slot = chosenSlots[i];
    var el = document.createElement('div');
    el.className = 'decor-photo';
    el.style.top = slot.top;
    if (slot.left !== undefined)  el.style.left  = slot.left;
    if (slot.right !== undefined) el.style.right = slot.right;
    el.style.setProperty('--rotate', slot.rotate + 'deg');
    el.style.animationDelay = (i * 0.3) + 's';

    var img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    el.appendChild(img);
    container.appendChild(el);
  });
})();
