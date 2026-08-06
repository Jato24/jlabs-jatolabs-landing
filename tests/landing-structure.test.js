import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';

const parsePage = () => new DOMParser().parseFromString(readFileSync(`${process.cwd()}/index.html`, 'utf8'), 'text/html');

describe('estructura narrativa de la landing', () => {
  it('presenta cinco secciones numeradas con una función distinta', () => {
    const page = parsePage();
    const indexes = [...page.querySelectorAll('main > section .section-index')].map((item) => item.textContent);

    expect(indexes).toEqual([
      '01 / EL PROBLEMA',
      '02 / LA AUDITORÍA',
      '03 / ALCANCE Y ENTREGABLES',
      '04 / EL PROCESO',
      '05 / OBJECIONES FRECUENTES',
    ]);
  });

  it('integra el ejemplo y cinco entregables sin repetir resultados', () => {
    const page = parsePage();
    const deliverables = page.querySelectorAll('#entregables [data-audit-list="deliverables"] > li');

    expect(siteConfig.audit.deliverables).toHaveLength(5);
    expect([...deliverables].map((item) => item.textContent)).toEqual(siteConfig.audit.deliverables);
    expect(page.querySelector('#entregables .report-panel')).not.toBeNull();
  });
});
