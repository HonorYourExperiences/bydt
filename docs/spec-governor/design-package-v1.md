# Curious Minds — Approved Design Package (v1)

**Date approved:** 2026-07-03
**Governed by:** [Amendment 001](./amendment-001.md); operating law in
[`curious-minds/docs/constitution.md`](../../curious-minds/docs/constitution.md)
**Stack:** Next.js + Supabase + Tailwind, deployed on Vercel. One app with
route groups (delta from the Section 8.1 monorepo, noted and owned).

## Repository structure

```
curious-minds/
├── docs/                        # governance lives in the repo
│   ├── constitution.md          # versioned; amendments logged
│   ├── consent-policy.md        # parent-readable; rendered at intake
│   └── ops-runbook.md           # concierge procedures
├── cards/                       # WonderCards print generation (reserved, empty in v1)
├── supabase/
│   ├── migrations/              # numbered SQL incl. row-level security policies
│   └── seed.sql
├── src/
│   ├── app/
│   │   ├── (parent)/            # authenticated parent surface
│   │   │   ├── intake/          # onboarding + child profile + consent
│   │   │   ├── sparks/
│   │   │   ├── missions/        # inbox + [id] detail
│   │   │   ├── evidence/[missionId]/
│   │   │   ├── trail/           # curiosity trail timeline
│   │   │   └── settings/        # consent scopes, export, delete
│   │   ├── (admin)/admin/       # steward console, role-gated
│   │   │   ├── opportunities/
│   │   │   ├── missions/        # template editor + mission issuance
│   │   │   ├── families/
│   │   │   └── trails/          # sponsor + trail editor
│   │   ├── mission-mode/[token]/  # kiosk: no auth, no identity, single-mission scope
│   │   └── api/                 # export, kiosk token mint, kiosk progress, account delete
│   ├── components/
│   ├── lib/                     # supabase clients, consent guards, match scoring
│   └── styles/                  # design tokens ported from the prototype
├── tests/
└── README.md                    # deployment instructions (milestone M5)
```

## Database schema

```sql
profiles        (id → auth.users, display_name, role 'parent'|'steward',
                 consent_policy_version, created_at)

children        (id, parent_id → profiles, name_or_alias, birth_year int,
                 created_at)
                -- deliberately nothing else. No full date of birth, no school,
                -- no location, no photo field on the child record itself.

sparks          (id, child_id, text, topics text[], mode
                 'watch'|'make'|'move'|'collect', status 'active'|'dormant',
                 created_at)

opportunities   (id, name, provider, description, town, cost_label,
                 topics text[], modes text[], age_min, age_max,
                 origin 'bydt'|'community'|'free'|'sponsored',
                 trail_id → trails NULL, active bool)

mission_templates (id, title, topic, mode, translation_line,
                 steps jsonb, capture_prompt, next_step_branch, times_used int)

missions        (id, spark_id, child_id, template_id NULL,   -- bespoke allowed in Cohort A
                 opportunity_id NULL,                         -- home missions exist
                 status 'suggested'|'accepted'|'done'|'evidenced'|'archived',
                 issued_by 'steward'|'system',
                 kid_steps jsonb,        -- snapshot; template edits never mutate live missions
                 kid_progress jsonb,     -- the ONLY kiosk-writable field
                 suggested_at, completed_at)

evidence        (id, mission_id, media_path NULL, did_text, said_text,
                 artifact_flag bool,     -- photo is of the made thing, not the child
                 consent_scope 'private'|'report_anonymized'|'public_release',
                 created_at)

trails          (id, name, theme_topics text[], sponsor_id NULL, active)

sponsors        (id, name, tier, disclosure_label NOT NULL, active)
```

**Sponsor labeling is enforced mechanically, not by policy:** the application
reads sponsor data only through the view `sponsored_surface_v`, which exposes
`name` and `disclosure_label` as an inseparable pair. There is no query path
that returns a sponsor name without its label. Tested, not trusted.

**Row-level security is the privacy boundary:** parents reach only rows
tracing to `parent_id = auth.uid()`; the steward role gates `/admin`; the
kiosk holds no session at all — a server-minted, short-lived signed token
scoped to exactly one mission, read-only except `kid_progress`.

## Core routes

```
Parent   /intake  /sparks  /missions  /missions/[id]
         /evidence/[missionId]  /trail  /settings
Admin    /admin/opportunities  /admin/missions  /admin/families  /admin/trails
Kiosk    /mission-mode/[token]
API      POST /api/mission-token      (parent mints kiosk link + QR)
         POST /api/kiosk/progress     (token-validated step marks, nothing else)
         GET  /api/export             (complete family archive, consent-scoped)
         POST /api/account/delete     (cascade: rows + storage, verified)
```

## Component list

Ported design system: `Stamp` (the four provenance marks), `SparkCard`,
`MissionCard`, `OpportunityCard`, `TrailTimeline`, `ConsentScopePicker`,
`EvidenceForm` (did / said / artifact-first photo), `KidStepChecklist`
(large-touch, high-contrast, zero text entry), `TokenQR` (parent hands the
tablet a mission, not an identity), `IntakeConversation` (the scripted
extraction flow, including the signal-blind parent path), `AdminTable`,
`TemplateEditor`, `MissionIssuer` (spark + template + opportunity → mission in
under five minutes), `FamilyDashboard`, `GateDashboard` (loop metrics vs.
published criteria), `SettingsPanel` (export/delete, working).

## Implementation milestones

- **M1 — Foundation.** Scaffold, migrations, row-level security, parent auth,
  steward role. The cross-family isolation test is written before the policies
  that pass it. (Items 1–6, plus 17 begun.)
- **M2 — Parent surface.** Intake with consent, sparks, mission inbox and
  detail, evidence capture, curiosity trail. (Items 7, 8, 9, 11, 12.)
- **M3 — Steward console + sponsor model.** Opportunity editor, template
  editor, mission issuance, families dashboard, trails and sponsors with the
  label view, seed data: 25 opportunities, 15 templates, 3 demo families.
  (Items 13, 14, 15, 16.) **Cohort A can run at the end of M3.**
- **M4 — Kid Mission Mode.** Kiosk route, token mint, progress marks,
  offline-tolerant. (Item 10, resequenced per Amendment 001.)
- **M5 — Hardening + deployment.** Settings surface (18a), export and delete
  end-to-end, consent-scope enforcement on every outbound path, deployment
  instructions in the README. (Items 17, 18.)

**Locked until Gate 1:** auto-matching, next-step recommendation engine,
template recombination.

## Test plan

- Cross-family isolation (written first, red before green).
- Kiosk token scope: expired token rejected, cross-mission access rejected,
  any write beyond `kid_progress` rejected.
- Sponsor label invariant via the view.
- Match-ordering rank invariance including sponsored tie cases (post-Gate 1,
  ships with the matching layer).
- Consent-scope leak test: export and any report path emit nothing above each
  item's scope.
- Export completeness: every table, every media object, one archive.
- Delete verification: database and storage both empty afterward, confirmed by
  query not by promise.
- Child-data minimization as a static schema test — migrations are scanned for
  forbidden column patterns (full birth dates, addresses, school fields) so
  the constraint survives future contributors.
- Manual acceptance: spark logged in under fifteen seconds, mission issued in
  under five minutes, evidence attached in under sixty.
