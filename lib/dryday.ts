import rawData from '@/data/dry-days.json';

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
export type DryDayStatus = 'confirmed' | 'pending';

export interface DryDayEntry {
  state: string; // state slug or 'all'
  date: string; // YYYY-MM-DD
  type: DryDayType;
  reason: string;
  status: DryDayStatus;
  sourceUrl: string;
}

export interface DryDaysData {
  states: StateInfo[];
  entries: DryDayEntry[];
}

const data = rawData as DryDaysData;

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

export function getAllEntries(): DryDayEntry[] {
  return data.entries;
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
 * 'dry' | 'not_dry' | 'maybe'
 */
export function getStatus(stateSlug: string, dateIST: string): 'dry' | 'not_dry' | 'maybe' {
  const state = getStateBySlug(stateSlug);
  if (state?.prohibition) {
    return 'dry';
  }

  const entries = data.entries.filter(
    (e) => (e.state === stateSlug || e.state === 'all') && e.date === dateIST
  );

  if (entries.length === 0) {
    return 'not_dry';
  }

  if (entries.some((e) => e.status === 'confirmed')) {
    return 'dry';
  }

  return 'maybe';
}

/**
 * Get active entries for a specific state on a date
 */
export function getEntriesForStateOnDate(stateSlug: string, dateIST: string): DryDayEntry[] {
  return data.entries.filter(
    (e) => (e.state === stateSlug || e.state === 'all') && e.date === dateIST
  );
}

/**
 * Get the nationwide answer for today/tomorrow
 */
export function getNationwideStatus(dateIST: string): {
  status: 'dry' | 'not_dry' | 'maybe';
  label: 'Yes' | 'No' | 'Maybe';
  dryCount: number;
  totalStates: number;
} {
  const nonProhibitionStates = data.states.filter((s) => !s.prohibition);
  const dryStates = nonProhibitionStates.filter((s) => getStatus(s.slug, dateIST) === 'dry');
  const maybeStates = nonProhibitionStates.filter((s) => getStatus(s.slug, dateIST) === 'maybe');

  const nationalHoliday = data.entries.find(
    (e) => e.state === 'all' && e.date === dateIST && e.status === 'confirmed'
  );

  if (nationalHoliday || dryStates.length === nonProhibitionStates.length) {
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

  return {
    status: 'not_dry',
    label: 'No',
    dryCount: 0,
    totalStates: data.states.length,
  };
}

/**
 * Returns states that are dry (or maybe) on dateIST
 */
export function getDryStatesOn(dateIST: string): {
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
    if (state.prohibition) {
      result.push({
        state,
        status: 'dry',
        isProhibition: true,
      });
      continue;
    }

    const stateEntries = data.entries.filter(
      (e) => (e.state === state.slug || e.state === 'all') && e.date === dateIST
    );

    if (stateEntries.length > 0) {
      const confirmed = stateEntries.find((e) => e.status === 'confirmed');
      const entry = confirmed || stateEntries[0];
      result.push({
        state,
        entry,
        status: confirmed ? 'dry' : 'maybe',
        isProhibition: false,
      });
    }
  }

  return result;
}

/**
 * Get next dry days for a state or nationwide ('all') within a given window
 */
export function getNextDryDays(stateSlug: string, fromDateIST: string, days: number): DryDayEntry[] {
  const endDate = getDateFromOffsetIST(days, fromDateIST);

  const matched = data.entries.filter((e) => {
    const isStateMatch = stateSlug === 'all' || e.state === stateSlug || e.state === 'all';
    return isStateMatch && e.date >= fromDateIST && e.date <= endDate;
  });

  return matched.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Group upcoming dry days across India for next N days by date
 */
export function getUpcomingDryDaysGrouped(fromDateIST: string, days: number = 28): {
  date: string;
  slug: string;
  displayDate: string;
  entries: DryDayEntry[];
  statesCount: number;
  isNational: boolean;
}[] {
  const entries = getNextDryDays('all', fromDateIST, days);
  const map = new Map<string, DryDayEntry[]>();

  for (const entry of entries) {
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
  todayStatus: 'dry' | 'not_dry' | 'maybe',
  tomorrowStatus: 'dry' | 'not_dry' | 'maybe',
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
