-- 0001_schema.sql
-- BYDT Curious Minds — core schema (Milestone 1)
--
-- Data minimization is a design constraint, not a preference.
-- The children table holds a first name or alias and a birth year. Nothing
-- else. No full date of birth, no surname, no address, no school, no
-- location, no photo column on the child record. If a future migration
-- tries to add one, tests/schema/minimization.test.ts fails the build.

-- ---------- enums ----------

create type user_role as enum ('parent', 'steward');
create type spark_mode as enum ('watch', 'make', 'move', 'collect');
create type spark_status as enum ('active', 'dormant');
create type opportunity_origin as enum ('bydt', 'community', 'free', 'sponsored');
create type mission_status as enum ('suggested', 'accepted', 'done', 'evidenced', 'archived');
create type mission_issuer as enum ('steward', 'system');
create type consent_scope_t as enum ('private', 'report_anonymized', 'public_release');

-- ---------- profiles (parents and stewards) ----------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role user_role not null default 'parent',
  consent_policy_version text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Role changes are a service-role operation only (documented, logged,
-- manual — see docs/ops-runbook.md). No self-serve escalation path exists.
create or replace function public.guard_profile_role()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and new.role is distinct from old.role then
    raise exception 'role changes require the service role';
  end if;
  return new;
end;
$$;

create trigger profiles_guard_role
before update on public.profiles
for each row execute function public.guard_profile_role();

-- ---------- children (deliberately minimal) ----------

create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles (id) on delete cascade,
  name_or_alias text not null,
  -- Birth year only. Range is static because CHECK must be immutable;
  -- widen the upper bound annually (ops-runbook, January task).
  birth_year int not null check (birth_year between 2006 and 2026),
  created_at timestamptz not null default now()
);

create index children_parent_idx on public.children (parent_id);

-- ---------- sparks ----------

create table public.sparks (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  text text not null,
  topics text[] not null default '{}',
  mode spark_mode,
  status spark_status not null default 'active',
  created_at timestamptz not null default now()
);

create index sparks_child_idx on public.sparks (child_id);

-- ---------- sponsors and trails ----------

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text,
  -- The label is inseparable from the sponsor by construction:
  -- NOT NULL here, and the only parent-readable path is a view that
  -- always returns both columns together (0003_sponsor_view.sql).
  disclosure_label text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.trails (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  theme_topics text[] not null default '{}',
  sponsor_id uuid references public.sponsors (id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- opportunities ----------

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider text not null,
  description text,
  town text,
  cost_label text,
  topics text[] not null default '{}',
  modes text[] not null default '{}',
  age_min int,
  age_max int,
  origin opportunity_origin not null default 'community',
  trail_id uuid references public.trails (id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index opportunities_trail_idx on public.opportunities (trail_id);

-- ---------- mission templates (steward-internal) ----------

create table public.mission_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  topic text,
  mode spark_mode,
  translation_line text,
  steps jsonb not null default '[]'::jsonb,
  capture_prompt text,
  next_step_branch text,
  times_used int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- missions ----------

create table public.missions (
  id uuid primary key default gen_random_uuid(),
  spark_id uuid not null references public.sparks (id) on delete restrict,
  child_id uuid not null references public.children (id) on delete cascade,
  template_id uuid references public.mission_templates (id) on delete set null,
  opportunity_id uuid references public.opportunities (id) on delete set null,
  status mission_status not null default 'suggested',
  issued_by mission_issuer not null default 'steward',
  title text not null,
  translation_line text,
  -- Snapshot at issuance: later template edits never mutate a live mission.
  kid_steps jsonb not null default '[]'::jsonb,
  -- The ONLY field the (M4) kiosk token may write.
  kid_progress jsonb not null default '{}'::jsonb,
  suggested_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create index missions_child_idx on public.missions (child_id);
create index missions_spark_idx on public.missions (spark_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger missions_set_updated_at
before update on public.missions
for each row execute function public.set_updated_at();

-- ---------- evidence ----------

create table public.evidence (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions (id) on delete cascade,
  media_path text,
  did_text text,
  said_text text,
  -- Default true: the made thing carries the story, not the child's face.
  artifact_flag boolean not null default true,
  consent_scope consent_scope_t not null default 'private',
  created_at timestamptz not null default now()
);

create index evidence_mission_idx on public.evidence (mission_id);
