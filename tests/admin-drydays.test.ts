import { describe, expect, test } from 'vitest';
import {
  buildDryDayQuery,
  countDryDays,
  deleteDryDay,
  getDryDay,
  insertDryDay,
  listDryDays,
  parseDryDayFilters,
  setDryDayPublished,
  updateDryDay,
  validateDryDayInput,
} from '@/lib/admin/drydays';
import type { AdminSupabase, DryDayInput } from '@/lib/admin/types';
import { createMockSupabase } from './helpers/mock-supabase';

function asSupabase(mock: ReturnType<typeof createMockSupabase>): AdminSupabase {
  return mock as unknown as AdminSupabase;
}

/** Valid UUID primary keys (dry_days.id is a uuid column). */
const ROW_ID = '11111111-1111-4111-8111-111111111111';
const OTHER_ROW_ID = '22222222-2222-4222-8222-222222222222';
const MISSING_ROW_ID = '33333333-3333-4333-8333-333333333333';

const VALID_INPUT: DryDayInput = {
  reason: 'Diwali — statewide prohibition',
  state: 'maharashtra',
  dry_date: '2026-10-20',
  type: 'state',
  verification_status: 'confirmed',
  source_url: 'https://example.gov.in/order/123',
  source_type: 'official',
  source_note: 'Gazette copy verified.',
  locality: '',
  time_start: '09:00',
  time_end: '22:00',
  is_published: true,
};

describe('validateDryDayInput', () => {
  test('accepts a complete valid payload and normalizes empty optionals to null', () => {
    const result = validateDryDayInput(VALID_INPUT);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values).toMatchObject({
        reason: 'Diwali — statewide prohibition',
        state: 'maharashtra',
        dry_date: '2026-10-20',
        type: 'state',
        verification_status: 'confirmed',
        source_type: 'official',
        locality: null,
        time_start: '09:00',
        time_end: '22:00',
        is_published: true,
      });
    }
  });

  test('trims free-text fields', () => {
    const result = validateDryDayInput({ ...VALID_INPUT, reason: '  Holi  ', state: ' goa ' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.values.reason).toBe('Holi');
      expect(result.values.state).toBe('goa');
    }
  });

  test('requires reason, state, dry_date, type and verification status', () => {
    const result = validateDryDayInput({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.reason).toBeTruthy();
      expect(result.errors.state).toBeTruthy();
      expect(result.errors.dry_date).toBeTruthy();
      expect(result.errors.type).toBeTruthy();
      expect(result.errors.verification_status).toBeTruthy();
    }
  });

  test('rejects an impossible calendar date', () => {
    const result = validateDryDayInput({ ...VALID_INPUT, dry_date: '2026-02-30' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.dry_date).toBeTruthy();
  });

  test('rejects unknown state slugs but allows "all"', () => {
    const unknown = validateDryDayInput({ ...VALID_INPUT, state: 'atlantis' });
    expect(unknown.ok).toBe(false);
    if (!unknown.ok) expect(unknown.errors.state).toBeTruthy();

    const all = validateDryDayInput({ ...VALID_INPUT, state: 'all' });
    expect(all.ok).toBe(true);
  });

  test('local restriction without locality is rejected', () => {
    const result = validateDryDayInput({ ...VALID_INPUT, type: 'local', locality: '  ' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.locality).toMatch(/never shown as statewide/i);
  });

  test('local restriction with locality is accepted', () => {
    const result = validateDryDayInput({
      ...VALID_INPUT,
      type: 'local',
      locality: 'City police limits',
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.locality).toBe('City police limits');
  });

  test('rejects invalid time format and overnight (wrapped) ranges', () => {
    const badFormat = validateDryDayInput({ ...VALID_INPUT, time_start: '25:00' });
    expect(badFormat.ok).toBe(false);
    if (!badFormat.ok) expect(badFormat.errors.time_start).toBeTruthy();

    const overnight = validateDryDayInput({
      ...VALID_INPUT,
      time_start: '22:00',
      time_end: '02:00',
    });
    expect(overnight.ok).toBe(false);
    if (!overnight.ok) expect(overnight.errors.time_end).toMatch(/overnight|split/i);
  });

  test('allows times with no overnight wrap and equal bounds', () => {
    expect(validateDryDayInput({ ...VALID_INPUT, time_start: '09:00', time_end: '09:00' }).ok).toBe(
      true
    );
  });

  test('source URL must be http(s) or empty — never invented or malformed', () => {
    const bad = validateDryDayInput({ ...VALID_INPUT, source_url: 'not a url' });
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.errors.source_url).toBeTruthy();

    const ftp = validateDryDayInput({ ...VALID_INPUT, source_url: 'ftp://example.com' });
    expect(ftp.ok).toBe(false);

    const empty = validateDryDayInput({ ...VALID_INPUT, source_url: '' });
    expect(empty.ok).toBe(true);
    if (empty.ok) expect(empty.values.source_url).toBeNull();
  });

  test('rejects unknown source types and verification statuses', () => {
    const badSource = validateDryDayInput({ ...VALID_INPUT, source_type: 'telepathy' });
    expect(badSource.ok).toBe(false);

    const badStatus = validateDryDayInput({ ...VALID_INPUT, verification_status: 'guaranteed' });
    expect(badStatus.ok).toBe(false);
    if (!badStatus.ok) expect(badStatus.errors.verification_status).toBeTruthy();
  });

  test('is_published defaults to false (draft) when omitted', () => {
    const result = validateDryDayInput({ ...VALID_INPUT, is_published: undefined });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.values.is_published).toBe(false);
  });
});

describe('parseDryDayFilters', () => {
  test('keeps valid filters', () => {
    const filters = parseDryDayFilters({
      q: 'diwali',
      state: 'karnataka',
      dry_date: '2026-10-20',
      verification_status: 'reported',
      published: 'false',
      page: '3',
    });
    expect(filters).toEqual({
      q: 'diwali',
      state: 'karnataka',
      dry_date: '2026-10-20',
      verification_status: 'reported',
      published: 'false',
      page: 3,
    });
  });

  test('drops invalid values instead of passing them to the database', () => {
    const filters = parseDryDayFilters({
      dry_date: 'yesterday',
      verification_status: 'guaranteed',
      published: 'maybe',
      page: '0',
      q: ['first', 'second'],
    });
    expect(filters).toEqual({ q: 'first' });
  });
});

describe('buildDryDayQuery', () => {
  test('empty filters -> bare path', () => {
    expect(buildDryDayQuery({})).toBe('/admin/dry-days');
  });

  test('includes filters and page', () => {
    const url = buildDryDayQuery(
      { state: 'goa', published: 'true' },
      { page: 2 }
    );
    expect(url).toBe('/admin/dry-days?state=goa&published=true&page=2');
  });

  test('page override of 1 omits the page param', () => {
    expect(buildDryDayQuery({ page: 4 }, { page: 1 })).toBe('/admin/dry-days');
  });
});

describe('listDryDays', () => {
  test('applies search, filters, ordering and pagination', async () => {
    const mock = createMockSupabase({
      tables: {
        dry_days: { data: [{ id: 'd1' }], error: null, count: 41 },
      },
    });

    const result = await listDryDays(asSupabase(mock), {
      q: 'diwali, (special)',
      state: 'goa',
      dry_date: '2026-10-20',
      verification_status: 'pending',
      published: 'false',
      page: 2,
    });

    expect(result.error).toBeUndefined();
    expect(result.rows).toHaveLength(1);
    expect(result.count).toBe(41);
    expect(result.page).toBe(2);

    const calls = mock.queryCalls.dry_days;
    const orCall = calls.find((c) => c.method === 'or');
    const orExpr = String(orCall?.args[0]);
    // user input must be sanitized (no raw commas/parens that would break the
    // PostgREST or() grammar); structural commas between fields are expected
    expect(orExpr).toContain('diwali   special%');
    expect(orExpr).not.toContain('diwali,');
    expect(orExpr).not.toContain('(special)');
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'state' && c.args[1] === 'goa')).toBe(true);
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'dry_date')).toBe(true);
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'verification_status')).toBe(true);
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'is_published' && c.args[1] === false)).toBe(true);
    expect(calls.some((c) => c.method === 'range')).toBe(true);
    const rangeCall = calls.find((c) => c.method === 'range');
    expect(rangeCall?.args).toEqual([20, 39]); // page 2, 20 per page
  });

  test('returns an empty list without error when there are no rows', async () => {
    const mock = createMockSupabase({ tables: { dry_days: { data: [], error: null, count: 0 } } });
    const result = await listDryDays(asSupabase(mock), {});
    expect(result.rows).toEqual([]);
    expect(result.count).toBe(0);
    expect(result.error).toBeUndefined();
  });

  test('maps permission (RLS) errors to a friendly message', async () => {
    const mock = createMockSupabase({
      tables: {
        dry_days: { data: null, error: { code: '42501', message: 'RLS policy violation' } },
      },
    });
    const result = await listDryDays(asSupabase(mock), {});
    expect(result.rows).toHaveLength(0);
    expect(result.error).toMatch(/permission/i);
  });
});

describe('dry-day CRUD queries', () => {
  test('insert sets created_by from the authenticated admin', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: 'new-id' }, error: null } },
    });
    const validated = validateDryDayInput(VALID_INPUT);
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;

    const result = await insertDryDay(asSupabase(mock), validated.values, 'admin-uuid');
    expect(result).toMatchObject({ ok: true, id: 'new-id' });

    const insertCall = mock.queryCalls.dry_days.find((c) => c.method === 'insert');
    const payload = insertCall?.args[0] as Record<string, unknown>;
    expect(payload.created_by).toBe('admin-uuid');
    expect(payload.state).toBe('maharashtra');
    expect(payload.time_start).toBe('09:00');
    expect(payload).not.toHaveProperty('id');
    expect(payload).not.toHaveProperty('created_at');
  });

  test('update targets the row id and never rewrites created_by', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const validated = validateDryDayInput(VALID_INPUT);
    if (!validated.ok) throw new Error('fixture invalid');

    const result = await updateDryDay(asSupabase(mock), ROW_ID, validated.values);
    expect(result.ok).toBe(true);

    const calls = mock.queryCalls.dry_days;
    const updateCall = calls.find((c) => c.method === 'update');
    expect((updateCall?.args[0] as Record<string, unknown>)).not.toHaveProperty('created_by');
    expect(calls.some((c) => c.method === 'eq' && c.args[0] === 'id' && c.args[1] === ROW_ID)).toBe(
      true
    );
  });

  test('update with no matching row -> not found error', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: null, error: null } },
    });
    const validated = validateDryDayInput(VALID_INPUT);
    if (!validated.ok) throw new Error('fixture invalid');

    const result = await updateDryDay(asSupabase(mock), MISSING_ROW_ID, validated.values);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/not found/i);
  });

  test('delete propagates RLS/permission errors', async () => {
    const mock = createMockSupabase({
      tables: {
        dry_days: { data: null, error: { code: '42501', message: 'row-level security' } },
      },
    });
    const result = await deleteDryDay(asSupabase(mock), ROW_ID);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('database');
    expect(result.error).toMatch(/permission/i);
  });

  test('delete success', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await deleteDryDay(asSupabase(mock), ROW_ID);
    expect(result.ok).toBe(true);
  });

  test('setDryDayPublished only patches is_published', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await setDryDayPublished(asSupabase(mock), ROW_ID, true);
    expect(result.ok).toBe(true);

    const updateCall = mock.queryCalls.dry_days.find((c) => c.method === 'update');
    expect(updateCall?.args[0]).toEqual({ is_published: true });
  });

  test('getDryDay returns null row for an unknown but well-formed id', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: null, error: null } },
    });
    const result = await getDryDay(asSupabase(mock), MISSING_ROW_ID);
    expect(result).toEqual({ row: null });
  });

  test('countDryDays uses a head count query', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: null, error: null, count: 12 } },
    });
    const count = await countDryDays(asSupabase(mock), { published: true });
    expect(count).toBe(12);
    const selectCall = mock.queryCalls.dry_days.find((c) => c.method === 'select');
    expect(selectCall?.args).toEqual(['id', { count: 'exact', head: true }]);
  });

  test('countDryDays returns null on error (dashboard shows —)', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: null, error: { message: 'boom' }, count: null } },
    });
    const count = await countDryDays(asSupabase(mock));
    expect(count).toBeNull();
  });
});

describe('I2 — record ids are validated as UUIDs before any database call', () => {
  test('getDryDay rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await getDryDay(asSupabase(mock), 'row-1');

    expect(result.row).toBeNull();
    expect(result.error).toMatch(/invalid record id/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('updateDryDay rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const validated = validateDryDayInput(VALID_INPUT);
    if (!validated.ok) throw new Error('fixture invalid');

    const result = await updateDryDay(asSupabase(mock), 'not-a-uuid', validated.values);

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(result.error).toMatch(/invalid record id/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('deleteDryDay rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await deleteDryDay(asSupabase(mock), '../../etc/passwd');

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('setDryDayPublished rejects a non-UUID id without querying', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await setDryDayPublished(asSupabase(mock), 'nope', true);

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('setDryDayPublished rejects a non-boolean publication flag', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: ROW_ID }, error: null } },
    });
    const result = await setDryDayPublished(
      asSupabase(mock),
      ROW_ID,
      'true' as unknown as boolean
    );

    expect(result.ok).toBe(false);
    expect(result.code).toBe('validation');
    expect(result.error).toMatch(/boolean/i);
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('a well-formed id still reaches the database', async () => {
    const mock = createMockSupabase({
      tables: { dry_days: { data: { id: OTHER_ROW_ID }, error: null } },
    });
    const result = await getDryDay(asSupabase(mock), OTHER_ROW_ID);

    expect(result.error).toBeUndefined();
    expect(result.row).toEqual({ id: OTHER_ROW_ID });
    expect(mock.fromCalls).toEqual([{ table: 'dry_days' }]);
  });
});

describe('I2 — dry_date filters must be real calendar dates', () => {
  test('drops an impossible calendar date', () => {
    expect(parseDryDayFilters({ dry_date: '2026-02-30' })).toEqual({});
    expect(parseDryDayFilters({ dry_date: '2026-13-01' })).toEqual({});
    expect(parseDryDayFilters({ dry_date: '2026-04-31' })).toEqual({});
    expect(parseDryDayFilters({ dry_date: '2025-02-29' })).toEqual({});
  });

  test('keeps a real calendar date, including a leap day', () => {
    expect(parseDryDayFilters({ dry_date: '2026-10-20' })).toEqual({ dry_date: '2026-10-20' });
    expect(parseDryDayFilters({ dry_date: '2024-02-29' })).toEqual({ dry_date: '2024-02-29' });
  });
});

describe('I2 — raw database error messages are never exposed', () => {
  test('an unmapped database error does not leak the driver message', async () => {
    const mock = createMockSupabase({
      tables: {
        dry_days: {
          data: null,
          error: { code: 'XX000', message: 'relation "secret_table" does not exist' },
        },
      },
    });
    const result = await listDryDays(asSupabase(mock), {});

    expect(result.error).toBeTruthy();
    expect(result.error).not.toMatch(/secret_table/i);
    expect(result.error).not.toMatch(/relation/i);
  });
});
