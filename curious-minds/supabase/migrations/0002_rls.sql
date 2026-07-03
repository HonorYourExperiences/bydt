-- 0002_rls.sql
-- Row-level security is the privacy boundary. The interface is a convenience;
-- this file is the wall. tests/rls/isolation.test.ts was written against this
-- contract BEFORE these policies existed (red before green); if you comment
-- out any policy below, that suite must fail. Prove it once on your machine.

-- ---------- helper: steward check (security definer avoids RLS recursion) ----------

create or replace function public.is_steward()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'steward'
  );
$$;

-- ---------- enable RLS everywhere ----------

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.sparks enable row level security;
alter table public.sponsors enable row level security;
alter table public.trails enable row level security;
alter table public.opportunities enable row level security;
alter table public.mission_templates enable row level security;
alter table public.missions enable row level security;
alter table public.evidence enable row level security;

-- ---------- profiles ----------

create policy profiles_select_own_or_steward on public.profiles
for select using (id = auth.uid() or public.is_steward());

create policy profiles_update_own on public.profiles
for update using (id = auth.uid())
with check (id = auth.uid());
-- (role column protected by the profiles_guard_role trigger in 0001)

-- ---------- children: parent owns; steward reads for concierge ops ----------

create policy children_parent_all on public.children
for all using (parent_id = auth.uid())
with check (parent_id = auth.uid());

create policy children_steward_select on public.children
for select using (public.is_steward());

-- ---------- sparks: ownership through the child ----------

create policy sparks_parent_all on public.sparks
for all using (
  exists (
    select 1 from public.children c
    where c.id = sparks.child_id and c.parent_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.children c
    where c.id = sparks.child_id and c.parent_id = auth.uid()
  )
);

create policy sparks_steward_select on public.sparks
for select using (public.is_steward());

-- ---------- missions ----------
-- Cohort A semantic: missions are steward-issued. Parents have NO insert
-- policy — a parent inserting a mission is a bug, and the database says so.

create policy missions_parent_select on public.missions
for select using (
  exists (
    select 1 from public.children c
    where c.id = missions.child_id and c.parent_id = auth.uid()
  )
);

create policy missions_parent_update on public.missions
for update using (
  exists (
    select 1 from public.children c
    where c.id = missions.child_id and c.parent_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.children c
    where c.id = missions.child_id and c.parent_id = auth.uid()
  )
);

create policy missions_steward_all on public.missions
for all using (public.is_steward())
with check (public.is_steward());

-- Parents may change mission status (accept, mark done, attach evidence,
-- archive) and the completion timestamp. Nothing else — not the steps, not
-- the progress field, not who issued it. Enforced row-by-row, not by hope.
create or replace function public.guard_mission_update()
returns trigger
language plpgsql
as $$
begin
  -- Service role (no auth.uid) and stewards pass through.
  if auth.uid() is null or public.is_steward() then
    return new;
  end if;

  if (to_jsonb(new) - 'status' - 'completed_at' - 'updated_at')
     is distinct from
     (to_jsonb(old) - 'status' - 'completed_at' - 'updated_at') then
    raise exception 'parents may update mission status and completion only';
  end if;

  if new.status is distinct from old.status
     and new.status not in ('accepted', 'done', 'evidenced', 'archived') then
    raise exception 'invalid mission status transition for parent';
  end if;

  return new;
end;
$$;

create trigger missions_guard_parent_update
before update on public.missions
for each row execute function public.guard_mission_update();

-- ---------- evidence: ownership through mission -> child -> parent ----------

create policy evidence_parent_all on public.evidence
for all using (
  exists (
    select 1
    from public.missions m
    join public.children c on c.id = m.child_id
    where m.id = evidence.mission_id and c.parent_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.missions m
    join public.children c on c.id = m.child_id
    where m.id = evidence.mission_id and c.parent_id = auth.uid()
  )
);

-- Steward reads evidence for template harvesting and report assembly.
-- Consent scopes govern what leaves the system, not steward visibility;
-- this is stated plainly in docs/consent-policy.md, not buried.
create policy evidence_steward_select on public.evidence
for select using (public.is_steward());

-- ---------- catalog tables ----------

create policy opportunities_select_active on public.opportunities
for select using (active = true or public.is_steward());

create policy opportunities_steward_write on public.opportunities
for all using (public.is_steward())
with check (public.is_steward());

create policy trails_select_active on public.trails
for select using (active = true or public.is_steward());

create policy trails_steward_write on public.trails
for all using (public.is_steward())
with check (public.is_steward());

-- Templates are steward-internal. Parents never see the machinery.
create policy templates_steward_all on public.mission_templates
for all using (public.is_steward())
with check (public.is_steward());

-- Sponsors: NO parent policy on the base table, deliberately.
-- The only parent-readable path is sponsored_surface_v (0003), which
-- returns name and disclosure label as an inseparable pair.
create policy sponsors_steward_all on public.sponsors
for all using (public.is_steward())
with check (public.is_steward());
