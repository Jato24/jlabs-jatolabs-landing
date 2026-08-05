// @ts-check
import { appendTextRow, createElement, queryRequired, setText } from './dom.js';

/**
 * @param {Document} documentRef
 * @param {HTMLElement} container
 * @param {readonly SiteLink[]} links
 */
const renderLinks = (documentRef, container, links) => {
  const fragment = documentRef.createDocumentFragment();
  links.forEach(({ label, href }) => {
    const link = /** @type {HTMLAnchorElement} */ (createElement(documentRef, 'a', '', label));
    link.href = href;
    fragment.append(link);
  });
  container.replaceChildren(fragment);
};

/**
 * @param {Document} root
 * @param {SiteConfig} config
 * @param {string} bookingUrl
 */
export const renderSiteChrome = (root, config, bookingUrl) => {
  root.title = config.seo.title;
  root.querySelectorAll('[data-seo-title]').forEach((element) => element.setAttribute('content', config.seo.title));
  root.querySelectorAll('[data-seo-description]').forEach((element) => element.setAttribute('content', config.seo.description));

  const navigation = queryRequired(root, '[data-navigation]');
  renderLinks(root, /** @type {HTMLElement} */ (navigation), config.navigation);
  const navCta = /** @type {HTMLAnchorElement} */ (createElement(root, 'a', 'button button-small', config.primaryCta.label));
  navCta.dataset.bookingLink = '';
  navCta.href = bookingUrl;
  navigation.append(navCta);
  renderLinks(root, queryRequired(root, '[data-footer-navigation]'), config.footer.navigation);

  root.querySelectorAll('[data-primary-cta]').forEach((element) => { element.textContent = config.primaryCta.label; });
  root.querySelectorAll('[data-brand-name]').forEach((element) => { element.textContent = config.brandName.toUpperCase(); });
  root.querySelectorAll('[data-founder-name]').forEach((element) => { element.textContent = config.founderName; });
  root.querySelectorAll('[data-booking-link]').forEach((element) => { (/** @type {HTMLAnchorElement} */ (element)).href = bookingUrl; });
  root.querySelectorAll('[data-contact-email]').forEach((element) => {
    const link = /** @type {HTMLAnchorElement} */ (element);
    link.textContent = config.email;
    link.href = `mailto:${config.email}`;
    link.hidden = !config.email;
  });
  root.querySelectorAll('[data-location]').forEach((element) => { element.textContent = `Auditoría de procesos y tecnología · ${config.location}`; });
  root.querySelectorAll('[data-linkedin]').forEach((element) => {
    const link = /** @type {HTMLAnchorElement} */ (element);
    link.href = config.linkedinUrl;
    link.hidden = !config.linkedinUrl;
  });
  root.querySelectorAll('[data-current-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });
};

/**
 * @param {Document} root
 * @param {AuditConfig} audit
 */
export const renderAuditContent = (root, audit) => {
  /** @param {string} path @returns {unknown} */
  const getContent = (path) => {
    /** @type {unknown} */
    let value = audit;
    for (const key of path.split('.')) {
      if (typeof value !== 'object' || value === null || !(key in value)) return undefined;
      value = (/** @type {Record<string, unknown>} */ (value))[key];
    }
    return value;
  };
  root.querySelectorAll('[data-audit-content]').forEach((element) => {
    const value = getContent((/** @type {HTMLElement} */ (element)).dataset.auditContent || '');
    if (typeof value === 'string') element.textContent = value;
  });
  root.querySelectorAll('[data-audit-list]').forEach((element) => {
    const list = /** @type {HTMLElement} */ (element);
    const items = getContent(list.dataset.auditList || '');
    if (Array.isArray(items)) list.replaceChildren(...items.map((item) => createElement(root, 'li', '', item)));
  });
};

/**
 * @param {Document} root
 * @param {AuditConfig} audit
 */
export const renderReport = (root, audit) => {
  const scorecard = queryRequired(root, '[data-scorecard]');
  audit.scorecard.forEach((entry) => {
    const item = createElement(root, 'li');
    item.append(createElement(root, 'span', 'scorecard-label', entry.label), createElement(root, 'strong', '', entry.score), createElement(root, 'span', `status status-${entry.status.toLowerCase()}`, `Riesgo ${entry.status}`));
    scorecard.append(item);
  });

  const findings = queryRequired(root, '[data-findings]');
  audit.findings.forEach((finding) => {
    const article = createElement(root, 'article', 'finding-card');
    const heading = createElement(root, 'div', 'finding-header');
    heading.append(createElement(root, 'span', `status status-${finding.severity.toLowerCase()}`, finding.severity), createElement(root, 'span', 'finding-area', finding.area));
    article.append(heading, createElement(root, 'h4', '', finding.title));
    appendTextRow(root, article, 'Impacto', finding.impact);
    appendTextRow(root, article, 'Esfuerzo', finding.effort);
    appendTextRow(root, article, 'Recomendación', finding.recommendation);
    findings.append(article);
  });

  const matrix = queryRequired(root, '[data-matrix]');
  audit.matrix.forEach((entry) => {
    const card = createElement(root, 'article', 'matrix-cell');
    card.append(createElement(root, 'strong', '', entry.quadrant), createElement(root, 'p', '', entry.initiative));
    matrix.append(card);
  });

  const roadmap = queryRequired(root, '[data-roadmap]');
  audit.roadmap.forEach((phase) => {
    const article = createElement(root, 'article', 'roadmap-phase');
    const list = createElement(root, 'ul');
    list.append(...phase.items.map((item) => createElement(root, 'li', '', item)));
    article.append(createElement(root, 'h4', '', phase.period), list);
    roadmap.append(article);
  });
};

/**
 * @param {Document} root
 * @param {AuditConfig['process']} process
 */
export const renderProcess = (root, process) => {
  const processList = queryRequired(root, '[data-process]');
  process.forEach((step, index) => {
    const item = createElement(root, 'li');
    const copy = createElement(root, 'div');
    copy.append(createElement(root, 'h3', '', step.title), createElement(root, 'p', '', step.description));
    item.append(createElement(root, 'span', '', `0${index + 1}`), copy, createElement(root, 'small', '', step.outcome));
    processList.append(item);
  });
};

/**
 * @param {Document} root
 * @param {TechnicalProfile} profile
 */
export const renderTechnicalProfile = (root, profile) => {
  setText(root, '[data-profile-role]', profile.role);
  setText(root, '[data-profile-introduction]', profile.introduction);
  setText(root, '[data-profile-perspective]', profile.perspective);
  setText(root, '[data-profile-linkedin-cta]', profile.linkedinCta);
  const highlights = queryRequired(root, '[data-profile-highlights]');
  const highlightItems = profile.highlights.map((highlight) => {
    const item = createElement(root, 'div', 'profile-highlight');
    item.append(createElement(root, 'dt', '', highlight.value), createElement(root, 'dd', '', highlight.label));
    return item;
  });
  highlights.replaceChildren(...highlightItems);
};

/**
 * @param {Document} root
 * @param {readonly FaqItem[]} faqs
 */
export const renderFaqs = (root, faqs) => {
  const container = queryRequired(root, '[data-faqs]');
  faqs.forEach((faq, index) => {
    const item = createElement(root, 'article', 'faq-item');
    const button = /** @type {HTMLButtonElement} */ (createElement(root, 'button', 'faq-question', faq.question));
    const panel = createElement(root, 'div', 'faq-answer');
    const panelId = `faq-panel-${index + 1}`;
    const buttonId = `faq-button-${index + 1}`;
    button.type = 'button';
    button.id = buttonId;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', panelId);
    button.append(createElement(root, 'span', 'faq-symbol', '+'));
    panel.id = panelId;
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', buttonId);
    panel.append(createElement(root, 'p', '', faq.answer));
    item.append(button, panel);
    container.append(item);
  });
};
