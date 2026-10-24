/**
 * Domain helpers for dry-day status computation.
 *
 * TWO SEPARATE CONCERNS LIVE IN THIS MODULE:
 *
 * 1. STATUTORY REFERENCE DATA (used at runtime by the public site):
 *    the 36-state list with `prohibition` flags, region names and `lastVerified`
 *    metadata from data/dry-days.json. This is intentionally a separate,
 *    explicitly documented source: total statutory prohibition (e.g. Bihar,
 *    Gujarat) is a standing legal fact, NOT a manually entered date-specific
 *    record, and it is rendered as such (always dry, every date).
 *
 * 2. ARCHIVED DATE-SPECIFIC ENTRIES (NOT used by any app route):
 *    data/dry-days.json `entries` + `nationalDryDays` and the datadry.json
 *    import are expanded into `expandedEntries` and exposed ONLY through
 *    getAllEntries() for tests and offline tooling. The public site's
 *    source of truth for managed dry-day entries is Supabase via
 *    lib/public-drydays.ts — every status helper takes the dataset as a
 *    REQUIRED parameter so no call site can silently fall back to JSON.
 */
import dryDayRaw from '@/data/dry-days.json';
import datadryRaw from '@/data/datadry.json';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drycheck.in';

export interface StateInfo {
  slug: string;
  name: string;
  region: string;
  prohibition?: boolean;
  prohibitionNote?: string;
  note?: string;
  lastVerified: string;
  nearby?: string[];
}

export type DryDayType = 'national' | 'festival' | 'election' | 'state' | 'local';
export type DryDayStatus = 'confirmed' | 'pending' | 'reported';

export interface DryDayEntry {
  state: string; // state slug or 'all'
  date: string; // YYYY-MM-DD
  type: DryDayType;
  reason: string;
  status: DryDayStatus;
  sourceUrl: string;
  sourceNote?: string;
  /** Locality scope for type='local' records (from dry_days.locality). */
  locality?: string;
}

export interface DryDaysData {
  states: StateInfo[];
  entries: DryDayEntry[];
  nationalDryDays?: Array<{
    date: string;
    type: string;
    reason: string;
    status: string;
    sourceUrl: string;
    sourceNote?: string;
  }>;
}

const data = dryDayRaw as DryDaysData;

// Expand nationalDryDays to all non-prohibition states for each date
const expandedEntries: DryDayEntry[] = [...data.entries];

if (data.nationalDryDays) {
  for (const national of data.nationalDryDays) {
    for (const state of data.states) {
      // Skip prohibition states (already dry all year)
      if (state.prohibition === true) continue;

      // Skip if state already has an entry for this date
      const existing = data.entries.find(
        (e) => (e.state === state.slug || e.state === 'all') && e.date === national.date
      );
      if (existing) continue;

      expandedEntries.push({
        state: state.slug,
        date: national.date,
        type: national.type as DryDayType,
        reason: national.reason,
        status: national.status as DryDayStatus,
        sourceUrl: national.sourceUrl,
        sourceNote: national.sourceNote,
      });
    }
  }
}

// Import datadry.json dataset (regional/national dry days without official URLs)
const datadryData = datadryRaw as {
  country: string;
  year: number;
  description: string;
  dry_days: Array<{
    date: string;
    occasion: string;
    scope: string;
  }>;
  prohibited_states: string[];
};

// Map regional scopes to state slugs (only where scope explicitly names states)
const REGIONAL_SCOPE_MAP: Record<string, string[]> = {
  'MH': ['maharashtra'],
  'GJ': ['gujarat'],
  'UP': ['uttar-pradesh'],
  'KA': ['karnataka'],
  'RJ': ['rajasthan'],
  'DL': ['delhi'],
  'MP': ['madhya-pradesh'],
  'KL': ['kerala'],
  'TN': ['tamil-nadu'],
  'GA': ['goa'],
  'AS': ['assam'],
};

// Process datadry dry_days: only import scopes that explicitly name states.
// Scopes containing "e.g.", "varies", or "lunar" are ambiguous examples and
// must NOT be elevated to state-level claims (would fabricate entries).
for (const dd of datadryData.dry_days) {
  const scope = dd.scope || '';
  const scopeLower = scope.toLowerCase();
  const isNational = scopeLower.includes('nationwide');
  const isAmbiguous =
    scopeLower.includes('e.g.') ||
    scopeLower.includes('varies') ||
    scopeLower.includes('lunar');

  if (isNational || isAmbiguous) {
    continue;
  }

  const isRegional = scopeLower.includes('regional');
  if (!isRegional) {
    continue;
  }

  const codes = scope.match(/([A-Z]{2})/g) || [];
  const matchedStates = new Set<string>();
  for (const code of codes) {
    const mapped = REGIONAL_SCOPE_MAP[code];
    if (mapped) {
      for (const s of mapped) matchedStates.add(s);
    }
  }
  if (matchedStates.size === 0) continue;

  for (const slug of matchedStates) {
    const stateInfo = data.states.find((s) => s.slug === slug);
    if (stateInfo?.prohibition === true) continue;
    const existing = expandedEntries.find(
      (e) => e.state === slug && e.date === dd.date
    );
    if (existing) continue;
    expandedEntries.push({
      state: slug,
      date: dd.date,
      type: 'state' as DryDayType,
      reason: dd.occasion,
      status: 'pending' as DryDayStatus,
      sourceUrl: '',
      sourceNote: `Imported from datadry.json (scope: ${scope}). No official source URL verified.`,
    });
  }
}

/**
 * Local restrictions (police-limits, procession routes, etc.) are never
 * treated as statewide unless locality metadata explicitly proves otherwise.
 */
export function isStatewideApplicable(entry: DryDayEntry): boolean {
  return entry.type !== 'local';
}

/**
 * Applicable statewide entries for a state (or 'all') on a date.
 * The dataset is always supplied by the caller (public routes pass the
 * Supabase-derived list; tests pass fixtures).
 */
function getStatewideEntriesOn(
  stateSlug: string,
  dateIST: string,
  entries: DryDayEntry[]
): DryDayEntry[] {
  return entries.filter(
    (e) =>
      (e.state === stateSlug || e.state === 'all') &&
      e.date === dateIST &&
      isStatewideApplicable(e)
  );
}

const MONTH_NAMES_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAY_NAMES_LONG = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const WEEKDAY_NAMES_SHORT = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const MONTH_NAMES = MONTH_NAMES_LONG.map((m) => m.toLowerCase());

/**
 * Returns current date in Asia/Kolkata (IST) as 'YYYY-MM-DD'.
 * Uses pure UTC millisecond offset (UTC+5:30) to guarantee 100% deterministic output
 * identical on both server and client without ICU or locale variations.
 */
export function getTodayIST(): string {
  const now = new Date();
  const istOffsetMs = (5 * 60 + 30) * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffsetMs);
  const y = istDate.getUTCFullYear();
  const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const d = String(istDate.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Adds offset days to an IST YYYY-MM-DD string
 */
export function getDateFromOffsetIST(offsetDays: number, baseDateStr?: string): string {
  const base = baseDateStr || getTodayIST();
  const parts = base.split('-').map(Number);
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  const date = new Date(Date.UTC(y, m - 1, d + offsetDays));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowIST(): string {
  return getDateFromOffsetIST(1);
}

export function getAllStates(): StateInfo[] {
  return [...data.states].sort((a, b) => a.name.localeCompare(b.name));
}

export function getStateBySlug(slug: string): StateInfo | undefined {
  return data.states.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Archived JSON dataset — TEST FIXTURES AND OFFLINE TOOLING ONLY.
 * Never called by app routes; the public source of truth is Supabase
 * via lib/public-drydays.ts.
 */
export function getAllEntries(): DryDayEntry[] {
  return expandedEntries;
}

/**
 * Converts YYYY-MM-DD to a human-readable slug like '2-october-2026'
 */
export function dateToSlug(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const monthName = MONTH_NAMES[monthIdx] || 'unknown';
  return `${day}-${monthName}-${year}`;
}

/**
 * Converts slug like '2-october-2026' or '2026-10-02' back to 'YYYY-MM-DD'
 */
export function slugToDate(slug: string): string | null {
  if (!slug) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(slug)) {
    return slug;
  }
  const parts = slug.toLowerCase().split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthName = parts[1];
    const year = parseInt(parts[2], 10);
    const monthIdx = MONTH_NAMES.indexOf(monthName);
    if (!isNaN(day) && monthIdx !== -1 && !isNaN(year)) {
      const padM = String(monthIdx + 1).padStart(2, '0');
      const padD = String(day).padStart(2, '0');
      return `${year}-${padM}-${padD}`;
    }
  }
  return null;
}

/**
 * Formats YYYY-MM-DD to a friendly string, e.g. "20 October, Tuesday" or "Tue, 20 October 2026".
 * Uses fixed ASCII lookups to guarantee 100% deterministic SSR/client hydration match.
 */
export function formatDateDisplay(
  dateStr: string,
  options?: { showDayOfWeek?: boolean; fullMonth?: boolean; shortFormat?: boolean }
): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3) return dateStr;
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];

  const dt = new Date(Date.UTC(y, m - 1, d));
  const dayOfWeekIdx = dt.getUTCDay();

  if (options?.shortFormat) {
    // "20 October, Tuesday"
    const month = MONTH_NAMES_LONG[m - 1] || '';
    const weekday = WEEKDAY_NAMES_LONG[dayOfWeekIdx] || '';
    return `${d} ${month}, ${weekday}`;
  }

  const showDayOfWeek = options?.showDayOfWeek !== false;
  const fullMonth = options?.fullMonth ?? true;

  const monthStr = fullMonth ? (MONTH_NAMES_LONG[m - 1] || '') : (MONTH_NAMES_SHORT[m - 1] || '');
  const dayOfWeekStr = showDayOfWeek ? `${WEEKDAY_NAMES_SHORT[dayOfWeekIdx]}, ` : '';

  return `${dayOfWeekStr}${d} ${monthStr} ${y}`;
}

/**
 * Returns dry status for a specific state on a specific date:
 * 'dry' | 'not_dry' | 'maybe' | 'unavailable'
 *
 * - confirmed statewide entry → dry
 * - reported (news) entry → maybe (never confirmed)
 * - pending-only entry → unverified (unavailable)
 * - no applicable entry + prohibition false → not_dry
 * - no applicable entry + prohibition unknown (null) → unavailable
 * - EMPTY dataset (no published entries at all) → unavailable for every
 *   non-prohibition state: absence of the whole dataset is not evidence of
 *   "not dry" for any date
 * - local-only entries never produce a statewide dry/maybe result
 */
export function getStatus(
  stateSlug: string,
  dateIST: string,
  entries: DryDayEntry[]
): 'dry' | 'not_dry' | 'maybe' | 'unavailable' {
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return 'unavailable';
  }
  if (state.prohibition === true) {
    return 'dry';
  }
  // An entirely unpopulated dataset must never read as "not dry".
  if (entries.length === 0) {
    return 'unavailable';
  }

  const stateEntries = getStatewideEntriesOn(stateSlug, dateIST, entries);

  if (stateEntries.length > 0) {
    if (stateEntries.some((e) => e.status === 'confirmed')) {
      return 'dry';
    }
    if (stateEntries.some((e) => e.status === 'reported')) {
      return 'maybe';
    }
    // pending-only: must not be presented as verified
    return 'unavailable';
  }

  // No applicable statewide entries for this date.
  if (state.prohibition === false) {
    return 'not_dry';
  }
  // prohibition unknown (null): absence of entries is not proof of "not dry"
  return 'unavailable';
}

/**
 * Get active statewide entries for a specific state on a date
 * (excludes local-only restrictions from statewide answers)
 */
export function getEntriesForStateOnDate(
  stateSlug: string,
  dateIST: string,
  entries: DryDayEntry[]
): DryDayEntry[] {
  return getStatewideEntriesOn(stateSlug, dateIST, entries);
}

/**
 * Get the nationwide answer for today/tomorrow
 */
export function getNationwideStatus(
  dateIST: string,
  entries: DryDayEntry[]
): {
  status: 'dry' | 'not_dry' | 'maybe' | 'unavailable';
  label: 'Yes' | 'No' | 'Maybe' | 'Status not verified';
  dryCount: number;
  totalStates: number;
} {
  const source = entries;
  const nonProhibitionStates = data.states.filter((s) => s.prohibition !== true);
  const dryStates = nonProhibitionStates.filter((s) => getStatus(s.slug, dateIST, source) === 'dry');
  const maybeStates = nonProhibitionStates.filter((s) => getStatus(s.slug, dateIST, source) === 'maybe');
  const unavailableStates = nonProhibitionStates.filter((s) => getStatus(s.slug, dateIST, source) === 'unavailable');

  const nationalHoliday = source.find(
    (e) => e.state === 'all' && e.date === dateIST && e.status === 'confirmed' && isStatewideApplicable(e)
  );

  if (nationalHoliday || (nonProhibitionStates.length > 0 && dryStates.length === nonProhibitionStates.length)) {
    return {
      status: 'dry',
      label: 'Yes',
      dryCount: data.states.length,
      totalStates: data.states.length,
    };
  }

  if (dryStates.length > 0 || maybeStates.length > 0) {
    return {
      status: 'maybe',
      label: 'Maybe',
      dryCount: dryStates.length,
      totalStates: data.states.length,
    };
  }

  if (unavailableStates.length > 0) {
    return {
      status: 'unavailable',
      label: 'Status not verified',
      dryCount: 0,
      totalStates: data.states.length,
    };
  }

  return {
    status: 'not_dry',
    label: 'No',
    dryCount: 0,
    totalStates: data.states.length,
  };
}

/**
 * Returns states with an applicable statewide dry-day record (or prohibition)
 * on dateIST. Local-only restrictions do not appear as statewide dry days.
 */
export function getDryStatesOn(
  dateIST: string,
  entries: DryDayEntry[]
): {
  state: StateInfo;
  entry?: DryDayEntry;
  status: 'dry' | 'maybe' | 'unavailable';
  isProhibition?: boolean;
}[] {
  const result: {
    state: StateInfo;
    entry?: DryDayEntry;
    status: 'dry' | 'maybe' | 'unavailable';
    isProhibition?: boolean;
  }[] = [];

  for (const state of data.states) {
    if (state.prohibition === true) {
      result.push({
        state,
        status: 'dry',
        isProhibition: true,
      });
      continue;
    }

    const stateEntries = getStatewideEntriesOn(state.slug, dateIST, entries);

    if (stateEntries.length > 0) {
      const confirmed = stateEntries.find((e) => e.status === 'confirmed');
      const reported = stateEntries.find((e) => e.status === 'reported');
      const entry = confirmed || reported || stateEntries[0];
      const hasPendingOnly = stateEntries.every((e) => e.status === 'pending');
      result.push({
        state,
        entry,
        status: confirmed ? 'dry' : reported ? 'maybe' : hasPendingOnly ? 'unavailable' : 'maybe',
        isProhibition: false,
      });
    }
    // States with no applicable statewide record are omitted (not listed as open or dry)
  }

  return result;
}

/**
 * Get next dry days for a state or nationwide ('all') within a given window
 * from the caller-supplied dataset.
 * Local entries are included for display but never affect getStatus.
 */
export function getNextDryDays(
  stateSlug: string,
  fromDateIST: string,
  days: number,
  entries: DryDayEntry[]
): DryDayEntry[] {
  const endDate = getDateFromOffsetIST(days, fromDateIST);
  const source = entries;

  const matched = source.filter((e) => {
    const isStateMatch = stateSlug === 'all' || e.state === stateSlug || e.state === 'all';
    return isStateMatch && e.date >= fromDateIST && e.date <= endDate;
  });

  return matched.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Group upcoming dry days across India for next N days by date
 */
export function getUpcomingDryDaysGrouped(
  fromDateIST: string,
  days: number,
  entries: DryDayEntry[]
): {
  date: string;
  slug: string;
  displayDate: string;
  entries: DryDayEntry[];
  statesCount: number;
  isNational: boolean;
}[] {
  const groupedSource = getNextDryDays('all', fromDateIST, days, entries);
  const map = new Map<string, DryDayEntry[]>();

  for (const entry of groupedSource) {
    const existing = map.get(entry.date) || [];
    existing.push(entry);
    map.set(entry.date, existing);
  }

  const result: {
    date: string;
    slug: string;
    displayDate: string;
    entries: DryDayEntry[];
    statesCount: number;
    isNational: boolean;
  }[] = [];

  const sortedDates = Array.from(map.keys()).sort();
  for (const date of sortedDates) {
    const dateEntries = map.get(date)!;
    const isNational = dateEntries.some((e) => e.state === 'all' || e.type === 'national');
    const stateCount = isNational
      ? data.states.length
      : new Set(dateEntries.map((e) => e.state)).size;

    result.push({
      date,
      slug: dateToSlug(date),
      displayDate: formatDateDisplay(date, { showDayOfWeek: true }),
      entries: dateEntries,
      statesCount: stateCount,
      isNational,
    });
  }

  return result;
}

// 8+ Fresh witty variants for "(And so is tomorrow)" - all under 6 words, Hinglish flavor
const AND_SO_IS_TOMORROW_VARIANTS = [
  "(Kal bhi sookha: chai piyo)",
  "(And tomorrow too: stay hydrated)",
  "(Kal bhi band: fridge check)",
  "(Tomorrow too: liver says shukriya)",
  "(Kal bhi dry: no tension)",
  "(And tomorrow too: pure peace)",
  "(Kal bhi tala: plan smartly)",
  "(Tomorrow also dry: double rest)",
  "(Kal bhi band: shanti shanti)",
  "(Tomorrow too: ginger tea time)",
];

// 8+ Fresh witty variants for "(But tomorrow is)" - all under 6 words
const BUT_TOMORROW_IS_VARIANTS = [
  "(Lekin kal sookha: stock up)",
  "(Tomorrow is dry: last orders)",
  "(Kal band hoga: plan now)",
  "(Tomorrow shutters drop: be prepared)",
  "(Lekin kal tala: buy tonight)",
  "(Tomorrow dry: warn your friends)",
  "(Kal dry day: wrap up)",
  "(Tomorrow is locked: grab supplies)",
  "(Lekin kal curfew: buy early)",
];

// 8+ Fresh witty variants when today is dry and tomorrow opens - all under 6 words
const TOMORROW_OPENS_VARIANTS = [
  "(Lekin kal khula hai: relief)",
  "(Tomorrow shutters lift: cheers ahead)",
  "(Kal azaadi: bas ek raat)",
  "(Tomorrow is open: almost there)",
  "(Kal sab theek: hold on)",
  "(Tomorrow open: dawn brings cheer)",
  "(Lekin kal mauka: patience pays)",
  "(Tomorrow open: sunrise resumes action)",
];

// 8+ Fresh witty variants for "(Tomorrow's a maybe)" - all under 6 words
const TOMORROW_MAYBE_VARIANTS = [
  "(Kal ka suspense: check gazette)",
  "(Tomorrow might open: stay tuned)",
  "(Kal ka pata nahi: maybe)",
  "(Tomorrow's pending: confirmation awaited soon)",
  "(Kal ka chakkar: district rules)",
  "(Tomorrow uncertain: verify local circular)",
  "(Kal shayad: watch this space)",
  "(Tomorrow's a toss: check back)",
  "(Kal ka daav: awaited notification)",
];

/**
 * Deterministically pick witty secondary line based on today's and tomorrow's status.
 * All variants are strictly under 6 words with light Hindi/Hinglish flavor.
 */
export function getDeterministicSecondaryLine(
  todayStatus: 'dry' | 'not_dry' | 'maybe' | 'unavailable',
  tomorrowStatus: 'dry' | 'not_dry' | 'maybe' | 'unavailable',
  dateStr: string
): string {
  const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  if (todayStatus === 'dry') {
    if (tomorrowStatus === 'dry') {
      return AND_SO_IS_TOMORROW_VARIANTS[hash % AND_SO_IS_TOMORROW_VARIANTS.length];
    } else if (tomorrowStatus === 'maybe') {
      return TOMORROW_MAYBE_VARIANTS[hash % TOMORROW_MAYBE_VARIANTS.length];
    } else {
      return TOMORROW_OPENS_VARIANTS[hash % TOMORROW_OPENS_VARIANTS.length];
    }
  } else if (todayStatus === 'maybe') {
    if (tomorrowStatus === 'dry') {
      return BUT_TOMORROW_IS_VARIANTS[hash % BUT_TOMORROW_IS_VARIANTS.length];
    } else if (tomorrowStatus === 'maybe') {
      return TOMORROW_MAYBE_VARIANTS[hash % TOMORROW_MAYBE_VARIANTS.length];
    } else {
      return "(Status uncertain today: check gazette)";
    }
  } else if (todayStatus === 'unavailable') {
    return "(Status unavailable: no verified data for this state and date)";
  } else {
    // Today is not dry
    if (tomorrowStatus === 'dry') {
      return BUT_TOMORROW_IS_VARIANTS[hash % BUT_TOMORROW_IS_VARIANTS.length];
    } else if (tomorrowStatus === 'maybe') {
      return TOMORROW_MAYBE_VARIANTS[hash % TOMORROW_MAYBE_VARIANTS.length];
    } else {
      const openVariants = [
        "(Neither today nor tomorrow: cheers)",
        "(All clear today and tomorrow)",
        "(Sab khula hai: smooth sailing)",
        "(No dry day ahead: relax)",
        "(Dono din azaadi: enjoy responsibly)",
        "(No locks today or tomorrow)",
        "(Kal parso sab set hai)",
        "(Clear skies for your glass)",
      ];
      return openVariants[hash % openVariants.length];
    }
  }
}

/**
 * 6 Fresh original footer quips in a rhyming or punchy style
 */
export function getDeterministicFooterQuip(dateStr: string): { rhyme: string[]; tone: string } {
  const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const quips = [
    {
      tone: "The Desi Philosopher",
      rhyme: [
        "Jab shutter gire aur theka soona,",
        "Chai samosa bane dildaar doona.",
        "Ek din ka sanyam, ek din ka intazaar,",
        "Kal fir se khilega rounaq-e-bazaar."
      ]
    },
    {
      tone: "The Capital Nightowl",
      rhyme: [
        "Today the locks keep vigil tight,",
        "Under the starry Delhi night.",
        "No clinking glass, no pouring cheer,",
        "Tomorrow brings your favorite beer."
      ]
    },
    {
      tone: "The Streetwise Poet",
      rhyme: [
        "Hawa mein khamoshi, counter par tala,",
        "Kismat ne dry day ka panna nikala.",
        "Subah ki pehli kiran ke saath,",
        "Botal aur pyali karenge baat."
      ]
    },
    {
      tone: "The Sensible Host",
      rhyme: [
        "When the gazette marks the quiet day,",
        "Put your thirsty plans away.",
        "Save the cash, hydrate the soul,",
        "Tomorrow welcomes back the bowl."
      ]
    },
    {
      tone: "The Mohalla Chronicler",
      rhyme: [
        "Tala laga hai chaar chaukhedi,",
        "Sookha din hai, sabko hidayat di.",
        "Bas ek raat ki baat hai dost,",
        "Kal shaam karenge jamkar toast."
      ]
    },
    {
      tone: "The Midnight Pragmatist",
      rhyme: [
        "The calendar rules the evening mood,",
        "Pair your soda with spicy food.",
        "Patience is bitter, the excise is wise,",
        "Tomorrow the shutters again will rise."
      ]
    }
  ];

  return quips[hash % quips.length];
}
