# Spec Governor — Governance Record

This directory is the versioned governance record for the **Curious Minds**
build (the BYDT record-keeping platform). The Spec Governor plan established
the rule that governance lives in the repository, amendments are logged with
dates and reasoning, and the committed record is authoritative over
conversation.

The application code lives in [`/curious-minds`](../../curious-minds/) in this
repository (M1.1 foundation). Its operating law is
[`curious-minds/docs/constitution.md`](../../curious-minds/docs/constitution.md)
— that file travels with the code and is authoritative for the codebase. This
directory holds the governance decisions in their full form: the amendment
with its complete reasoning and attached corrections, and the approved design
package the milestones are built against. If the `curious-minds` directory is
later split into its own repository, both move with it.

## Contents

| File | What it is |
| --- | --- |
| [`amendment-001.md`](./amendment-001.md) | Amendment 001 in full: re-scopes the Section 9 production-code gate (record-keeping core authorized, automation layers locked until Gate 1), plus the two build-order corrections, the Kid Mission Mode resequencing, and the Cohort A matching semantic. |
| [`design-package-v1.md`](./design-package-v1.md) | The approved design package: repo structure, database schema, routes, component list, milestones M1–M5, and test plan. |

## Standing rules encoded here

- **Gate 1 lock.** Auto-matching, the next-step recommendation engine, and
  template recombination are not built until Gate 1 passes (second-loop rate
  ≥ 33% and evidence capture ≥ 40% in Cohort A). No exceptions without a
  further logged amendment.
- **Amendments are logged, dated, and reasoned.** A change to the plan that is
  not recorded in version control is drift, not a decision.
- **Dissent path.** An amendment is proposed in conversation but is only in
  force once committed; the founder may reject any amendment and hold the
  original line.
