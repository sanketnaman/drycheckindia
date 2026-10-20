'use client';

import { useState, useCallback } from 'react';
import { getStateBySlug, getStatus, getTodayIST } from '@/lib/dryday';
import { MapPin, ChevronDown } from 'lucide-react';

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

export default function LocationBanner() {
  const [region, setRegion] = useState<string | null>(null);
  const [stateSlug, setStateSlug] = useState<string | null>(null);

  // Read from simulated edge header (client-side only, no storage)
  if (typeof window !== 'undefined' && !region && (window as any).__REGION_CODE) {
    const r = (window as any).__REGION_CODE;
    if (REGION_MAP[r]) {
      setRegion(r);
      setStateSlug(REGION_MAP[r]);
    }
  }

  const handleGPS = useCallback(() => {
    // GPS reverse-geocoding skipped: no bundled boundary file or external service available.
    // Falls back silently to IP-based region (already set) or none.
  }, []);

  if (!stateSlug) return null;

  const state = getStateBySlug(stateSlug);
  const todayIST = getTodayIST();
  const status = state ? getStatus(state.slug, todayIST) : 'maybe';

  const label = state?.prohibition === true
    ? 'Year-round prohibition'
    : state?.prohibition === null
    ? 'Data not verified yet'
    : status === 'dry'
    ? 'Yes — dry today'
    : status === 'maybe'
    ? 'Maybe — pending confirmation'
    : 'Not dry';

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
          state?.prohibition === null ? 'bg-neutral-800 text-neutral-300 border-neutral-700' :
          status === 'dry' ? 'bg-rose-950/80 text-rose-300 border-rose-800/60' :
          status === 'maybe' ? 'bg-amber-950/80 text-amber-300 border-amber-800/60' :
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
