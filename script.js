const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const config = window.SITE_CONFIG;

const mailto = `mailto:${config.email}?subject=${encodeURIComponent(config.bookingSubject)}`;
const bookingUrl = config.bookingUrl || mailto;

document.querySelectorAll('[data-brand-name]').forEach((element) => {
  element.textContent = config.brandName.toUpperCase();
});
document.querySelectorAll('[data-founder-name]').forEach((element) => {
  element.textContent = config.founderName;
});
document.querySelectorAll('[data-booking-link]').forEach((link) => {
  link.href = bookingUrl;
});
document.querySelectorAll('[data-contact-email]').forEach((link) => {
  link.textContent = config.email;
  link.href = `mailto:${config.email}`;
  link.hidden = !config.email;
});
document.querySelectorAll('[data-contact-phone]').forEach((link) => {
  link.textContent = config.phone;
  link.href = `tel:${config.phone.replace(/[^+\d]/g, '')}`;
  link.hidden = !config.phone;
});
document.querySelectorAll('[data-location]').forEach((element) => {
  element.textContent = `Auditoría técnica boutique · ${config.location}`;
});
document.querySelectorAll('[data-linkedin]').forEach((link) => {
  link.href = config.linkedinUrl;
  link.hidden = !config.linkedinUrl;
});
document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const closeMenu = () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
