import { describe, expect, test } from 'vitest';
import { authorizeAdmin, signInWithEmail } from '@/lib/admin/auth';
import type { AdminSupabase } from '@/lib/admin/types';
import { createMockSupabase } from './helpers/mock-supabase';

function asSupabase(mock: ReturnType<typeof createMockSupabase>): AdminSupabase {
  return mock as unknown as AdminSupabase;
}

describe('authorizeAdmin', () => {
  test('no session -> unauthenticated', async () => {
    const mock = createMockSupabase({ user: null });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({ kind: 'unauthenticated' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('getUser error -> unauthenticated (fail closed)', async () => {
    const mock = createMockSupabase({
      getUserError: { message: 'JWT expired' },
    });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({ kind: 'unauthenticated' });
  });

  test('getUser throws -> unauthenticated (fail closed)', async () => {
    const mock = createMockSupabase({ throwGetUser: true });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({ kind: 'unauthenticated' });
  });

  test('authenticated user without admin_users row -> forbidden', async () => {
    const mock = createMockSupabase({
      user: { id: 'user-1', email: 'someone@example.com' },
      tables: { admin_users: { data: null, error: null } },
    });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({ kind: 'forbidden' });
    expect(mock.fromCalls).toEqual([{ table: 'admin_users' }]);
  });

  test('admin_users query error -> forbidden (fail closed)', async () => {
    const mock = createMockSupabase({
      user: { id: 'user-1' },
      tables: {
        admin_users: { data: null, error: { message: 'permission denied for table' } },
      },
    });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({ kind: 'forbidden' });
  });

  test('membership row present -> ok with user identity', async () => {
    const mock = createMockSupabase({
      user: { id: 'admin-1', email: 'admin@example.com' },
      tables: { admin_users: { data: { user_id: 'admin-1' }, error: null } },
    });
    expect(await authorizeAdmin(asSupabase(mock))).toEqual({
      kind: 'ok',
      user: { id: 'admin-1', email: 'admin@example.com' },
    });
    // membership must be checked against the caller's own user id
    const eqCall = mock.queryCalls.admin_users?.find((c) => c.method === 'eq');
    expect(eqCall?.args).toEqual(['user_id', 'admin-1']);
  });
});

describe('signInWithEmail', () => {
  test('empty credentials are rejected client-side', async () => {
    const mock = createMockSupabase();
    const result = await signInWithEmail(asSupabase(mock), '  ', '');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Enter your email and password.');
  });

  test('invalid credentials map to a generic message (no account enumeration)', async () => {
    const mock = createMockSupabase({
      signIn: { error: { message: 'Invalid login credentials' } },
    });
    const result = await signInWithEmail(
      asSupabase(mock),
      'admin@example.com',
      'wrong-password'
    );
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Invalid email or password.');
    expect(result.error).not.toMatch(/admin@example\.com|not found|no user/i);
  });

  test('rate limit maps to a friendly message', async () => {
    const mock = createMockSupabase({
      signIn: { error: { message: 'Rate limit exceeded' } },
    });
    const result = await signInWithEmail(asSupabase(mock), 'a@b.c', 'pw');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/Too many attempts/);
  });

  test('network failure maps to a generic message', async () => {
    const mock = createMockSupabase({ signIn: { throw: true } });
    const result = await signInWithEmail(asSupabase(mock), 'a@b.c', 'pw');
    expect(result).toEqual({ ok: false, error: 'Sign-in failed. Please try again.' });
  });

  test('success with session -> ok', async () => {
    const mock = createMockSupabase({
      signIn: { session: { access_token: 'token' } },
    });
    const result = await signInWithEmail(asSupabase(mock), ' a@b.c ', 'pw');
    expect(result).toEqual({ ok: true });
  });

  test('response without session -> failure', async () => {
    const mock = createMockSupabase({ signIn: { session: null } });
    const result = await signInWithEmail(asSupabase(mock), 'a@b.c', 'pw');
    expect(result.ok).toBe(false);
  });
});
