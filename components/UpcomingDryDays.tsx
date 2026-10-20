import Link from 'next/link';
import { CalendarDays, ChevronRight, Globe } from 'lucide-react';
import { DryDayEntry } from '@/lib/dryday';

interface GroupedDryDay {
  date: string;
  slug: string;
  displayDate: string;
  entries: DryDayEntry[];
  statesCount: number;
  isNational: boolean;
}

interface UpcomingDryDaysProps {
  groups: GroupedDryDay[];
}

export default function UpcomingDryDays({ groups }: UpcomingDryDaysProps) {
  return (
    <section className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-amber-400" />
            <span>Dry Days Ahead (Next 4 Weeks)</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Upcoming festival, national, and election-related dry dates
          </p>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          Showing {groups.length} dates
        </span>
      </div>

      {groups.length === 0 ? (
        <div className="mt-3 p-5 rounded-xl border border-neutral-800 bg-neutral-950/40 text-center text-xs text-neutral-400">
          No dry days scheduled in the next 4 weeks. Normal retail licenses apply.
        </div>
      ) : (
        <div className="mt-3 space-y-2.5">
          {groups.map((group) => {
            const primaryEntry = group.entries[0];
            const isNational = group.isNational;
            const hasPending = group.entries.some((e) => e.status === 'pending');

            return (
              <div
                key={group.date}
                className="group flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 hover:bg-neutral-950 transition-all gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center justify-center h-12 w-14 rounded-lg bg-neutral-900 border border-neutral-800 text-center shrink-0">
                    <span className="text-[10px] font-mono uppercase text-amber-400">
                      {group.displayDate.split(',')[0]}
                    </span>
                    <span className="text-base font-bold text-white">
                      {group.date.split('-')[2]}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {primaryEntry?.reason}
                      </h3>
                      {isNational ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/60">
                          <Globe className="h-2.5 w-2.5" />
                          Pan-India National Holiday
                        </span>
                      ) : hasPending ? (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60">
                          Pending confirmation
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {primaryEntry?.type || 'Festival'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400 mt-1">
                      {group.displayDate} &bull;{' '}
                      {isNational
                        ? 'All 36 States & UTs'
                        : `${group.statesCount} ${group.statesCount === 1 ? 'state' : 'states'} observing (${group.entries.map((e) => e.state).join(', ')})`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800/60">
                  <Link
                    href={`/dry-days/${group.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-400 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors min-h-[44px]"
                  >
                    <span>View all states</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
