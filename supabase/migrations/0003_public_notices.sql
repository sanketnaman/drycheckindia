-- Migration: 0003_public_notices
-- Phase 2 corrections: F4 (conrelid-scoped constraint lookups),
-- F12 (inclusive, UTC publication window semantics — documented).
-- Public notices with publication windows. Idempotent.

create table if not exists public.public_notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  severity text not null default 'info'
    check (severity in ('info', 'warning', 'critical')),
  state text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_published boolean not null default false,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.public_notices is
  'Active public notices. Anonymous users see only published notices inside their publication window.';
comment on column public.public_notices.state is
  'Optional state/UT slug; null means pan-India / site-wide.';
-- F12: window semantics are inclusive and evaluated in UTC (documented only,
-- behavior unchanged): a notice is visible when starts_at <= now() and
-- ends_at >= now(); null bound = unbounded on that side.
comment on column public.public_notices.starts_at is
  'Publication window start, inclusive (null = open start). Visible when starts_at <= now(), evaluated in UTC (F12).';
comment on column public.public_notices.ends_at is
  'Publication window end, inclusive (null = open end). Visible through ends_at itself, evaluated in UTC (F12).';

alter table public.public_notices add column if not exists severity text not null default 'info';
alter table public.public_notices add column if not exists state text;
alter table public.public_notices add column if not exists starts_at timestamptz;
alter table public.public_notices add column if not exists ends_at timestamptz;
alter table public.public_notices add column if not exists is_published boolean not null default false;
alter table public.public_notices add column if not exists created_by uuid;
alter table public.public_notices add column if not exists created_at timestamptz not null default now();
alter table public.public_notices add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.public_notices'::regclass
      and conname = 'public_notices_severity_check'
  ) then
    alter table public.public_notices
      add constraint public_notices_severity_check
      check (severity in ('info', 'warning', 'critical'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.public_notices'::regclass
      and conname = 'public_notices_window_check'
  ) then
    alter table public.public_notices
      add constraint public_notices_window_check
      check (starts_at is null or ends_at is null or starts_at <= ends_at);
  end if;
end $$;

create index if not exists public_notices_published_window_idx
  on public.public_notices (is_published, starts_at, ends_at);
create index if not exists public_notices_state_idx on public.public_notices (state);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.public_notices'::regclass
      and conname = 'public_notices_created_by_fkey'
  ) then
    alter table public.public_notices
      add constraint public_notices_created_by_fkey
      foreign key (created_by) references auth.users (id) on delete set null;
  end if;
end $$;

drop trigger if exists public_notices_set_updated_at on public.public_notices;
create trigger public_notices_set_updated_at
  before update on public.public_notices
  for each row execute function public.set_updated_at();
