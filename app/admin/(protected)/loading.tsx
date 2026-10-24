export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading admin content…</span>
      <div className="h-8 w-56 rounded-lg bg-neutral-800/70" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-neutral-800 bg-neutral-900/60" />
        ))}
      </div>
      <div className="h-64 rounded-2xl border border-neutral-800 bg-neutral-900/60" />
    </div>
  );
}
