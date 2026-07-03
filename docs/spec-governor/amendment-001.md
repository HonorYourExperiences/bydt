# Amendment 001 — Production-code gate re-scoped

**Date:** 2026-07-03
**Status:** Adopted (encoded in `curious-minds/docs/constitution.md`, amendment log entry 001)
**Amends:** Spec Governor plan, Section 9 ("no production code before Cohort A validates")

## The change

Production code is **authorized** for the record-keeping core — Milestones
M1–M3 of the approved design package:

- M1 — Foundation: scaffold, migrations, row-level security, parent auth,
  steward role.
- M2 — Parent surface: intake with consent, sparks, mission inbox and detail,
  evidence capture, curiosity trail.
- M3 — Steward console + sponsor model: opportunity editor, template editor,
  mission issuance, families dashboard, trails and sponsors with the label
  view, seed data.

The validation gate **transfers** to the automation layers, which stay locked
until Gate 1 passes (second-loop rate ≥ 33% and evidence capture ≥ 40% in
Cohort A):

- Automated spark-to-opportunity matching
- The next-step recommendation engine
- Template recombination

## The reasoning

Section 9's line protected against building automation on an unproven loop.
The approved build order, as scoped, is not the platform — it is the concierge
toolkit: persistence, multi-family records, and the steward console that
Cohort A actually requires and the throwaway prototype lacks. The
record-keeping core is not automation; the original risk lives in the
automation layers, so that is where the gate now sits.

## Corrections attached to this amendment

Two corrections to the 18-item build order, adopted alongside the amendment:

1. **Consent/export/delete surface added (item 18a).** The original 18 items
   contained no consent, export, or delete surface. Constraint 8 says the
   parent controls all saved child information — that is a screen, not a
   sentiment. The Trust tab from the prototype survives into the MVP as
   `/settings`: consent policy display, per-item consent scopes, working
   export, working delete. It ships in the hardening milestone (M5), and
   intake presents the consent policy before any child data is entered.
2. **Kid Mission Mode resequenced from position 10 to the last build
   milestone (M4).** It depends on missions existing, it serves zero Cohort A
   families on day one, and per Ruling 4 it is a kiosk profile — tokenized, no
   account, no telemetry beyond parent-visible progress marks. Building it
   tenth would be building the demo before the engine.

## Cohort A semantic made explicit

Matching is **steward-issued**. The parent's primary surface is "Your
missions" (an inbox), with opportunity browsing secondary. The Explore-first
model from the prototype waits for the automation gate. In the schema this is
enforced, not suggested: parents have no insert policy on `missions`
(`0002_rls.sql`) — a parent inserting a mission is rejected by the database.

## Noted deltas from the original plan

- One app with route groups instead of the Section 8.1 monorepo — a
  solo-founder pilot does not need multi-package ceremony. Delta noted and
  owned.
- M1.1 (over M1): the Supabase CLI moved from a global npm install (which the
  package refuses on purpose) to a dev dependency, and a devcontainer pins
  Node 20 + Docker-in-Docker so the verification environment is a fact, not a
  hope.

## Dissent path

Recorded at adoption: if the founder disagrees with this amendment, the
original Section 9 line is held instead and M1–M3 production code is
deauthorized until Cohort A validates.
