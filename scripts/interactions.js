// @ts-check
import { queryRequired } from './dom.js';

/** @param {Document} root */
export const initFaqAccordion = (root) => {
  const faqList = queryRequired(root, '[data-faqs]');
  faqList.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = /** @type {HTMLButtonElement|null} */ (event.target.closest('.faq-question'));
    if (!button || !faqList.contains(button)) return;
    const panelId = button.getAttribute('aria-controls');
    if (!panelId) return;
    const panel = queryRequired(root, `#${panelId}`);
    const symbol = queryRequired(button, '.faq-symbol');
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    symbol.textContent = isOpen ? '+' : '−';
    (/** @type {HTMLElement} */ (panel)).hidden = isOpen;
  });
};

/**
 * @param {Document} root
 * @param {Window & typeof globalThis} view
 */
export const initMobileMenu = (root, view) => {
  const toggle = /** @type {HTMLButtonElement} */ (queryRequired(root, '.menu-toggle'));
  const menu = /** @type {HTMLElement} */ (queryRequired(root, '.nav-links'));
  const label = queryRequired(toggle, '.sr-only');

  const close = ({ restoreFocus = false } = {}) => {
    const wasOpen = menu.classList.contains('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'Abrir menú';
    if (restoreFocus && wasOpen) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    label.textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => close({ restoreFocus: view.innerWidth <= 900 })));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) close({ restoreFocus: true });
  });
  view.addEventListener('resize', () => { if (view.innerWidth > 900) close(); });
};

/**
 * @param {Document} root
 * @param {Window & typeof globalThis} view
 */
export const initViewportEffects = (root, view) => {
  const header = queryRequired(root, '.site-header');
  view.addEventListener('scroll', () => header.classList.toggle('scrolled', view.scrollY > 20), { passive: true });

  const revealElements = root.querySelectorAll('.reveal');
  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in view)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }
  const observer = new view.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
};
