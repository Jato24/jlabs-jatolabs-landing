import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';
import { renderTechnicalProfile } from '../scripts/content-renderers.js';

const mountProfile = () => {
  document.body.innerHTML = `
    <p data-profile-role></p>
    <p data-profile-introduction></p>
    <p data-profile-perspective></p>
    <a data-profile-linkedin-cta></a>
    <dl data-profile-highlights></dl>
  `;
};

describe('perfil técnico', () => {
  it('renderiza el perfil de forma idempotente', () => {
    mountProfile();

    renderTechnicalProfile(document, siteConfig.technicalProfile);
    renderTechnicalProfile(document, siteConfig.technicalProfile);

    const highlights = document.querySelectorAll('[data-profile-highlights] > div');
    expect(highlights).toHaveLength(siteConfig.technicalProfile.highlights.length);
  });
});
