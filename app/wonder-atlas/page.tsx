import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DREAMS } from "@/lib/wonder-atlas";

export const metadata: Metadata = {
  title: "Wonder Atlas | Build Your Dreaming Things",
  description:
    "Pick a dream and the Wonder Atlas maps it onto your own town — free quests for tonight, places almost every town has, and big days worth asking for. No accounts, no tracking, grown-ups in the loop by design.",
};

export default function WonderAtlasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">
              THE CONNECTOR
            </div>
            <h1 className="mb-6">Wonder Atlas</h1>
            <p className="text-xl text-text-secondary">
              Every big dream feels far away — like it lives in some other city,
              some other family, some other kid. It doesn&apos;t. Pick a dream
              below and the Atlas maps it onto the town you already live in:
              something to do tonight for free, places near you that hold a
              piece of it, and one big day worth asking your grown-up for.
            </p>
          </div>
        </section>

        {/* Dream picker */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-5">
            CHOOSE YOUR DREAM
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DREAMS.map((dream) => (
              <Link
                key={dream.slug}
                href={`/wonder-atlas/${dream.slug}`}
                className="card blueprint p-8 flex flex-col group"
              >
                <div className="text-gold text-3xl mb-3">{dream.icon}</div>
                <h3 className="mb-2 group-hover:text-gold transition-colors">
                  {dream.title}
                </h3>
                <p className="text-text-secondary text-sm flex-1">
                  {dream.oneLiner}
                </p>
                <span className="mt-5 text-sm font-semibold text-gold">
                  Open this map →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-text-secondary evidence">
            More dreams are being drawn onto the Atlas. If your child&apos;s
            dream isn&apos;t here yet,{" "}
            <Link href="/contact" className="text-gold hover:underline">
              tell us what it is
            </Link>{" "}
            — real requests decide what we map next. Or explore the whole
            working world and{" "}
            <Link href="/career-cards" className="text-gold hover:underline">
              make your own Career WonderCard →
            </Link>
          </p>
        </section>

        {/* Parent promise */}
        <section className="bg-navy text-cream">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-4">
              FOR GROWN-UPS
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-cream mb-5">
                  Safe by architecture,
                  <br />
                  not by promise.
                </h2>
                <p className="text-cream/80">
                  The Wonder Atlas was built the way we&apos;d want tools built
                  for our own kids. There is nothing here that watches, asks,
                  or remembers.
                </p>
              </div>
              <ul className="space-y-4 text-cream/90">
                {[
                  "No accounts, no sign-ups, no profiles — nothing to create, nothing to leak.",
                  "No location tracking. We name kinds of places (a library, a creek, a planetarium). You choose the exact spot, because you know your town and your child.",
                  "Every quest routes through you. The mission card a child prints has a blank only a grown-up can fill: “where, when, and with whom.”",
                  "Nothing is collected, stored, or sent. The page works the same with your data as without it — because it never has any.",
                ].map((line, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-5 text-gold mr-3 shrink-0">✧</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
