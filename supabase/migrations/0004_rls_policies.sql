-- Migration: 0004_rls_policies
-- Phase 2 corrections: F1 (owner bypass policies so ENABLE+FORCE RLS is safe),
-- F6 (header now matches reality: admin-only INSERT policy exists), F7
-- (add_admin_user keeps the stored email when none is passed), F9 (anon gets
-- column-level SELECT excluding created_by), F10 (service_role loses execute on
-- add_admin_user), F12 (inclusive UTC window semantics documented).
-- Idempotent (drop + create policies, create or replace functions).
--
-- Security model
-- --------------
-- 1. ENABLE + FORCE row level security is kept on all three tables (defense in
--    depth, even against the table owner). F1 adds per-table owner bypass
--    policies so SECURITY DEFINER helpers owned by the migration role still
--    see rows when FORCE applies to that owner. Policies are created
--    dynamically for current_user (and postgres when it is a different role).
-- 2. is_admin() / add_admin_user() / prevent_admin_lockout() are SECURITY
--    DEFINER with search_path = ''. DO NOT change their ownership: they must
--    stay owned by the migration role (the table owner). If a policy on
--    admin_users ever calls is_admin() as a role with no access to admin_users,
--    the call errors out — it fails closed, never open.
-- 3. is_admin() SELECTs from admin_users while bypassing RLS on that table
--    (definer is owner/superuser), so policies on admin_users that call
--    is_admin() do NOT recurse.
-- 4. Anonymous/public clients:
--    - dry_days: SELECT only where is_published = true, and only a fixed column
--      list that excludes created_by (F9)
--    - public_notices: SELECT only where is_published = true AND now() is inside
--      the publication window (null starts_at/ends_at = open bound; bounds are
--      inclusive, evaluated in UTC — F12), column list excludes created_by (F9)
--    - No INSERT/UPDATE/DELETE for anon anywhere; table privileges for anon on
--      admin_users are revoked outright
-- 5. Authenticated non-admin users: no write access; no admin_users write.
--    They cannot grant themselves admin (INSERT policy requires is_admin()).
--    They retain table-level SELECT including created_by — accepted for Phase 2
--    (no PII beyond a UUID), documented in README.
-- 6. Admin members (admin_users row for auth.uid()): full CRUD on dry_days and
--    public_notices; manage other admin_users rows (still cannot bypass FKs or
--    the F8 last-admin lockout trigger).
-- 7. SUPABASE_SERVICE_ROLE_KEY must never appear in browser/client code.
--    Service role bypasses RLS and is for server-only use (not configured here).

-- ---------------------------------------------------------------------------
-- Helper: is_admin() — safe membership check without RLS recursion
-- F1/F2-hardening: search_path pinned to empty; every reference is schema-
-- qualified so a hostile search_path cannot redirect the lookup.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

comment on function public.is_admin() is
  'Returns true if auth.uid() is a member of public.admin_users. SECURITY DEFINER + empty search_path: membership check does not recurse through RLS on admin_users. Must stay owned by the migration role (see README).';

-- ---------------------------------------------------------------------------
-- admin_users RLS (ENABLE + FORCE kept; F1 owner bypass added)
-- ---------------------------------------------------------------------------
alter table public.admin_users enable row level security;
alter table public.admin_users force row level security;

drop policy if exists admin_users_select_self_or_admin on public.admin_users;
create policy admin_users_select_self_or_admin
  on public.admin_users
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
  );

-- F6: INSERT policy exists — admin-only (previously the header claimed there
-- was no insert path at all). Non-admin authenticated users and anon have no
-- working insert path -> cannot self-promote; service_role bypasses RLS.
drop policy if exists admin_users_insert_admin_only on public.admin_users;
create policy admin_users_insert_admin_only
  on public.admin_users
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists admin_users_update_admin_only on public.admin_users;
create policy admin_users_update_admin_only
  on public.admin_users
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists admin_users_delete_admin_only on public.admin_users;
create policy admin_users_delete_admin_only
  on public.admin_users
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- dry_days RLS (ENABLE + FORCE kept; F1 owner bypass added)
-- ---------------------------------------------------------------------------
alter table public.dry_days enable row level security;
alter table public.dry_days force row level security;

drop policy if exists dry_days_select_published on public.dry_days;
create policy dry_days_select_published
  on public.dry_days
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists dry_days_select_admin_all on public.dry_days;
create policy dry_days_select_admin_all
  on public.dry_days
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists dry_days_insert_admin on public.dry_days;
create policy dry_days_insert_admin
  on public.dry_days
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists dry_days_update_admin on public.dry_days;
create policy dry_days_update_admin
  on public.dry_days
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists dry_days_delete_admin on public.dry_days;
create policy dry_days_delete_admin
  on public.dry_days
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- public_notices RLS (ENABLE + FORCE kept; F1 owner bypass added)
-- F12: window check is inclusive (starts_at <= now() <= ends_at) in UTC;
-- null bound = unbounded. Documented only — no behavioral change.
-- ---------------------------------------------------------------------------
alter table public.public_notices enable row level security;
alter table public.public_notices force row level security;

drop policy if exists public_notices_select_published_active on public.public_notices;
create policy public_notices_select_published_active
  on public.public_notices
  for select
  to anon, authenticated
  using (
    is_published = true
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at >= now())
  );

drop policy if exists public_notices_select_admin_all on public.public_notices;
create policy public_notices_select_admin_all
  on public.public_notices
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists public_notices_insert_admin on public.public_notices;
create policy public_notices_insert_admin
  on public.public_notices
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists public_notices_update_admin on public.public_notices;
create policy public_notices_update_admin
  on public.public_notices
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists public_notices_delete_admin on public.public_notices;
create policy public_notices_delete_admin
  on public.public_notices
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- F1: owner bypass policies. FORCE RLS applies even to the table owner; the
-- SECURITY DEFINER helpers above are owned by the migration role. Without a
-- bypass policy for that role, FORCE would make their internal SELECT fail
-- (fails closed, but breaks admin checks). Policies are per-table, created for
-- current_user (name: <table>_owner_bypass) and for postgres when it is a
-- different existing role (name: <table>_owner_postgres_bypass).
-- Superusers (Supabase 'postgres') bypass RLS anyway; this keeps non-superuser
-- owners working too. Re-run safe: drop + create.
-- ---------------------------------------------------------------------------
do $$
declare
  v_tables constant text[] := array['admin_users', 'dry_days', 'public_notices'];
  v_roles name[];
  v_tbl text;
  v_role name;
  v_policy text;
begin
  select array(
    select r.rolname
    from pg_roles r
    where r.rolname = (current_user)::name
       or r.rolname = 'postgres'
    order by (r.rolname = current_user) desc, r.rolname
  ) into v_roles;

  foreach v_tbl in array v_tables loop
    foreach v_role in array v_roles loop
      if v_role = current_user then
        v_policy := v_tbl || '_owner_bypass';
      else
        v_policy := v_tbl || '_owner_postgres_bypass';
      end if;

      execute format(
        'drop policy if exists %I on public.%I', v_policy, v_tbl);
      execute format(
        'create policy %I on public.%I for all to %I using (true) with check (true)',
        v_policy, v_tbl, v_role);
    end loop;
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- F9: table privileges. anon loses blanket table access and receives only
-- column-level SELECT that excludes created_by on the content tables (RLS
-- still applies on top: published rows only, active window only).
-- authenticated keeps table-level SELECT (including created_by) — accepted for
-- Phase 2 and documented in README. service_role keeps everything (server-only).
-- ---------------------------------------------------------------------------
revoke all on public.admin_users from anon;
revoke all on public.dry_days from anon;
revoke all on public.public_notices from anon;

grant select (
    id, state, dry_date, type, reason, verification_status,
    source_url, source_note, source_type, locality,
    time_start, time_end, is_published, created_at, updated_at
  )
  on public.dry_days to anon;

grant select (
    id, title, body, severity, state,
    starts_at, ends_at, is_published, created_at, updated_at
  )
  on public.public_notices to anon;

comment on table public.dry_days is
  'Dry-day records. state is a state/UT slug or all. type=local requires locality and is not statewide. anon: column-level SELECT without created_by (F9); RLS limits to published rows.';

-- ---------------------------------------------------------------------------
-- Optional: grant self-service admin membership via SECURITY DEFINER RPC.
-- Only callable by already-authenticated users who are admins.
-- Bootstrap of the FIRST admin must use the table owner (SQL editor) or a
-- server-only script with service_role direct INSERT (F10: service_role is
-- intentionally NOT granted execute here).
-- F7: passing null email on an existing admin keeps the stored email instead
-- of overwriting it with NULL.
-- ---------------------------------------------------------------------------
create or replace function public.add_admin_user(target_user_id uuid, target_email text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;

  insert into public.admin_users (user_id, email)
  values (target_user_id, target_email)
  on conflict (user_id) do update
    set email = coalesce(excluded.email, public.admin_users.email),
        updated_at = now();
end;
$$;

revoke all on function public.add_admin_user(uuid, text) from public;
revoke all on function public.add_admin_user(uuid, text) from anon;
revoke all on function public.add_admin_user(uuid, text) from service_role;
grant execute on function public.add_admin_user(uuid, text) to authenticated;

comment on function public.add_admin_user(uuid, text) is
  'Admin-only helper to grant membership. Null target_email keeps the existing email (F7). First admin must be inserted by the table owner or service_role direct INSERT (not this RPC).';
