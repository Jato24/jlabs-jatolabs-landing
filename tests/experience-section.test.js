import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../site-config.js';

describe('sección externa de experiencia', () => {
  it('no publica la sección ni enlaces sociales externos', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');

    expect(page.querySelector('#experiencia')).toBeNull();
    expect(page.querySelector('footer a[target="_blank"]')).toBeNull();
    expect(siteConfig.navigation.map(({ href }) => href)).not.toContain('#experiencia');
  });
});
