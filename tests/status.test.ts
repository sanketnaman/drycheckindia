import { describe, test, expect } from 'vitest';
import {
  getAllEntries,
  getStatus,
  getStatusHeadline,
  getNationwideStatus,
  getDryStatesOn,
  getNextDryDays,
  getEntriesForStateOnDate,
  isStatewideApplicable,
  getTodayIST,
  type DryDayEntry,
} from '@/lib/dryday';

// Archived JSON dataset, used ONLY as a fixture here to exercise the pure
// status-computation logic. The public site itself never reads this dataset —
// its source of truth is Supabase via lib/public-drydays.ts.
const ARCHIVE = getAllEntries();

describe('getStatus — prohibition', () => {
  test('prohibition true returns dry', () => {
    expect(getStatus('bihar', '2026-10-21', ARCHIVE)).toBe('dry');
    expect(getStatus('nagaland', '2026-10-21', ARCHIVE)).toBe('dry');
  });
});

describe('getStatus — pending drafts are not publicly eligible', () => {
  test('pending-only state entry falls back to the default open status', () => {
    // west-bengal 2026-10-19 has a pending Maha Ashtami entry — pending rows
    // never reach the public site, so the date behaves like no public record.
    expect(getStatus('west-bengal', '2026-10-19', ARCHIVE)).toBe('not_dry');
  });

  test('pending national holiday expansion returns not_dry for non-prohibition states', () => {
    // Gandhi Jayanti 2026-10-02 is pending in nationalDryDays
    expect(getStatus('delhi', '2026-10-02', ARCHIVE)).toBe('not_dry');
  });
});

describe('getStatus — confirmed', () => {
  test('confirmed national holiday returns dry', () => {
    // Republic Day 2026-01-26 is confirmed in nationalDryDays and expanded
    expect(getStatus('delhi', '2026-01-26', ARCHIVE)).toBe('dry');
    expect(getStatus('maharashtra', '2026-01-26', ARCHIVE)).toBe('dry');
    expect(getStatus('jharkhand', '2026-01-26', ARCHIVE)).toBe('dry');
  });

  test('confirmed Independence Day returns dry', () => {
    expect(getStatus('delhi', '2026-08-15', ARCHIVE)).toBe('dry');
  });
});

describe('getStatus — reported is unconfirmed, never dry', () => {
  test('statewide reported entry returns maybe (unconfirmed but visible)', () => {
    const entries: DryDayEntry[] = [
      {
        state: 'karnataka',
        date: '2026-10-21',
        type: 'state',
        reason: 'Reported procession curbs',
        status: 'reported',
        sourceUrl: '',
      },
    ];
    expect(getStatus('karnataka', '2026-10-21', entries)).toBe('maybe');
  });

  test('reported does not override a confirmed record on the same date', () => {
    const entries: DryDayEntry[] = [
      {
        state: 'karnataka',
        date: '2026-10-21',
        type: 'state',
        reason: 'Confirmed order',
        status: 'confirmed',
        sourceUrl: '',
      },
      {
        state: 'karnataka',
        date: '2026-10-21',
        type: 'state',
        reason: 'Older news report',
        status: 'reported',
        sourceUrl: '',
      },
    ];
    expect(getStatus('karnataka', '2026-10-21', entries)).toBe('dry');
  });

  test('isStatewideApplicable is true for non-local types', () => {
    expect(
      isStatewideApplicable({
        state: 'x',
        date: '2026-01-01',
        type: 'state',
        reason: '',
        status: 'reported',
        sourceUrl: '',
      })
    ).toBe(true);
  });
});

describe('getStatus — local scope is never statewide', () => {
  test('local-only restriction does not apply statewide (default open)', () => {
    expect(getStatus('karnataka', '2026-10-21', ARCHIVE)).toBe('not_dry');
    expect(getEntriesForStateOnDate('karnataka', '2026-10-21', ARCHIVE)).toHaveLength(0);
  });

  test('isStatewideApplicable excludes local type', () => {
    expect(
      isStatewideApplicable({
        state: 'karnataka',
        date: '2026-10-21',
        type: 'local',
        reason: 'processions',
        status: 'reported',
        sourceUrl: '',
      })
    ).toBe(false);
    expect(
      isStatewideApplicable({
        state: 'delhi',
        date: '2026-01-26',
        type: 'national',
        reason: 'Republic Day',
        status: 'confirmed',
        sourceUrl: '',
      })
    ).toBe(true);
  });
});

describe('getStatus — no entry means the default open status', () => {
  test('no entries + unknown prohibition returns not_dry (default open)', () => {
    // Most states have prohibition: null; without a public record the answer
    // is the default "Nahi, theka band nahi hai."
    expect(getStatus('delhi', '2026-12-31', ARCHIVE)).toBe('not_dry');
    expect(getStatus('kerala', '2026-12-31', ARCHIVE)).toBe('not_dry');
  });

  test('empty dataset returns not_dry for every non-prohibition state', () => {
    // A successful fetch of zero rows is the default open answer — a FAILED
    // fetch never reaches getStatus (pages handle it via getPublicDataset).
    expect(getStatus('delhi', '2026-06-15', [])).toBe('not_dry');
  });

  test('empty dataset still returns dry for statutory prohibition states', () => {
    // Statutory prohibition is a standing legal fact, independent of entries.
    expect(getStatus('bihar', '2026-06-15', [])).toBe('dry');
    expect(getStatus('nagaland', '2026-06-15', [])).toBe('dry');
  });

  test('unknown state slug returns unavailable (defensive)', () => {
    expect(getStatus('nowhere', '2026-06-15', ARCHIVE)).toBe('unavailable');
  });
});

describe('getStatusHeadline — required public copy', () => {
  const TODAY = '2026-10-24';
  const OTHER = '2026-11-01';

  test('confirmed today uses the "aaj" wording', () => {
    expect(getStatusHeadline('dry', TODAY, TODAY)).toBe('Haan, aaj theka band hai.');
  });

  test('confirmed on another date never says "aaj"', () => {
    expect(getStatusHeadline('dry', OTHER, TODAY)).toBe('Haan, is din theka band hai.');
  });

  test('unconfirmed shows the "Pata nahi" copy', () => {
    expect(getStatusHeadline('maybe', TODAY, TODAY)).toBe('Pata nahi, confirm nahi hai.');
    expect(getStatusHeadline('maybe', OTHER, TODAY)).toBe('Pata nahi, confirm nahi hai.');
  });

  test('default open shows the "Nahi" copy', () => {
    expect(getStatusHeadline('not_dry', TODAY, TODAY)).toBe('Nahi, theka band nahi hai.');
    expect(getStatusHeadline('not_dry', OTHER, TODAY)).toBe('Nahi, theka band nahi hai.');
  });

  test('data unavailable has its own distinct copy', () => {
    expect(getStatusHeadline('unavailable', TODAY, TODAY)).toBe(
      'Abhi status check nahi ho pa raha hai.'
    );
  });
});

describe('getNationwideStatus', () => {
  test('confirmed national holiday yields Yes/dry', () => {
    const result = getNationwideStatus('2026-01-26', ARCHIVE);
    expect(result.status).toBe('dry');
    expect(result.label).toBe('Yes');
  });

  test('pending national holiday never yields Yes', () => {
    const result = getNationwideStatus('2026-10-02', ARCHIVE);
    expect(result.label).not.toBe('Yes');
    expect(result.status).not.toBe('dry');
    // Pending rows are not publicly eligible, so the aggregate is the
    // default open answer with zero dry/maybe states.
    expect(result.status).toBe('not_dry');
    expect(result.dryCount).toBe(0);
    expect(result.maybeCount).toBe(0);
  });

  test('mixed coverage reports dryCount and maybeCount separately', () => {
    const date = '2099-03-03';
    const entries: DryDayEntry[] = [
      {
        state: 'delhi',
        date,
        type: 'state',
        reason: 'Confirmed local holiday',
        status: 'confirmed',
        sourceUrl: '',
      },
      {
        state: 'goa',
        date,
        type: 'state',
        reason: 'Reported festival curbs',
        status: 'reported',
        sourceUrl: '',
      },
    ];
    const result = getNationwideStatus(date, entries);
    expect(result.status).toBe('maybe');
    expect(result.dryCount).toBe(1);
    expect(result.maybeCount).toBe(1);
  });

  test('reported-only coverage has dryCount 0', () => {
    const date = '2099-03-04';
    const entries: DryDayEntry[] = [
      {
        state: 'goa',
        date,
        type: 'state',
        reason: 'Reported festival curbs',
        status: 'reported',
        sourceUrl: '',
      },
    ];
    const result = getNationwideStatus(date, entries);
    expect(result.status).toBe('maybe');
    expect(result.dryCount).toBe(0);
    expect(result.maybeCount).toBe(1);
  });

  test('empty dataset yields the default open answer', () => {
    const result = getNationwideStatus('2026-06-15', []);
    expect(result.status).toBe('not_dry');
    expect(result.label).toBe('No');
  });
});

describe('getDryStatesOn', () => {
  test('local-only state does not appear as a dry/maybe statewide entry', () => {
    const items = getDryStatesOn('2026-10-21', ARCHIVE);
    const karnataka = items.find((i) => i.state.slug === 'karnataka');
    expect(karnataka).toBeUndefined();
  });

  test('pending-only state does not appear in the list', () => {
    // west-bengal 2026-10-19 has only a pending entry.
    const items = getDryStatesOn('2026-10-19', ARCHIVE);
    const westBengal = items.find((i) => i.state.slug === 'west-bengal');
    expect(westBengal).toBeUndefined();
  });

  test('prohibition states appear with isProhibition', () => {
    const items = getDryStatesOn('2026-10-21', ARCHIVE);
    const bihar = items.find((i) => i.state.slug === 'bihar');
    expect(bihar?.isProhibition).toBe(true);
    expect(bihar?.status).toBe('dry');
  });

  test('does not flood list with all null-prohibition states', () => {
    const items = getDryStatesOn('2026-12-31', ARCHIVE);
    // Only prohibition states (and any states with actual entries) should appear
    const nonProhibition = items.filter((i) => !i.isProhibition);
    expect(nonProhibition.length).toBeLessThan(36);
  });

  test('empty dataset lists only statutory prohibition states', () => {
    const items = getDryStatesOn('2026-06-15', []);
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.isProhibition === true)).toBe(true);
  });
});

describe('getNextDryDays consistency', () => {
  test('includes expanded national confirmed entries', () => {
    const days = getNextDryDays('delhi', '2026-01-26', 0, ARCHIVE);
    expect(days.some((e) => e.date === '2026-01-26' && e.status === 'confirmed')).toBe(true);
  });

  test('does not invent entries for dates without records', () => {
    const days = getNextDryDays('delhi', '2026-12-31', 0, ARCHIVE);
    expect(days).toHaveLength(0);
  });

  test('empty dataset always yields no upcoming days', () => {
    expect(getNextDryDays('delhi', '2026-06-15', 30, [])).toHaveLength(0);
  });
});

describe('date helpers', () => {
  test('getTodayIST returns YYYY-MM-DD', () => {
    expect(getTodayIST()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
