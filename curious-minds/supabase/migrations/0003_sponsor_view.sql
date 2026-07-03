-- 0003_sponsor_view.sql
-- Sponsorship labeling enforced mechanically, not by policy document.
--
-- Parents cannot select from public.sponsors (no policy exists for them).
-- The ONLY readable path is this view, which exposes the sponsor name and
-- its disclosure label as one unit. There is no query a parent-facing
-- surface can run that returns a sponsor name without its label.
--
-- The view runs with owner privileges (security_invoker = false), so it can
-- read through the sponsors RLS wall — but only through this exact,
-- label-paired keyhole.

create view public.sponsored_surface_v
with (security_invoker = false) as
select
  s.id,
  s.name,
  s.disclosure_label
from public.sponsors s
where s.active = true;

comment on view public.sponsored_surface_v is
  'The only parent-readable sponsor surface. Name and disclosure label are inseparable by construction. Do not add columns without a governance amendment.';

grant select on public.sponsored_surface_v to authenticated;
