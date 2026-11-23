'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ShieldAlert, Clock, Scale, Info, CheckCircle2, XCircle } from 'lucide-react';
import { ALL_STATES_RULES_DATA, StateRuleItem } from '@/lib/state-matrix-data';

export default function StateRulesMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  const filteredStates = useMemo(() => {
    return ALL_STATES_RULES_DATA.filter((st) => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        st.name.toLowerCase().includes(q) ||
        st.slug.toLowerCase().includes(q) ||
        st.primaryAgency.toLowerCase().includes(q) ||
        st.retailModel.toLowerCase().includes(q);

      // Age filter match
      let matchesAge = true;
      if (selectedAgeFilter === '18') {
        matchesAge = st.legalDrinkingAge === 18;
      } else if (selectedAgeFilter === '21') {
        matchesAge = st.legalDrinkingAge === 21;
      } else if (selectedAgeFilter === '25') {
        matchesAge = st.legalDrinkingAge === 25;
      } else if (selectedAgeFilter === 'prohibited') {
        matchesAge = st.status === 'Prohibited';
      }

      // Region filter match
      const matchesRegion =
        selectedRegionFilter === 'all' || st.region.toLowerCase() === selectedRegionFilter.toLowerCase();

      return matchesSearch && matchesAge && matchesRegion;
    });
  }, [searchQuery, selectedAgeFilter, selectedRegionFilter]);

  return (
    <section className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
            <Scale className="h-3.5 w-3.5" />
            <span>All-India State Comparison Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Legal Drinking Age, Theka Timings &amp; Possession Limits Across 36 States &amp; UTs
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl">
            State-by-state reference for statutory minimum age, wine shop retail operating hours, domestic liquor carriage
            quotas, and governing excise agencies.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, corporation..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2 pl-9 pr-3 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/60 transition-all"
            aria-label="Filter matrix by state name or corporation"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-4 pb-3">
        <span className="text-xs font-medium text-neutral-400 mr-1">Filter by Age:</span>
        {[
          { label: 'All (36)', value: 'all' },
          { label: 'Age 18 (Goa, HP, Sikkim...)', value: '18' },
          { label: 'Age 21 (UP, Karnataka, WB...)', value: '21' },
          { label: 'Age 25 (Delhi, Maharashtra*)', value: '25' },
          { label: 'Total Prohibition (5)', value: 'prohibited' },
        ].map((chip) => (
          <button
            key={chip.value}
            onClick={() => setSelectedAgeFilter(chip.value)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              selectedAgeFilter === chip.value
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 border border-neutral-700/50 hover:bg-neutral-800'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 pt-1">
        <span>Showing {filteredStates.length} of 36 jurisdictions</span>
        {(searchQuery || selectedAgeFilter !== 'all' || selectedRegionFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedAgeFilter('all');
              setSelectedRegionFilter('all');
            }}
            className="text-amber-400 hover:text-amber-300 hover:underline text-xs"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Table Container with Horizontal Scroll on Small Screens */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800/80 shadow-inner">
        <table className="w-full text-left text-xs sm:text-sm text-neutral-300 border-collapse">
          <thead className="bg-neutral-950/90 text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th scope="col" className="py-3 px-3.5 sm:px-4 font-semibold text-white">
                State / Union Territory
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4 font-semibold text-center whitespace-nowrap">
                Status
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4 font-semibold text-center whitespace-nowrap">
                Legal Drinking Age
              </th>
              <th scope="col" className="py-3 px-3.5 sm:px-4 font-semibold whitespace-nowrap">
                Retail Shop Timings
              </th>
              <th scope="col" className="py-3 px-3.5 sm:px-4 font-semibold">
                Personal Possession Limit
              </th>
              <th scope="col" className="py-3 px-3.5 sm:px-4 font-semibold">
                Retail Model &amp; Corporation
              </th>
              <th scope="col" className="py-3 px-2 sm:px-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70 bg-neutral-900/30">
            {filteredStates.map((st) => {
              const isProhibited = st.status === 'Prohibited';
              const isAge18 = st.legalDrinkingAge === 18;
              const isAge25 = st.legalDrinkingAge === 25;

              return (
                <tr
                  key={st.slug}
                  className="hover:bg-neutral-800/40 transition-colors group"
                >
                  {/* State Name */}
                  <td className="py-3 px-3.5 sm:px-4 font-medium text-white whitespace-nowrap">
                    <Link
                      href={`/india/${st.slug}`}
                      className="group-hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{st.name}</span>
                      <span className="text-[10px] text-neutral-500 font-normal px-1.5 py-0.5 rounded bg-neutral-800">
                        {st.region}
                      </span>
                    </Link>
                    {st.specialNotice && (
                      <p className="text-[11px] text-amber-400/80 mt-0.5 max-w-xs line-clamp-1">
                        &bull; {st.specialNotice}
                      </p>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 sm:px-4 text-center whitespace-nowrap">
                    {isProhibited ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-950/60 border border-rose-800/50 px-2 py-0.5 text-[11px] font-semibold text-rose-300">
                        <ShieldAlert className="h-3 w-3 text-rose-400" />
                        Prohibited
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        Regulated
                      </span>
                    )}
                  </td>

                  {/* Drinking Age */}
                  <td className="py-3 px-3 sm:px-4 text-center whitespace-nowrap">
                    {isProhibited ? (
                      <span className="text-neutral-500 font-mono">N/A</span>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold font-mono ${
                          isAge18
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800/50'
                            : isAge25
                            ? 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                            : 'bg-neutral-800 text-neutral-200 border border-neutral-700/60'
                        }`}
                      >
                        {st.legalDrinkingAge} Years
                      </span>
                    )}
                    {st.drinkingAgeNote && (
                      <span className="block text-[10px] text-neutral-400 mt-0.5 max-w-[140px] mx-auto line-clamp-1">
                        {st.drinkingAgeNote}
                      </span>
                    )}
                  </td>

                  {/* Retail Timings */}
                  <td className="py-3 px-3.5 sm:px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-200">
                      <Clock className="h-3 w-3 text-amber-400/80 shrink-0" />
                      <span>{st.retailHours}</span>
                    </div>
                  </td>

                  {/* Possession Limit */}
                  <td className="py-3 px-3.5 sm:px-4 text-xs text-neutral-300 max-w-[200px]">
                    <span>{st.possessionLimit}</span>
                  </td>

                  {/* Model & Corporation */}
                  <td className="py-3 px-3.5 sm:px-4 text-xs max-w-[220px]">
                    <span className="text-white font-medium block">{st.retailModel}</span>
                    <span className="text-[11px] text-neutral-400 block truncate">{st.primaryAgency}</span>
                  </td>

                  {/* Link Button */}
                  <td className="py-3 px-2 sm:px-3 text-center whitespace-nowrap">
                    <Link
                      href={`/india/${st.slug}`}
                      className="inline-flex items-center gap-0.5 rounded-lg bg-neutral-800 hover:bg-amber-500/20 hover:text-amber-300 text-neutral-300 px-2 py-1 text-xs font-medium border border-neutral-700 transition-colors"
                      title={`View detailed rules for ${st.name}`}
                    >
                      <span>Rules</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
        <span>* Maharashtra enforces age 25 for spirits and 21 for mild beer. Wardha and Gadchiroli are total dry districts.</span>
        <span>Source: Respective State &amp; UT Excise Acts (2026 verification)</span>
      </div>
    </section>
  );
}
