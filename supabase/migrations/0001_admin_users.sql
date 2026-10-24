-- Migration: 0001_admin_users
-- Phase 2 corrections: F4 (conrelid-scoped constraint lookup), F8 (last-admin lockout guard).
-- Idempotent; safe if table already exists. Does not delete or modify existing rows.
--
-- Prerequisite: Supabase project (requires auth.users and roles anon/authenticated/service_role).

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'admin'
    check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admin_users is
  'Authorized admin identities. Rows are created only by existing admins or via owner/service-role bootstrap. Never writable by anonymous clients (RLS in 0004).';

-- Add columns if an older/partial table already exists
alter table public.admin_users add column if not exists email text;
alter table public.admin_users add column if not exists role text not null default 'admin';
alter table public.admin_users add column if not exists created_at timestamptz not null default now();
alter table public.admin_users add column if not exists updated_at timestamptz not null default now();

-- F4: scope the existence check to THIS table (pg_constraint.conname is not unique across tables)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.admin_users'::regclass
      and conname = 'admin_users_role_check'
  ) then
    alter table public.admin_users
      add constraint admin_users_role_check check (role in ('admin'));
  end if;
end $$;

create index if not exists admin_users_user_id_idx on public.admin_users (user_id);

-- updated_at trigger (idempotent)
--
-- M-1: public.set_updated_at() is a SHARED helper. It is created here (0001)
-- because admin_users is the first table that needs it, and it is consumed by
-- the later migrations:
--   * 0002_dry_days.sql       -> trigger dry_days_set_updated_at
--   * 0003_public_notices.sql -> trigger public_notices_set_updated_at
-- Both later files `drop trigger if exists ... ; create trigger ...` and then
-- `execute function public.set_updated_at()`. If this function is missing,
-- those migrations fail with "function public.set_updated_at() does not
-- exist" and the table keeps its trigger from a previous run only.
--
-- Therefore 0001 MUST be applied before 0002 and 0003. Do not apply 0002 or
-- 0003 on their own to a fresh database. The function is intentionally
-- CREATE OR REPLACE so re-running 0001 never breaks the dependent triggers.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Shared BEFORE UPDATE trigger helper that stamps new.updated_at = now(). Created in 0001_admin_users.sql and consumed by 0002 (dry_days) and 0003 (public_notices). Apply 0001 before 0002/0003.';

drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- F8: Prevent removing the last admin (lockout / accidental self-lockout).
-- SECURITY DEFINER (owned by the migration role = table owner) so the count is
-- computed against all rows even if caller RLS visibility changes later.
-- Behavior: DELETE is refused whenever <= 1 row would remain. Promote another
-- admin first. Emergency escape (documented in README): owner may
-- ALTER TABLE admin_users DISABLE TRIGGER admin_users_prevent_lockout; …; re-enable.
-- TRUNCATE bypasses row triggers (owner-only; documented limitation).
-- ---------------------------------------------------------------------------
create or replace function public.prevent_admin_lockout()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.admin_users) <= 1 then
    raise exception 'admin_users: refusing to remove the last admin (lockout prevention). Promote another admin first.';
  end if;
  return old;
end;
$$;

revoke all on function public.prevent_admin_lockout() from public;
revoke all on function public.prevent_admin_lockout() from anon;
revoke all on function public.prevent_admin_lockout() from authenticated;

drop trigger if exists admin_users_prevent_lockout on public.admin_users;
create trigger admin_users_prevent_lockout
  before delete on public.admin_users
  for each row execute function public.prevent_admin_lockout();
