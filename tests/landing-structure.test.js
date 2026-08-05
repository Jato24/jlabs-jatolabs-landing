import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';

const parsePage = () => new DOMParser().parseFromString(readFileSync(`${process.cwd()}/index.html`, 'utf8'), 'text/html');

describe('estructura narrativa de la landing', () => {
  it('presenta ocho secciones numeradas con una función distinta', () => {
    const page = parsePage();
    const indexes = [...page.querySelectorAll('main > section .section-index')].map((item) => item.textContent);

    expect(indexes).toEqual([
      '01 / EL PROBLEMA',
      '02 / LA AUDITORÍA',
      '03 / MODALIDADES',
      '04 / ALCANCE Y RESULTADOS',
      '05 / EJEMPLO DE REPORTE',
      '06 / EL PROCESO',
      '07 / EXPERIENCIA Y DIRECCIÓN TÉCNICA',
      '08 / OBJECIONES FRECUENTES',
    ]);
    expect(page.querySelector('main > .intro')).toBeNull();
  });

  it('integra seis resultados dentro de entregables', () => {
    const page = parsePage();
    const outcomes = page.querySelectorAll('#entregables [data-outcomes] > li');

    expect(page.querySelector('main > .outcomes')).toBeNull();
    expect(siteConfig.expectedOutcomes).toHaveLength(6);
    expect([...outcomes].map((item) => item.textContent)).toEqual(siteConfig.expectedOutcomes);
  });
});
