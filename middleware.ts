import { createServerClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseConfigStatus } from '@/lib/supabase/config';

const SERVICE_UNAVAILABLE_MESSAGE = 'Service temporarily unavailable. Please try again shortly.';

/**
 * Refreshes the Supabase auth session on every /admin request and redirects
 * unauthenticated visitors to /admin/login. Membership (admin_users) is NOT
 * checked here — every protected page and server action verifies it server-side
 * via authorizeAdmin(). This middleware is an early gate only; layouts and
 * actions remain the authoritative checks (they fail closed without it).
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const path = request.nextUrl.pathname;

  const config = getSupabaseConfigStatus();
  if (!config.ok) {
    // Fail closed: never serve admin routes without a real configuration.
    // Placeholder values from .env.example are rejected here too — otherwise
    // /admin would pass this gate, fail auth, and bounce between
    // /admin/login and /admin/login?error=forbidden.
    //
    // /admin/login is allowed through so it can render a friendly
    // "not configured" panel instead of a raw JSON error body.
    if (path === '/admin/login') {
      return NextResponse.next({ request });
    }
    return NextResponse.json(
      { error: 'Supabase is not configured for this deployment.' },
      { status: 503 }
    );
  }

  const { url, key } = config;

  let user: User | null = null;
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // getUser() validates the session against Supabase and rotates tokens.
    ({ data: { user } } = await supabase.auth.getUser());
  } catch {
    return NextResponse.json({ error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  if (!user && path !== '/admin/login') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/login';
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
