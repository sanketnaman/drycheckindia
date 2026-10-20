'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DryDayEntry, dateToSlug, formatDateDisplay, getTodayIST } from '@/lib/dryday';
import { Calendar, ExternalLink, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface StateCalendarProps {
  stateName: string;
  stateSlug: string;
  entries: DryDayEntry[];
  prohibition?: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function StateCalendar({
  stateName,
  stateSlug,
  entries,
  prohibition,
}: StateCalendarProps) {
  // Mobile accordion state: default to current month in IST (0..11)
  const currentMonthIdx = Math.max(0, Math.min(11, parseInt(getTodayIST().split('-')[1], 10) - 1));
  const [openMonth, setOpenMonth] = useState<number>(currentMonthIdx);

  // Group entries by month (0..11)
  const entriesByMonth = new Map<number, DryDayEntry[]>();
  for (let m = 0; m < 12; m++) {
    entriesByMonth.set(m, []);
  }

  for (const entry of entries) {
    const parts = entry.date.split('-');
    if (parts.length === 3) {
      const monthIdx = parseInt(parts[1], 10) - 1;
      const list = entriesByMonth.get(monthIdx) || [];
      list.push(entry);
      entriesByMonth.set(monthIdx, list);
    }
  }

  return (
    <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            12-Month 2026 Calendar &bull; {stateName}
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {entries.length} recorded entries
        </span>
      </div>

      {prohibition ? (
        <div className="mt-4 rounded-xl border border-rose-900/60 bg-rose-950/20 p-5 text-center text-sm text-rose-200">
          <p className="font-semibold text-base mb-1">Statewide Statutory Prohibition</p>
          <p className="text-xs text-rose-300">
            In {stateName}, the sale and retail consumption of alcohol is prohibited year-round under statutory state legislation. Every day is a dry day.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {MONTHS.map((month, idx) => {
            const monthEntries = entriesByMonth.get(idx) || [];
            const isOpen = openMonth === idx;

            return (
              <div
                key={month}
                className="rounded-xl border border-neutral-800/80 bg-neutral-950 overflow-hidden"
              >
                {/* Collapsible Month Header (Mobile accordion tap target >= 44px) */}
                <button
                  type="button"
                  onClick={() => setOpenMonth(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-3.5 sm:px-4 text-left hover:bg-neutral-900 transition-colors min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-white">{month}</span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        monthEntries.length > 0
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold'
                          : 'bg-neutral-900 text-neutral-500'
                      }`}
                    >
                      {monthEntries.length} {monthEntries.length === 1 ? 'dry day' : 'dry days'}
                    </span>
                  </div>

                  <div className="flex items-center text-neutral-400">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Collapsible Month Content */}
                {isOpen && (
                  <div className="p-3 sm:p-4 pt-1 border-t border-neutral-800/60 bg-neutral-950/40">
                    {monthEntries.length === 0 ? (
                      <div className="py-3 text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span>No scheduled dry days recorded for {month} in {stateName}.</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {monthEntries.map((entry, eIdx) => {
                          const dateSlug = dateToSlug(entry.date);
                          const isConfirmed = entry.status === 'confirmed';

                          return (
                            <div
                              key={`${entry.date}-${eIdx}`}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-neutral-800/80 bg-neutral-900/80 gap-2"
                            >
                              <div className="flex items-start sm:items-center gap-3">
                                <span className="text-xs font-mono px-2 py-1 rounded bg-neutral-950 text-amber-400 font-bold shrink-0">
                                  {entry.date.split('-')[2]} {month.substring(0, 3)}
                                </span>
                                <div>
                                  <Link
                                    href={`/dry-days/${dateSlug}`}
                                    className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                                  >
                                    {entry.reason}
                                  </Link>
                                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5">
                                    <span className="capitalize">{entry.type}</span>
                                    <span>&bull;</span>
                                    {isConfirmed ? (
                                      <span className="text-rose-400 font-medium">Confirmed</span>
                                    ) : (
                                      <span className="text-amber-400 font-medium">
                                        Maybe &bull; Official confirmation awaited
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 justify-end pt-1 sm:pt-0 text-xs">
                                {entry.sourceUrl ? (
                                  <a
                                    href={entry.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-amber-400 hover:underline min-h-[36px]"
                                  >
                                    <span>Source</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  <span className="text-neutral-500 text-[11px]">
                                    Source: Pending gazette
                                  </span>
                                )}
                                <Link
                                  href={`/dry-days/${dateSlug}`}
                                  className="text-neutral-400 hover:text-white transition-colors min-h-[36px] flex items-center"
                                >
                                  Details &rarr;
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
