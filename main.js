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

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
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
