import { describe, test, expect } from 'vitest';
import {
  getAllEntries,
  getStatus,
  getNationwideStatus,
  getDryStatesOn,
  getNextDryDays,
  getEntriesForStateOnDate,
  isStatewideApplicable,
  getTodayIST,
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

describe('getStatus — pending-only is never verified dry', () => {
  test('pending-only state entry returns unavailable (not dry, not not_dry)', () => {
    // west-bengal 2026-10-19 has a pending Maha Ashtami entry
    expect(getStatus('west-bengal', '2026-10-19', ARCHIVE)).toBe('unavailable');
  });

  test('pending national holiday expansion returns unavailable for non-prohibition states', () => {
    // Gandhi Jayanti 2026-10-02 is pending in nationalDryDays
    expect(getStatus('delhi', '2026-10-02', ARCHIVE)).toBe('unavailable');
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

describe('getStatus — reported is never confirmed', () => {
  test('reported local entry does not produce statewide dry', () => {
    // karnataka 2026-10-21 has only a local reported entry
    const status = getStatus('karnataka', '2026-10-21', ARCHIVE);
    expect(status).not.toBe('dry');
    expect(status).toBe('unavailable');
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
  test('local-only restriction does not apply statewide', () => {
    expect(getStatus('karnataka', '2026-10-21', ARCHIVE)).toBe('unavailable');
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

describe('getStatus — unknown prohibition without entries is unverified', () => {
  test('prohibition null + no entries returns unavailable (not not_dry)', () => {
    // Most states have prohibition: null; absence of entries must not become "No"
    expect(getStatus('delhi', '2026-12-31', ARCHIVE)).toBe('unavailable');
    expect(getStatus('kerala', '2026-12-31', ARCHIVE)).toBe('unavailable');
  });
});

describe('getStatus — empty dataset is unverified for every non-prohibition state', () => {
  test('empty dataset never computes not_dry even for prohibition:false states', () => {
    // An entirely unpopulated dataset is not evidence that any date is open.
    expect(getStatus('delhi', '2026-06-15', [])).toBe('unavailable');
  });

  test('empty dataset still returns dry for statutory prohibition states', () => {
    // Statutory prohibition is a standing legal fact, independent of entries.
    expect(getStatus('bihar', '2026-06-15', [])).toBe('dry');
    expect(getStatus('nagaland', '2026-06-15', [])).toBe('dry');
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
  });

  test('label uses Status not verified for unavailable (not Data unavailable)', () => {
    const result = getNationwideStatus('2026-12-31', ARCHIVE);
    if (result.status === 'unavailable') {
      expect(result.label).toBe('Status not verified');
    }
    expect(result.label).not.toBe('Data unavailable');
  });

  test('empty dataset never yields Yes or No', () => {
    const result = getNationwideStatus('2026-06-15', []);
    expect(result.status).toBe('unavailable');
    expect(result.label).toBe('Status not verified');
  });
});

describe('getDryStatesOn', () => {
  test('local-only state does not appear as a dry/maybe statewide entry', () => {
    const items = getDryStatesOn('2026-10-21', ARCHIVE);
    const karnataka = items.find((i) => i.state.slug === 'karnataka');
    expect(karnataka).toBeUndefined();
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
