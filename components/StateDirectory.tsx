'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getAllStates, StateInfo } from '@/lib/dryday';
import { Search, MapPin, X } from 'lucide-react';

export default function StateDirectory() {
  const allStates = useMemo(() => getAllStates(), []);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'North East', 'Union Territory'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allStates.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q);
      const matchRegion = selectedRegion === 'All' || s.region === selectedRegion;
      return matchName && matchRegion;
    });
  }, [allStates, query, selectedRegion]);

  return (
    <section className="my-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6" id="state-directory">
      <div className="flex flex-col gap-3 pb-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span>Search Your State / UT</span>
          </h2>
          <span className="text-xs text-neutral-400 font-mono">
            {filtered.length} of {allStates.length}
          </span>
        </div>

        {/* Mobile Search Input - Typing 'bih' shows Bihar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type state name (e.g. 'bih', 'delhi', 'goa')..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-10 pr-9 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Region Filter Chips */}
      <div className="mt-3 flex flex-wrap gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors min-h-[44px] ${
              selectedRegion === region
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* States Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {filtered.map((state: StateInfo) => (
          <Link
            key={state.slug}
            href={`/india/${state.slug}`}
            className="group flex flex-col justify-between p-3 rounded-xl border border-neutral-800/80 bg-neutral-950/70 hover:border-amber-500/50 hover:bg-neutral-900 transition-all min-h-[58px]"
          >
            <span className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
              {state.name}
            </span>
            <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
              <span>{state.region}</span>
              {state.prohibition ? (
                <span className="text-[9px] font-mono text-rose-400 bg-rose-950/60 px-1 py-0.2 rounded">
                  Prohibited
                </span>
              ) : (
                <span className="text-[10px] text-amber-400/80 group-hover:text-amber-300">
                  View &rarr;
                </span>
              )}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-8 text-center text-xs text-neutral-400">
            No state found matching &ldquo;{query}&rdquo; in {selectedRegion}.
          </div>
        )}
      </div>
    </section>
  );
}
