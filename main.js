// Phone mask
const telefoneInput = document.querySelector('input[name="telefone"]');
telefoneInput?.addEventListener('input', () => {
  let v = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else {
    v = v.replace(/^(\d*)$/, '($1');
  }
  telefoneInput.value = v;
});

// Form submission
const contatoForm = document.getElementById('contatoForm');
contatoForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contatoForm.querySelector('.contato__submit');
  const data = {
    nome: contatoForm.nome.value,
    email: contatoForm.email.value,
    telefone: contatoForm.telefone.value,
  };
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  try {
    await fetch('https://hook.us1.make.com/7wi10t7xjgn7v5qcopeqk7b97f4v5sc7', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    btn.textContent = 'Enviado! Em breve entraremos em contato.';
    contatoForm.reset();
  } catch {
    btn.textContent = 'Erro ao enviar. Tente novamente.';
    btn.disabled = false;
  }
});

const header = document.getElementById('header');
const menuBtn = document.querySelector('.header__menu-btn');
const mobileNav = document.querySelector('.header__mobile-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
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
