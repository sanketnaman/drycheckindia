import type { ReactNode } from 'react';

/** Accessible props wiring an input to its hint and error messages. */
export function fieldA11y(
  name: string,
  errors: Record<string, string> | undefined,
  hint?: string
): {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
} {
  const id = `field-${name}`;
  if (errors?.[name]) return { id, 'aria-invalid': true, 'aria-describedby': `${id}-error` };
  if (hint) return { id, 'aria-describedby': `${id}-hint` };
  return { id };
}

export function FieldError({
  name,
  errors,
}: {
  name: string;
  errors?: Record<string, string>;
}) {
  const message = errors?.[name];
  if (!message) return null;
  return (
    <p id={`field-${name}-error`} role="alert" className="mt-1 text-xs font-medium text-rose-400">
      {message}
    </p>
  );
}

export function Hint({ name, children }: { name: string; children: ReactNode }) {
  return (
    <p id={`field-${name}-hint`} className="mt-1 text-xs text-neutral-500">
      {children}
    </p>
  );
}

export function FormAlert({ error, success }: { error?: string | null; success?: string | null }) {
  if (!error && !success) return null;
  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-rose-800/70 bg-rose-950/60 px-4 py-3 text-sm text-rose-200"
      >
        {error}
      </div>
    );
  }
  return (
    <div
      role="status"
      className="rounded-xl border border-emerald-800/70 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-200"
    >
      {success}
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-60';

export const labelClass = 'block text-xs font-semibold text-neutral-300 mb-1.5';

export const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-neutral-950 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] transition-colors';

export const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500/60 disabled:opacity-60 min-h-[44px] transition-colors';
