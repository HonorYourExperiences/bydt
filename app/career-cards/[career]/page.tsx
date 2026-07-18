import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCardMaker from "@/components/CareerCardMaker";
import {
  ATLAS_CROSSWALK,
  BUILD_PATHS,
  CAREERS,
  NEAR_YOU,
  SKILL_POWERS,
  careerFromSlug,
  careerSlug,
} from "@/lib/career-cards";
import { getDream } from "@/lib/wonder-atlas";

export function generateStaticParams() {
  return CAREERS.map((c) => ({ career: careerSlug(c.code) }));
}

export async function generateMetadata(
  props: PageProps<"/career-cards/[career]">
): Promise<Metadata> {
  const { career: slug } = await props.params;
  const career = careerFromSlug(slug);
  if (!career) return { title: "Career WonderCards | Build Your Dreaming Things" };
  return {
    title: `${career.title} — Career WonderCards | Build Your Dreaming Things`,
    description: `Make your own ${career.title} WonderCard: put the career in your words, pick the powers to start training tonight, and print it.`,
  };
}

export default async function CareerPage(
  props: PageProps<"/career-cards/[career]">
) {
  const { career: slug } = await props.params;
  const career = careerFromSlug(slug);
  if (!career) notFound();

  const powers = career.skills.map((skill) => ({
    skill,
    power: SKILL_POWERS[skill] ?? null,
  }));
  const buildPath = BUILD_PATHS[career.jobZone] ?? BUILD_PATHS[3];
  const atlasDream = getDream(ATLAS_CROSSWALK[career.code] ?? "");
  const nearYou = NEAR_YOU[career.cluster] ?? NEAR_YOU["Wide World of Work"];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-14 pb-8 print:hidden">
          <Link
            href="/career-cards"
            className="text-sm text-gold hover:underline font-mono uppercase tracking-[2px]"
          >
            ← All careers
          </Link>
          <div className="mt-6">
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold">
              {career.cluster}
            </span>
            <h1 className="mt-1 mb-4">{career.title}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card blueprint p-6">
              <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
                IN GROWN-UP WORDS (THE OFFICIAL VERSION)
              </div>
              <p className="text-sm text-text-secondary">{career.description}</p>
              <p className="mt-3 text-xs text-text-secondary evidence">
                Straight from O*NET, the U.S. Department of Labor&apos;s career
                database. Sounds official because it is. Your job: say it
                better, below.
              </p>
            </div>
            <div className="card blueprint p-6">
              <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
                THE BUILD PATH — {buildPath.label.toUpperCase()}
              </div>
              <p className="text-sm text-text-secondary">{buildPath.meaning}</p>
            </div>
          </div>

          {/* The bridge to the local world */}
          <div className="card blueprint p-6 mt-6">
            <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-3">
              FIND IT NEAR YOU
            </div>
            <p className="text-sm text-text-secondary mb-4">
              This world isn&apos;t only in far-off cities — pieces of it are
              already in your town. With your grown-up, look for:
            </p>
            <ul className="space-y-2.5">
              {nearYou.map((hint, i) => (
                <li key={i} className="flex items-start text-sm">
                  <span className="w-5 text-gold mr-2 shrink-0">✧</span>
                  <span className="text-text-secondary">{hint}</span>
                </li>
              ))}
            </ul>
            {atlasDream && (
              <p className="mt-5 pt-4 border-t border-border text-sm">
                This dream has a full town map with quests to choose:{" "}
                <Link
                  href={`/wonder-atlas/${atlasDream.slug}`}
                  className="font-semibold text-gold hover:underline"
                >
                  open the {atlasDream.title} map in the Wonder Atlas →
                </Link>
              </p>
            )}
          </div>
        </section>

        <section className="border-t border-border bg-surface/60">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <CareerCardMaker
              career={career}
              powers={powers}
              buildPath={buildPath}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
