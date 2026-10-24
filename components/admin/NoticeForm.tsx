'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type FormEvent } from 'react';
import { saveNoticeAction } from '@/app/admin/actions';
import { getAllStates } from '@/lib/dryday';
import { utcTimestamptzToIstInput } from '@/lib/admin/time';
import {
  NOTICE_SEVERITIES,
  NOTICE_SEVERITY_META,
  type NoticeInput,
  type NoticeRow,
} from '@/lib/admin/types';
import { cn } from '@/lib/utils';
import {
  FieldError,
  FormAlert,
  Hint,
  fieldA11y,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from './FormBits';

interface NoticeFormProps {
  initial?: NoticeRow;
}

interface FormState {
  title: string;
  body: string;
  severity: string;
  state: string;
  starts_at: string;
  ends_at: string;
  is_published: boolean;
}

const DEFAULT_STATE: FormState = {
  title: '',
  body: '',
  severity: 'info',
  state: '',
  starts_at: '',
  ends_at: '',
  is_published: false,
};

function stateFromRow(row: NoticeRow): FormState {
  return {
    title: row.title,
    body: row.body,
    severity: row.severity,
    state: row.state ?? '',
    starts_at: utcTimestamptzToIstInput(row.starts_at),
    ends_at: utcTimestamptzToIstInput(row.ends_at),
    is_published: row.is_published,
  };
}

export default function NoticeForm({ initial }: NoticeFormProps) {
  const router = useRouter();
  const isEdit = !!initial;
  const states = getAllStates();

  const [values, setValues] = useState<FormState>(() =>
    initial ? stateFromRow(initial) : DEFAULT_STATE
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const input: NoticeInput = {
        title: values.title,
        body: values.body,
        severity: values.severity,
        state: values.state,
        starts_at: values.starts_at,
        ends_at: values.ends_at,
        is_published: values.is_published,
      };

      try {
        const result = await saveNoticeAction(input, initial?.id);

        if (result.ok) {
          router.push(`/admin/notices?${isEdit ? 'updated' : 'created'}=1`);
          router.refresh();
          return;
        }
        if (result.code === 'unauthenticated') {
          router.push('/admin/login');
          return;
        }
        if (result.code === 'forbidden') {
          router.push('/admin/login?error=forbidden');
          return;
        }
        if (result.errors) {
          setErrors(result.errors);
          setFormError('Fix the highlighted fields and try again.');
          const firstKey = Object.keys(result.errors)[0];
          if (firstKey) {
            window.setTimeout(() => document.getElementById(`field-${firstKey}`)?.focus(), 0);
          }
          return;
        }
        setFormError(result.error ?? 'Could not save the notice.');
      } catch {
        setFormError('Could not reach the server. Check your connection and try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormAlert error={formError} />

      <div>
        <label htmlFor={fieldA11y('title', errors).id} className={labelClass}>
          Title <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Reduced timings on Republic Day"
          className={inputClass}
          {...fieldA11y('title', errors)}
        />
        <FieldError name="title" errors={errors} />
      </div>

      <div>
        <label htmlFor={fieldA11y('body', errors).id} className={labelClass}>
          Body <span className="text-rose-400">*</span>
        </label>
        <textarea
          value={values.body}
          onChange={(e) => set('body', e.target.value)}
          rows={4}
          placeholder="What should visitors know?"
          className={inputClass}
          {...fieldA11y('body', errors)}
        />
        <FieldError name="body" errors={errors} />
      </div>

      {/* Severity */}
      <fieldset
        id="field-severity"
        aria-describedby={errors.severity ? 'field-severity-error' : undefined}
        className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4"
      >
        <legend className="px-1 text-xs font-semibold text-neutral-300">
          Severity <span className="text-rose-400">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {NOTICE_SEVERITIES.map((severity) => {
            const meta = NOTICE_SEVERITY_META[severity];
            const checked = values.severity === severity;
            return (
              <label
                key={severity}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors',
                  checked
                    ? 'border-amber-500/60 bg-amber-500/5'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                )}
              >
                <input
                  type="radio"
                  name="severity"
                  value={severity}
                  checked={checked}
                  onChange={() => set('severity', severity)}
                  className="h-4 w-4 accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                />
                <span
                  className={cn(
                    'inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                    meta.badge
                  )}
                >
                  {meta.label}
                </span>
              </label>
            );
          })}
        </div>
        <FieldError name="severity" errors={errors} />
      </fieldset>

      {/* State scope */}
      <div>
        <label htmlFor={fieldA11y('state', errors).id} className={labelClass}>
          State scope (optional)
        </label>
        <select
          value={values.state}
          onChange={(e) => set('state', e.target.value)}
          className={inputClass}
          {...fieldA11y('state', errors, 'notice-state-hint')}
        >
          <option value="">Pan-India / site-wide (no state)</option>
          {states.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} ({s.slug})
            </option>
          ))}
        </select>
        <FieldError name="state" errors={errors} />
        <Hint name="state">
          Leave empty to show the notice to everyone. Otherwise it only appears for the chosen
          state.
        </Hint>
      </div>

      {/* Publication window (IST inputs, stored as UTC) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldA11y('starts_at', errors).id} className={labelClass}>
            Window start (optional)
          </label>
          <input
            type="datetime-local"
            value={values.starts_at}
            onChange={(e) => set('starts_at', e.target.value)}
            className={inputClass}
            {...fieldA11y('starts_at', errors, 'starts-at-note')}
          />
          <FieldError name="starts_at" errors={errors} />
          <Hint name="starts_at">Indian Standard Time (IST, UTC+5:30). Stored as UTC.</Hint>
        </div>
        <div>
          <label htmlFor={fieldA11y('ends_at', errors).id} className={labelClass}>
            Window end (optional)
          </label>
          <input
            type="datetime-local"
            value={values.ends_at}
            onChange={(e) => set('ends_at', e.target.value)}
            className={inputClass}
            {...fieldA11y('ends_at', errors, 'ends-at-note')}
          />
          <FieldError name="ends_at" errors={errors} />
          <Hint name="ends_at">
            Inclusive: still visible at this exact moment (UTC). Empty = open-ended.
          </Hint>
        </div>
      </div>

      {/* Publication */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <input
          type="checkbox"
          checked={values.is_published}
          onChange={(e) => set('is_published', e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
          aria-describedby="notice-publish-hint"
        />
        <span>
          <span className="text-sm font-semibold text-neutral-200">
            Published — visible on the public site
          </span>
          <span id="notice-publish-hint" className="mt-0.5 block text-xs text-neutral-500">
            Published notices also respect the window above: outside the window they stay hidden.
          </span>
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-5 sm:flex-row sm:justify-end">
        <Link href="/admin/notices" className={cn(secondaryButtonClass, 'no-underline')}>
          Cancel
        </Link>
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create notice'}
        </button>
      </div>
    </form>
  );
}
