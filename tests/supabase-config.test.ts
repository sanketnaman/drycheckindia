import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
  getSupabaseConfigStatus,
  isSupabaseConfigured,
  looksLikePlaceholder,
} from '@/lib/supabase/config';

const ENV_URL = 'NEXT_PUBLIC_SUPABASE_URL';
const ENV_KEY = 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY';

const REAL_URL = 'https://abcdefghijklmnop.supabase.co';
const REAL_KEY = 'sb_publishable_abcdefghijklmnopqrstuvwxyz0123456789';

const originalEnv = { ...process.env };

function setEnv(url?: string, key?: string) {
  if (url === undefined) delete process.env[ENV_URL];
  else process.env[ENV_URL] = url;
  if (key === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = key;
}

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('looksLikePlaceholder', () => {
  test.each([
    'https://YOUR_PROJECT_REF.supabase.co',
    'YOUR_PUBLISHABLE_OR_ANON_KEY',
    'your-project-ref',
    'your_project_ref',
    'YOURPROJECTREF',
    'placeholder',
    'changeme',
    'CHANGEME',
    'todo',
    'xxxx',
    '   ',
    '',
  ])('flags %j as a placeholder', (value) => {
    expect(looksLikePlaceholder(value)).toBe(true);
  });

  test.each([
    // Hand-edited dummy values that are not in .env.example but are just as
    // unusable as the shipped templates.
    'https://your-project.supabase.co',
    'your-publishable-key',
    'your-anon-key',
    'your-supabase-url',
    'https://your-project.supabase.co/',
  ])('flags the dummy value %j as a placeholder', (value) => {
    expect(looksLikePlaceholder(value)).toBe(true);
  });

  test.each([
    'https://abcdefghijklmnop.supabase.co',
    'sb_publishable_abcdefghijklmnopqrstuvwxyz0123456789',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature',
  ])('does not flag %j', (value) => {
    expect(looksLikePlaceholder(value)).toBe(false);
  });
});

describe('getSupabaseConfigStatus', () => {
  test('reports missing when both variables are absent', () => {
    setEnv(undefined, undefined);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) {
      expect(status.reason).toBe('missing');
      expect(status.message).toContain('NEXT_PUBLIC_SUPABASE_URL');
      expect(status.message).toContain('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
    }
  });

  test('reports missing when only the key is absent', () => {
    setEnv(REAL_URL, undefined);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) {
      expect(status.reason).toBe('missing');
      expect(status.message).toContain('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
      expect(status.message).not.toContain('NEXT_PUBLIC_SUPABASE_URL');
    }
  });

  test('reports placeholder for the .env.example values', () => {
    setEnv('https://YOUR_PROJECT_REF.supabase.co', 'YOUR_PUBLISHABLE_OR_ANON_KEY');
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) {
      expect(status.reason).toBe('placeholder');
      expect(status.message).toContain('placeholder');
    }
  });

  test('reports placeholder when only the key is a template', () => {
    setEnv(REAL_URL, 'YOUR_PUBLISHABLE_OR_ANON_KEY');
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) expect(status.reason).toBe('placeholder');
  });

  test('reports invalid for a non-http(s) URL', () => {
    setEnv('not-a-url', REAL_KEY);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) expect(status.reason).toBe('invalid');
  });

  test('reports invalid for a non-http protocol', () => {
    setEnv('ftp://example.supabase.co', REAL_KEY);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) expect(status.reason).toBe('invalid');
  });

  test('accepts a real-looking configuration', () => {
    setEnv(REAL_URL, REAL_KEY);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(true);
    if (status.ok) {
      expect(status.url).toBe(REAL_URL);
      expect(status.key).toBe(REAL_KEY);
    }
    expect(isSupabaseConfigured()).toBe(true);
  });

  test('never leaks the configured value in an error message', () => {
    setEnv('not-a-url', REAL_KEY);
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) {
      expect(status.message).not.toContain(REAL_KEY);
      expect(status.message).not.toContain('not-a-url');
    }
  });

  test('error messages never contain the placeholder value itself', () => {
    setEnv('https://YOUR_PROJECT_REF.supabase.co', 'YOUR_PUBLISHABLE_OR_ANON_KEY');
    const status = getSupabaseConfigStatus();
    expect(status.ok).toBe(false);
    if (!status.ok) {
      expect(status.message).not.toContain('YOUR_PROJECT_REF');
      expect(status.message).not.toContain('YOUR_PUBLISHABLE_OR_ANON_KEY');
    }
  });
});

describe('server client configuration guard', () => {
  test('the config module uses static process.env member access', async () => {
    // Next.js only inlines `process.env.NEXT_PUBLIC_*` into the browser bundle
    // for literal member expressions. A dynamic `process.env[name]` lookup
    // resolves to undefined in the browser (the client `process` shim exposes
    // an empty `env` object), which would make createBrowserClient() always
    // throw. This test fails if anyone reintroduces dynamic access.
    const fs = await import('node:fs');
    const path = await import('node:path');
    const source = fs.readFileSync(
      path.resolve(__dirname, '..', 'lib', 'supabase', 'config.ts'),
      'utf8'
    );

    expect(source).toContain('process.env.NEXT_PUBLIC_SUPABASE_URL');
    expect(source).toContain('process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');

    // Strip comments so the explanatory prose about `process.env[name]` does
    // not trip the guard, then assert no dynamic access remains in code.
    const code = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^[ \t]*\/\/.*$/gm, '');
    expect(code).not.toMatch(/process\.env\s*\[/);
    expect(code).not.toMatch(/process\.env\s*\(\s*ENV_/);
  });

  test('createServerClient throws a typed, value-free error when unconfigured', async () => {
    vi.resetModules();
    setEnv('https://YOUR_PROJECT_REF.supabase.co', 'YOUR_PUBLISHABLE_OR_ANON_KEY');

    const { createServerClient, isSupabaseNotConfigured } = await import('@/lib/supabase/server');

    let caught: unknown = null;
    try {
      await createServerClient();
    } catch (error) {
      caught = error;
    }

    expect(caught).not.toBeNull();
    expect(isSupabaseNotConfigured(caught)).toBe(true);
    const message = (caught as Error).message;
    expect(message).toBe('Supabase is not configured for this deployment.');
    expect(message).not.toContain('YOUR_PROJECT_REF');
    expect(message).not.toContain('YOUR_PUBLISHABLE_OR_ANON_KEY');
  });

  test('createServerClient throws a typed error when variables are missing', async () => {
    vi.resetModules();
    setEnv(undefined, undefined);

    const { createServerClient, isSupabaseNotConfigured } = await import('@/lib/supabase/server');

    await expect(createServerClient()).rejects.toThrow(
      'Supabase is not configured for this deployment.'
    );
  });

  test('browser client throws a typed, value-free error when unconfigured', async () => {
    vi.resetModules();
    setEnv(undefined, undefined);

    const { createBrowserClient, isSupabaseClientNotConfigured } = await import(
      '@/lib/supabase/client'
    );

    let caught: unknown = null;
    try {
      createBrowserClient();
    } catch (error) {
      caught = error;
    }

    expect(isSupabaseClientNotConfigured(caught)).toBe(true);
    expect((caught as Error).message).toBe('Supabase is not configured for this deployment.');
  });
});
