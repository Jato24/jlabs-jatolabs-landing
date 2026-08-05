// @ts-check
import {
  renderAuditContent,
  renderProcess,
  renderFaqs,
  renderReport,
  renderSiteChrome,
  renderTechnicalProfile,
} from './content-renderers.js';
import { initFaqAccordion, initMobileMenu, initViewportEffects } from './interactions.js';
import { resolveBookingUrl } from './links.js';

/** @param {AppDependencies} dependencies */
export const bootstrap = ({ root, view, config }) => {
  const bookingUrl = resolveBookingUrl(config);
  renderSiteChrome(root, config, bookingUrl);
  renderAuditContent(root, config.audit);
  renderReport(root, config.audit);
  renderProcess(root, config.audit.process);
  renderTechnicalProfile(root, config.technicalProfile);
  renderFaqs(root, config.faqs);

  initFaqAccordion(root);
  initMobileMenu(root, view);
  initViewportEffects(root, view);
};
