const header = document.getElementById('header');
const menuBtn = document.querySelector('.header__menu-btn');
const mobileNav = document.querySelector('.header__mobile-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Galeria carousel — loop
const track = document.getElementById('galeriaTrack');
const btnPrev = document.querySelector('.galeria__btn--prev');
const btnNext = document.querySelector('.galeria__btn--next');

if (track && btnNext && btnPrev) {
  const slides = Array.from(track.querySelectorAll('.galeria__slide'));
  const total = slides.length;
  let current = 0;
  let animating = false;

  const sw = () => slides[0].offsetWidth + 16;

  const goTo = (index, smooth = true) => {
    track.scrollTo({ left: sw() * index, behavior: smooth ? 'smooth' : 'instant' });
    current = index;
  };

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');
  let lbIndex = 0;

  const openLightbox = (index) => {
    lbIndex = index;
    lbImg.src = slides[lbIndex].querySelector('img').src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  slides.forEach((slide, i) => slide.addEventListener('click', () => openLightbox(i)));
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbIndex = (lbIndex + 1) % total; lbImg.src = slides[lbIndex].querySelector('img').src; });
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbIndex = (lbIndex - 1 + total) % total; lbImg.src = slides[lbIndex].querySelector('img').src; });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % total; lbImg.src = slides[lbIndex].querySelector('img').src; }
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + total) % total; lbImg.src = slides[lbIndex].querySelector('img').src; }
  });

  btnNext.addEventListener('click', () => {
    if (animating) return;
    if (current >= total - 1) {
      animating = true;
      goTo(0, false);
      setTimeout(() => { animating = false; }, 50);
    } else {
      goTo(current + 1);
    }
  });

  btnPrev.addEventListener('click', () => {
    if (animating) return;
    if (current <= 0) {
      animating = true;
      goTo(total - 1, false);
      setTimeout(() => { animating = false; }, 50);
    } else {
      goTo(current - 1);
    }
  });
}
