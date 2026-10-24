import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// Keep the real isSupabaseNotConfigured() type guard; only the client factory
// is replaced so we can simulate an unconfigured deployment.
vi.mock('@/lib/supabase/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/supabase/server')>();
  return {
    ...actual,
    createServerClient: vi.fn(),
  };
});
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return {
    ...actual,
    redirect: vi.fn((url: string) => {
      throw new Error(`NEXT_REDIRECT:${url}`);
    }),
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND');
    }),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/admin/dry-days',
  };
});

import { redirect } from 'next/navigation';
import {
  createServerClient,
  isSupabaseNotConfigured,
  SupabaseNotConfiguredError,
} from '@/lib/supabase/server';
import ProtectedAdminLayout from '@/app/admin/(protected)/layout';
import DryDaysAdminPage from '@/app/admin/(protected)/dry-days/page';
import NoticesAdminPage from '@/app/admin/(protected)/notices/page';
import AdminDashboardPage from '@/app/admin/(protected)/page';
import NewDryDayPage from '@/app/admin/(protected)/dry-days/new/page';
import NewNoticePage from '@/app/admin/(protected)/notices/new/page';
import AdminLoginPage from '@/app/admin/login/page';
import {
  deleteDryDayAction,
  deleteNoticeAction,
  saveDryDayAction,
  saveNoticeAction,
  setDryDayPublishedAction,
  setNoticePublishedAction,
} from '@/app/admin/actions';

const mockCreateServerClient = vi.mocked(createServerClient);
const mockRedirect = vi.mocked(redirect);

const ROW_ID = '11111111-1111-4111-8111-111111111111';
const NOTICE_ID = '22222222-2222-4222-8222-222222222222';

function unconfiguredError(): SupabaseNotConfiguredError {
  return new SupabaseNotConfiguredError({
    ok: false,
    reason: 'placeholder',
    message: 'The configured Supabase values are still placeholders from .env.example.',
  });
}

beforeEach(() => {
  mockCreateServerClient.mockReset();
  mockRedirect.mockClear();
  mockCreateServerClient.mockRejectedValue(unconfiguredError());
});

describe('admin pages degrade gracefully when Supabase is not configured', () => {
  test('the typed error is recognised by the guard', () => {
    expect(isSupabaseNotConfigured(unconfiguredError())).toBe(true);
    expect(isSupabaseNotConfigured(new Error('boom'))).toBe(false);
  });

  test('layout renders the unavailable notice instead of throwing', async () => {
    const tree = await ProtectedAdminLayout({ children: null });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toContain('Admin area is unavailable');
    expect(markup).toContain('Supabase is not configured');
    // Must NOT redirect into a loop with the login page.
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('layout does not leak configuration values', async () => {
    const tree = await ProtectedAdminLayout({ children: null });
    const markup = renderToStaticMarkup(tree);
    expect(markup).not.toContain('YOUR_PROJECT_REF');
    expect(markup).not.toContain('YOUR_PUBLISHABLE_OR_ANON_KEY');
  });

  test('dry-days page renders the unavailable notice', async () => {
    const tree = await DryDaysAdminPage({ searchParams: Promise.resolve({}) });
    expect(renderToStaticMarkup(tree)).toContain('Admin area is unavailable');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('notices page renders the unavailable notice', async () => {
    const tree = await NoticesAdminPage({ searchParams: Promise.resolve({}) });
    expect(renderToStaticMarkup(tree)).toContain('Admin area is unavailable');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('dashboard renders the unavailable notice', async () => {
    const tree = await AdminDashboardPage();
    expect(renderToStaticMarkup(tree)).toContain('Admin area is unavailable');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('new dry-day page renders the unavailable notice', async () => {
    const tree = await NewDryDayPage();
    expect(renderToStaticMarkup(tree)).toContain('Admin area is unavailable');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('new notice page renders the unavailable notice', async () => {
    const tree = await NewNoticePage();
    expect(renderToStaticMarkup(tree)).toContain('Admin area is unavailable');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('login page renders the unavailable notice instead of a 500', async () => {
    const tree = await AdminLoginPage({ searchParams: Promise.resolve({}) });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toContain('Admin area is unavailable');
    expect(markup).toContain('Supabase is not configured');
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});

describe('server actions fail closed and never throw when unconfigured', () => {
  const validDryDay = {
    reason: 'Diwali',
    state: 'maharashtra',
    dry_date: '2026-10-20',
    type: 'state',
    verification_status: 'confirmed',
    source_url: 'https://example.gov.in/order',
    is_published: true,
  };

  const validNotice = {
    title: 'Holiday timings',
    body: 'Shops close early.',
    severity: 'warning',
    state: '',
    starts_at: '2026-01-26T00:00',
    ends_at: '2026-01-26T18:00',
    is_published: true,
  };

  test('saveDryDayAction returns a safe result, not a thrown error', async () => {
    const result = await saveDryDayAction(validDryDay);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
    expect(result.error).toContain('not configured');
  });

  test('deleteDryDayAction returns a safe result', async () => {
    const result = await deleteDryDayAction(ROW_ID);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
  });

  test('setDryDayPublishedAction returns a safe result', async () => {
    const result = await setDryDayPublishedAction(ROW_ID, true);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
  });

  test('saveNoticeAction returns a safe result', async () => {
    const result = await saveNoticeAction(validNotice);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
  });

  test('deleteNoticeAction returns a safe result', async () => {
    const result = await deleteNoticeAction(NOTICE_ID);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
  });

  test('setNoticePublishedAction returns a safe result', async () => {
    const result = await setNoticePublishedAction(NOTICE_ID, true);
    expect(result.ok).toBe(false);
    expect(result.code).toBe('unavailable');
  });

  test('the unavailable message never contains configuration values', async () => {
    const result = await saveDryDayAction(validDryDay);
    expect(result.error).not.toContain('YOUR_PROJECT_REF');
    expect(result.error).not.toContain('YOUR_PUBLISHABLE_OR_ANON_KEY');
  });
});
