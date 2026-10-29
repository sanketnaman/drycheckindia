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

/** Public status vocabulary shared by pages, components and copy helpers. */
export type PublicStatus = 'dry' | 'not_dry' | 'maybe' | 'unavailable';

/**
 * Verification statuses the public site treats as eligible records. Matches
 * the public read layer's query filter (lib/public-drydays.ts): pending drafts
 * are never publicly eligible.
 */
const PUBLICLY_ELIGIBLE_STATUSES: ReadonlySet<DryDayStatus> = new Set([
  'confirmed',
  'reported',
]);

/**
 * Returns dry status for a specific state on a specific date:
 * 'dry' | 'not_dry' | 'maybe' | 'unavailable'
 *
 * Decision tree (Default Theka Status logic):
 * - statutory prohibition (prohibition === true) → dry — a standing legal
 *   fact, never overridden by the default-open rule
 * - publicly-eligible statewide confirmed entry → dry
 * - publicly-eligible statewide reported entry (no confirmed) → maybe
 *   (an unconfirmed record must stay distinguishable from no record)
 * - NO publicly-eligible statewide entry → not_dry: the default open status
 *   for every past/present/future date without an admin-created public
 *   record. Applies when the dataset is empty, contains only pending drafts,
 *   or only local-scope records (locals never answer statewide).
 * - unknown state slug → unavailable (defensive; pages validate slugs)
 *
 * 'unavailable' does NOT mean "database fetch failed": a failed query never
 * reaches this function. Pages detect fetch failures through
 * getPublicDataset() (lib/public-drydays.ts) and render the separate
 * data-unavailable state, so an error is never mistaken for "no entry".
 */
export function getStatus(
  stateSlug: string,
  dateIST: string,
  entries: DryDayEntry[]
): PublicStatus {
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return 'unavailable';
  }
  if (state.prohibition === true) {
    return 'dry';
  }

  // If the dataset is empty, unverified data must never return not_dry
  if (!entries || entries.length === 0) {
    return 'unavailable';
  }

  const eligible = getStatewideEntriesOn(stateSlug, dateIST, entries).filter((e) =>
    PUBLICLY_ELIGIBLE_STATUSES.has(e.status)
  );

  if (eligible.some((e) => e.status === 'confirmed')) {
    return 'dry';
  }
  if (eligible.some((e) => e.status === 'reported')) {
    return 'maybe';
  }

  // Default: when dataset is present and no dry day is reported or confirmed for this date
  return 'not_dry';
}

/**
 * Required public answer copy for a state/date status. The confirmed outcome
 * refers to the date being checked: "aaj" only when that date is today in
 * IST, otherwise the neutral "is din" wording so no other date is called
 * "today".
 */
interface StateHeadlineCopy {
  dry: string;
  not_dry: string;
}

export const REGIONAL_HEADLINES: Record<string, StateHeadlineCopy> = {
  'tamil-nadu': {
    dry: 'Aam, Wine Shop moodappattullathu',
    not_dry: 'Illai, Wine Shop moodappadavillai',
  },
  'karnataka': {
    dry: 'Houdu, Wine Shop mucchalaagide',
    not_dry: 'illa, Wine Shop mucchilla',
  },
  'maharashtra': {
    dry: 'Hoy, Wine Shop band aahe',
    not_dry: 'Nahi, Wine Shop band nahiye',
  },
  'kerala': {
    dry: 'Athe, Wine Shop adachirikkunnu',
    not_dry: 'Illa, Wine Shop adachittilla',
  },
  'andhra-pradesh': {
    dry: 'Avunu, Wine Shop moosiveyabadindi',
    not_dry: 'Ledu, Wine Shop moosiledu',
  },
  'telangana': {
    dry: 'Avunu, Wine Shop moosiveyabadindi',
    not_dry: 'Ledu, Wine Shop moosiledu',
  },
};

export function getStatusHeadline(
  status: PublicStatus,
  dateIST: string,
  todayISTOrStateSlug?: string,
  stateSlug?: string
): string {
  let todayIST = getTodayIST();
  let slug = stateSlug;

  if (todayISTOrStateSlug) {
    if (todayISTOrStateSlug.includes('-') && /^\d{4}-\d{2}-\d{2}$/.test(todayISTOrStateSlug)) {
      todayIST = todayISTOrStateSlug;
    } else {
      slug = todayISTOrStateSlug;
    }
  }

  if (slug && REGIONAL_HEADLINES[slug]) {
    const regional = REGIONAL_HEADLINES[slug];
    if (status === 'dry') return regional.dry;
    if (status === 'not_dry') return regional.not_dry;
    if (status === 'maybe') return 'Pata nahi, confirm nahi hai.';
    if (status === 'unavailable') return 'Abhi status check nahi ho pa raha hai.';
  }

  switch (status) {
    case 'dry':
      return dateIST === todayIST
        ? 'Haan, aaj theka band hai.'
        : 'Haan, is din theka band hai.';
    case 'maybe':
      return 'Pata nahi, confirm nahi hai.';
    case 'unavailable':
      return 'Abhi status check nahi ho pa raha hai.';
    default:
      return 'Nahi, theka band nahi hai.';
  }
}

export function getStatusEnglish(
  status: PublicStatus,
  isProhibition?: boolean
): string {
  if (isProhibition) {
    return 'Total alcohol prohibition in effect';
  }
  switch (status) {
    case 'dry':
      return 'Yes, Wine Shops are closed';
    case 'not_dry':
      return 'No, Wine Shops are open';
    case 'maybe':
      return 'Status unconfirmed (Official circular awaited)';
    case 'unavailable':
      return 'Status currently unavailable';
  }
}

/**
 * Shared copy for the data-unavailable state (the database fetch failed).
 * It explains that the status could not be retrieved and never claims that
 * someone is actively checking.
 */
export const DATA_UNAVAILABLE_SECONDARY =
  'Database se status abhi retrieve nahi ho pa raha hai. Thodi der baad dobara try karein.';
export const DATA_UNAVAILABLE_LIST_MESSAGE =
  'Status abhi check nahi ho pa raha hai. Thodi der baad dobara try karein.';

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
 * Get the nationwide answer for today/tomorrow.
 * 'maybe' covers any non-dry signal: dryCount > 0 means at least one state is
 * confirmed dry (a partial dry day), dryCount === 0 means only unconfirmed
 * (reported) signals exist.
 */
export function getNationwideStatus(
  dateIST: string,
  entries: DryDayEntry[]
): {
  status: PublicStatus;
  label: 'Yes' | 'No' | 'Maybe' | 'Status not verified';
  dryCount: number;
  maybeCount: number;
  totalStates: number;
} {
  const source = entries;
  if (!source || source.length === 0) {
    return {
      status: 'unavailable',
      label: 'Status not verified',
      dryCount: 0,
      maybeCount: 0,
      totalStates: data.states.length,
    };
  }

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
      maybeCount: 0,
      totalStates: data.states.length,
    };
  }

  if (dryStates.length > 0 || maybeStates.length > 0) {
    return {
      status: 'maybe',
      label: 'Maybe',
      dryCount: dryStates.length,
      maybeCount: maybeStates.length,
      totalStates: data.states.length,
    };
  }

  if (unavailableStates.length === nonProhibitionStates.length && nonProhibitionStates.length > 0) {
    return {
      status: 'unavailable',
      label: 'Status not verified',
      dryCount: 0,
      maybeCount: 0,
      totalStates: data.states.length,
    };
  }

  return {
    status: 'not_dry',
    label: 'No',
    dryCount: 0,
    maybeCount: 0,
    totalStates: data.states.length,
  };
}

/**
 * Returns states with a publicly-eligible statewide dry-day record (or
 * prohibition) on dateIST. Confirmed records list as 'dry', reported
 * (unconfirmed) records as 'maybe'. Pending drafts and local-only records
 * are not publicly eligible, so those states are simply omitted — they fall
 * back to the default open status everywhere else.
 */
export function getDryStatesOn(
  dateIST: string,
  entries: DryDayEntry[]
): {
  state: StateInfo;
  entry?: DryDayEntry;
  status: 'dry' | 'maybe';
  isProhibition?: boolean;
}[] {
  const result: {
    state: StateInfo;
    entry?: DryDayEntry;
    status: 'dry' | 'maybe';
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
    const confirmed = stateEntries.find((e) => e.status === 'confirmed');
    const reported = stateEntries.find((e) => e.status === 'reported');

    if (confirmed) {
      result.push({ state, entry: confirmed, status: 'dry', isProhibition: false });
    } else if (reported) {
      result.push({ state, entry: reported, status: 'maybe', isProhibition: false });
    }
    // States without a publicly-eligible statewide record are omitted
    // (not listed as open or dry).
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
  todayStatus: PublicStatus,
  tomorrowStatus: PublicStatus,
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
