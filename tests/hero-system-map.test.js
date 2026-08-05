import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('mapa de áreas del hero', () => {
  it('representa la secuencia de procesos y tecnología en orden horario', () => {
    const html = readFileSync(`${process.cwd()}/index.html`, 'utf8');
    const page = new DOMParser().parseFromString(html, 'text/html');
    const nodes = page.querySelectorAll('.system-map > .map-node');

    expect([...nodes].map((node) => node.textContent.trim().replace(/\s+/g, ' '))).toEqual([
      '01 PROCESS',
      '02 DATA',
      '03 ARCHITECTURE',
      '04 CLOUD',
      '05 SECURITY',
      '06 DEVOPS',
    ]);
    expect(nodes[0].classList).toContain('map-node-primary');
    expect(page.querySelector('.system-map')?.getAttribute('aria-label')).toContain('Procesos primero');
  });
});
