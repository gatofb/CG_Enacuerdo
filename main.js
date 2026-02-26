/**
 * Enacuerdo.ai — Landing Page
 * Interacciones básicas: menú móvil, smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
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
