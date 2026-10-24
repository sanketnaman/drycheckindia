import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createClient } from '@supabase/supabase-js';

import { getAllEntries, type DryDayEntry } from '@/lib/dryday';
import {
  getPublicDataset,
  getPublicEntries,
  getPublishedNotices,
  isNoticeWindowActive,
} from '@/lib/public-drydays';

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

const ENV_URL = 'NEXT_PUBLIC_SUPABASE_URL';
const ENV_KEY = 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY';

const REAL_URL = 'https://abcdefghijklmnop.supabase.co';
const REAL_KEY = 'sb_publishable_abcdefghijklmnopqrstuvwxyz0123456789';

const originalEnv = { ...process.env };

type QueryResult = { data?: unknown[] | null; error?: { message: string } | null };

/** Thenable PostgREST-style builder: chains return itself, await pops results. */
function makeBuilder(results: QueryResult[]) {
  const queue = [...results];
  const qb: Record<string, unknown> = {};
  for (const method of ['select', 'eq', 'in', 'order', 'range', 'limit']) {
    qb[method] = vi.fn(() => qb);
  }
  qb.then = (
    onFulfilled: (value: QueryResult) => unknown,
    onRejected: (reason: unknown) => unknown
  ) => {
    const next = queue.length > 1 ? (queue.shift() as QueryResult) : (queue[0] as QueryResult);
    return Promise.resolve(next).then(onFulfilled, onRejected);
  };
  return qb as {
    select: ReturnType<typeof vi.fn>;
    eq: ReturnType<typeof vi.fn>;
    in: ReturnType<typeof vi.fn>;
    order: ReturnType<typeof vi.fn>;
    range: ReturnType<typeof vi.fn>;
    limit: ReturnType<typeof vi.fn>;
  };
}

function mockClientWith(builder: ReturnType<typeof makeBuilder>) {
  const fromMock = vi.fn(() => builder);
  vi.mocked(createClient).mockReturnValue({ from: fromMock } as unknown as ReturnType<
    typeof createClient
  >);
  return { fromMock, builder };
}

function enableSupabaseConfig() {
  process.env[ENV_URL] = REAL_URL;
  process.env[ENV_KEY] = REAL_KEY;
}

const dryDayRow = {
  state: 'maharashtra',
  dry_date: '2026-11-01',
  type: 'state',
  reason: 'Diwali restricted day',
  verification_status: 'confirmed',
  source_url: 'https://example.gov.in/order-123',
  source_note: 'Gazette 123',
  locality: null,
};

/** The archived JSON fixture is non-empty — proves error paths never fall back to it. */
const ARCHIVED_JSON = getAllEntries();

beforeEach(() => {
  process.env = { ...originalEnv };
  delete process.env[ENV_URL];
  delete process.env[ENV_KEY];
  vi.mocked(createClient).mockReset();
});

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
  delete (globalThis as { window?: unknown }).window;
});

describe('getPublicEntries — configuration and environment guards', () => {
  test('missing config returns an empty dataset and never creates a client', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(createClient).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[public-drydays]'),
      expect.stringContaining('missing')
    );
  });

  test('placeholder config returns an empty dataset and never creates a client', async () => {
    process.env[ENV_URL] = 'https://YOUR_PROJECT_REF.supabase.co';
    process.env[ENV_KEY] = 'YOUR_PUBLISHABLE_OR_ANON_KEY';
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(createClient).not.toHaveBeenCalled();
  });

  test('never fetches from a browser-like environment', async () => {
    enableSupabaseConfig();
    (globalThis as { window?: unknown }).window = {};

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(createClient).not.toHaveBeenCalled();
  });
});

describe('getPublicEntries — Supabase is the single source of truth', () => {
  test('empty database returns an empty dataset (no JSON fallback)', async () => {
    enableSupabaseConfig();
    mockClientWith(makeBuilder([{ data: [] }]));

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    // The archived JSON dataset is non-empty; a fallback would not be [].
    expect(ARCHIVED_JSON.length).toBeGreaterThan(0);
  });

  test('queries only published rows with the public key and maps fields', async () => {
    enableSupabaseConfig();
    const { builder } = mockClientWith(
      makeBuilder([
        {
          data: [
            dryDayRow,
            {
              ...dryDayRow,
              state: 'delhi',
              dry_date: '2026-11-02',
              type: 'local',
              verification_status: 'reported',
              source_url: null,
              source_note: null,
              locality: 'Connaught Place',
            },
          ],
        },
      ])
    );

    const result = await getPublicEntries();

    expect(vi.mocked(createClient)).toHaveBeenCalledWith(REAL_URL, REAL_KEY, expect.anything());
    expect(builder.eq).toHaveBeenCalledWith('is_published', true);
    expect(builder.in).toHaveBeenCalledWith('verification_status', ['confirmed', 'reported']);
    expect(builder.range).toHaveBeenCalledWith(0, 999);
    expect(result).toEqual([
      {
        state: 'maharashtra',
        date: '2026-11-01',
        type: 'state',
        reason: 'Diwali restricted day',
        status: 'confirmed',
        sourceUrl: 'https://example.gov.in/order-123',
        sourceNote: 'Gazette 123',
        locality: undefined,
      },
      {
        state: 'delhi',
        date: '2026-11-02',
        type: 'local',
        reason: 'Diwali restricted day',
        status: 'reported',
        sourceUrl: '',
        sourceNote: undefined,
        locality: 'Connaught Place',
      },
    ]);
  });

  test('a published pending row is dropped defensively even if the server returns it', async () => {
    enableSupabaseConfig();
    const { builder } = mockClientWith(
      makeBuilder([
        {
          data: [
            dryDayRow,
            { ...dryDayRow, state: 'gujarat', verification_status: 'pending' },
            { ...dryDayRow, state: 'goa', verification_status: 'unverified-someday' },
          ],
        },
      ])
    );

    const result = await getPublicEntries();

    // The query itself already filters; this asserts defence in depth too.
    expect(builder.in).toHaveBeenCalledWith('verification_status', ['confirmed', 'reported']);
    expect(result).toHaveLength(1);
    expect(result[0].state).toBe('maharashtra');
    expect(result.every((e) => e.status !== 'pending')).toBe(true);
  });

  test('unpublished rows never reach the public dataset (is_published filter)', async () => {
    enableSupabaseConfig();
    const { builder } = mockClientWith(makeBuilder([{ data: [] }]));

    await getPublicEntries();

    expect(builder.eq).toHaveBeenCalledWith('is_published', true);
  });

  test('pages past the PostgREST row cap and concatenates batches', async () => {
    enableSupabaseConfig();
    const fullPage = Array.from({ length: 1000 }, () => dryDayRow);
    const { builder, fromMock } = mockClientWith(
      makeBuilder([{ data: fullPage }, { data: [dryDayRow, dryDayRow] }])
    );

    const result = await getPublicEntries();

    expect(fromMock).toHaveBeenCalledTimes(2);
    expect(builder.range).toHaveBeenNthCalledWith(1, 0, 999);
    expect(builder.range).toHaveBeenNthCalledWith(2, 1000, 1999);
    expect(result).toHaveLength(1002);
  });
});

describe('getPublicEntries — errors degrade to empty, never to JSON', () => {
  test('PostgREST error returns [] (not the JSON dataset) and logs', async () => {
    enableSupabaseConfig();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockClientWith(makeBuilder([{ data: null, error: { message: 'permission denied' } }]));

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(result).not.toBe(ARCHIVED_JSON);
    expect(result.length).toBeLessThan(ARCHIVED_JSON.length);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[public-drydays]'),
      expect.stringContaining('permission denied')
    );
  });

  test('client construction throwing returns [] (not the JSON dataset) and logs', async () => {
    enableSupabaseConfig();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(createClient).mockImplementation(() => {
      throw new Error('network down');
    });

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(result).not.toBe(ARCHIVED_JSON);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[public-drydays]'),
      expect.stringContaining('network down')
    );
  });

  test('row-cap breach returns [] instead of a partial or JSON dataset', async () => {
    enableSupabaseConfig();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fullPage = Array.from({ length: 1000 }, () => dryDayRow);
    mockClientWith(makeBuilder([{ data: fullPage }]));

    const result = await getPublicEntries();

    expect(result).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[public-drydays]'),
      expect.stringContaining('exceeded')
    );
  });
});

describe('getPublicDataset — empty success is distinct from a failed fetch', () => {
  test('unconfigured returns ok:false with the unconfigured reason', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getPublicDataset();

    expect(result.ok).toBe(false);
    expect(result.entries).toEqual([]);
    if (!result.ok) expect(result.reason).toBe('unconfigured');
    expect(createClient).not.toHaveBeenCalled();
  });

  test('browser-like environment returns ok:false without creating a client', async () => {
    enableSupabaseConfig();
    (globalThis as { window?: unknown }).window = {};

    const result = await getPublicDataset();

    expect(result.ok).toBe(false);
    expect(result.entries).toEqual([]);
    if (!result.ok) expect(result.reason).toBe('browser');
    expect(createClient).not.toHaveBeenCalled();
  });

  test('PostgREST error returns ok:false — never an empty success', async () => {
    enableSupabaseConfig();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockClientWith(makeBuilder([{ data: null, error: { message: 'permission denied' } }]));

    const result = await getPublicDataset();

    // A failed query must never masquerade as "no entries published".
    expect(result.ok).toBe(false);
    expect(result.entries).toEqual([]);
    if (!result.ok) expect(result.reason).toBe('fetch_failed');
  });

  test('an empty database is ok:true with entries:[]', async () => {
    enableSupabaseConfig();
    mockClientWith(makeBuilder([{ data: [] }]));

    const result = await getPublicDataset();

    expect(result.ok).toBe(true);
    expect(result.entries).toEqual([]);
    // The archived JSON dataset is non-empty; a fallback would not be [].
    expect(ARCHIVED_JSON.length).toBeGreaterThan(0);
  });

  test('a successful fetch is ok:true with the mapped rows', async () => {
    enableSupabaseConfig();
    mockClientWith(makeBuilder([{ data: [dryDayRow] }]));

    const result = await getPublicDataset();

    expect(result.ok).toBe(true);
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0]).toMatchObject({
      state: 'maharashtra',
      date: '2026-11-01',
      status: 'confirmed',
    });
  });

  test('getPublicEntries is exactly the entries of getPublicDataset', async () => {
    enableSupabaseConfig();
    mockClientWith(makeBuilder([{ data: [dryDayRow] }]));

    const dataset = await getPublicDataset();
    const rows = await getPublicEntries();

    expect(rows).toEqual(dataset.entries);
  });
});

describe('isNoticeWindowActive', () => {
  const now = Date.parse('2026-10-22T12:00:00.000Z');

  test('open-ended windows are always active', () => {
    expect(isNoticeWindowActive({ startsAt: null, endsAt: null }, now)).toBe(true);
  });

  test('inside a bounded window (inclusive edges)', () => {
    expect(
      isNoticeWindowActive(
        { startsAt: '2026-10-22T11:00:00.000Z', endsAt: '2026-10-22T13:00:00.000Z' },
        now
      )
    ).toBe(true);
    expect(
      isNoticeWindowActive(
        { startsAt: '2026-10-22T12:00:00.000Z', endsAt: '2026-10-22T12:00:00.000Z' },
        now
      )
    ).toBe(true);
  });

  test('hides notices that have not started or already ended', () => {
    expect(isNoticeWindowActive({ startsAt: '2026-10-22T13:00:00.000Z', endsAt: null }, now)).toBe(
      false
    );
    expect(isNoticeWindowActive({ startsAt: null, endsAt: '2026-10-22T11:00:00.000Z' }, now)).toBe(
      false
    );
  });

  test('hides notices with unparseable timestamps (conservative)', () => {
    expect(isNoticeWindowActive({ startsAt: 'not-a-date', endsAt: null }, now)).toBe(false);
    expect(isNoticeWindowActive({ startsAt: null, endsAt: 'not-a-date' }, now)).toBe(false);
  });
});

describe('getPublishedNotices', () => {
  test('unconfigured returns no notices and never creates a client', async () => {
    const result = await getPublishedNotices();
    expect(result).toEqual([]);
    expect(createClient).not.toHaveBeenCalled();
  });

  test('returns only published, in-window notices mapped to the public shape', async () => {
    enableSupabaseConfig();
    const hour = 60 * 60 * 1000;
    const iso = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();
    const { builder } = mockClientWith(
      makeBuilder([
        {
          data: [
            { id: 'n1', title: 'Global', body: 'Always on', severity: 'info', state: null, starts_at: null, ends_at: null },
            { id: 'n2', title: 'Active window', body: 'Running', severity: 'warning', state: null, starts_at: iso(-hour), ends_at: iso(hour) },
            { id: 'n3', title: 'Future', body: 'Later', severity: 'info', state: null, starts_at: iso(hour), ends_at: null },
            { id: 'n4', title: 'Expired', body: 'Past', severity: 'info', state: null, starts_at: null, ends_at: iso(-hour) },
            { id: 'n5', title: 'Broken clock', body: 'Bad ts', severity: 'info', state: null, starts_at: 'garbage', ends_at: null },
            { id: 'n6', title: 'Delhi only', body: 'State scoped', severity: 'critical', state: 'delhi', starts_at: null, ends_at: null },
          ],
        },
      ])
    );

    const result = await getPublishedNotices();

    expect(builder.eq).toHaveBeenCalledWith('is_published', true);
    expect(builder.limit).toHaveBeenCalledWith(100);
    expect(result.map((n) => n.id)).toEqual(['n1', 'n2', 'n6']);
    expect(result[2]).toEqual({
      id: 'n6',
      title: 'Delhi only',
      body: 'State scoped',
      severity: 'critical',
      state: 'delhi',
      startsAt: null,
      endsAt: null,
    });
  });

  test('shows no notices when the fetch fails', async () => {
    enableSupabaseConfig();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockClientWith(makeBuilder([{ data: null, error: { message: 'rls denied' } }]));

    const result = await getPublishedNotices();

    expect(result).toEqual([]);
  });

  test('never fetches from a browser-like environment', async () => {
    enableSupabaseConfig();
    (globalThis as { window?: unknown }).window = {};

    const result = await getPublishedNotices();

    expect(result).toEqual([]);
    expect(createClient).not.toHaveBeenCalled();
  });
});

describe('status helpers consume the caller-supplied dataset only', () => {
  const futureDate = '2099-05-05';
  const customEntries: DryDayEntry[] = [
    {
      state: 'all',
      date: futureDate,
      type: 'national',
      reason: 'Synthetic national dry day',
      status: 'confirmed',
      sourceUrl: '',
    },
    {
      state: 'delhi',
      date: futureDate,
      type: 'local',
      reason: 'Synthetic local restriction',
      status: 'confirmed',
      sourceUrl: '',
      locality: 'Test area',
    },
  ];

  test('an empty caller dataset never mixes in archived JSON entries', async () => {
    enableSupabaseConfig();
    // Supabase returns no rows; the dataset handed to pages is exactly [].
    mockClientWith(makeBuilder([{ data: [] }]));
    const result = await getPublicEntries();
    expect(result).toEqual([]);
    // Sanity: the archived fixture really would have leaked dates.
    expect(ARCHIVED_JSON.some((e) => e.date !== futureDate)).toBe(true);
  });
});
