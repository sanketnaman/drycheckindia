'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type FormEvent } from 'react';
import { saveDryDayAction } from '@/app/admin/actions';
import { getAllStates } from '@/lib/dryday';
import {
  DRY_DAY_TYPE_LABELS,
  DRY_DAY_TYPES,
  SOURCE_TYPE_META,
  SOURCE_TYPES,
  VERIFICATION_META,
  VERIFICATION_STATUSES,
  type DryDayInput,
  type DryDayRow,
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

interface DryDayFormProps {
  initial?: DryDayRow;
}

interface FormState {
  reason: string;
  state: string;
  dry_date: string;
  type: string;
  verification_status: string;
  source_url: string;
  source_note: string;
  source_type: string;
  locality: string;
  time_start: string;
  time_end: string;
  is_published: boolean;
}

const DEFAULT_STATE: FormState = {
  reason: '',
  state: '',
  dry_date: '',
  type: 'state',
  verification_status: 'pending',
  source_url: '',
  source_note: '',
  source_type: '',
  locality: '',
  time_start: '',
  time_end: '',
  is_published: false,
};

function stateFromRow(row: DryDayRow): FormState {
  return {
    reason: row.reason,
    state: row.state,
    dry_date: row.dry_date,
    type: row.type,
    verification_status: row.verification_status,
    source_url: row.source_url ?? '',
    source_note: row.source_note ?? '',
    source_type: row.source_type ?? '',
    locality: row.locality ?? '',
    time_start: row.time_start ?? '',
    time_end: row.time_end ?? '',
    is_published: row.is_published,
  };
}

export default function DryDayForm({ initial }: DryDayFormProps) {
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
      const input: DryDayInput = {
        reason: values.reason,
        state: values.state,
        dry_date: values.dry_date,
        type: values.type,
        verification_status: values.verification_status,
        source_url: values.source_url,
        source_note: values.source_note,
        source_type: values.source_type,
        locality: values.locality,
        time_start: values.time_start,
        time_end: values.time_end,
        is_published: values.is_published,
      };

      try {
        const result = await saveDryDayAction(input, initial?.id);

        if (result.ok) {
          router.push(`/admin/dry-days?${isEdit ? 'updated' : 'created'}=1`);
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
        setFormError(result.error ?? 'Could not save the dry-day record.');
      } catch {
        setFormError('Could not reach the server. Check your connection and try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormAlert error={formError} />

      {values.type === 'local' && (
        <div className="rounded-xl border border-rose-800/70 bg-rose-950/50 px-4 py-3 text-xs text-rose-200">
          <strong className="font-bold">Local restriction:</strong> this record applies only to
          the named locality and is never shown as a statewide dry day.
        </div>
      )}

      {/* Occasion / reason */}
      <div>
        <label htmlFor={fieldA11y('reason', errors).id} className={labelClass}>
          Occasion / reason <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          value={values.reason}
          onChange={(e) => set('reason', e.target.value)}
          placeholder="e.g. Diwali — statewide prohibition"
          className={inputClass}
          {...fieldA11y('reason', errors)}
        />
        <FieldError name="reason" errors={errors} />
      </div>

      {/* State scope + dry date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldA11y('state', errors).id} className={labelClass}>
            State / UT scope <span className="text-rose-400">*</span>
          </label>
          <select
            value={values.state}
            onChange={(e) => set('state', e.target.value)}
            className={inputClass}
            {...fieldA11y('state', errors)}
          >
            <option value="">Select a state…</option>
            <option value="all">All India (nationwide)</option>
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.slug})
              </option>
            ))}
          </select>
          <FieldError name="state" errors={errors} />
        </div>

        <div>
          <label htmlFor={fieldA11y('dry_date', errors).id} className={labelClass}>
            Dry date <span className="text-rose-400">*</span>
          </label>
          <input
            type="date"
            value={values.dry_date}
            onChange={(e) => set('dry_date', e.target.value)}
            className={inputClass}
            {...fieldA11y('dry_date', errors)}
          />
          <FieldError name="dry_date" errors={errors} />
        </div>
      </div>

      {/* Type + locality */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldA11y('type', errors).id} className={labelClass}>
            Restriction type <span className="text-rose-400">*</span>
          </label>
          <select
            value={values.type}
            onChange={(e) => set('type', e.target.value)}
            className={inputClass}
            {...fieldA11y('type', errors)}
          >
            {DRY_DAY_TYPES.map((t) => (
              <option key={t} value={t}>
                {DRY_DAY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          <FieldError name="type" errors={errors} />
        </div>

        <div>
          <label htmlFor={fieldA11y('locality', errors).id} className={labelClass}>
            Affected area / locality{' '}
            {values.type === 'local' && <span className="text-rose-400">*</span>}
          </label>
          <input
            type="text"
            value={values.locality}
            onChange={(e) => set('locality', e.target.value)}
            placeholder={values.type === 'local' ? 'e.g. City police limits, Yelahanka zone' : 'Optional specific area'}
            className={inputClass}
            {...fieldA11y('locality', errors, 'locality-scope')}
          />
          <FieldError name="locality" errors={errors} />
          <Hint name="locality">
            {values.type === 'local'
              ? 'Required for local restrictions — the record is never applied statewide.'
              : 'Leave empty for full scope. If filled, it narrows the affected area.'}
          </Hint>
        </div>
      </div>

      {/* Verification status */}
      <fieldset
        id="field-verification_status"
        aria-describedby={
          errors.verification_status ? 'field-verification_status-error' : undefined
        }
        className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4"
      >
        <legend className="px-1 text-xs font-semibold text-neutral-300">
          Verification status <span className="text-rose-400">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {VERIFICATION_STATUSES.map((status) => {
            const meta = VERIFICATION_META[status];
            const checked = values.verification_status === status;
            return (
              <label
                key={status}
                className={cn(
                  'flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition-colors',
                  checked
                    ? 'border-amber-500/60 bg-amber-500/5'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'
                )}
              >
                <input
                  type="radio"
                  name="verification_status"
                  value={status}
                  checked={checked}
                  onChange={() => set('verification_status', status)}
                  className="mt-0.5 h-4 w-4 accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                />
                <span>
                  <span
                    className={cn(
                      'inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                      meta.badge
                    )}
                  >
                    {meta.label}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-snug text-neutral-500">
                    {meta.help}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <FieldError name="verification_status" errors={errors} />
      </fieldset>

      {/* Time window */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldA11y('time_start', errors).id} className={labelClass}>
            Start time (optional)
          </label>
          <input
            type="time"
            value={values.time_start}
            onChange={(e) => set('time_start', e.target.value)}
            className={inputClass}
            {...fieldA11y('time_start', errors, 'time-start-note')}
          />
          <FieldError name="time_start" errors={errors} />
          <Hint name="time_start">
            Local (IST) wall time, 24-hour HH:MM. Same day only — overnight ranges are not
            supported.
          </Hint>
        </div>
        <div>
          <label htmlFor={fieldA11y('time_end', errors).id} className={labelClass}>
            End time (optional)
          </label>
          <input
            type="time"
            value={values.time_end}
            onChange={(e) => set('time_end', e.target.value)}
            className={inputClass}
            {...fieldA11y('time_end', errors, 'time-end-note')}
          />
          <FieldError name="time_end" errors={errors} />
          <Hint name="time_end">Must not be earlier than the start time.</Hint>
        </div>
      </div>

      {/* Source */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldA11y('source_url', errors).id} className={labelClass}>
            Source URL (optional)
          </label>
          <input
            type="url"
            inputMode="url"
            value={values.source_url}
            onChange={(e) => set('source_url', e.target.value)}
            placeholder="https://…"
            className={inputClass}
            {...fieldA11y('source_url', errors, 'source-url-note')}
          />
          <FieldError name="source_url" errors={errors} />
          <Hint name="source_url">
            A real official or news link only. Leave empty if none exists — never invent one.
          </Hint>
        </div>
        <div>
          <label htmlFor={fieldA11y('source_type', errors).id} className={labelClass}>
            Source type (optional)
          </label>
          <select
            value={values.source_type}
            onChange={(e) => set('source_type', e.target.value)}
            className={inputClass}
            {...fieldA11y('source_type', errors)}
          >
            <option value="">Not specified</option>
            {SOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {SOURCE_TYPE_META[t]}
              </option>
            ))}
          </select>
          <FieldError name="source_type" errors={errors} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor={fieldA11y('source_note', errors).id} className={labelClass}>
          Notes (optional)
        </label>
        <textarea
          value={values.source_note}
          onChange={(e) => set('source_note', e.target.value)}
          rows={3}
          placeholder="Verification notes, caveats, import provenance…"
          className={inputClass}
          {...fieldA11y('source_note', errors)}
        />
        <FieldError name="source_note" errors={errors} />
      </div>

      {/* Publication */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <input
          type="checkbox"
          checked={values.is_published}
          onChange={(e) => set('is_published', e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
          aria-describedby="publish-hint"
        />
        <span>
          <span className="text-sm font-semibold text-neutral-200">
            Published — visible on the public site
          </span>
          <span id="publish-hint" className="mt-0.5 block text-xs text-neutral-500">
            Unpublished records are kept as drafts and only admins can see them.
          </span>
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/admin/dry-days"
          className={cn(secondaryButtonClass, 'no-underline')}
        >
          Cancel
        </Link>
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create dry day'}
        </button>
      </div>
    </form>
  );
}
