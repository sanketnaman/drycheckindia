import {
  DRY_DAY_TYPE_LABELS,
  NOTICE_SEVERITY_META,
  VERIFICATION_META,
  type DryDayType,
  type NoticeSeverity,
  type VerificationStatus,
} from '@/lib/admin/types';
import { cn } from '@/lib/utils';

export function VerificationBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const meta = VERIFICATION_META[status];
  return (
    <span
      title={meta.help}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        meta.badge,
        className
      )}
    >
      {meta.label}
    </span>
  );
}

export function PublishBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/70 bg-emerald-950/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      Published
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[11px] font-semibold text-neutral-400">
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" aria-hidden="true" />
      Unpublished
    </span>
  );
}

export function TypeBadge({
  type,
  locality,
}: {
  type: DryDayType;
  locality?: string | null;
}) {
  if (type === 'local') {
    return (
      <span className="inline-flex flex-wrap items-center gap-1">
        <span className="inline-flex items-center rounded-full border border-rose-800/70 bg-rose-950/70 px-2 py-0.5 text-[11px] font-semibold text-rose-300">
          Local — not statewide
        </span>
        {locality && (
          <span className="text-xs text-neutral-400" title="Affected area">
            {locality}
          </span>
        )}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[11px] font-semibold text-neutral-300">
      {DRY_DAY_TYPE_LABELS[type]}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: NoticeSeverity }) {
  const meta = NOTICE_SEVERITY_META[severity];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        meta.badge
      )}
    >
      {meta.label}
    </span>
  );
}
