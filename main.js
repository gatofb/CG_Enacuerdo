/**
 * Enacuerdo.ai — Landing Page
 * Interacciones básicas: menú móvil, smooth scroll, countdown
 */

// Countdown: fin del mes en curso (configurable)
function initCountdown() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  let targetDate = endOfMonth;
  if (now >= endOfMonth) {
    targetDate = new Date(now.getFullYear(), now.getMonth() + 2, 0, 23, 59, 59);
  }

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Slider "Cómo funciona"
function initHowSlider() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.step.slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const total = slides.length;

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateX(-${currentIndex * 20}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
    dotsContainer?.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  // Crear dots
  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir al paso ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  goTo(0);
}

// Hero headline A/B - rotación aleatoria + UTM para tracking
function initHeroHeadline() {
  const headlines = [
    'Lográ un acuerdo por la cuota alimentaria sin abogados, sin peleas y desde tu celular.',
    'Basta de rogar por la cuota. Lográ un acuerdo legal desde tu celular',
    '¿La cuota no alcanza y la justicia no llega? Resolvelo hoy mismo.',
    'Chau discusiones por plata. Acordá la cuota de tus hijos sin pelear.'
  ];

  const headlineEl = document.getElementById('hero-headline');
  if (!headlineEl) return;

  const params = new URLSearchParams(window.location.search);
  const existingUtm = params.get('utm_content');

  let index;
  if (existingUtm && /^headline-[1-4]$/.test(existingUtm)) {
    index = parseInt(existingUtm.replace('headline-', ''), 10) - 1;
  } else {
    index = Math.floor(Math.random() * headlines.length);
  }

  headlineEl.textContent = headlines[index];

  // Agregar utm_content a la URL para que el form lo capture
  if (!existingUtm || !/^headline-[1-4]$/.test(existingUtm)) {
    params.set('utm_content', `headline-${index + 1}`);
    const newUrl = window.location.pathname + '?' + params.toString() + (window.location.hash || '');
    window.history.replaceState({}, '', newUrl);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroHeadline();
  initCountdown();
  initHowSlider();
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Cerrar menú al hacer click en un link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('is-open');
      menuToggle?.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    });
  });
});
