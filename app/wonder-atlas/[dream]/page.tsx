import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MissionCardBuilder from "@/components/MissionCardBuilder";
import { DREAMS, getDream } from "@/lib/wonder-atlas";
import { careerSlug, careersForDream } from "@/lib/career-cards";

export function generateStaticParams() {
  return DREAMS.map((dream) => ({ dream: dream.slug }));
}

export async function generateMetadata(
  props: PageProps<"/wonder-atlas/[dream]">
): Promise<Metadata> {
  const { dream: slug } = await props.params;
  const dream = getDream(slug);
  if (!dream) return { title: "Wonder Atlas | Build Your Dreaming Things" };
  return {
    title: `${dream.title} — Wonder Atlas | Build Your Dreaming Things`,
    description: `${dream.oneLiner} Map the ${dream.title.toLowerCase()} dream onto your own town with quests for tonight, around town, and one big day.`,
  };
}

export default async function DreamPage(
  props: PageProps<"/wonder-atlas/[dream]">
) {
  const { dream: slug } = await props.params;
  const dream = getDream(slug);
  if (!dream) notFound();

  const officialCareers = careersForDream(dream.slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Dream header */}
        <section className="max-w-5xl mx-auto px-6 pt-14 pb-10 print:hidden">
          <Link
            href="/wonder-atlas"
            className="text-sm text-gold hover:underline font-mono uppercase tracking-[2px]"
          >
            ← Wonder Atlas
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <span className="text-gold text-5xl leading-none" aria-hidden>
              {dream.icon}
            </span>
            <div>
              <h1 className="mb-3">{dream.title}</h1>
              <p className="text-xl text-text-secondary max-w-2xl">
                {dream.oneLiner}
              </p>
            </div>
          </div>
        </section>

        {/* What this dream actually is */}
        <section className="max-w-5xl mx-auto px-6 pb-12 print:hidden">
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-3">
              <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-4">
                WHAT THIS DREAM ACTUALLY IS
              </div>
              {dream.translation.map((para, i) => (
                <p key={i} className="text-text-secondary mb-4">
                  {para}
                </p>
              ))}

              <div className="card blueprint p-6 mt-6">
                <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-3">
                  OUTSIDE YOUR DOOR TONIGHT
                </div>
                <p className="text-text-secondary text-sm">
                  {dream.outsideYourDoor}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-4">
                THE CAPABILITIES IT&apos;S MADE OF
              </div>
              <div className="space-y-4">
                {dream.capabilities.map((cap) => (
                  <div key={cap.name} className="hand-drawn rounded-xl p-4">
                    <p className="font-semibold">
                      <span className="text-gold mr-2">✧</span>
                      {cap.name}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {cap.meaning}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-text-secondary evidence">
                Every quest below trains at least one of these — that&apos;s
                the point. The dream is the direction; the capabilities are
                what you actually keep.
              </p>
            </div>
          </div>
        </section>

        {/* Quest rings + mission card */}
        <section className="border-t border-border bg-surface/60">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="max-w-2xl mb-10 print:hidden">
              <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-3">
                YOUR TOWN HOLDS PIECES OF THIS DREAM
              </div>
              <h2 className="mb-4">Choose your quests</h2>
              <p className="text-text-secondary">
                Pick up to three. The Atlas names the kind of place; you and
                your grown-up pick the exact spot, because nobody knows your
                town — or you — better than your family.
              </p>
            </div>
            <MissionCardBuilder dream={dream} />

            {officialCareers.length > 0 && (
              <div className="mt-14 pt-8 border-t border-border print:hidden">
                <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-3">
                  THE OFFICIAL VERSIONS OF THIS DREAM
                </div>
                <p className="text-text-secondary text-sm mb-5 max-w-2xl">
                  Grown-ups have official names for this dream — real careers,
                  each with its own entry in the government&apos;s job
                  database. Pick one and make a Career WonderCard in your own
                  words:
                </p>
                <div className="flex flex-wrap gap-3">
                  {officialCareers.map((c) => (
                    <Link
                      key={c.code}
                      href={`/career-cards/${careerSlug(c.code)}`}
                      className="btn btn-ghost text-sm"
                    >
                      {c.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
