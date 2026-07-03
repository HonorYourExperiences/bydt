# M1 Gate — Verification Report

**Date:** 2026-07-03
**Artifact:** `curious-minds/` at M1.1 (this commit)
**Verdict:** Schema, RLS policies, and privilege guards verified green on a
real Postgres 17 database. One step remains for the full gate as specified:
running the shipped vitest isolation suite itself (see "What still needs to
run" below).

## What ran, and where

### 1. Minimization suite — vitest, this environment — **4/4 green**

`npx vitest run tests/schema` needs no database. All four tests passed:
the migrations exist, contain the expected schema, and no migration contains
a forbidden child-data column pattern.

### 2. Migrations — hosted Supabase scratch project — **applied clean**

The local Docker stack could not start in this session: the environment's
egress policy blocks the container-registry blob hosts
(`production.cloudfront.docker.com`, `pkg-containers.githubusercontent.com`,
ECR's CloudFront). Per the environment's own rules those blocks are reported,
not worked around.

So the package's documented fallback was used: a free ($0/month) hosted
Supabase scratch project, **`curious-minds-m1-gate`** (ref
`nfwcbbrtqczxrcwhazzr`, org HonorYourExperiences), created via the connected
Supabase integration. All three migrations — `0001_schema`, `0002_rls`,
`0003_sponsor_view` — applied without error on Postgres 17.

### 3. Isolation contract — SQL replication on the scratch project — **21/21 green**

`*.supabase.co` is also blocked from this sandbox, so the vitest isolation
suite could not connect from here. Instead, every assertion in
`tests/rls/isolation.test.ts` was replicated as SQL against the migrated
database, simulating authenticated sessions the same way PostgREST resolves
them (`role = authenticated` + `request.jwt.claims`), which exercises the
identical policy code paths. Test data was seeded through the personas' own
RLS-bound sessions, exactly as the suite does.

| Group | Checks | Result |
| --- | --- | --- |
| Seed (A's world created through A's and steward's sessions) | 5 | all pass |
| Family A invisible to family B (reads, keyed fetch, forged inserts, cross-family update) | 8 | all pass |
| Privilege boundaries (no self-promotion, no self-issued missions, status transition allowed, kid_steps guard, templates hidden) | 5 | all pass |
| Sponsor label keyhole (base table dark, view returns name + label inseparably) | 2 | all pass |
| Steward visibility across the wall | 1 | pass |

Error messages matched the suite's expectations verbatim: `role changes
require the service role`, `parents may update mission status and completion
only`, `new row violates row-level security policy`.

### 4. The bite ritual — **red, then green**

`children_parent_all` was dropped (the SQL equivalent of commenting it out in
`0002_rls.sql`): parent A immediately lost access to her own child (0 rows)
and could no longer insert one — the suite would go red. The policy was
restored exactly as written: access returned (1 row). The privacy wall is
load-bearing, not decorative. The drop/restore ran in a single transaction;
the policy is in place.

### 5. Cleanup — verified by query

All gate-run test rows were deleted; `profiles`, `children`, `missions`,
`evidence`, `sponsors`, and `auth.users` all count 0. The scratch project is
pristine: schema and policies only.

## What still needs to run

The shipped vitest isolation suite (`npm test`) has not itself executed —
this sandbox cannot reach Docker registries or `*.supabase.co`. Two ways to
close that, both from any normal machine or Codespace:

1. **Local stack (as the README specifies):** Codespaces flow from
   `curious-minds/README.md` — `npx supabase start`, fill `.env.test.local`,
   `npm run db:reset && npm test`.
2. **Against the scratch project (no Docker at all):** the migrations are
   already applied to `curious-minds-m1-gate`. Fill `.env.test.local` with
   that project's URL, anon key, and service-role key from the Supabase
   dashboard, then `npm test`.

The scratch project costs $0/month; delete or pause it from the dashboard
whenever it has served its purpose.
