import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !anonKey || !serviceKey) {
  throw new Error(
    "Missing Supabase env. Copy .env.example to .env.test.local and fill it from `supabase start` output."
  );
}

/** Service-role client. Bypasses RLS. Test harness only — never in app code paths that reach a browser. */
export const admin: SupabaseClient = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export interface TestUser {
  id: string;
  email: string;
  client: SupabaseClient;
}

/** Creates an auth user (profile auto-created by trigger), signs in, returns an RLS-bound client. */
export async function createUser(
  label: string,
  role: "parent" | "steward" = "parent"
): Promise<TestUser> {
  const email = `${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@test.local`;
  const password = "test-password-123!";

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr || !created.user) {
    throw new Error(`createUser failed: ${createErr?.message}`);
  }

  if (role === "steward") {
    // Promotion is a service-role operation — same as production ops.
    const { error } = await admin
      .from("profiles")
      .update({ role: "steward" })
      .eq("id", created.user.id);
    if (error) throw new Error(`steward promotion failed: ${error.message}`);
  }

  const client = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: signInErr } = await client.auth.signInWithPassword({ email, password });
  if (signInErr) throw new Error(`sign-in failed: ${signInErr.message}`);

  return { id: created.user.id, email, client };
}

export async function deleteUser(user: TestUser) {
  await user.client.auth.signOut();
  // Cascades: profiles -> children -> sparks/missions -> evidence.
  await admin.auth.admin.deleteUser(user.id);
}
