import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

import { SUPABASE_ENV_VARS } from '@/lib/supabase/config';

/**
 * Guards for how this app gets its environment on Cloudflare Workers Builds.
 *
 * `next build` statically inlines `process.env.NEXT_PUBLIC_*` into the
 * middleware, server and browser bundles. Workers Builds checks out a clean
 * tree, so the gitignored `.env*` files are never present there — the values
 * MUST be supplied as Workers Builds "Build variables and secrets" or the
 * deployed Worker permanently contains empty/placeholder configuration.
 * Setting them only as runtime Variables/Secrets cannot fix that, because the
 * deployed bundles never read those names back from `process.env`.
 */

const ROOT = path.resolve(__dirname, '..');

function read(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');
}

/** Application source files (tests and fixtures excluded) as absolute paths. */
function appSourceFiles(): string[] {
  const files: string[] = [];
  for (const target of ['middleware.ts', 'next.config.mjs', 'open-next.config.ts']) {
    files.push(path.join(ROOT, target));
  }
  for (const dir of ['app', 'lib', 'components', 'hooks']) {
    const relative = fs.readdirSync(path.join(ROOT, dir), { recursive: true }) as string[];
    for (const entry of relative) {
      if (/\.tsx?$/.test(entry)) files.push(path.join(ROOT, dir, entry));
    }
  }
  return files.filter((file) => fs.statSync(file).isFile());
}

describe('Cloudflare deployment environment contract', () => {
  test('local .env files stay gitignored so only dashboard Build variables reach Workers Builds', () => {
    const gitignore = read('.gitignore');
    expect(gitignore).toMatch(/^\.env\*$/m);
    expect(gitignore).toMatch(/^!\.env\.example$/m);
  });

  test('.env.example documents the exact variable names the application reads', () => {
    const example = read('.env.example');
    expect(example).toContain(SUPABASE_ENV_VARS.url);
    expect(example).toContain(SUPABASE_ENV_VARS.key);
  });

  test('Supabase variables are read only via static member expressions so Next.js inlines them at build', () => {
    // A dynamic `process.env[name]` lookup would silently resolve to
    // `undefined` in browser bundles and defeat build-time inlining, which is
    // exactly the failure mode that surfaces as
    // "Supabase is not configured for this deployment." in production.
    for (const file of appSourceFiles()) {
      const code = stripComments(fs.readFileSync(file, 'utf8'));
      expect(code, file).not.toMatch(/process\.env\s*\[/);
      expect(code, file).not.toMatch(/process\.env\s*\(\s*/);
    }

    const config = stripComments(read('lib/supabase/config.ts'));
    expect(config).toContain('process.env.NEXT_PUBLIC_SUPABASE_URL');
    expect(config).toContain('process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  });

  test('SUPABASE_SERVICE_ROLE_KEY is never referenced by application code or the Wrangler config', () => {
    // The admin backend authenticates with the browser-safe publishable key
    // and RLS; no runtime secret is required today. If server code ever needs
    // the service-role key it must be added as a Worker runtime Secret (never
    // NEXT_PUBLIC_, never a plain dashboard variable, never wrangler vars).
    for (const file of appSourceFiles()) {
      const code = stripComments(fs.readFileSync(file, 'utf8'));
      expect(code, file).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
    }
    expect(read('wrangler.jsonc')).not.toContain('SUPABASE_SERVICE_ROLE_KEY');
  });
});
