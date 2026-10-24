-- Migration: 0002_dry_days
-- Phase 2 corrections: F2 (rename status -> verification_status BEFORE merge),
-- F3 (fail-fast data validation BEFORE check constraints), F4 (conrelid-scoped
-- constraint lookups), F5 (kept time range check, documented overnight
-- limitation), F11 (conditional unique index, never silently alters data).
-- Idempotent; preserves existing rows and columns (non-destructive).
--
-- Locality-specific (type = 'local') rows MUST carry locality and are never
-- treated as statewide by application logic.
-- Prerequisite: Supabase project (auth.users, roles). A pre-existing table must
-- already have state, dry_date and type columns (see README pre-inspection).

create table if not exists public.dry_days (
  id uuid primary key default gen_random_uuid(),
  state text not null,
  dry_date date not null,
  type text not null default 'state'
    check (type in ('national', 'festival', 'election', 'state', 'local')),
  reason text not null,
  verification_status text not null default 'pending'
    check (verification_status in ('confirmed', 'pending', 'reported')),
  source_url text,
  source_note text,
  source_type text
    check (source_type is null or source_type in ('official', 'gazette', 'news', 'other')),
  locality text,
  time_start time without time zone,
  time_end time without time zone,
  is_published boolean not null default false,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- F2a: legacy rename FIRST — only when 'status' exists and the new name does
-- not. Running the rename before any add/merge step makes the later steps
-- single-path and idempotent.
-- ---------------------------------------------------------------------------
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'dry_days' and column_name = 'status'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'dry_days' and column_name = 'verification_status'
  ) then
    alter table public.dry_days rename column status to verification_status;
    raise notice 'F2: renamed public.dry_days.status to verification_status';
  end if;
end $$;

-- Reconcile columns for pre-existing tables (non-destructive)
alter table public.dry_days add column if not exists source_note text;
alter table public.dry_days add column if not exists source_type text;
alter table public.dry_days add column if not exists locality text;
alter table public.dry_days add column if not exists time_start time without time zone;
alter table public.dry_days add column if not exists time_end time without time zone;
alter table public.dry_days add column if not exists is_published boolean not null default false;
alter table public.dry_days add column if not exists created_by uuid;
alter table public.dry_days add column if not exists created_at timestamptz not null default now();
alter table public.dry_days add column if not exists updated_at timestamptz not null default now();
alter table public.dry_days add column if not exists verification_status text default 'pending';

-- ---------------------------------------------------------------------------
-- F2b: BOTH columns still present (the rename could not run because the
-- target already existed).
--
-- M-2 (hardened): this block previously DROPPED the pre-existing 'status'
-- column after backfilling NULL verification_status from it. Dropping a column
-- that the owner created is destructive and cannot be undone by re-running
-- this file, and it silently changed an existing schema.
--
-- New behaviour:
--   * Divergent non-null pairs  -> hard error (human decides). Unchanged.
--   * NULL verification_status  -> backfilled from 'status' (non-destructive).
--   * The 'status' column is PRESERVED, never dropped. A NOTICE tells the
--     operator it is now redundant and how to remove it deliberately.
--
-- Rationale: the application only reads verification_status, so keeping the
-- legacy column is harmless and reversible. Removing it is a separate,
-- explicit decision that belongs to the schema owner.
-- ---------------------------------------------------------------------------
do $$
declare
  v_divergent bigint;
  v_backfilled bigint;
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'dry_days' and column_name = 'status'
  ) then
    select count(*) into v_divergent
    from public.dry_days
    where status is not null
      and verification_status is not null
      and status is distinct from verification_status;

    if v_divergent > 0 then
      raise exception
        'F2: both status and verification_status exist with % divergent row(s) on public.dry_days. Resolve the values manually, then re-run this migration. It will not guess which column wins.',
        v_divergent;
    end if;

    update public.dry_days
      set verification_status = status
      where verification_status is null and status is not null;

    get diagnostics v_backfilled = row_count;

    raise notice
      'F2: merged % row(s) from public.dry_days.status into verification_status. Column public.dry_days.status has been PRESERVED (it is now redundant but harmless). To remove it deliberately, run: alter table public.dry_days drop column status;',
      v_backfilled;
  end if;
end $$;

comment on table public.dry_days is
  'Dry-day records. state is a state/UT slug or all. type=local requires locality and is not statewide.';
comment on column public.dry_days.state is
  'State/UT slug (e.g. karnataka) or all for nationwide.';
comment on column public.dry_days.locality is
  'Required when type=local (e.g. police limits, districts). Never implies statewide scope.';
comment on column public.dry_days.verification_status is
  'confirmed = official; reported = news only; pending = unverified. pending/reported must not be shown as verified dry.';
comment on column public.dry_days.time_start is
  'Optional local start time (no time zone). Paired constraint requires time_start <= time_end: ranges that wrap past midnight are NOT representable and must be split into two rows (see F5 in README).';
comment on column public.dry_days.time_end is
  'Optional local end time (no time zone). Must be >= time_start (no overnight wrap; see F5 in README).';

-- ---------------------------------------------------------------------------
-- F3: validate legacy data BEFORE adding check constraints so bad values fail
-- with an explicit, actionable message instead of a generic constraint error.
-- Unsupported values are a hard error: this migration never invents or deletes
-- data. NULL verification_status is allowed (NOTICE only).
-- ---------------------------------------------------------------------------
do $$
declare
  v_missing text;
  v_bad_type text;
  v_bad_status text;
  v_null_status bigint;
begin
  select string_agg(req.col, ', ' order by req.col) into v_missing
  from (values ('state'), ('dry_date'), ('type')) as req(col)
  where not exists (
    select 1 from information_schema.columns c
    where c.table_schema = 'public' and c.table_name = 'dry_days'
      and c.column_name = req.col
  );

  if v_missing is not null then
    raise exception
      'F3: public.dry_days is missing required column(s): %. Run the pre-inspection queries in supabase/migrations/README.md first.',
      v_missing;
  end if;

  select string_agg(v, ', ' order by v) into v_bad_type
  from (
    select distinct coalesce(type, '<null>') as v
    from public.dry_days
    where type is null
       or type not in ('national', 'festival', 'election', 'state', 'local')
  ) s;

  if v_bad_type is not null then
    raise exception
      'F3: public.dry_days has unsupported type value(s): [%]. Allowed: national, festival, election, state, local. Fix the data, then re-run. This migration will not guess or delete values.',
      v_bad_type;
  end if;

  select string_agg(v, ', ' order by v) into v_bad_status
  from (
    select distinct verification_status as v
    from public.dry_days
    where verification_status is not null
      and verification_status not in ('confirmed', 'pending', 'reported')
  ) s;

  if v_bad_status is not null then
    raise exception
      'F3: public.dry_days has unsupported verification_status value(s): [%]. Allowed: confirmed, pending, reported. Fix the data, then re-run. This migration will not guess or delete values.',
      v_bad_status;
  end if;

  select count(*) into v_null_status
  from public.dry_days where verification_status is null;

  if v_null_status > 0 then
    raise notice
      'F3: % row(s) on public.dry_days have NULL verification_status (left unchanged; new rows default to ''pending'')',
      v_null_status;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- F4: every existence check is scoped with conrelid — pg_constraint.conname is
-- not unique across tables, so an unscoped lookup could skip a needed
-- constraint because a same-named one exists on a different table.
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_type_check'
  ) then
    alter table public.dry_days
      add constraint dry_days_type_check
      check (type in ('national', 'festival', 'election', 'state', 'local'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_verification_status_check'
  ) then
    alter table public.dry_days
      add constraint dry_days_verification_status_check
      check (verification_status in ('confirmed', 'pending', 'reported'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_source_type_check'
  ) then
    alter table public.dry_days
      add constraint dry_days_source_type_check
      check (source_type is null or source_type in ('official', 'gazette', 'news', 'other'));
  end if;

  -- Local restrictions must name a locality (never statewide-only)
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_local_requires_locality'
  ) then
    alter table public.dry_days
      add constraint dry_days_local_requires_locality
      check (type <> 'local' or locality is not null);
  end if;

  -- F5 (kept intentionally, documented limitation): paired times must satisfy
  -- time_start <= time_end. Ranges that wrap past midnight (e.g. 22:00-02:00)
  -- are NOT representable and must be split into two rows or moved to
  -- date-level logic in Phase 3. See README "Known limitations".
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_time_range_check'
  ) then
    alter table public.dry_days
      add constraint dry_days_time_range_check
      check (time_start is null or time_end is null or time_start <= time_end);
  end if;
end $$;

create index if not exists dry_days_state_date_idx on public.dry_days (state, dry_date);
create index if not exists dry_days_date_idx on public.dry_days (dry_date);
create index if not exists dry_days_published_idx on public.dry_days (is_published, dry_date);
create index if not exists dry_days_type_idx on public.dry_days (type);

-- ---------------------------------------------------------------------------
-- F11: unique index prevents duplicate declarations of the same dry day.
--
-- M-4 (hardened): this block previously printed a NOTICE and SKIPPED index
-- creation when duplicate groups existed. That left the application without
-- the uniqueness guarantee it assumes (the admin UI relies on it to report a
-- clean "already exists" error instead of storing a duplicate), and the
-- operator had to notice a NOTICE in the SQL editor to know.
--
-- New behaviour: duplicates are a HARD ERROR with a safe diagnostic that
-- lists the offending groups and how many rows are involved. Nothing is
-- deleted, merged or guessed — the operator resolves the data and re-runs.
-- The migration is still idempotent: when no duplicates exist the index is
-- created, and re-running skips creation if the index already exists.
--
-- locality is coalesced so NULL and '' group together (NULLs never compare
-- equal in a plain unique index).
-- ---------------------------------------------------------------------------
do $$
declare
  v_dup_groups bigint;
  v_dup_rows bigint;
  v_sample text;
begin
  select count(*), coalesce(sum(c), 0)
    into v_dup_groups, v_dup_rows
  from (
    select count(*) as c
    from public.dry_days
    group by state, dry_date, type, coalesce(locality, '')
    having count(*) > 1
  ) d;

  if v_dup_groups > 0 then
    select string_agg(
      format('%s / %s / %s / %s (x%s)', state, dry_date, type,
             coalesce(locality, '<none>'), c),
      E'\n  ' order by state, dry_date, type, coalesce(locality, '')
    )
    into v_sample
    from (
      select state, dry_date, type, coalesce(locality, '') as loc, count(*) as c
      from public.dry_days
      group by state, dry_date, type, coalesce(locality, '')
      having count(*) > 1
    ) d;

    raise exception
      'F11: % duplicate (state, dry_date, type, locality) group(s) covering % row(s) exist on public.dry_days, so the unique index dry_days_state_date_type_locality_idx was NOT created. Duplicates were NOT modified or deleted. Offending groups:\n  %\nResolve them manually (merge or delete the redundant rows), then re-run this migration.',
      v_dup_groups, v_dup_rows, v_sample;
  else
    create unique index if not exists dry_days_state_date_type_locality_idx
      on public.dry_days (state, dry_date, type, coalesce(locality, ''));
  end if;
end $$;

-- FK for created_by if missing (F4: scoped to this table)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.dry_days'::regclass
      and conname = 'dry_days_created_by_fkey'
  ) then
    alter table public.dry_days
      add constraint dry_days_created_by_fkey
      foreign key (created_by) references auth.users (id) on delete set null;
  end if;
end $$;

drop trigger if exists dry_days_set_updated_at on public.dry_days;
create trigger dry_days_set_updated_at
  before update on public.dry_days
  for each row execute function public.set_updated_at();
