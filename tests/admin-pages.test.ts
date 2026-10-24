import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('@/lib/supabase/server', () => ({ createServerClient: vi.fn() }));
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
import { createServerClient } from '@/lib/supabase/server';
import ProtectedAdminLayout from '@/app/admin/(protected)/layout';
import DryDaysAdminPage from '@/app/admin/(protected)/dry-days/page';
import { createMockSupabase, type MockSupabase } from './helpers/mock-supabase';

const mockCreateServerClient = vi.mocked(createServerClient);
const mockRedirect = vi.mocked(redirect);

function useMock(mock: MockSupabase) {
  mockCreateServerClient.mockResolvedValue(mock as never);
}

function unauthenticatedMock(): MockSupabase {
  return createMockSupabase({ user: null });
}

function nonAdminMock(): MockSupabase {
  return createMockSupabase({
    user: { id: 'user-plain', email: 'plain@example.com' },
    tables: { admin_users: { data: null, error: null } },
  });
}

function adminMock(tables: Record<string, { data?: unknown; error?: { message: string; code?: string } | null; count?: number | null }> = {}): MockSupabase {
  return createMockSupabase({
    user: { id: 'admin-1', email: 'admin@example.com' },
    tables: {
      admin_users: { data: { user_id: 'admin-1' }, error: null },
      ...tables,
    },
  });
}

const DRY_DAY_ROW = {
  id: '11111111-1111-4111-8111-111111111111',
  state: 'karnataka',
  dry_date: '2026-10-21',
  type: 'local' as const,
  reason: 'Procession restrictions in Yelahanka',
  verification_status: 'reported' as const,
  source_url: 'https://news.example.com/report',
  source_note: null,
  source_type: 'news' as const,
  locality: 'Yelahanka zone',
  time_start: '09:00',
  time_end: '22:00',
  is_published: false,
  created_by: 'admin-1',
  created_at: '2026-10-01T00:00:00+00:00',
  updated_at: '2026-10-01T00:00:00+00:00',
};

beforeEach(() => {
  mockCreateServerClient.mockReset();
  mockRedirect.mockClear();
});

describe('admin page guards (server-side membership checks)', () => {
  test('layout: unauthenticated redirects to /admin/login', async () => {
    const mock = unauthenticatedMock();
    useMock(mock);
    await expect(
      ProtectedAdminLayout({ children: null })
    ).rejects.toThrow('NEXT_REDIRECT:/admin/login');
    expect(mockRedirect).toHaveBeenCalledWith('/admin/login');
    // redirected before any data access
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('layout: authenticated non-admin redirects to the forbidden banner', async () => {
    useMock(nonAdminMock());
    await expect(ProtectedAdminLayout({ children: null })).rejects.toThrow(
      'NEXT_REDIRECT:/admin/login?error=forbidden'
    );
  });

  test('layout: admin renders the shell with nav and email', async () => {
    useMock(adminMock());
    const tree = await ProtectedAdminLayout({ children: null });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toContain('admin@example.com');
    expect(markup).toContain('Sign out');
    expect(markup).toContain('Dry Days');
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  test('dry-days page: unauthenticated redirects to login without fetching rows', async () => {
    const mock = unauthenticatedMock();
    useMock(mock);
    await expect(
      DryDaysAdminPage({ searchParams: Promise.resolve({}) })
    ).rejects.toThrow('NEXT_REDIRECT:/admin/login');
    expect(mock.fromCalls).toHaveLength(0);
  });

  test('dry-days page: authenticated non-admin redirects to forbidden', async () => {
    useMock(nonAdminMock());
    await expect(DryDaysAdminPage({ searchParams: Promise.resolve({}) })).rejects.toThrow(
      'NEXT_REDIRECT:/admin/login?error=forbidden'
    );
  });

  test('dry-days page: admin renders records with action controls', async () => {
    useMock(adminMock({ dry_days: { data: [DRY_DAY_ROW], error: null, count: 1 } }));

    const tree = await DryDaysAdminPage({ searchParams: Promise.resolve({}) });
    const markup = renderToStaticMarkup(tree);

    expect(mockRedirect).not.toHaveBeenCalled();
    expect(markup).toContain('Procession restrictions in Yelahanka');
    expect(markup).toContain('Local — not statewide');
    expect(markup).toContain('Reported (news only)');
    expect(markup).toContain('Unpublish');
    expect(markup).toContain('Delete');
    expect(markup).toContain('New dry day');
  });

  test('dry-days page: database error is surfaced to the admin', async () => {
    useMock(
      adminMock({
        dry_days: { data: null, error: { code: '42501', message: 'RLS denied' }, count: null },
      })
    );

    const tree = await DryDaysAdminPage({ searchParams: Promise.resolve({}) });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toMatch(/permission/i);
  });

  test('dry-days page: empty result shows the empty state', async () => {
    useMock(adminMock({ dry_days: { data: [], error: null, count: 0 } }));

    const tree = await DryDaysAdminPage({ searchParams: Promise.resolve({}) });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toContain('No dry days found');
    expect(markup).toContain('never fabricated');
  });

  test('dry-days page: success flash message renders after create', async () => {
    useMock(adminMock({ dry_days: { data: [], error: null, count: 0 } }));

    const tree = await DryDaysAdminPage({ searchParams: Promise.resolve({ created: '1' }) });
    const markup = renderToStaticMarkup(tree);
    expect(markup).toContain('Dry day created');
  });
});
