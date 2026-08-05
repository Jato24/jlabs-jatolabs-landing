import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';
import { renderTechnicalProfile } from '../scripts/content-renderers.js';

const expertise = siteConfig.technicalProfile.expertise;

const mountProfile = () => {
  document.body.innerHTML = `
    <p data-profile-role></p>
    <p data-profile-introduction></p>
    <p data-profile-perspective></p>
    <a data-profile-linkedin-cta></a>
    <p data-profile-credential-name></p>
    <p data-profile-credential-issuer></p>
    <p data-profile-credential-validity></p>
    <dl data-profile-highlights></dl>
    <ul data-profile-expertise></ul>
  `;
};

describe('perfil técnico', () => {
  it('incluye Ingeniería de software como última área de experiencia', () => {
    expect(expertise.at(-1)).toBe('Ingeniería de software');
  });

  it('mantiene las áreas de experiencia en el HTML inicial', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');
    const items = page.querySelectorAll('[data-profile-expertise] > li');

    expect([...items].map((item) => item.textContent)).toEqual(expertise);
  });

  it('renderiza el perfil de forma idempotente', () => {
    mountProfile();

    renderTechnicalProfile(document, siteConfig.technicalProfile);
    renderTechnicalProfile(document, siteConfig.technicalProfile);

    const items = document.querySelectorAll('[data-profile-expertise] > li');
    const highlights = document.querySelectorAll('[data-profile-highlights] > div');
    expect([...items].map((item) => item.textContent)).toEqual(expertise);
    expect(highlights).toHaveLength(siteConfig.technicalProfile.highlights.length);
  });
});
