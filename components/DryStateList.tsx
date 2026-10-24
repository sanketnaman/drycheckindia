import Link from 'next/link';
import { StateInfo, DryDayEntry, DATA_UNAVAILABLE_LIST_MESSAGE } from '@/lib/dryday';
import { AlertTriangle, ChevronRight, ShieldCheck } from 'lucide-react';

interface DryStateItem {
  state: StateInfo;
  entry?: DryDayEntry;
  status: 'dry' | 'maybe';
  isProhibition?: boolean;
  isReported?: boolean;
}

interface DryStateListProps {
  title: string;
  dateDisplay: string;
  items: DryStateItem[];
  emptyMessage?: string;
  isTomorrow?: boolean;
  /** True when the public dataset has no published entries at all. */
  datasetEmpty?: boolean;
  /** True when the public dataset fetch failed — the status is unknown. */
  dataUnavailable?: boolean;
}

export default function DryStateList({
  title,
  dateDisplay,
  items,
  emptyMessage = 'No general dry day scheduled. Regular retail licensing rules apply.',
  isTomorrow = false,
  datasetEmpty = false,
  dataUnavailable = false,
}: DryStateListProps) {
  const eventDryDays = items.filter((item) => !item.isProhibition);
  const prohibitionStates = items.filter((item) => item.isProhibition);

  return (
    <section className="my-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-normal text-neutral-400">({dateDisplay})</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            States and UTs observing excise restrictions on this date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
            {dataUnavailable
              ? 'Data unavailable'
              : datasetEmpty
              ? 'Awaiting published data'
              : `${eventDryDays.length} ${eventDryDays.length === 1 ? 'state' : 'states'} on schedule`}
          </span>
        </div>
      </div>

      {/* Event-based dry days */}
      {eventDryDays.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {eventDryDays.map(({ state, entry, status }) => {
            const isPending = entry?.status === 'pending' || status === 'maybe';
            const isReported = entry?.status === 'reported';

            return (
              <Link
                key={state.slug}
                href={`/india/${state.slug}`}
                className="group flex flex-col justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-950/70 hover:border-amber-500/50 hover:bg-neutral-900 transition-all min-h-[72px]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {state.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      isReported || isPending
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                        : 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                    }`}
                  >
                    {isReported ? 'Pata nahi' : isPending ? 'Maybe' : 'Dry'}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-col text-xs text-neutral-400">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-2">{entry?.reason || 'Scheduled observance'}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-600 group-hover:text-amber-400 shrink-0" />
                  </div>
                  {isPending && (
                    <span className="text-[10px] text-amber-400/90 font-medium mt-0.5">
                      Official confirmation awaited
                    </span>
                  )}
                  {isReported && (
                    <span className="text-[10px] text-amber-400/90 font-medium mt-0.5">
                      Reported by news source — official confirmation not verified
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 p-3.5 rounded-xl border border-neutral-800/60 bg-neutral-950/40 text-center">
          <p className="text-xs sm:text-sm text-neutral-300 flex items-center justify-center gap-2">
            {dataUnavailable ? (
              <span>{DATA_UNAVAILABLE_LIST_MESSAGE}</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>{emptyMessage}</span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Statutory Prohibition States */}
      {prohibitionStates.length > 0 && (
        <div className="mt-4 pt-3 border-t border-neutral-800/60">
          <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              States with 365-day total statutory prohibition:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1 sm:mt-0">
              {prohibitionStates.map(({ state }) => (
                <Link
                  key={state.slug}
                  href={`/india/${state.slug}`}
                  className="px-2 py-1 rounded bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-medium transition-colors min-h-[36px] inline-flex items-center"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
