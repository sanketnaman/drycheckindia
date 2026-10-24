import Link from 'next/link';
import { SUPABASE_UNAVAILABLE_MESSAGE } from '@/lib/supabase/config';

/**
 * Friendly panel shown instead of a 500 when Supabase is not configured
 * (missing or still-placeholder environment values).
 *
 * It never reveals configuration values or raw errors — only the generic
 * "not configured" message and an operator-facing hint.
 */
export default function SupabaseUnavailableNotice({
  detail,
  backHref = '/',
  backLabel = '← Back to drycheck.in',
}: {
  /** Operator-facing hint. Must not contain configuration values. */
  detail?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:py-16">
      <div
        role="status"
        className="rounded-2xl border border-amber-800/70 bg-amber-950/40 p-6 sm:p-8"
      >
        <h1 className="text-xl font-extrabold tracking-tight text-amber-100">
          Admin area is unavailable
        </h1>
        <p className="mt-2 text-sm text-amber-200/90">{SUPABASE_UNAVAILABLE_MESSAGE}</p>
        {detail ? <p className="mt-2 text-xs text-amber-200/70">{detail}</p> : null}
        <p className="mt-3 text-xs text-amber-200/70">
          The public site keeps working normally — this only affects the administration panel.
        </p>
        <div className="mt-5">
          <Link
            href={backHref}
            className="inline-flex min-h-[40px] items-center rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
