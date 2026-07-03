"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendLink = async () => {
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="cm-display text-2xl font-bold">Parent sign in</h1>
      <p className="text-sm mt-2">
        One email, one link, no password to forget. Kids never sign in —
        that&apos;s by design, not by omission.
      </p>
      {sent ? (
        <p className="mt-6 rounded-lg border-2 border-ink bg-white p-4 text-sm">
          Check your email for the sign-in link.
        </p>
      ) : (
        <div className="mt-6">
          <label htmlFor="email" className="text-xs font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border-2 border-line bg-white p-2 text-sm"
            placeholder="you@example.com"
          />
          <button
            onClick={sendLink}
            className="mt-3 w-full rounded-lg border-2 border-ink bg-pencil py-2 font-bold"
          >
            Send sign-in link
          </button>
          {error && (
            <p className="mt-2 text-sm" style={{ color: "var(--crayon-red)" }}>
              {error}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
