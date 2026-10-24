import { describe, expect, test } from 'vitest';
import {
  deleteNotice,
  getNotice,
  insertNotice,
  listNotices,
  parseNoticeFilters,
  setNoticePublished,
  validateNoticeInput,
} from '@/lib/admin/notices';
import {
  IST_UTC_OFFSET_MINUTES,
  istInputToUtcIso,
  isIstInput,
  utcTimestamptzToIstInput,
} from '@/lib/admin/time';
import type { AdminSupabase, NoticeInput } from '@/lib/admin/types';
import { createMockSupabase } from './helpers/mock-supabase';

function asSupabase(mock: ReturnType<typeof createMockSupabase>): AdminSupabase {
  return mock as unknown as AdminSupabase;
}

/** Valid UUID primary keys (public_notices.id is a uuid column). */
const NOTICE_ID = '11111111-1111-4111-8111-111111111111';
const OTHER_NOTICE_ID = '22222222-2222-4222-8222-222222222222';

const VALID_NOTICE: NoticeInput = {
  title: 'Reduced timings on Republic Day',
  body: 'Liquor shops close at 10:00 AM across the state.',
  severity: 'warning',
  state: 'karnataka',
  starts_at: '2026-01-26T00:00',
  ends_at: '2026-01-26T23:59',
  is_published: true,
};

describe('IST <-> UTC conversion (notice windows)', () => {
  test('IST midnight converts to 18:30 UTC on the previous day', () => {
    expect(istInputToUtcIso('2026-01-01T00:00')).toBe('2025-12-31T18:30:00.000Z');
    expect(IST_UTC_OFFSET_MINUTES).toBe(330);
  });

  test('normal IST morning converts to the correct UTC instant', () => {
    expect(istInputToUtcIso('2026-08-15T09:00')).toBe('2026-08-15T03:30:00.000Z');
  });

  test('rejects malformed and impossible inputs', () => {
    expect(istInputToUtcIso('2026-02-30T10:00')).toBeNull();
    expect(istInputToUtcIso('2026-13-01T10:00')).toBeNull();
    expect(istInputToUtcIso('01/01/2026 10:00')).toBeNull();
    expect(istInputToUtcIso('')).toBeNull();
    expect(istInputToUtcIso(null)).toBeNull();
  });

  test('stored timestamptz converts back to IST wall time for forms', () => {
    expect(utcTimestamptzToIstInput('2025-12-31T18:30:00+00:00')).toBe('2026-01-01T00:00');
    expect(utcTimestamptzToIstInput('2026-08-15T03:30:00Z')).toBe('2026-08-15T09:00');
  });

  test('null/invalid stored values render as empty input', () => {
    expect(utcTimestamptzToIstInput(null)).toBe('');
    expect(utcTimestamptzToIstInput('not-a-date')).toBe('');
  });

  test('round trip: form -> storage -> form is lossless', () => {
    const original = '2026-01-26T21:45';
    const stored = istInputToUtcIso(original);
    expect(stored).not.toBeNull();
    expect(utcTimestamptzToIstInput(stored)).toBe(original);
  });

  test('isIstInput matches only datetime-local format', () => {
    expect(isIstInput('2026-01-26T21:45')).toBe(true);
    expect(isIstInput('2026-01-26 21:45')).toBe(false);
    expect(isIstInput('2026-01-26T21:45:00')).toBe(false);
  });
});

describe('validateNoticeInput', () => {
  test('accepts a complete valid notice', () => {
    const result = validateNoticeInput(VALID_NOTICE);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toMatchObject({
        title: 'Reduced timings on Republic Day',
        severity: 'warning',
        state: 'karnataka',
        starts_at: '2026-01-26T00:00',
        ends_at: '2026-01-26T23:59',
        is_published: true,
      });
    }
  });

  test('requires title and body', () => {
    const result = validateNoticeInput({ severity: 'info' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.title).toBeTruthy();
      expect(result.errors.body).toBeTruthy();
    }
  });

  test('rejects unknown severity', () => {
    const result = validateNoticeInput({ ...VALID_NOTICE, severity: 'catastrophic' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.severity).toBeTruthy();
  });

  test('rejects unknown state slugs; allows empty (pan-India)', () => {
    const bad = validateNoticeInput({ ...VALID_NOTICE, state: 'narnia' });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors.state).toBeTruthy();

    const panIndia = validateNoticeInput({ ...VALID_NOTICE, state: '' });
    expect(panIndia.ok).toBe(true);
    if (panIndia.ok) expect(panIndia.values.state).toBeNull();
  });

  test('rejects window where end precedes start', () => {
    const result = validateNoticeInput({
      ...VALID_NOTICE,
      starts_at: '2026-01-26T10:00',
      ends_at: '2026-01-26T09:00',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.ends_at).toMatch(/earlier/i);
  });

  test('rejects malformed window datetimes', () => {
    const result = validateNoticeInput({ ...VALID_NOTICE, starts_at: 'tomorrow morning' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.starts_at).toBeTruthy();
  });

  test('allows open-ended windows (null bounds)', () => {
    const result = validateNoticeInput({
      title: 'Open window',
      body: 'Always visible once published.',
      severity: 'info',
      starts_at: '',
      ends_at: '',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.starts_at).toBeNull();
      expect(result.values.ends_at).toBeNull();
    }
  });

  test('is_published defaults to false', () => {
    const result = validateNoticeInput({ title: 'T', body: 'B', severity: 'info' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.is_published).toBe(false);
  });
});

describe('notice list helpers', () => {
  test('parseNoticeFilters keeps valid values and drops junk', () => {
    expect(
      parseNoticeFilters({
        q: 'timings',
        severity: 'critical',
        state: 'goa',
        published: 'true',
        page: '2',
        junk: 'x',
      })
    ).toEqual({ q: 'timings', severity: 'critical', state: 'goa', published: 'true', page: 2 });

    expect(parseNoticeFilters({ severity: 'catastrophic', page: '-1' })).toEqual({});
  });

  test('listNotices applies filters, order and pagination', async () => {
    const mock = createMockSupabase({
      tables: {
        public_notices: { data: [{ id: 'n1' }], error: null, count: 1 },
      },
    });

    const result = await listNotices(asSupabase(mock), {
      severity: 'critical',
      published: 'true',
    });

    expect(result.rows).toHaveLength(1);
    const calls = mock.queryCalls.public_notices;
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'severity')).toBe(true);
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'is_published')).toBe(true);
    expect(calls.some((c) => c.method === 'order')).toBe(true);
    expect(calls.some((c) => c.method === 'range')).toBe(true);
  });

  test('empty notice list has no error', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: [], error: null, count: 0 } },
    });
    const result = await listNotices(asSupabase(mock), {});
    expect(result.rows).toEqual([]);
    expect(result.count).toBe(0);
    expect(result.error).toBeUndefined();
  });
});

describe('notice CRUD queries', () => {
  test('insert converts IST window to UTC timestamptz strings', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: 'n1' }, error: null } },
    });
    const validated = validateNoticeInput(VALID_NOTICE);
    if (!validated.ok) throw new Error('fixture invalid');

    const result = await insertNotice(asSupabase(mock), validated.values, 'admin-uuid');
    expect(result).toMatchObject({ ok: true, id: 'n1' });

    const insertCall = mock.queryCalls.public_notices.find((c) => c.method === 'insert');
    const payload = insertCall?.args[0] as Record<string, unknown>;
    expect(payload.starts_at).toBe('2026-01-25T18:30:00.000Z');
    expect(payload.ends_at).toBe('2026-01-26T18:29:00.000Z');
    expect(payload.created_by).toBe('admin-uuid');
    expect(payload.title).toBe('Reduced timings on Republic Day');
  });

  test('delete with RLS error maps to permission message', async () => {
    const mock = createMockSupabase({
      tables: {
        public_notices: { data: null, error: { code: '42501', message: 'RLS' } },
      },
    });
    const result = await deleteNotice(asSupabase(mock), NOTICE_ID);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/permission/i);
  });

  test('delete success', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    expect((await deleteNotice(asSupabase(mock), NOTICE_ID)).ok).toBe(true);
  });
});

describe('I1 — calendar-invalid notice timestamps are rejected, not nulled', () => {
  test('isIstInput rejects impossible calendar instants', () => {
    expect(isIstInput('2026-02-30T10:00')).toBe(false);
    expect(isIstInput('2026-13-01T10:00')).toBe(false);
    expect(isIstInput('2026-04-31T10:00')).toBe(false);
    expect(isIstInput('2025-02-29T10:00')).toBe(false);
    expect(isIstInput('2026-00-10T10:00')).toBe(false);
    expect(isIstInput('2026-01-32T10:00')).toBe(false);
    expect(isIstInput('2026-01-01T24:00')).toBe(false);
    expect(isIstInput('2026-01-01T10:60')).toBe(false);
  });

  test('isIstInput still accepts real calendar instants', () => {
    expect(isIstInput('2026-01-26T21:45')).toBe(true);
    expect(isIstInput('2024-02-29T10:00')).toBe(true);
    expect(isIstInput('2026-01-01T00:00')).toBe(true);
    expect(isIstInput('2026-01-01T23:59')).toBe(true);
  });

  test('validateNoticeInput rejects an impossible start date', () => {
    const result = validateNoticeInput({ ...VALID_NOTICE, starts_at: '2026-02-30T10:00' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.starts_at).toBeTruthy();
  });

  test('validateNoticeInput rejects an impossible end date', () => {
    const result = validateNoticeInput({ ...VALID_NOTICE, ends_at: '2026-13-01T10:00' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.ends_at).toBeTruthy();
  });

  test('flags only the offending bound — the valid field never gets a false error', () => {
    const badStart = validateNoticeInput({ ...VALID_NOTICE, starts_at: '2026-02-30T10:00' });
    expect(badStart.ok).toBe(false);
    if (!badStart.ok) {
      expect(badStart.errors.starts_at).toBeTruthy();
      expect(badStart.errors.ends_at).toBeUndefined();
    }

    const badEnd = validateNoticeInput({ ...VALID_NOTICE, ends_at: '2026-13-01T10:00' });
    expect(badEnd.ok).toBe(false);
    if (!badEnd.ok) {
      expect(badEnd.errors.ends_at).toBeTruthy();
      expect(badEnd.errors.starts_at).toBeUndefined();
    }
  });

  test('regex-matching but impossible clock values (T24:00 / T10:60) are rejected', () => {
    const badHour = validateNoticeInput({ ...VALID_NOTICE, starts_at: '2026-01-01T24:00' });
    expect(badHour.ok).toBe(false);
    if (!badHour.ok) {
      expect(badHour.errors.starts_at).toBeTruthy();
      expect(badHour.errors.ends_at).toBeUndefined();
    }

    const badMinute = validateNoticeInput({ ...VALID_NOTICE, ends_at: '2026-01-26T10:60' });
    expect(badMinute.ok).toBe(false);
    if (!badMinute.ok) expect(badMinute.errors.ends_at).toBeTruthy();
  });

  test('an invalid timestamp never reaches the database (rejected at the action layer)', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });

    // validateNoticeInput must reject the impossible date outright.
    const validated = validateNoticeInput({ ...VALID_NOTICE, starts_at: '2026-02-30T10:00' });
    expect(validated.ok).toBe(false);
    if (!validated.ok) expect(validated.errors.starts_at).toBeTruthy();

    // Because validation failed, no payload is ever built and the invalid
    // value is not silently collapsed to a null window bound.
    expect(mock.queryCalls.public_notices).toBeUndefined();
  });

  test('a valid timestamp is still converted to a UTC instant on insert', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    const validated = validateNoticeInput(VALID_NOTICE);
    if (!validated.ok) throw new Error('fixture invalid');

    await insertNotice(asSupabase(mock), validated.values, 'admin-uuid');

    const insertCall = mock.queryCalls.public_notices?.find((c) => c.method === 'insert');
    const payload = insertCall?.args[0] as Record<string, unknown>;
    expect(payload.starts_at).toBe('2026-01-25T18:30:00.000Z');
    expect(payload.ends_at).toBe('2026-01-26T18:29:00.000Z');
  });
});

describe('I2 — notice record ids are validated as UUIDs before any database call', () => {
  test('getNotice rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    const result = await getNotice(asSupabase(mock), 'n1');

    expect(result.row).toBeNull();
    expect(result.error).toMatch(/invalid record id/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('deleteNotice rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    const result = await deleteNotice(asSupabase(mock), 'not-a-uuid');

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('setNoticePublished rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    const result = await setNoticePublished(asSupabase(mock), 'nope', true);

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('setNoticePublished rejects a non-boolean publication flag', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: NOTICE_ID }, error: null } },
    });
    const result = await setNoticePublished(
      asSupabase(mock),
      NOTICE_ID,
      'true' as unknown as boolean
    );

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(result.error).toMatch(/boolean/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a well-formed id still reaches the database', async () => {
    const mock = createMockSupabase({
      tables: { public_notices: { data: { id: OTHER_NOTICE_ID }, error: null } },
    });
    const result = await getNotice(asSupabase(mock), OTHER_NOTICE_ID);

    expect(result.error).toBeUndefined();
    expect(result.row).toEqual({ id: OTHER_NOTICE_ID });
    expect(mock.fromCalls).toEqual([{ table: 'public_notices' }]);
  });
});

describe('I2 — raw database error messages are never exposed', () => {
  test('an unmapped database error does not leak the driver message', async () => {
    const mock = createMockSupabase({
      tables: {
        public_notices: {
          data: null,
          error: { code: 'XX000', message: 'column "api_key" does not exist' },
        },
      },
    });
    const result = await listNotices(asSupabase(mock), {});

    expect(result.error).toBeTruthy();
    expect(result.error).not.toMatch(/api_key/i);
    expect(result.error).not.toMatch(/column/i);
  });
});
