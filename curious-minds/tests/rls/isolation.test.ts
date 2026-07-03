/**
 * Cross-family isolation suite.
 *
 * This is the contract 0002_rls.sql exists to satisfy. It was written first.
 * If any policy in that migration is removed, at least one test here must go
 * red. Verify the tests bite (once, on your machine): comment out
 * `children_parent_all` in 0002, run `supabase db reset && npm test`, and
 * watch this file fail. Then put the policy back.
 *
 * Requires a running local stack: `supabase start` + .env.test.local.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { admin, createUser, deleteUser, type TestUser } from "../helpers";

let parentA: TestUser;
let parentB: TestUser;
let steward: TestUser;

let childA: string;
let sparkA: string;
let missionA: string;
let sponsorId: string;

beforeAll(async () => {
  parentA = await createUser("parent-a");
  parentB = await createUser("parent-b");
  steward = await createUser("steward", "steward");

  // --- Family A's world, created through A's own RLS-bound client ---
  const { data: child, error: childErr } = await parentA.client
    .from("children")
    .insert({ parent_id: parentA.id, name_or_alias: "Zora", birth_year: 2019 })
    .select()
    .single();
  expect(childErr).toBeNull();
  childA = child!.id;

  const { data: spark, error: sparkErr } = await parentA.client
    .from("sparks")
    .insert({
      child_id: childA,
      text: "Asked why planes stay up — third time this week",
      topics: ["flight"],
      mode: "make",
    })
    .select()
    .single();
  expect(sparkErr).toBeNull();
  sparkA = spark!.id;

  // Missions are steward-issued (Cohort A semantic).
  const { data: mission, error: missionErr } = await steward.client
    .from("missions")
    .insert({
      spark_id: sparkA,
      child_id: childA,
      title: "Paper Wind Tunnel Day",
      translation_line: "Wings are a question you can build.",
      kid_steps: [{ step: "Fold three wing shapes" }, { step: "Test each one" }],
    })
    .select()
    .single();
  expect(missionErr).toBeNull();
  missionA = mission!.id;

  // Evidence written by the owning parent.
  const { error: evidenceErr } = await parentA.client.from("evidence").insert({
    mission_id: missionA,
    did_text: "Stayed at the tunnel for forty minutes.",
    said_text: "Air pushes harder when it goes faster!",
  });
  expect(evidenceErr).toBeNull();

  // One active sponsor, seeded by the steward, for the label-path tests.
  const { data: sponsor, error: sponsorErr } = await steward.client
    .from("sponsors")
    .insert({
      name: "SkyString Kite Co.",
      tier: "trail",
      disclosure_label: "Sponsored · paid for presence, not position",
    })
    .select()
    .single();
  expect(sponsorErr).toBeNull();
  sponsorId = sponsor!.id;
});

afterAll(async () => {
  await admin.from("sponsors").delete().eq("id", sponsorId);
  await deleteUser(parentA);
  await deleteUser(parentB);
  await deleteUser(steward);
});

describe("family A is invisible to family B", () => {
  it("B sees zero children", async () => {
    const { data } = await parentB.client.from("children").select("*");
    expect(data).toEqual([]);
  });

  it("B sees zero sparks", async () => {
    const { data } = await parentB.client.from("sparks").select("*");
    expect(data).toEqual([]);
  });

  it("B sees zero missions", async () => {
    const { data } = await parentB.client.from("missions").select("*");
    expect(data).toEqual([]);
  });

  it("B sees zero evidence", async () => {
    const { data } = await parentB.client.from("evidence").select("*");
    expect(data).toEqual([]);
  });

  it("B cannot fetch A's child by id", async () => {
    const { data } = await parentB.client.from("children").select("*").eq("id", childA);
    expect(data).toEqual([]);
  });

  it("B cannot insert a child under A's account", async () => {
    const { error } = await parentB.client
      .from("children")
      .insert({ parent_id: parentA.id, name_or_alias: "Intruder", birth_year: 2018 });
    expect(error).not.toBeNull();
  });

  it("B's update against A's mission touches zero rows", async () => {
    const { data } = await parentB.client
      .from("missions")
      .update({ status: "archived" })
      .eq("id", missionA)
      .select();
    expect(data).toEqual([]);
  });

  it("B cannot attach evidence to A's mission", async () => {
    const { error } = await parentB.client
      .from("evidence")
      .insert({ mission_id: missionA, did_text: "forged" });
    expect(error).not.toBeNull();
  });
});

describe("privilege boundaries hold inside a family", () => {
  it("a parent cannot promote their own role", async () => {
    const { error } = await parentA.client
      .from("profiles")
      .update({ role: "steward" })
      .eq("id", parentA.id);
    expect(error).not.toBeNull();
    expect(error!.message).toMatch(/service role/i);
  });

  it("a parent cannot insert a mission (steward-issued only)", async () => {
    const { error } = await parentA.client.from("missions").insert({
      spark_id: sparkA,
      child_id: childA,
      title: "Self-issued mission",
    });
    expect(error).not.toBeNull();
  });

  it("a parent can accept a mission (status transition allowed)", async () => {
    const { data, error } = await parentA.client
      .from("missions")
      .update({ status: "accepted" })
      .eq("id", missionA)
      .select()
      .single();
    expect(error).toBeNull();
    expect(data!.status).toBe("accepted");
  });

  it("a parent cannot rewrite kid_steps (column guard fires)", async () => {
    const { error } = await parentA.client
      .from("missions")
      .update({ kid_steps: [{ step: "tampered" }] })
      .eq("id", missionA);
    expect(error).not.toBeNull();
    expect(error!.message).toMatch(/status and completion only/i);
  });

  it("a parent cannot read mission templates (steward-internal)", async () => {
    const { data } = await parentA.client.from("mission_templates").select("*");
    expect(data).toEqual([]);
  });
});

describe("the sponsor label keyhole", () => {
  it("parents get zero rows from the sponsors base table", async () => {
    const { data } = await parentA.client.from("sponsors").select("*");
    expect(data).toEqual([]);
  });

  it("the view returns the sponsor WITH its disclosure label, inseparably", async () => {
    const { data, error } = await parentA.client
      .from("sponsored_surface_v")
      .select("*")
      .eq("id", sponsorId)
      .single();
    expect(error).toBeNull();
    expect(data!.name).toBe("SkyString Kite Co.");
    expect(data!.disclosure_label).toBeTruthy();
  });
});

describe("steward visibility (concierge operations)", () => {
  it("steward can see families across the wall, read-only where specified", async () => {
    const { data: kids } = await steward.client
      .from("children")
      .select("*")
      .eq("id", childA);
    expect(kids).toHaveLength(1);

    const { data: ev } = await steward.client
      .from("evidence")
      .select("*")
      .eq("mission_id", missionA);
    expect(ev!.length).toBeGreaterThan(0);
  });
});
