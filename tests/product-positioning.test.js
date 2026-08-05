import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';

const expectedTitle = 'Descubre qué está frenando la escalabilidad de tu negocio';

describe('posicionamiento de procesos y tecnología', () => {
  it('presenta el nuevo posicionamiento en configuración y fallback HTML', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');

    expect(siteConfig.audit.hero.title).toBe(expectedTitle);
    expect(page.querySelector('h1')?.textContent).toBe(expectedTitle);
    expect(page.querySelector('.hero .eyebrow')?.textContent).toContain('Auditoría de procesos y tecnología');
    expect(siteConfig.seo.title).toBe('Jato Labs | Auditoría de procesos y tecnología');
  });

  it('coloca procesos antes de los cinco lentes tecnológicos', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');
    const cards = page.querySelectorAll('.service-grid > .service-card');

    expect([...cards].map((card) => card.querySelector('h3')?.textContent)).toEqual([
      'Procesos y eficiencia operativa',
      'Datos',
      'Arquitectura y escalabilidad',
      'Cloud y costos',
      'Seguridad',
      'DevOps y confiabilidad',
    ]);
    expect(cards[0].classList).toContain('service-card-foundation');
  });

  it('incluye rediseño de procesos sin perder ingeniería de software', () => {
    expect(siteConfig.technicalProfile.expertise).toContain('Ingeniería de software');
    expect(siteConfig.technicalProfile.expertise).toContain('Rediseño de procesos');
  });

  it('mantiene alcance, entregables y resultados críticos en el fallback HTML', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');
    /** @param {string} selector */
    const textOf = (selector) => [...page.querySelectorAll(`${selector} > li`)].map((item) => item.textContent);

    expect(textOf('[data-audit-list="scope"]')).toEqual(siteConfig.audit.scope);
    expect(textOf('[data-audit-list="deliverables"]')).toEqual(siteConfig.audit.deliverables);
    expect(textOf('[data-outcomes]')).toEqual(siteConfig.expectedOutcomes);
  });
});
