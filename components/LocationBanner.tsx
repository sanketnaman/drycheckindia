'use client';

import { useState, useEffect } from 'react';
import { getStateBySlug, getStatus, getTodayIST, type DryDayEntry } from '@/lib/dryday';
import { MapPin } from 'lucide-react';

const REGION_MAP: Record<string, string> = {
  'DL': 'delhi', 'MH': 'maharashtra', 'KA': 'karnataka', 'TN': 'tamil-nadu',
  'WB': 'west-bengal', 'UP': 'uttar-pradesh', 'GJ': 'gujarat', 'RJ': 'rajasthan',
  'AP': 'andhra-pradesh', 'TG': 'telangana', 'KL': 'kerala', 'MP': 'madhya-pradesh',
  'HR': 'haryana', 'PB': 'punjab', 'BR': 'bihar', 'OD': 'odisha', 'AS': 'assam',
  'NL': 'nagaland', 'MZ': 'mizoram', 'SK': 'sikkim', 'TR': 'tripura', 'MN': 'manipur',
  'ML': 'meghalaya', 'AR': 'arunachal-pradesh', 'CT': 'chhattisgarh', 'JH': 'jharkhand',
  'GA': 'goa', 'HP': 'himachal-pradesh', 'UK': 'uttarakhand', 'JK': 'jammu-and-kashmir',
  'LA': 'ladakh', 'CH': 'chandigarh', 'AN': 'andaman-and-nicobar-islands',
  'PY': 'puducherry', 'DD': 'dadra-and-nagar-haveli-and-daman-and-diu', 'LK': 'lakshadweep',
};

export default function LocationBanner({
  entries,
  dataUnavailable = false,
}: {
  entries: DryDayEntry[];
  /** True when the public dataset fetch failed — the status is unknown. */
  dataUnavailable?: boolean;
}) {
  const [stateSlug, setStateSlug] = useState<string | null>(null);

  // Read simulated edge header after mount (client-only; no storage)
  useEffect(() => {
    const r = (window as unknown as { __REGION_CODE?: string }).__REGION_CODE;
    if (r && REGION_MAP[r]) {
      // Sync from external system (window region header) once after mount
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStateSlug(REGION_MAP[r]);
    }
  }, []);

  if (!stateSlug) return null;

  const state = getStateBySlug(stateSlug);
  const todayIST = getTodayIST();
  const status = dataUnavailable
    ? 'unavailable'
    : state
    ? getStatus(state.slug, todayIST, entries)
    : 'maybe';

  const label = state?.prohibition === true
    ? 'Year-round prohibition'
    : status === 'dry'
    ? 'Haan — aaj theka band'
    : status === 'maybe'
    ? 'Pata nahi'
    : status === 'unavailable'
    ? 'Check nahi ho pa raha'
    : 'Nahi — theka khula';

  return (
    <div className="w-full mb-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-h-[44px]">
        <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="text-xs sm:text-sm text-neutral-200">
          Aap <strong className="text-amber-400">{state?.name || 'is region'}</strong> mein ho? Aaj ka status yahin hai.
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border min-h-[28px] inline-flex items-center ${
          state?.prohibition === true ? 'bg-rose-950/80 text-rose-300 border-rose-800/60' :
          status === 'dry' ? 'bg-rose-950/80 text-rose-300 border-rose-800/60' :
          status === 'maybe' ? 'bg-amber-950/80 text-amber-300 border-amber-800/60' :
          status === 'unavailable' ? 'bg-neutral-800/80 text-neutral-300 border-neutral-600/60' :
          'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
        }`}>
          {label}
        </span>
        <button
          onClick={() => document.getElementById('state-directory')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-xs font-semibold text-amber-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg px-2.5 py-1.5 transition-colors min-h-[36px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          aria-label="Change state selection"
        >
          Badlo
        </button>
      </div>
    </div>
  );
}
