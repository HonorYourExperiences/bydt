# Operations runbook (Cohort A)

## Steward promotion (manual, logged, never self-serve)
Run in the Supabase SQL editor as the service role, then record the date and
reason in this file's log below:

    update public.profiles set role = 'steward' where id = '<user-uuid>';

| Date | Who | Reason |
|------|-----|--------|
| —    | —   | —      |

## Weekly concierge loop (per family)
1. Review new sparks (topic + mode).
2. Issue one mission: spark + translation line + steps + capture prompt.
   Target: under five minutes per mission (acceptance criterion).
3. Nudge once if a mission sits in `suggested` for 7 days. Once.
4. When evidence lands: read it, thank them, and note whether the mission
   pattern is a template candidate (used twice successfully = harvest it).

## Annual task (January)
Widen the `birth_year` CHECK upper bound in a new migration.

## Incident response (media breach) — write before you need it
Placeholder for M5: containment steps, parent notification within 72 hours,
root cause, constitution amendment if architecture was at fault.
