import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { getGaMeasurementId, isGaEnabled, GA_MEASUREMENT_ID_ENV } from '@/lib/ga4';

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('getGaMeasurementId', () => {
  test('returns null when the variable is missing', () => {
    delete process.env[GA_MEASUREMENT_ID_ENV];
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns null when the variable is empty', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = '';
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns null when the variable is whitespace only', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = '   ';
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns null for the .env.example placeholder', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-XXXXXXXXXX';
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns null for other known placeholder values', () => {
    for (const placeholder of ['G-EXAMPLE', 'G-TEST', 'G-PLACEHOLDER']) {
      process.env[GA_MEASUREMENT_ID_ENV] = placeholder;
      expect(getGaMeasurementId()).toBeNull();
    }
  });

  test('returns null for a malformed id', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-';
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns null for a non-GA id', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'UA-12345678-1';
    expect(getGaMeasurementId()).toBeNull();
  });

  test('returns the id for a valid GA4 Measurement ID', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-9PWTNCZKZ2';
    expect(getGaMeasurementId()).toBe('G-9PWTNCZKZ2');
  });

  test('trims surrounding whitespace from a valid id', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = '  G-9PWTNCZKZ2  ';
    expect(getGaMeasurementId()).toBe('G-9PWTNCZKZ2');
  });

  test('accepts a longer valid id', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-ABCDEFGHIJ';
    expect(getGaMeasurementId()).toBe('G-ABCDEFGHIJ');
  });
});

describe('isGaEnabled', () => {
  test('is false when unconfigured', () => {
    delete process.env[GA_MEASUREMENT_ID_ENV];
    expect(isGaEnabled()).toBe(false);
  });

  test('is false for a placeholder', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-XXXXXXXXXX';
    expect(isGaEnabled()).toBe(false);
  });

  test('is true for a real id', () => {
    process.env[GA_MEASUREMENT_ID_ENV] = 'G-9PWTNCZKZ2';
    expect(isGaEnabled()).toBe(true);
  });
});

describe('GA4 configuration is read via static member access', () => {
  test('the config module uses process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID literally', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const source = fs.readFileSync(
      path.resolve(__dirname, '..', 'lib', 'ga4.ts'),
      'utf8'
    );

    // Static member access so Next.js inlines it at build time.
    expect(source).toContain('process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID');

    // Strip comments so explanatory prose about `process.env[name]` does not
    // trip the guard, then assert no dynamic access remains in code.
    const code = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^[ \t]*\/\/.*$/gm, '');
    expect(code).not.toMatch(/process\.env\s*\[/);
  });
});
