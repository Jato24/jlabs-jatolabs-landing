import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';
import { renderSiteChrome } from '../scripts/content-renderers.js';

const expectedNavigation = [
  ['Servicios', '#servicios'],
  ['Entregables', '#entregables'],
  ['Proceso', '#proceso'],
  ['Experiencia', '#experiencia'],
  ['Preguntas frecuentes', '#preguntas-frecuentes'],
  ['Contacto', '#contacto'],
];

/** @param {readonly SiteLink[]} links */
const linkEntries = (links) => links.map(({ label, href }) => [label, href]);

describe('navegación del sitio', () => {
  it('comparte el orden de las secciones entre encabezado y pie', () => {
    expect(linkEntries(siteConfig.navigation)).toEqual(expectedNavigation);
    expect(linkEntries(siteConfig.footer.navigation)).toEqual(expectedNavigation);
  });

  it('renderiza ambos menús con texto, orden y destinos correctos', () => {
    document.body.innerHTML = '<nav data-navigation></nav><nav data-footer-navigation></nav>';

    renderSiteChrome(document, siteConfig, '#contacto');

    /** @param {string} selector */
    const readLinks = (selector) => [...document.querySelectorAll(`${selector} > a:not([data-booking-link])`)]
      .map((link) => [link.textContent, link.getAttribute('href')]);
    expect(readLinks('[data-navigation]')).toEqual(expectedNavigation);
    expect(readLinks('[data-footer-navigation]')).toEqual(expectedNavigation);
  });
});
