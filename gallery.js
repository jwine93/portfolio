// Tab switching
(function () {
  const tabs = document.querySelectorAll('.tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Deactivate all tabs and hide all panels
      tabs.forEach(function (t) {
        t.classList.remove('tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.classList.add('tab-panel--hidden');
      });

      // Activate clicked tab and show its panel
      tab.classList.add('tab--active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.classList.remove('tab-panel--hidden');
    });

    // Keyboard: left/right arrows to move between tabs
    tab.addEventListener('keydown', function (e) {
      const tabList = Array.from(tabs);
      const index = tabList.indexOf(tab);
      if (e.key === 'ArrowRight') {
        tabList[(index + 1) % tabList.length].focus();
      } else if (e.key === 'ArrowLeft') {
        tabList[(index - 1 + tabList.length) % tabList.length].focus();
      }
    });
  });
})();

// Gallery lightbox
// Opens full-size image when a thumbnail is clicked,
// allows navigating between images in the same gallery section.

(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox) return;

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(thumbs, index) {
    currentGallery = thumbs;
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const thumb = currentGallery[index];
    lightboxImg.src = thumb.dataset.full || thumb.querySelector('img').src;
    lightboxImg.alt = thumb.querySelector('img').alt || '';
    lightboxCaption.textContent = thumb.dataset.caption || '';

    // Hide prev/next arrows if only one image
    prevBtn.style.display = currentGallery.length > 1 ? '' : 'none';
    nextBtn.style.display = currentGallery.length > 1 ? '' : 'none';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage(currentIndex);
  }

  // Attach click handlers to all gallery thumbnails
// Attach click handlers to all gallery thumbnails
  document.querySelectorAll('.gallery').forEach(function (gallery) {
    const thumbs = Array.from(gallery.querySelectorAll('.gallery__thumb'));
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        const full = thumb.dataset.full || '';
        if (/\.pdf$/i.test(full)) {
          window.open(full, '_blank');
          return;
        }
        openLightbox(thumbs, i);
      });
      // Keyboard accessibility
      thumb.setAttribute('tabindex', '0');
      thumb.setAttribute('role', 'button');
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const full = thumb.dataset.full || '';
          if (/\.pdf$/i.test(full)) {
            window.open(full, '_blank');
            return;
          }
          openLightbox(thumbs, i);
        }
      });
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Click outside image to close
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
