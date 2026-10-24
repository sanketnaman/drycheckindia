import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(REPO_ROOT, 'data', 'dry-days.json');
const DATADRY_FILE = path.join(REPO_ROOT, 'data', 'datadry.json');

const EM_DASH = '\u2014';

function readRaw(file: string): string {
  return readFileSync(file, 'utf8');
}

/**
 * Mojibake signatures seen in the dataset before the S-5 fix.
 *
 * Two forms existed, both produced by a Latin-1/CP1252 round-trip of the
 * UTF-8 em dash (U+2014):
 *   - "\u00e2\u20ac\u201d"  -> the literal characters "â€”"
 *   - "\u00ef\u00bf\u00bd"  -> the replacement character U+FFFD ("ï¿½")
 *
 * They could be stored either as raw UTF-8 bytes or as JSON escape sequences
 * (the escaped form is pure ASCII and therefore invisible to byte scans).
 */
const MOJIBAKE_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: 'latin-1 double-encoded em dash (raw)', re: /\u00e2\u20ac\u201d/ },
  { name: 'latin-1 double-encoded em dash (escaped)', re: /\\u00e2\\u20ac\\u201d/ },
  { name: 'U+FFFD replacement character (raw)', re: /\ufffd/ },
  { name: 'U+FFFD replacement character (escaped)', re: /\\ufffd/ },
  { name: 'U+FFFD encoded as escapes', re: /\\u00ef\\u00bf\\u00bd/ },
  { name: 'stray UTF-8 BOM inside the file', re: /\uFEFF/ },
];

describe('data/dry-days.json — encoding integrity', () => {
  const raw = readRaw(DATA_FILE);

  test('file is valid JSON', () => {
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  test.each(MOJIBAKE_PATTERNS)('contains no $name', ({ re }) => {
    expect(raw).not.toMatch(re);
  });

  test('no parsed string contains a replacement character', () => {
    const walk = (node: unknown, path: string): void => {
      if (typeof node === 'string') {
        expect(node, `mojibake at ${path}`).not.toMatch(/\ufffd/);
        expect(node, `mojibake at ${path}`).not.toMatch(/\u00e2\u20ac/);
        return;
      }
      if (Array.isArray(node)) {
        node.forEach((item, i) => walk(item, `${path}[${i}]`));
        return;
      }
      if (node && typeof node === 'object') {
        for (const [key, value] of Object.entries(node)) {
          walk(value, path ? `${path}.${key}` : key);
        }
      }
    };
    walk(JSON.parse(raw), '');
  });

  test('the 9 known corrupted strings now render a real em dash', () => {
    const data = JSON.parse(raw);
    const sources: string[] = [];
    const collect = (node: unknown): void => {
      if (typeof node === 'string') {
        sources.push(node);
        return;
      }
      if (Array.isArray(node)) {
        node.forEach(collect);
        return;
      }
      if (node && typeof node === 'object') {
        Object.values(node).forEach(collect);
      }
    };
    collect(data);

    const withDash = sources.filter((s) => s.includes(EM_DASH));
    expect(withDash.length).toBe(9);
    for (const s of withDash) {
      expect(s).not.toMatch(/\ufffd/);
      expect(s).not.toMatch(/\u00e2\u20ac/);
    }
  });

  test('dataset structure is preserved', () => {
    const data = JSON.parse(raw);
    expect(Object.keys(data)).toEqual(['nationalDryDays', 'meta', 'states', 'entries']);
    expect(Object.keys(data.states)).toHaveLength(36);
    expect(data.entries).toHaveLength(10);
    expect(data.nationalDryDays).toHaveLength(3);
    expect(Object.keys(data.meta)).toEqual([
      'datasetName',
      'generatedAt',
      'coverage',
      'important',
      'officialSourcesReviewed',
    ]);
  });

  test('every entry keeps its record fields and ordering', () => {
    const data = JSON.parse(raw);
    for (const entry of data.entries) {
      expect(Object.keys(entry)).toEqual([
        'state',
        'date',
        'type',
        'reason',
        'status',
        'sourceUrl',
        'sourceNote',
      ]);
      expect(entry.state).toBeTruthy();
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(['national', 'festival', 'election', 'state', 'local']).toContain(entry.type);
      expect(['confirmed', 'pending', 'reported']).toContain(entry.status);
    }
    for (const entry of data.nationalDryDays) {
      expect(Object.keys(entry)).toEqual([
        'date',
        'type',
        'reason',
        'status',
        'sourceUrl',
        'sourceNote',
      ]);
    }
  });

  test('file byte format is preserved (CRLF, no BOM, no trailing newline)', () => {
    const buf = readFileSync(DATA_FILE);
    expect(buf[0]).not.toBe(0xef);
    expect(buf[1]).not.toBe(0xbb);
    expect(buf[2]).not.toBe(0xbf);
    const text = buf.toString('utf8');
    expect(text).not.toMatch(/(?<!\r)\n/);
    expect(text.endsWith('\n')).toBe(false);
  });
});

describe('data/datadry.json — encoding integrity', () => {
  const raw = readRaw(DATADRY_FILE);

  test('file is valid JSON', () => {
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  test.each(MOJIBAKE_PATTERNS)('contains no $name', ({ re }) => {
    expect(raw).not.toMatch(re);
  });
});
