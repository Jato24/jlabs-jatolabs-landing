// @ts-check
const config = window.SITE_CONFIG;
const auditContent = config.audit;
const header = /** @type {HTMLElement} */ (document.querySelector('.site-header'));
const toggle = /** @type {HTMLButtonElement} */ (document.querySelector('.menu-toggle'));
const menu = /** @type {HTMLElement} */ (document.querySelector('.nav-links'));
const menuLabel = /** @type {HTMLElement} */ (toggle.querySelector('.sr-only'));
const mailto = `mailto:${config.email}?subject=${encodeURIComponent(config.bookingSubject)}`;
const bookingUrl = config.bookingUrl || mailto;
document.title = config.seo.title;
document.querySelectorAll('[data-seo-title]').forEach((element) => { element.setAttribute('content', config.seo.title); });
document.querySelectorAll('[data-seo-description]').forEach((element) => { element.setAttribute('content', config.seo.description); });

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const appendTextRow = (container, label, value) => {
  const row = createElement('p', 'detail-row');
  row.append(createElement('strong', '', `${label}: `), document.createTextNode(value));
  container.append(row);
};

const renderLinks = (container, links) => {
  const fragment = document.createDocumentFragment();
  links.forEach(({ label, href }) => {
    const link = createElement('a', '', label);
    link.href = href;
    fragment.append(link);
  });
  container.replaceChildren(fragment);
};

renderLinks(document.querySelector('[data-navigation]'), config.navigation);
const navCta = createElement('a', 'button button-small', config.primaryCta.label);
navCta.dataset.bookingLink = '';
navCta.href = bookingUrl;
menu.append(navCta);
renderLinks(document.querySelector('[data-footer-navigation]'), config.footer.navigation);

const getAuditContent = (path) => path.split('.').reduce((value, key) => value?.[key], auditContent);
document.querySelectorAll('[data-audit-content]').forEach((node) => {
  const element = /** @type {HTMLElement} */ (node);
  const value = getAuditContent(element.dataset.auditContent);
  if (typeof value === 'string') element.textContent = value;
});
document.querySelectorAll('[data-audit-list]').forEach((node) => {
  const list = /** @type {HTMLElement} */ (node);
  const items = getAuditContent(list.dataset.auditList);
  if (!Array.isArray(items)) return;
  list.replaceChildren(...items.map((item) => createElement('li', '', item)));
});

document.querySelectorAll('[data-primary-cta]').forEach((element) => { element.textContent = config.primaryCta.label; });
document.querySelectorAll('[data-brand-name]').forEach((element) => { element.textContent = config.brandName.toUpperCase(); });
document.querySelectorAll('[data-founder-name]').forEach((element) => { element.textContent = config.founderName; });
document.querySelectorAll('[data-booking-link]').forEach((node) => { (/** @type {HTMLAnchorElement} */ (node)).href = bookingUrl; });
document.querySelectorAll('[data-contact-email]').forEach((node) => {
  const link = /** @type {HTMLAnchorElement} */ (node);
  link.textContent = config.email;
  link.href = `mailto:${config.email}`;
  link.hidden = !config.email;
});
document.querySelectorAll('[data-location]').forEach((element) => { element.textContent = `Auditoría técnica especializada · ${config.location}`; });
document.querySelectorAll('[data-linkedin]').forEach((node) => {
  const link = /** @type {HTMLAnchorElement} */ (node);
  link.href = config.linkedinUrl;
  link.hidden = !config.linkedinUrl;
});
document.querySelectorAll('[data-current-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });

const modesContainer = document.querySelector('[data-service-modes]');
config.serviceModes.forEach((mode, index) => {
  const article = createElement('article', 'mode-card reveal');
  article.append(createElement('span', 'mode-number', `0${index + 1}`), createElement('h3', '', mode.title), createElement('p', '', mode.description));
  const list = createElement('ul');
  list.append(...mode.items.map((item) => createElement('li', '', item)));
  const link = createElement('a', 'text-link mode-cta', mode.cta);
  link.href = bookingUrl;
  article.append(list, link);
  modesContainer.append(article);
});

const scorecard = document.querySelector('[data-scorecard]');
auditContent.scorecard.forEach((item) => {
  const listItem = createElement('li');
  listItem.append(
    createElement('span', 'scorecard-label', item.label),
    createElement('strong', '', item.score),
    createElement('span', `status status-${item.status.toLowerCase()}`, `Riesgo ${item.status}`),
  );
  scorecard.append(listItem);
});

const findings = document.querySelector('[data-findings]');
auditContent.findings.forEach((finding) => {
  const article = createElement('article', 'finding-card');
  const headerRow = createElement('div', 'finding-header');
  headerRow.append(createElement('span', `status status-${finding.severity.toLowerCase()}`, finding.severity), createElement('span', 'finding-area', finding.area));
  article.append(headerRow, createElement('h4', '', finding.title));
  appendTextRow(article, 'Impacto', finding.impact);
  appendTextRow(article, 'Esfuerzo', finding.effort);
  appendTextRow(article, 'Recomendación', finding.recommendation);
  findings.append(article);
});

const matrix = document.querySelector('[data-matrix]');
auditContent.matrix.forEach((item) => {
  const card = createElement('article', 'matrix-cell');
  card.append(createElement('strong', '', item.quadrant), createElement('p', '', item.initiative));
  matrix.append(card);
});

const roadmap = document.querySelector('[data-roadmap]');
auditContent.roadmap.forEach((phase) => {
  const article = createElement('article', 'roadmap-phase');
  const list = createElement('ul');
  list.append(...phase.items.map((item) => createElement('li', '', item)));
  article.append(createElement('h4', '', phase.period), list);
  roadmap.append(article);
});

document.querySelector('[data-outcomes]').replaceChildren(...config.expectedOutcomes.map((item) => createElement('li', '', item)));
const process = document.querySelector('[data-process]');
auditContent.process.forEach((step, index) => {
  const item = createElement('li', 'reveal');
  const copy = createElement('div');
  copy.append(createElement('h3', '', step.title), createElement('p', '', step.description));
  item.append(createElement('span', '', `0${index + 1}`), copy, createElement('small', '', step.outcome));
  process.append(item);
});

const profile = config.technicalProfile;
document.querySelector('[data-profile-role]').textContent = profile.role;
document.querySelector('[data-profile-introduction]').textContent = profile.introduction;
document.querySelector('[data-profile-perspective]').textContent = profile.perspective;
document.querySelector('[data-profile-linkedin-cta]').textContent = profile.linkedinCta;
document.querySelector('[data-profile-credential-name]').textContent = profile.credential.name;
document.querySelector('[data-profile-credential-issuer]').textContent = profile.credential.issuer;
document.querySelector('[data-profile-credential-validity]').textContent = profile.credential.validity;
const profileHighlights = document.querySelector('[data-profile-highlights]');
profile.highlights.forEach((highlight) => {
  const item = createElement('div', 'profile-highlight');
  item.append(createElement('dt', '', highlight.value), createElement('dd', '', highlight.label));
  profileHighlights.append(item);
});
document.querySelector('[data-profile-expertise]').replaceChildren(...profile.expertise.map((item) => createElement('li', '', item)));

const faqList = document.querySelector('[data-faqs]');
config.faqs.forEach((faq, index) => {
  const item = createElement('article', 'faq-item');
  const button = createElement('button', 'faq-question', faq.question);
  const panel = createElement('div', 'faq-answer');
  const panelId = `faq-panel-${index + 1}`;
  const buttonId = `faq-button-${index + 1}`;
  button.type = 'button';
  button.id = buttonId;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', panelId);
  button.append(createElement('span', 'faq-symbol', '+'));
  panel.id = panelId;
  panel.hidden = true;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', buttonId);
  panel.append(createElement('p', '', faq.answer));
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    (/** @type {HTMLElement} */ (button.querySelector('.faq-symbol'))).textContent = isOpen ? '+' : '−';
    panel.hidden = isOpen;
  });
  item.append(button, panel);
  faqList.append(item);
});

const closeMenu = ({ restoreFocus = false } = {}) => {
  const wasOpen = menu.classList.contains('open');
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  menuLabel.textContent = 'Abrir menú';
  if (restoreFocus && wasOpen) toggle.focus();
};
toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  menuLabel.textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu({ restoreFocus: window.innerWidth <= 900 })));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu({ restoreFocus: true });
});
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
