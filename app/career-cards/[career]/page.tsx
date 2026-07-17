import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCardMaker from "@/components/CareerCardMaker";
import {
  BUILD_PATHS,
  CAREERS,
  SKILL_POWERS,
  careerFromSlug,
  careerSlug,
} from "@/lib/career-cards";

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
