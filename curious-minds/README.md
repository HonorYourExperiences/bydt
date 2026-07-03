# BYDT Curious Minds — Pilot MVP

Parent-facing system that turns a child's curiosity into steward-issued
real-world missions, with evidence capture and receipts. Cohort A concierge
toolkit. Governance lives in `docs/constitution.md` — read it first; the
code answers to it.

## Status: Milestone 1 (Foundation)

Delivered: schema, row-level security, auth flow, steward role, design
tokens, locked stub surfaces, and the two test suites that define the
privacy contract.

Locked until Gate 1: auto-matching, next-step recommendations, template
recombination. Locked until their milestone: parent surfaces (M2), steward
console + seed data (M3), kid Mission Mode (M4), settings/export/delete +
deployment (M5).

## Option A — GitHub Codespaces (no local install)

1. Push this repo to GitHub, then: Code → Codespaces → Create codespace.
   The devcontainer pins Node 20 + Docker. Default machine works; pick
   4-core if `supabase start` feels slow.
2. In the codespace terminal:

       npx supabase start        # first run pulls images — a few minutes
       cp .env.example .env.test.local
       # paste the anon + service_role keys that `supabase start` printed
       npm run db:reset          # applies migrations 0001-0003 + seed
       npm test                  # RLS isolation + schema minimization

3. Stop the codespace when done (it bills core-hours while running).

## Option B — Local machine

Prerequisites: Node 20+, Docker running. The Supabase CLI installs as a
dev dependency (`npm install` handles it) — do NOT `npm i -g supabase`;
the package blocks global installs.

    npm install
    npx supabase start
    cp .env.example .env.test.local   # paste printed keys
    cp .env.example .env.local        # same values for the app
    npm run db:reset
    npm test
    npm run dev                       # http://localhost:3000

## Prove the tests bite (do this once, either option)

The isolation suite was written before the policies that satisfy it.
Verify the guard is real: comment out the `children_parent_all` policy in
`supabase/migrations/0002_rls.sql`, run `npm run db:reset && npm test`,
and watch the suite fail. Restore the policy. Now you know the wall is
load-bearing, not decorative.

## Clicking through the app inside Codespaces (optional, mostly M2+)

The test suite is the M1 gate and needs none of this. If you want the
browser flow anyway: magic-link emails do not send for real locally — open
the forwarded port 54324 (Mailpit) to click them. The browser also cannot
reach `127.0.0.1:54321` from your laptop: set port 54321 to Public, point
`NEXT_PUBLIC_SUPABASE_URL` in `.env.local` at its forwarded URL, and add
your codespace's port-3000 URL to `additional_redirect_urls` in
`supabase/config.toml`, then `npx supabase stop && npx supabase start`.

## Layout

    .devcontainer/  pinned Codespaces environment (Node 20 + Docker)
    docs/           constitution, consent policy, ops runbook
    cards/          WonderCards print generation (reserved)
    supabase/       migrations (schema, RLS, sponsor label view) + seed
    src/            Next.js app — parent routes, admin routes, auth
    tests/          rls/isolation (the contract) + schema/minimization

## Deployment

M5. Deliberately absent until export, delete, and consent-scope
enforcement exist end-to-end. Local/codespace only until then.
