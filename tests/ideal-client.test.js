import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';
import { renderAuditContent } from '../scripts/content-renderers.js';

const scenarios = siteConfig.audit.idealClientScenarios;

describe('tarjetas de cliente ideal', () => {
  it('están presentes en el HTML inicial aunque JavaScript no se ejecute', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');
    const cards = page.querySelectorAll('[data-audit-list="idealClientScenarios"] > li');

    expect(cards).toHaveLength(6);
    expect([...cards].map((card) => card.textContent)).toEqual(scenarios);
  });

  it('renderiza los seis escenarios configurados en orden', () => {
    document.body.innerHTML = '<ul data-audit-list="idealClientScenarios"></ul>';

    renderAuditContent(document, siteConfig.audit);

    const cards = document.querySelectorAll('[data-audit-list="idealClientScenarios"] > li');
    expect(cards).toHaveLength(6);
    expect([...cards].map((card) => card.textContent)).toEqual(scenarios);
  });

  it('es idempotente y no duplica tarjetas', () => {
    document.body.innerHTML = '<ul data-audit-list="idealClientScenarios"></ul>';

    renderAuditContent(document, siteConfig.audit);
    renderAuditContent(document, siteConfig.audit);

    expect(document.querySelectorAll('[data-audit-list="idealClientScenarios"] > li')).toHaveLength(6);
  });
});
