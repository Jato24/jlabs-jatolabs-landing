import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const importPattern = /from\s+['"](\.[^'"]+)['"]/g;

/**
 * @param {string} entry
 * @param {Set<string>} [visited]
 * @returns {string[]}
 */
const collectMissingImports = (entry, visited = new Set()) => {
  const absolutePath = resolve(projectRoot, entry);
  if (visited.has(absolutePath)) return [];
  visited.add(absolutePath);
  if (!existsSync(absolutePath)) return [entry];

  const source = readFileSync(absolutePath, 'utf8');
  return [...source.matchAll(importPattern)].flatMap((match) => {
    const dependency = resolve(dirname(absolutePath), match[1]);
    const relativeDependency = dependency.slice(projectRoot.length + 1);
    return collectMissingImports(relativeDependency, visited);
  });
};

describe('grafo de módulos del navegador', () => {
  it('no contiene imports relativos faltantes', () => {
    expect(collectMissingImports('script.js')).toEqual([]);
  });
});
