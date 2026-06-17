// Slideshow — one image at a time, with prev/next arrow buttons.

(function () {
  const slideshow = document.getElementById('artwork-slideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.slide'));
  const counter = document.getElementById('slide-counter');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');

  let current = 0;

  function showSlide(index) {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('slide--active', i === index);
    });
    if (counter) {
      counter.textContent = (index + 1) + ' / ' + slides.length;
    }
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function next() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // Keyboard navigation (left/right arrows)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  showSlide(current);
})();
