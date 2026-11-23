'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StateInfo } from '@/lib/dryday';
import {
  Search,
  X,
  MapPin,
  ChevronRight,
  Clock,
  ShieldAlert,
  SlidersHorizontal,
  CheckCircle,
} from 'lucide-react';

interface StateDirectorySearchProps {
  allStates: StateInfo[];
  stateProfiles: Record<string, { actName?: string }>;
  stateTimings: Record<string, { retailHours?: string }>;
}

const REGION_ORDER = [
  'North',
  'West',
  'South',
  'East',
  'North-East',
  'Central',
  'UT',
] as const;

const REGION_LABELS: Record<string, string> = {
  North: 'Northern States & Territories',
  West: 'Western States & Territories',
  South: 'Southern States & Territories',
  East: 'Eastern States & Territories',
  'North-East': 'North-Eastern States',
  Central: 'Central Indian States',
  UT: 'Island & Union Territories',
};

const POPULAR_SLUGS = [
  'delhi',
  'uttar-pradesh',
  'maharashtra',
  'karnataka',
  'bihar',
  'goa',
  'kerala',
  'west-bengal',
];

export default function StateDirectorySearch({
  allStates,
  stateProfiles,
  stateTimings,
}: StateDirectorySearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close autocomplete on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered states for the autocomplete suggestions
  const autocompleteSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allStates
      .filter((s) => {
        const nameMatch = s.name.toLowerCase().includes(q);
        const slugMatch = s.slug.toLowerCase().includes(q);
        const regionMatch = s.region.toLowerCase().includes(q);
        return nameMatch || slugMatch || regionMatch;
      })
      .slice(0, 8); // Top 8 suggestions
  }, [allStates, query]);

  // Filtered states for the card directory view below
  const filteredStates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allStates.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q);

      if (!matchesQuery) return false;

      if (selectedFilter === 'All') return true;
      if (selectedFilter === 'Prohibition') return s.prohibition === true;
      return s.region === selectedFilter;
    });
  }, [allStates, query, selectedFilter]);

  const handleSelectState = (slug: string) => {
    setIsDropdownOpen(false);
    setQuery('');
    router.push(`/india/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || autocompleteSuggestions.length === 0) {
      if (e.key === 'Enter' && query.trim() && filteredStates.length > 0) {
        handleSelectState(filteredStates[0].slug);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < autocompleteSuggestions.length) {
        handleSelectState(autocompleteSuggestions[activeIndex].slug);
      } else if (autocompleteSuggestions.length > 0) {
        handleSelectState(autocompleteSuggestions[0].slug);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Autocomplete Bar */}
      <div
        ref={containerRef}
        className="sticky top-16 z-30 -mx-2 px-2 py-3 rounded-2xl bg-neutral-950/95 backdrop-blur-md border border-neutral-800 shadow-xl"
      >
        <div className="relative w-full">
          <label htmlFor="state-search-input" className="sr-only">
            Search Indian State or Union Territory
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-400 pointer-events-none" />

          <input
            ref={inputRef}
            id="state-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDropdownOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => {
              if (query.trim()) setIsDropdownOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search state (e.g. 'Bihar', 'Delhi', 'Goa', 'UP', 'Mumbai')..."
            className="w-full h-12 rounded-xl border border-neutral-700 bg-neutral-900/90 pl-11 pr-10 text-base text-white placeholder-neutral-400 focus:border-amber-400 focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400/40 shadow-inner"
            autoComplete="off"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsDropdownOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Autocomplete Dropdown List */}
          {isDropdownOpen && autocompleteSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-amber-500/40 bg-neutral-950/98 shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
              <div className="px-3 py-2 bg-neutral-900/80 border-b border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Matching States &amp; UTs</span>
                <span>Press Enter to select</span>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-neutral-800/60 custom-scrollbar">
                {autocompleteSuggestions.map((st, idx) => (
                  <li key={st.slug}>
                    <button
                      type="button"
                      onClick={() => handleSelectState(st.slug)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors min-h-[48px] ${
                        idx === activeIndex
                          ? 'bg-amber-500/15 text-white'
                          : 'text-neutral-200 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-semibold text-sm sm:text-base text-white block">
                            {st.name}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {st.region} India
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {st.prohibition ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">
                            Prohibition
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                            Regulated
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-amber-400 shrink-0" />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Quick Popular States Chips */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
          <span className="text-neutral-500 text-[11px] font-mono shrink-0 pl-1">
            Quick:
          </span>
          {POPULAR_SLUGS.map((slug) => {
            const st = allStates.find((s) => s.slug === slug);
            if (!st) return null;
            return (
              <button
                key={slug}
                onClick={() => handleSelectState(slug)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-amber-500/20 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 transition-colors"
              >
                {st.name}
              </button>
            );
          })}
        </div>

        {/* Region Filter Chips */}
        <div className="mt-2.5 pt-2.5 border-t border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          <span className="text-neutral-500 text-[11px] font-mono shrink-0 pl-1">
            Region:
          </span>
          {['All', 'Prohibition', ...REGION_ORDER].map((filterKey) => {
            const isSelected = selectedFilter === filterKey;
            const count =
              filterKey === 'All'
                ? allStates.length
                : filterKey === 'Prohibition'
                ? allStates.filter((s) => s.prohibition).length
                : allStates.filter((s) => s.region === filterKey).length;

            return (
              <button
                key={filterKey}
                onClick={() => {
                  setSelectedFilter(filterKey);
                  setIsDropdownOpen(false);
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all min-h-[38px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                <span>{filterKey}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-neutral-950/30 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* States Count Indicator */}
      {(query || selectedFilter !== 'All') && (
        <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
          <span>
            Showing <strong className="text-white">{filteredStates.length}</strong>{' '}
            of {allStates.length} jurisdictions
            {query && <span> for &ldquo;{query}&rdquo;</span>}
            {selectedFilter !== 'All' && <span> in {selectedFilter}</span>}
          </span>
          <button
            onClick={() => {
              setQuery('');
              setSelectedFilter('All');
            }}
            className="text-amber-400 hover:underline font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Directory Cards Grid */}
      {filteredStates.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center space-y-3">
          <p className="text-base text-neutral-300 font-medium">
            No state or territory found matching &ldquo;{query}&rdquo;.
          </p>
          <p className="text-xs text-neutral-500">
            Check the spelling or try searching by common acronyms like &apos;UP&apos;, &apos;WB&apos;, or &apos;DL&apos;.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedFilter('All');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-semibold text-xs hover:bg-amber-300 transition-colors"
          >
            View All 36 States &amp; UTs
          </button>
        </div>
      ) : query.trim() || selectedFilter !== 'All' ? (
        /* Flat filtered list when user is actively searching */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStates.map((st) => {
            const profile = stateProfiles[st.slug];
            const timing = stateTimings[st.slug];

            return (
              <Link
                key={st.slug}
                href={`/india/${st.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-amber-500/50 hover:bg-neutral-900/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-neutral-100 group-hover:text-amber-400 transition-colors">
                      {st.name}
                    </h3>
                    {st.prohibition ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 shrink-0">
                        Prohibition
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 shrink-0">
                        Regulated
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {profile?.actName ||
                      `Excise laws and wine shop guidelines for ${st.name}.`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="h-3 w-3 text-amber-500" />
                    <span className="truncate max-w-[170px]">
                      {st.prohibition
                        ? 'Closed permanently'
                        : timing?.retailHours || 'Check state schedule'}
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-0.5 font-medium text-amber-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Check</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Full Regional Breakdown when no search query is active */
        <div className="space-y-10">
          {REGION_ORDER.map((regionKey) => {
            const statesInRegion = allStates.filter(
              (s) => s.region === regionKey
            );
            if (statesInRegion.length === 0) return null;

            return (
              <section
                key={regionKey}
                aria-labelledby={`region-heading-${regionKey}`}
              >
                <div className="flex items-center gap-2 mb-4 border-b border-neutral-800 pb-2">
                  <h2
                    id={`region-heading-${regionKey}`}
                    className="text-lg sm:text-xl font-bold text-white tracking-wide"
                  >
                    {REGION_LABELS[regionKey] || `${regionKey} India`}
                  </h2>
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full">
                    {statesInRegion.length}{' '}
                    {statesInRegion.length === 1 ? 'state' : 'states'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statesInRegion.map((st) => {
                    const profile = stateProfiles[st.slug];
                    const timing = stateTimings[st.slug];

                    return (
                      <Link
                        key={st.slug}
                        href={`/india/${st.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 hover:border-amber-500/50 hover:bg-neutral-900/90 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-base text-neutral-100 group-hover:text-amber-400 transition-colors">
                              {st.name}
                            </h3>
                            {st.prohibition ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 shrink-0">
                                Prohibition
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 shrink-0">
                                Regulated
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                            {profile?.actName ||
                              `Excise laws and wine shop guidelines for ${st.name}.`}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                          <span className="flex items-center gap-1.5 text-neutral-400">
                            <Clock className="h-3 w-3 text-amber-500" />
                            <span className="truncate max-w-[170px]">
                              {st.prohibition
                                ? 'Closed permanently'
                                : timing?.retailHours || 'Check state schedule'}
                            </span>
                          </span>

                          <span className="inline-flex items-center gap-0.5 font-medium text-amber-400 group-hover:translate-x-0.5 transition-transform">
                            <span>Check</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
