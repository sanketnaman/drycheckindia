import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@supabase/ssr', () => ({ createServerClient: vi.fn() }));

import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { middleware } from '@/middleware';

const mockCreateServerClient = vi.mocked(createServerClient);

const CONFIGURED_URL = 'https://abc123xyz.supabase.co';
const CONFIGURED_KEY = 'sb_publishable_dummy_value_for_tests';
const UNAVAILABLE_MESSAGE = 'Service temporarily unavailable. Please try again shortly.';

const ADMIN_USER = { id: 'admin-1', email: 'admin@example.com' };

function stubConfiguredEnv(): void {
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', CONFIGURED_URL);
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', CONFIGURED_KEY);
}

function stubPlaceholderEnv(): void {
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://YOUR_PROJECT_REF.supabase.co');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'YOUR_PUBLISHABLE_OR_ANON_KEY');
}

function req(path: string): NextRequest {
  return new NextRequest(`http://localhost:3000${path}`);
}

interface SettableCookies {
  cookies: {
    setAll(cookies: Array<{ name: string; value: string; options?: Record<string, unknown> }>): void;
  };
}

type AuthOutcome =
  | { user: typeof ADMIN_USER | null }
  | { throw: Error };

function stubAuthClient(outcome: AuthOutcome | ((options: SettableCookies) => Promise<AuthOutcome>)): void {
  mockCreateServerClient.mockImplementation(((
    _url: string,
    _key: string,
    options: SettableCookies,
  ) => ({
    auth: {
      getUser: async () => {
        const resolved =
          typeof outcome === 'function' ? await outcome(options) : outcome;
        if ('throw' in resolved) throw resolved.throw;
        return { data: { user: resolved.user, error: null } };
      },
    },
  })) as never);
}

beforeEach(() => {
  mockCreateServerClient.mockReset();
  stubConfiguredEnv();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('configuration gate (behaviour preserved)', () => {
  test('missing env vars: protected admin path gets 503, no client is created', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', '');

    const response = await middleware(req('/admin/dry-days'));

    expect(response.status).toBe(503);
    expect(response.headers.get('location')).toBeNull();
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe('Supabase is not configured for this deployment.');
    expect(mockCreateServerClient).not.toHaveBeenCalled();
  });

  test('placeholder env vars: protected path gets 503 (fail closed)', async () => {
    stubPlaceholderEnv();

    const response = await middleware(req('/admin'));

    expect(response.status).toBe(503);
    expect(response.headers.get('location')).toBeNull();
    expect(mockCreateServerClient).not.toHaveBeenCalled();
  });

  test('placeholder env vars: /admin/login still passes through (no loop)', async () => {
    stubPlaceholderEnv();

    const response = await middleware(req('/admin/login'));

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
    expect(mockCreateServerClient).not.toHaveBeenCalled();
  });
});

describe('authentication branches (behaviour preserved)', () => {
  test('authenticated admin passes through, client is configured from env', async () => {
    stubAuthClient({ user: ADMIN_USER });

    const response = await middleware(req('/admin/dry-days?published=false'));

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
    expect(mockCreateServerClient).toHaveBeenCalledWith(
      CONFIGURED_URL,
      CONFIGURED_KEY,
      expect.anything(),
    );
  });

  test('unauthenticated request redirects to login with the query string cleared', async () => {
    stubAuthClient({ user: null });

    const response = await middleware(req('/admin/dry-days?published=false'));

    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    const location = new URL(response.headers.get('location') as string);
    expect(location.pathname).toBe('/admin/login');
    expect(location.search).toBe('');
  });

  test('unauthenticated request to /admin/login passes through (no redirect loop)', async () => {
    stubAuthClient({ user: null });

    const response = await middleware(req('/admin/login'));

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  test('cookies written during getUser() (session refresh) reach the response', async () => {
    stubAuthClient(async (options) => {
      options.cookies.setAll([
        { name: 'sb-refresh-token', value: 'rotated', options: { path: '/' } },
      ]);
      return { user: ADMIN_USER };
    });

    const response = await middleware(req('/admin'));

    expect(response.status).toBe(200);
    expect(response.cookies.get('sb-refresh-token')?.value).toBe('rotated');
  });
});

describe('unexpected getUser() failures fail closed with a generic 503 (regression)', () => {
  const SENSITIVE_ERROR =
    'fetch failed: ECONNREFUSED https://abc123xyz.supabase.co key sb_publishable_super_secret token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  test('a thrown failure on a protected path returns 503 without leaking details', async () => {
    stubAuthClient({ throw: new Error(SENSITIVE_ERROR) });

    const response = await middleware(req('/admin/notices'));

    expect(response.status).toBe(503);
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-middleware-next')).toBeNull();
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe(UNAVAILABLE_MESSAGE);
    expect(body.error).not.toMatch(/ECONNREFUSED|abc123xyz|sb_publishable|eyJhbGci|fetch/i);
  });

  test('a thrown failure on /admin/login also fails closed (no 500, no redirect loop)', async () => {
    stubAuthClient({ throw: new Error(SENSITIVE_ERROR) });

    const response = await middleware(req('/admin/login'));

    expect(response.status).toBe(503);
    expect(response.headers.get('location')).toBeNull();
    expect(response.headers.get('x-middleware-next')).toBeNull();
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe(UNAVAILABLE_MESSAGE);
  });

  test('a failure after partial cookie writes does not persist the half-refreshed session', async () => {
    stubAuthClient(async (options) => {
      options.cookies.setAll([
        { name: 'sb-refresh-token', value: 'rotated', options: { path: '/' } },
      ]);
      throw new Error('boom after refresh');
    });

    const response = await middleware(req('/admin/dry-days'));

    expect(response.status).toBe(503);
    expect(response.cookies.get('sb-refresh-token')).toBeUndefined();
  });

  test('the thrown failure never turns into a successful authorization', async () => {
    stubAuthClient({ throw: new Error(SENSITIVE_ERROR) });

    const response = await middleware(req('/admin/dry-days'));

    expect(response.status).not.toBe(200);
    expect(response.headers.get('x-middleware-next')).toBeNull();
    expect(mockCreateServerClient).toHaveBeenCalled();
  });
});
