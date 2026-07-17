import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerBrowser from "@/components/CareerBrowser";
import { CAREERS, careerSlug } from "@/lib/career-cards";

export const metadata: Metadata = {
  title: "Career WonderCards | Build Your Dreaming Things",
  description:
    "Pick a real career, translate it into your own words, choose the powers to start training tonight, and print a Career WonderCard you made yourself. Built on O*NET, the U.S. Department of Labor's career database — with no accounts and no tracking.",
};

export default function CareerCardsPage() {
  const index = CAREERS.map((c) => ({
    slug: careerSlug(c.code),
    title: c.title,
    cluster: c.cluster,
  })).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
          <div className="max-w-3xl">
            <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">
              MAKE YOUR OWN
            </div>
            <h1 className="mb-6">Career WonderCards</h1>
            <p className="text-xl text-text-secondary">
              Every job in America has an official entry in a government
              database called O*NET — what it is, what it takes, how people
              build toward it. Grown-ups use it to find work. You get to use
              it for something better: pick a career, put it in your own
              words, choose the powers you&apos;ll start training tonight,
              and print a card <em>you</em> made. Your dream, on paper, in
              your handwriting-to-be.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-16">
          <CareerBrowser careers={index} />
          <p className="mt-10 text-sm text-text-secondary evidence">
            This shelf holds a starter set — the full catalog of nearly 900
            careers is on its way. Want a dream mapped onto your own town
            instead?{" "}
            <Link href="/wonder-atlas" className="text-gold hover:underline">
              Open the Wonder Atlas →
            </Link>
          </p>
        </section>

        <section className="bg-navy text-cream">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-4">
                  FOR GROWN-UPS
                </div>
                <h2 className="text-cream mb-4">
                  Real data, translated by your kid.
                </h2>
                <p className="text-cream/80">
                  Career facts come from O*NET, the U.S. Department of
                  Labor&apos;s occupational database — the same source
                  counselors use. We keep the official description in grown-up
                  words on purpose: the child translates it themselves, which
                  is where the learning lives.
                </p>
              </div>
              <ul className="space-y-4 text-cream/90">
                {[
                  "Same rules as everything we build: no accounts, no tracking, nothing collected or sent. Typed words live on the device until the tab closes.",
                  "The card prints with a Grown-Up Corner — someone you know in that field, one place in town that touches it, and your signature on one power practice.",
                  "Job Zones become honest 'build paths' — long roads shown as staircases, not walls.",
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
