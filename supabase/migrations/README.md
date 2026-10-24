# Supabase migrations

Phase 2 foundation only. Apply **in numeric order**. Every file is idempotent
(safe to re-run after a partial failure). No sample data is inserted, no rows
are deleted, and legacy data is never silently modified — conflicts fail with an
explicit error or NOTICE instead.

| File | Purpose |
|---|---|
| `0001_admin_users.sql` | Admin membership table, `set_updated_at()` trigger helper, F8 last-admin lockout guard |
| `0002_dry_days.sql` | Dry-day records (state, date, type, locality, time, source, publish); F2/F3 legacy reconciliation + validation |
| `0003_public_notices.sql` | Notices with publication windows (F12 inclusive window semantics) |
| `0004_rls_policies.sql` | `is_admin()`, `add_admin_user()`, RLS policies, owner bypass (F1), F9 column grants |

### Migration order dependency (M-1)

`public.set_updated_at()` is created in **0001** and is consumed by the
triggers in **0002** (`dry_days_set_updated_at`) and **0003**
(`public_notices_set_updated_at`). Both later files run
`drop trigger if exists … ; create trigger … execute function
public.set_updated_at();`.

**Apply 0001 → 0002 → 0003 → 0004 in that order.** Applying 0002 or 0003 on
their own against a database where 0001 has not run fails with
`function public.set_updated_at() does not exist`. The function is created
with `CREATE OR REPLACE`, so re-running 0001 never breaks the dependent
triggers.

## Prerequisites

- A **Supabase project** (these migrations depend on `auth.users` and the roles
  `anon`, `authenticated`, `service_role`). They are NOT runnable against a
  vanilla PostgreSQL database without first creating the Supabase auth schema.
- Applied by the project owner (`postgres`) — the SQL editor default.
- **Runtime status:** statically reviewed only (F1–F12). There was no reachable
  database during review, so these migrations are **NOT runtime-verified**.
  Apply to a staging project first and run the smoke queries below.

### Pre-inspection (run before applying to a database that already has data)

```sql
-- 1. Required columns must exist on a legacy dry_days table:
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'dry_days'
order by ordinal_position;

-- Legacy table must already have: state, dry_date, type.
-- If an old 'status' column exists it is renamed to verification_status (F2).
-- If BOTH exist, verification_status is backfilled from status and the legacy
-- 'status' column is PRESERVED (M-2) — it is never dropped automatically.

-- 2. Unsupported values (0002 fails fast with the offending values listed):
select distinct type from public.dry_days
where type is null or type not in ('national','festival','election','state','local');

select distinct verification_status from public.dry_days
where verification_status is not null
  and verification_status not in ('confirmed','pending','reported');

-- 3. Duplicate groups (0002 now FAILS FAST and lists them; nothing is deleted):
select state, dry_date, type, coalesce(locality,''), count(*)
from public.dry_days
group by 1, 2, 3, 4
having count(*) > 1;
```

## Safe application (manual)

Do not run against production without review.

### Option A — Supabase Dashboard (SQL Editor)

1. Open your project → **SQL Editor**.
2. Run each file above **in numeric order**, one at a time.
3. Confirm success messages.

If a file fails partway (e.g. 0002 F3 data validation), fix the reported data
and **re-run the same file** — the failed run is rolled back and every step is
idempotent.

### Option B — Supabase CLI (local/staging)

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Smoke queries after applying

```sql
select relrowsecurity, relforcerowsecurity
from pg_class
where oid in ('public.admin_users'::regclass,
              'public.dry_days'::regclass,
              'public.public_notices'::regclass);
-- expect t/t for all three (ENABLE + FORCE kept, F1)

select policyname from pg_policies
where schemaname = 'public' and tablename = 'admin_users';
-- expect the four admin policies plus <table>_owner_bypass (F1)
```

## Bootstrap first admin

These migrations do **not** create admin rows. After a user signs up via Auth:

```sql
-- Replace with the real auth.users.id from Authentication → Users
insert into public.admin_users (user_id, email)
values ('USER_UUID_FROM_AUTH', 'admin@example.com')
on conflict (user_id) do nothing;
```

Run that in the SQL Editor as the project owner (bypasses RLS), or use the
service role from a **server-only** script with a direct `INSERT` (service_role
bypasses RLS and is deliberately **not** granted `execute` on
`add_admin_user()` — F10). Never call this from browser code.

## Known behaviors and limitations (review findings)

- **F1 — RLS on owners:** `ENABLE` + `FORCE ROW LEVEL SECURITY` stays on all
  three tables. Owner bypass policies (`<table>_owner_bypass`, plus
  `<table>_owner_postgres_bypass` when the migration role is not `postgres`)
  keep SECURITY DEFINER helpers working under FORCE. **Do not change the
  ownership** of `is_admin()`, `add_admin_user()` or `prevent_admin_lockout()` —
  they must remain owned by the migration role. If a membership check ever runs
  as a role with no access to `admin_users`, it errors out (fails closed, never
  open).
- **F5 — overnight times:** `time_start <= time_end` is enforced; a range that
  wraps past midnight (e.g. `22:00`–`02:00`) cannot be stored and must be split
  into two rows or handled at date level (Phase 3 decision).
- **F8 — last-admin lockout:** deleting the final `admin_users` row is refused
  by trigger. Emergency escape (owner only):

  ```sql
  alter table public.admin_users disable trigger admin_users_prevent_lockout;
  -- …perform the delete…
  alter table public.admin_users enable trigger admin_users_prevent_lockout;
  ```

  `TRUNCATE` bypasses row triggers (owner-only; documented limitation).
- **F9 — column grants:** `anon` has column-level `SELECT` on `dry_days` and
  `public_notices` **excluding `created_by`**, and no privileges at all on
  `admin_users`. `authenticated` keeps table-level `SELECT` including
  `created_by` — accepted for Phase 2 (a UUID, no other PII).
- **F11 — unique index:** `dry_days_state_date_type_locality_idx` is created only
  when no duplicate `(state, dry_date, type, locality)` groups exist.
  **M-4 (hardened):** duplicates are now a **hard error** that lists the
  offending groups and the number of rows involved — the migration no longer
  prints a NOTICE and continues. Nothing is deleted, merged or guessed;
  resolve the data manually and re-run. If you already ran the previous
  version of this migration and it skipped the index with a NOTICE, the
  duplicates are still present — the re-run will now fail loudly until you
  resolve them.
- **F12 — notice windows:** `starts_at <= now() <= ends_at`, bounds inclusive,
  evaluated in UTC; `null` bound = unbounded on that side.
- **F2 — legacy `status` column (M-2):** if a pre-existing `dry_days` table
  has BOTH `status` and `verification_status`, NULL `verification_status`
  values are backfilled from `status` and **the `status` column is PRESERVED,
  not dropped**. The previous version dropped it, which silently removed an
  existing column. The column is now redundant but harmless — remove it
  deliberately with `alter table public.dry_days drop column status;` if you
  want it gone.
- **Rollback is not supported:** these migrations are forward-only and
  non-destructive, but reverting them (e.g. dropping policies/columns) can
  strand data. Restore from a backup instead.

## Security notes

- `is_admin()` is `SECURITY DEFINER` with `search_path = ''` so membership
  checks neither recurse through RLS nor depend on `search_path`.
- Anonymous clients can only `SELECT` published dry days and published notices
  inside their time window, without `created_by`.
- Only members of `admin_users` can insert/update/delete; anon cannot
  self-promote.
- `SUPABASE_SERVICE_ROLE_KEY` must never be used in client components.
