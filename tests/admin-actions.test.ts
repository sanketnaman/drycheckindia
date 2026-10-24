import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({ createServerClient: vi.fn() }));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import {
  deleteDryDayAction,
  deleteNoticeAction,
  saveDryDayAction,
  saveNoticeAction,
  setDryDayPublishedAction,
  setDryDayVerificationAction,
  setNoticePublishedAction,
} from '@/app/admin/actions';
import type { DryDayInput, NoticeInput } from '@/lib/admin/types';
import { createMockSupabase, type MockSupabase } from './helpers/mock-supabase';

const mockCreateServerClient = vi.mocked(createServerClient);
const mockRevalidatePath = vi.mocked(revalidatePath);

function useMock(mock: MockSupabase) {
  mockCreateServerClient.mockResolvedValue(mock as never);
}

/** Valid UUID primary keys (both admin tables use uuid ids). */
const ROW_ID = '11111111-1111-4111-8111-111111111111';
const NOTICE_ID = '22222222-2222-4222-8222-222222222222';

function unauthenticatedMock(): MockSupabase {
  return createMockSupabase({ user: null });
}

function nonAdminMock(): MockSupabase {
  return createMockSupabase({
    user: { id: 'user-plain', email: 'plain@example.com' },
    tables: { admin_users: { data: null, error: null } },
  });
}

function adminMock(tables: Record<string, { data?: unknown; error?: { message: string; code?: string } | null; count?: number | null }> = {}): MockSupabase {
  return createMockSupabase({
    user: { id: 'admin-1', email: 'admin@example.com' },
    tables: {
      admin_users: { data: { user_id: 'admin-1' }, error: null },
      ...tables,
    },
  });
}

const VALID_DRY_DAY: DryDayInput = {
  reason: 'Diwali',
  state: 'maharashtra',
  dry_date: '2026-10-20',
  type: 'state',
  verification_status: 'confirmed',
  source_url: 'https://example.gov.in/order',
  is_published: true,
};

const VALID_NOTICE: NoticeInput = {
  title: 'Holiday timings',
  body: 'Shops close early.',
  severity: 'warning',
  state: '',
  starts_at: '2026-01-26T00:00',
  ends_at: '2026-01-26T18:00',
  is_published: true,
};

beforeEach(() => {
  mockCreateServerClient.mockReset();
  mockRevalidatePath.mockClear();
});

describe('dry-day mutations — authorization', () => {
  test('unauthenticated caller cannot create a dry day', async () => {
    const mock = unauthenticatedMock();
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY);
    expect(result).toMatchObject({ ok: false, code: 'unauthenticated' });
    expect(result.error).toMatch(/session/i);
    // no data access at all
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('authenticated non-admin cannot create a dry day', async () => {
    const mock = nonAdminMock();
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY);
    expect(result).toMatchObject({ ok: false, code: 'forbidden' });
    expect(mock.fromCalls).toEqual([{ table: 'admin_users' }]);
  });

  test('unauthenticated caller cannot delete', async () => {
    const mock = unauthenticatedMock();
    useMock(mock);
    expect(await deleteDryDayAction(ROW_ID)).toMatchObject({ code: 'unauthenticated' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('non-admin cannot delete', async () => {
    const mock = nonAdminMock();
    useMock(mock);
    expect(await deleteDryDayAction(ROW_ID)).toMatchObject({ code: 'forbidden' });
  });

  test('non-admin cannot toggle publication', async () => {
    const mock = nonAdminMock();
    useMock(mock);
    expect(await setDryDayPublishedAction(ROW_ID, true)).toMatchObject({
      code: 'forbidden',
    });
  });

  test('non-admin cannot change verification status', async () => {
    const mock = nonAdminMock();
    useMock(mock);
    expect(await setDryDayVerificationAction(ROW_ID, 'confirmed')).toMatchObject({
      code: 'forbidden',
    });
  });

  test('non-admin cannot create a notice', async () => {
    const mock = nonAdminMock();
    useMock(mock);
    expect(await saveNoticeAction(VALID_NOTICE)).toMatchObject({ code: 'forbidden' });
    expect(mock.fromCalls).toEqual([{ table: 'admin_users' }]);
  });
});

describe('dry-day mutations — authorized admin', () => {
  test('validation failure returns field errors without touching dry_days', async () => {
    const mock = adminMock();
    useMock(mock);

    const result = await saveDryDayAction({ state: 'karnataka' });
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(result.errors?.reason).toBeTruthy();
    expect(result.errors?.dry_date).toBeTruthy();
    expect(mock.fromCalls).toEqual([{ table: 'admin_users' }]);
  });

  test('create succeeds, sets created_by, and revalidates routes', async () => {
    const mock = adminMock({ dry_days: { data: { id: 'new-1' }, error: null } });
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY);
    expect(result).toMatchObject({ ok: true, id: 'new-1' });

    const insertCall = mock.queryCalls.dry_days?.find((c) => c.method === 'insert');
    expect((insertCall?.args[0] as Record<string, unknown>).created_by).toBe('admin-1');
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin/dry-days');
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin');
  });

  test('edit succeeds via update path when id is provided', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY, ROW_ID);
    expect(result.ok).toBe(true);

    const calls = mock.queryCalls.dry_days ?? [];
    expect(calls.some((c) => c.method === 'update')).toBe(true);
    expect(calls.some((c) => c.method === 'insert')).toBe(false);
    expect(calls.some((c) => c.method === 'eq' && c.args[1] === ROW_ID)).toBe(true);
  });

  test('local restriction without locality is rejected by validation', async () => {
    const mock = adminMock();
    useMock(mock);

    const result = await saveDryDayAction({ ...VALID_DRY_DAY, type: 'local', locality: '' });
    expect(result.code).toBe('validation');
    expect(result.errors?.locality).toBeTruthy();
  });

  test('database error surfaces a friendly message', async () => {
    const mock = adminMock({
      dry_days: { data: null, error: { code: '42501', message: 'row-level security' } },
    });
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY);
    expect(result).toMatchObject({ ok: false, code: 'database' });
    expect(result.error).toMatch(/permission/i);
  });

  test('delete succeeds and revalidates', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await deleteDryDayAction(ROW_ID);
    expect(result.ok).toBe(true);
    const deleteCall = mock.queryCalls.dry_days?.find((c) => c.method === 'delete');
    expect(deleteCall).toBeTruthy();
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin/dry-days');
  });

  test('publish toggle patches only is_published', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayPublishedAction(ROW_ID, false);
    expect(result.ok).toBe(true);
    const updateCall = mock.queryCalls.dry_days?.find((c) => c.method === 'update');
    expect(updateCall?.args[0]).toEqual({ is_published: false });
  });

  test('confirm patches only verification_status and revalidates', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayVerificationAction(ROW_ID, 'confirmed');
    expect(result.ok).toBe(true);
    const updateCall = mock.queryCalls.dry_days?.find((c) => c.method === 'update');
    expect(updateCall?.args[0]).toEqual({ verification_status: 'confirmed' });
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin/dry-days');
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin');
  });

  test('unconfirm returns the record to pending (never invents reported)', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayVerificationAction(ROW_ID, 'pending');
    expect(result.ok).toBe(true);
    const updateCall = mock.queryCalls.dry_days?.find((c) => c.method === 'update');
    expect(updateCall?.args[0]).toEqual({ verification_status: 'pending' });
  });
});

describe('notice mutations', () => {
  test('unauthenticated caller cannot create a notice', async () => {
    const mock = unauthenticatedMock();
    useMock(mock);
    expect(await saveNoticeAction(VALID_NOTICE)).toMatchObject({ code: 'unauthenticated' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('admin create converts the window to UTC in the insert payload', async () => {
    const mock = adminMock({ public_notices: { data: { id: 'n-1' }, error: null } });
    useMock(mock);

    const result = await saveNoticeAction(VALID_NOTICE);
    expect(result).toMatchObject({ ok: true, id: 'n-1' });

    const insertCall = mock.queryCalls.public_notices?.find((c) => c.method === 'insert');
    const payload = insertCall?.args[0] as Record<string, unknown>;
    expect(payload.starts_at).toBe('2026-01-25T18:30:00.000Z');
    expect(payload.created_by).toBe('admin-1');
    expect(mockRevalidatePath).toHaveBeenCalledWith('/admin/notices');
  });

  test('invalid notice window returns validation errors', async () => {
    const mock = adminMock();
    useMock(mock);

    const result = await saveNoticeAction({
      ...VALID_NOTICE,
      starts_at: '2026-01-26T10:00',
      ends_at: '2026-01-26T09:00',
    });
    expect(result.code).toBe('validation');
    expect(result.errors?.ends_at).toBeTruthy();
  });

  test('I1 — a calendar-invalid notice timestamp is rejected and never persisted', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);

    const result = await saveNoticeAction({
      ...VALID_NOTICE,
      starts_at: '2026-02-30T10:00',
    });

    expect(result.code).toBe('validation');
    expect(result.errors?.starts_at).toBeTruthy();
    // No insert/upsert may happen for a rejected window.
    const calls = mock.queryCalls.public_notices ?? [];
    expect(calls.some((c) => c.method === 'insert')).toBe(false);
    expect(calls.some((c) => c.method === 'update')).toBe(false);
  });

  test('admin delete notice succeeds', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);
    expect((await deleteNoticeAction(NOTICE_ID)).ok).toBe(true);
  });

  test('admin publish notice succeeds', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);
    expect((await setNoticePublishedAction(NOTICE_ID, true)).ok).toBe(true);
    const updateCall = mock.queryCalls.public_notices?.find((c) => c.method === 'update');
    expect(updateCall?.args[0]).toEqual({ is_published: true });
  });

  test('non-admin cannot delete a notice', async () => {
    const mock = nonAdminMock();
    useMock(mock);
    expect(await deleteNoticeAction(NOTICE_ID)).toMatchObject({ code: 'forbidden' });
  });
});

describe('I3 — action arguments are validated before any database call', () => {
  test('a non-UUID dry-day id is rejected without any database access', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await deleteDryDayAction('row-1');
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(result.error).toMatch(/invalid record id/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-UUID notice id is rejected without any database access', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);

    const result = await deleteNoticeAction('n-1');
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-UUID id on the save (update) path is rejected without any database access', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await saveDryDayAction(VALID_DRY_DAY, 'row-9');
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-UUID id on the notice save (update) path is rejected without any database access', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);

    const result = await saveNoticeAction(VALID_NOTICE, 'n-1');
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-boolean publication flag is rejected without any database access', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayPublishedAction(ROW_ID, 'true' as unknown as boolean);
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(result.error).toMatch(/boolean/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-UUID id on the verification action is rejected without any database access', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayVerificationAction('row-5', 'confirmed');
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(result.error).toMatch(/invalid record id/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('an unknown verification status is rejected without any database access', async () => {
    const mock = adminMock({ dry_days: { data: { id: ROW_ID }, error: null } });
    useMock(mock);

    const result = await setDryDayVerificationAction(
      ROW_ID,
      'verified-for-real' as never
    );
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a non-boolean notice publication flag is rejected without any database access', async () => {
    const mock = adminMock({ public_notices: { data: { id: NOTICE_ID }, error: null } });
    useMock(mock);

    const result = await setNoticePublishedAction(NOTICE_ID, 1 as unknown as boolean);
    expect(result).toMatchObject({ ok: false, code: 'validation' });
    expect(result.error).toMatch(/boolean/i);
    expect(mock.fromCalls).toHaveLength(0);
  });
});
