'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ActionResult } from '@/lib/admin/types';
import { cn } from '@/lib/utils';

interface ActionControlProps {
  /** Server action (usually pre-bound with row id / arguments). */
  action: () => Promise<ActionResult>;
  label: string;
  variant?: 'danger' | 'neutral';
  /** When set, a confirmation dialog is shown before running. */
  confirmMessage?: string;
  confirmTitle?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Runs a server action from the admin UI with pending state, error feedback,
 * optional confirmation dialog (native <dialog>: Escape/backdrop/focus handling),
 * and auth redirect handling when the server responds unauthorized.
 */
export default function ActionControl({
  action,
  label,
  variant = 'neutral',
  confirmMessage,
  confirmTitle,
  className,
  disabled,
}: ActionControlProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const run = async () => {
    setError(null);
    try {
      const result = await action();
      if (result?.ok) {
        setOpen(false);
        router.refresh();
        return;
      }
      if (result?.code === 'unauthenticated') {
        router.push('/admin/login');
        return;
      }
      if (result?.code === 'forbidden') {
        router.push('/admin/login?error=forbidden');
        return;
      }
      setError(result?.error ?? 'The operation failed. Please try again.');
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    }
  };

  const handleClick = () => {
    if (confirmMessage) {
      setError(null);
      setOpen(true);
    } else {
      startTransition(run);
    }
  };

  const handleConfirm = () => {
    startTransition(run);
  };

  const triggerClass =
    variant === 'danger'
      ? 'border-rose-800/70 bg-rose-950/60 text-rose-300 hover:bg-rose-900/60 hover:text-rose-200'
      : 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-neutral-500 hover:text-white';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || pending}
        aria-label={confirmMessage ? `${label}. Asks for confirmation.` : label}
        className={cn(
          'inline-flex min-h-[36px] items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed',
          triggerClass,
          className
        )}
      >
        {pending ? 'Working…' : label}
      </button>

      {confirmMessage && (
        <dialog
          ref={dialogRef}
          aria-labelledby="action-control-title"
          onCancel={(e) => {
            if (pending) e.preventDefault();
            else setOpen(false);
          }}
          onClose={() => setOpen(false)}
          className="w-[min(92vw,26rem)] rounded-2xl border border-neutral-700 bg-neutral-900 p-5 text-neutral-100 shadow-2xl backdrop:bg-black/70"
        >
          <h2 id="action-control-title" className="text-base font-bold text-white">
            {confirmTitle ?? 'Please confirm'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">{confirmMessage}</p>

          {error && (
            <p role="alert" className="mt-3 text-xs font-medium text-rose-400">
              {error}
            </p>
          )}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              autoFocus
              disabled={pending}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500/60 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={handleConfirm}
              className={cn(
                'inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 disabled:opacity-60',
                variant === 'danger'
                  ? 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500/60'
                  : 'bg-amber-500 text-neutral-950 hover:bg-amber-400 focus:ring-amber-500/60'
              )}
            >
              {pending ? 'Working…' : 'Confirm'}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
