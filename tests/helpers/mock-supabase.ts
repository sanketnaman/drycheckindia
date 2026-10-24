/**
 * Chainable Supabase-like mock for unit tests.
 *
 * The mock resolves with a fixed response object ({ data, error, count }) for
 * ANY awaited query, and records every chained method call for assertions.
 * This exercises our data-layer code paths only — it does NOT execute
 * PostgreSQL, and therefore does NOT test real RLS policies.
 */

export interface MockQueryResponse {
  data?: unknown;
  error?: { code?: string; message: string } | null;
  count?: number | null;
}

export interface MockCall {
  method: string;
  args: unknown[];
}

export type MockResponseSource = MockQueryResponse | (() => MockQueryResponse);

export function createMockBuilder(response: MockResponseSource): unknown {
  const calls: MockCall[] = [];
  const resolveResponse = (): MockQueryResponse =>
    typeof response === 'function' ? response() : response;

  const target = {
    calls,
    then(
      onFulfilled?: (value: unknown) => unknown,
      onRejected?: (reason: unknown) => unknown
    ) {
      queueMicrotask(() => {
        try {
          onFulfilled?.(resolveResponse());
        } catch (err) {
          onRejected?.(err);
        }
      });
    },
  };

  return new Proxy(target, {
    get(t, prop, receiver) {
      if (prop === 'then') return t.then;
      if (typeof prop === 'symbol') return Reflect.get(t, prop, receiver);
      if (prop in t) return Reflect.get(t, prop, receiver);
      return (...args: unknown[]) => {
        calls.push({ method: String(prop), args });
        return receiver;
      };
    },
  });
}

export interface MockSupabaseOptions {
  user?: { id: string; email?: string | null } | null;
  getUserError?: { message: string } | null;
  throwGetUser?: boolean;
  signIn?: {
    error?: { message: string } | null;
    session?: { access_token: string } | null;
    throw?: boolean;
  };
  signOutError?: { message: string } | null;
  tables?: Record<string, MockResponseSource>;
}

export interface MockSupabase {
  fromCalls: { table: string }[];
  queryCalls: Record<string, MockCall[]>;
  auth: {
    getUser: () => Promise<{ data: { user: unknown }; error: { message: string } | null }>;
    signInWithPassword: (creds: {
      email: string;
      password: string;
    }) => Promise<{ data: { session: unknown }; error: { message: string } | null }>;
    signOut: () => Promise<{ error: { message: string } | null }>;
  };
  from: (table: string) => unknown;
}

export function createMockSupabase(options: MockSupabaseOptions = {}): MockSupabase {
  const tables = options.tables ?? {};
  const fromCalls: { table: string }[] = [];
  const queryCalls: Record<string, MockCall[]> = {};

  const mock: MockSupabase = {
    fromCalls,
    queryCalls,
    auth: {
      async getUser() {
        if (options.throwGetUser) throw new Error('network failure');
        return {
          data: { user: options.user ?? null },
          error: options.getUserError ?? null,
        };
      },
      async signInWithPassword() {
        if (options.signIn?.throw) throw new Error('network failure');
        return {
          data: { session: options.signIn?.session ?? null },
          error: options.signIn?.error ?? null,
        };
      },
      async signOut() {
        return { error: options.signOutError ?? null };
      },
    },
    from(table: string) {
      fromCalls.push({ table });
      const source: MockResponseSource = tables[table] ?? { data: [], error: null, count: 0 };
      const builder = createMockBuilder(source) as {
        calls: MockCall[];
      } & ((...args: unknown[]) => unknown);
      queryCalls[table] = builder.calls;
      return builder;
    },
  };

  return mock;
}
