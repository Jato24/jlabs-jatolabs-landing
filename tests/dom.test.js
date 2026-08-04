import { describe, expect, it } from 'vitest';
import { queryRequired } from '../scripts/dom.js';

describe('queryRequired', () => {
  it('devuelve el elemento solicitado', () => {
    document.body.innerHTML = '<main data-test-root></main>';
    expect(queryRequired(document, '[data-test-root]')).toBeInstanceOf(HTMLElement);
  });

  it('falla con un mensaje descriptivo cuando falta el elemento', () => {
    expect(() => queryRequired(document, '[data-missing]')).toThrow('Required element not found: [data-missing]');
  });
});
