# BYDT Curious Minds — Constitution

**Version 1.1 · Amended July 3, 2026**
This file is the operating law of the codebase. Amendments are logged below — dated, numbered, reasoned. Code that contradicts this document is a bug even if it passes its tests.

---

## Principles

**Labels.** Every listing, trail, and surface that involves a paid relationship carries a disclosure stamp. In code, this is not a policy: parents cannot read the `sponsors` table at all; the only readable path is `sponsored_surface_v`, which returns the sponsor name and its disclosure label as one inseparable unit.

**Ranking.** Sponsorship can buy presence, never position. Any ordering of opportunities or missions shown to parents is a function of match to the child's spark and nothing else. When the automated matching layer is built (post-Gate 1), it ships with a rank-invariance test suite covering sponsored tie cases. Until then, ordering is steward judgment, and the steward is bound by this sentence.

**Data.** The parent or caregiver owns everything. Children never authenticate, never have public profiles, and the `children` table holds a first name or alias and a birth year — nothing more, enforced by a static schema test. Evidence defaults to the made thing, not the child's face. Consent is per item, three scopes: private, report-anonymized, public-with-release. Export and delete are working features.

**Honesty.** Claims are proportional to evidence. The system records observations; the parent authors meaning; the platform never issues developmental verdicts. Sponsor reports contain loops completed, capture rates, latency, and consented artifact stories — never outcome statistics manufactured from testimony.

**Steward visibility.** The program steward can read family sparks, missions, and evidence — this is what makes concierge operation and template harvesting possible, and it is stated plainly in the consent policy rather than buried. Consent scopes govern what leaves the system, not what the steward sees.

---

## What is not built, by decision

No child public accounts. No social feed. No creator marketplace. No provider self-service portal. No pay-to-approve feature. No behavioral advertising. No third-party analytics on any child-adjacent surface.

## What is locked until Gate 1 passes

Automated spark-to-opportunity matching. The next-step recommendation engine. Template recombination. (Gate 1: second-loop rate ≥ 33% and evidence capture ≥ 40% in Cohort A.)

---

## Gates (published before the campaign asks for a dollar)

| Gate | Criterion | On failure |
|------|-----------|------------|
| Translation | Mission completion ≥ 20% (Cohort A) | Redesign the translation layer or stop |
| Recursion | Second-loop rate ≥ 33% | Below 15%: novelty product — redesign matching or stop |
| Receipts | Evidence capture ≥ 40% | Below 25%: the proof layer is fiction; the sponsor model dies with it |
| Operations | Concierge ≤ 10 hrs/week at 25 families | The model does not reach 100 without unbudgeted hires |

---

## Amendment log

| # | Date | Change | Reasoning |
|---|------|--------|-----------|
| 001 | 2026-07-03 | Production code authorized for the record-keeping core (Milestones 1–3) ahead of Cohort A completion. The automation layers remain locked until Gate 1. | The approved build order is the concierge toolkit — persistence, multi-family records, steward console — which Cohort A requires and the throwaway prototype lacks. The original "no production code before validation" line was protecting against building automation on an unproven loop; the record-keeping core is not automation. Gate discipline transfers to the automation layers, where the original risk actually lives. |

*Amendments require: a number, a date, the change, and the reasoning. An amendment without reasoning is drift wearing a signature.*
