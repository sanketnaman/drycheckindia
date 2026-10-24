'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type FormEvent } from 'react';
import { signInWithEmail } from '@/lib/admin/auth';
import { createBrowserClient } from '@/lib/supabase/client';
import {
  FieldError,
  FormAlert,
  fieldA11y,
  inputClass,
  labelClass,
  primaryButtonClass,
} from '@/components/admin/FormBits';

interface LoginFormProps {
  forbidden?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ forbidden }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!EMAIL_RE.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      try {
        const supabase = createBrowserClient();
        const result = await signInWithEmail(supabase, email, password);

        if (result.ok) {
          router.push('/admin');
          router.refresh();
          return;
        }
        setFormError(result.error ?? 'Sign-in failed. Please try again.');
      } catch {
        setFormError('Supabase is not configured for this deployment.');
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
        <div className="border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Admin sign in</h1>
          <p className="mt-1 text-xs text-neutral-400">
            DryCheck India administration. Authorized accounts only.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {forbidden && (
            <div
              role="alert"
              className="rounded-xl border border-amber-700/60 bg-amber-950/50 px-4 py-3 text-xs text-amber-200"
            >
              This account is signed in but does not have admin access. Sign in with an authorized
              admin account, or go back to the{' '}
              <Link href="/" className="font-semibold underline underline-offset-2">
                public site
              </Link>
              .
            </div>
          )}

          <FormAlert error={formError} />

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor={fieldA11y('email', errors).id} className={labelClass}>
                Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={inputClass}
                {...fieldA11y('email', errors)}
              />
              <FieldError name="email" errors={errors} />
            </div>

            <div>
              <label htmlFor={fieldA11y('password', errors).id} className={labelClass}>
                Password <span className="text-rose-400">*</span>
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                {...fieldA11y('password', errors)}
              />
              <FieldError name="password" errors={errors} />
            </div>

            <button type="submit" disabled={pending} className={primaryButtonClass}>
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-neutral-500">
        <Link href="/" className="text-amber-400 hover:underline">
          ← Back to drycheck.in
        </Link>
      </p>
    </div>
  );
}
