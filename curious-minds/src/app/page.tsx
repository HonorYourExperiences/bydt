import Link from "next/link";

export default function Landing() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="cm-display text-3xl font-bold">Curious Minds</h1>
      <p className="cm-mono text-xs mt-1" style={{ color: "var(--muted)" }}>
        Build Your Dreaming Things · Pilot · Hudson Valley
      </p>
      <p className="mt-6 text-sm leading-relaxed">
        Catch your kid&apos;s curiosity before it fades, turn it into a
        real-world mission, and keep the receipts. This is a small, honest
        pilot: what it proves and what it doesn&apos;t is published on the
        Trust page inside.
      </p>
      <Link
        href="/sign-in"
        className="mt-8 inline-block rounded-lg border-2 border-ink bg-pencil px-5 py-2 font-bold"
      >
        Parent sign in
      </Link>
    </main>
  );
}
