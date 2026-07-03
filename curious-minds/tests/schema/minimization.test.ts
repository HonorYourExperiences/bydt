/**
 * Child-data minimization as a static schema test.
 *
 * The constitution says: no unnecessary collection of child data. A policy
 * document cannot stop a well-meaning future migration from adding a
 * `birth_date` or `school` column. This test can. It scans every migration
 * file for forbidden identifier patterns, so the constraint outlives the
 * people who remember why it exists.
 *
 * Needs no database — runs anywhere, fast, first.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = join(__dirname, "../../supabase/migrations");

const FORBIDDEN: Array<{ pattern: RegExp; why: string }> = [
  { pattern: /\bbirth_date\b/i, why: "full birth dates identify children; birth_year is the ceiling" },
  { pattern: /\bdate_of_birth\b/i, why: "full birth dates identify children" },
  { pattern: /\bdob\b/i, why: "full birth dates identify children" },
  { pattern: /\blast_name\b/i, why: "children are first-name-or-alias only" },
  { pattern: /\bsurname\b/i, why: "children are first-name-or-alias only" },
  { pattern: /\bhome_address\b|\bstreet\b|\bzip_code\b|\bpostal\b/i, why: "no child location data" },
  { pattern: /\bschool\b/i, why: "no institutional identifiers on children" },
  { pattern: /\blatitude\b|\blongitude\b|\bgeolocation\b/i, why: "no location tracking, ever" },
  { pattern: /\bssn\b|\bsocial_security\b/i, why: "obviously not" },
  { pattern: /\bchild_photo\b|\bavatar\b/i, why: "no photo column on the child record; media lives on evidence, parent-scoped, consent-scoped" },
];

describe("schema-level data minimization", () => {
  const files = readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));

  it("finds the migrations it is supposed to guard", () => {
    expect(files.length).toBeGreaterThanOrEqual(3);
    const all = files.map((f) => readFileSync(join(MIGRATIONS_DIR, f), "utf8")).join("\n");
    // Sanity: we are reading the real schema, not an empty directory.
    expect(all).toMatch(/birth_year/);
    expect(all).toMatch(/disclosure_label/);
  });

  for (const file of files) {
    it(`${file} contains no forbidden child-data columns`, () => {
      const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf8");
      // Strip SQL comments so documentation may name the forbidden things
      // without triggering the guard. The guard is for code, not commentary.
      const code = sql
        .split("\n")
        .map((line) => line.replace(/--.*$/, ""))
        .join("\n");

      for (const { pattern, why } of FORBIDDEN) {
        const hit = code.match(pattern);
        expect(
          hit,
          `Forbidden pattern ${pattern} found in ${file}: ${why}. If this is intentional, it requires a governance amendment in docs/constitution.md before it requires code review.`
        ).toBeNull();
      }
    });
  }
});
