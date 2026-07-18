#!/usr/bin/env node
// Build-time O*NET fetcher for Career WonderCards.
//
// Regenerates data/onet/careers.json from O*NET Web Services
// (https://services.onetcenter.org/). Runs ONLY at build/dev time on a
// machine that holds credentials — the site itself stays fully static and
// makes zero runtime network calls, so no key and no child data ever
// touch the browser.
//
// API conventions follow the official samples at
// https://github.com/onetcenter/web-services-v2-samples (nodejs client):
// base https://api-v2.onetcenter.org/, X-API-Key header, paths like
// 'about' and 'online/search', JSON errors carried in an `error` property
// (including on HTTP 422).
//
// Credentials (via environment variables):
//   ONET_API_KEY    sent as X-API-Key header (register at
//                   https://services.onetcenter.org/)
// Optional:
//   ONET_BASE_URL   default https://api-v2.onetcenter.org
//   ONET_LIMIT      cap the number of occupations (useful for a test run)
//
// Usage: npm run fetch-onet
// The committed careers.json is a hand-checked starter set; this script
// replaces it with the full catalog. Review the diff before committing.

import { writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = (process.env.ONET_BASE_URL || "https://api-v2.onetcenter.org").replace(/\/$/, "");
const OUT = path.resolve(import.meta.dirname, "../data/onet/careers.json");
const LIMIT = process.env.ONET_LIMIT ? parseInt(process.env.ONET_LIMIT, 10) : Infinity;

if (!process.env.ONET_API_KEY) {
  console.error(
    "No O*NET credentials found.\n" +
      "Set ONET_API_KEY, then re-run.\n" +
      "Register at https://services.onetcenter.org/"
  );
  process.exit(1);
}
const headers = {
  Accept: "application/json",
  "User-Agent": "bydt-career-wondercards",
  "X-API-Key": process.env.ONET_API_KEY,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(pathname, params = {}) {
  const url = new URL(`${BASE}/${pathname.replace(/^\//, "")}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers });
    if (res.ok || res.status === 422) {
      const body = await res.json().catch(() => null);
      if (body && !body.error) return body;
      throw new Error(`${body?.error ?? `unparseable response`} for ${url}`);
    }
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await sleep(attempt * 2000);
      continue;
    }
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
}

// SOC major group (first two digits of the code) -> kid-friendly cluster.
const CLUSTERS = {
  11: "Leading & Planning",
  13: "Business & Money",
  15: "Computers & Invention",
  17: "Building & Making",
  19: "Science & Discovery",
  21: "Helping & Healing",
  23: "Law & Fairness",
  25: "Teaching & Story",
  27: "Art & Story",
  29: "Helping & Healing",
  31: "Helping & Healing",
  33: "Rescue & Protection",
  35: "Food & Growing",
  37: "Building & Making",
  39: "People & Service",
  41: "Business & Money",
  43: "Business & Money",
  45: "Food & Growing",
  47: "Building & Making",
  49: "Building & Making",
  51: "Building & Making",
  53: "Sky, Sea & Space",
  55: "Rescue & Protection",
};

async function listOccupations() {
  const all = [];
  let start = 1;
  const pageSize = 100;
  for (;;) {
    const page = await get("online/occupations", { start, end: start + pageSize - 1 });
    const rows = page.occupation || [];
    all.push(...rows.map((o) => ({ code: o.code, title: o.title })));
    if (all.length >= Math.min(page.total ?? all.length, LIMIT) || rows.length === 0) break;
    start += pageSize;
    await sleep(150);
  }
  return all.slice(0, LIMIT);
}

async function fetchCareer({ code, title }) {
  const [report, skills] = await Promise.all([
    get(`online/occupations/${code}`),
    get(`online/occupations/${code}/summary/skills`).catch(() => null),
  ]);
  const jobZone =
    report.job_zone ??
    (await get(`online/occupations/${code}/summary/job_zone`).catch(() => null))?.job_zone?.value ??
    3;
  const skillNames = (skills?.element || []).map((e) => e.name).slice(0, 6);
  return {
    code,
    title: report.title || title,
    description: report.description || "",
    jobZone: Number(jobZone) || 3,
    skills: skillNames,
    cluster: CLUSTERS[code.slice(0, 2)] || "Wide World of Work",
  };
}

// Fail fast on bad credentials before the long crawl (same check the
// official samples run first).
const about = await get("about");
console.log(`Connected to O*NET Web Services, API version ${about.api_version ?? "unknown"}`);

const occupations = await listOccupations();
console.log(`Fetching ${occupations.length} occupations from ${BASE} ...`);

const careers = [];
for (const [i, occ] of occupations.entries()) {
  try {
    careers.push(await fetchCareer(occ));
  } catch (err) {
    console.warn(`skip ${occ.code} ${occ.title}: ${err.message}`);
  }
  if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${occupations.length}`);
  await sleep(150);
}

careers.sort((a, b) => a.title.localeCompare(b.title));
await writeFile(OUT, JSON.stringify(careers, null, 2) + "\n");
console.log(`Wrote ${careers.length} careers to ${OUT}`);
console.log("Review the diff, then commit — the site ships this file as static data.");
