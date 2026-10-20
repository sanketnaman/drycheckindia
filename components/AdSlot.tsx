'use client';

interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
}

/**
 * AdSlot component
 * Renders nothing by default.
 * Activated strictly if NEXT_PUBLIC_ADS_ENABLED === 'true'.
 * Compliant: No alcohol-related affiliate or promotional content.
 */
export default function AdSlot({ id, className = '', label = 'Advertisement' }: AdSlotProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  if (!isEnabled) {
    return null;
  }

  return (
    <aside
      id={`ad-container-${id}`}
      aria-label={label}
      className={`my-6 mx-auto w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-center ${className}`}
    >
      <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
        {label}
      </span>
      <div className="mt-2 flex h-24 items-center justify-center rounded-lg border border-dashed border-neutral-700/60 bg-neutral-950/40 text-xs text-neutral-400">
        Ad placeholder slot ({id})
      </div>
    </aside>
  );
}
