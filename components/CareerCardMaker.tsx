"use client";

import { useState } from "react";
import type { CareerRecord, SkillTranslation } from "@/lib/career-cards";

// The child builds their own Career WonderCard: their words, their chosen
// powers, their name. Everything stays on this device — no network, no
// storage. The printed card is the artifact.

interface Props {
  career: CareerRecord;
  powers: Array<{ skill: string; power: SkillTranslation | null }>;
  buildPath: { label: string; meaning: string };
}

export default function CareerCardMaker({ career, powers, buildPath }: Props) {
  const [myWords, setMyWords] = useState("");
  const [whyMe, setWhyMe] = useState("");
  const [explorerName, setExplorerName] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const togglePower = (skill: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else if (next.size < 3) {
        next.add(skill);
      }
      return next;
    });
  };

  const pickedPowers = powers.filter((p) => picked.has(p.skill));
  const cardReady = myWords.trim().length > 0 || pickedPowers.length > 0;

  return (
    <div>
      {/* Step 1: say it your way */}
      <div className="print:hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
              STEP 1 — SAY IT YOUR WAY
            </div>
            <p className="text-text-secondary text-sm mb-3">
              The grown-up words above are the official version. Your card
              gets <em>your</em> version. What does{" "}
              {`${/^[aeiou]/i.test(career.title) ? "an" : "a"} ${career.title.toLowerCase()}`}{" "}
              actually do, the way you&apos;d tell a friend?
            </p>
            <label htmlFor="my-words">In my words, this job is…</label>
            <textarea
              id="my-words"
              rows={3}
              maxLength={280}
              value={myWords}
              onChange={(e) => setMyWords(e.target.value)}
              placeholder="Type it the way you'd say it."
              className="w-full"
            />
          </div>
          <div>
            <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
              STEP 2 — WHY IT CALLS YOU
            </div>
            <p className="text-text-secondary text-sm mb-3">
              Nobody can answer this part but you. What is it about this one?
            </p>
            <label htmlFor="why-me">This dream calls me because…</label>
            <textarea
              id="why-me"
              rows={3}
              maxLength={280}
              value={whyMe}
              onChange={(e) => setWhyMe(e.target.value)}
              placeholder="One honest sentence beats five fancy ones."
              className="w-full"
            />
          </div>
        </div>

        {/* Step 3: pick powers */}
        <div className="mt-10">
          <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
            STEP 3 — PICK UP TO THREE POWERS TO START TRAINING
          </div>
          <p className="text-text-secondary text-sm mb-4">
            These are the real powers this career runs on. Every one of them
            can start training tonight, free.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {powers.map(({ skill, power }) => {
              const isPicked = picked.has(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => togglePower(skill)}
                  aria-pressed={isPicked}
                  className={`card p-5 text-left transition-colors ${
                    isPicked ? "border-gold bg-[#FFFEF9]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {power ? power.kidName : skill}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[2px] text-gold mt-0.5">
                        {skill}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm ${
                        isPicked
                          ? "bg-gold border-gold text-navy"
                          : "border-border text-transparent"
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </div>
                  {power && (
                    <>
                      <p className="text-sm text-text-secondary mt-2">
                        {power.meaning}
                      </p>
                      <p className="text-xs text-text-secondary mt-2">
                        <span className="font-mono uppercase tracking-[2px] text-gold">
                          Tonight&nbsp;
                        </span>
                        {power.tonight}
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: name + print */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div>
            <label htmlFor="career-explorer-name">
              Your first name (optional — stays on this page, never sent anywhere)
            </label>
            <input
              id="career-explorer-name"
              type="text"
              maxLength={30}
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
              placeholder="First name only"
            />
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-primary"
            disabled={!cardReady}
            title={cardReady ? undefined : "Add your words or pick a power first"}
          >
            Print my Career WonderCard
          </button>
        </div>
      </div>

      {/* The card itself */}
      <div
        id="career-card"
        className="proof-artifact rounded-2xl p-8 md:p-10 max-w-2xl mt-12 print:mt-0"
      >
        <div className="artifact-header">
          CAREER WONDERCARD ✧ BUILD YOUR DREAMING THINGS ✧ MADE BY ME
        </div>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h3 className="font-display text-2xl">{career.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold">
            {career.cluster}
          </span>
        </div>

        <p className="mt-4 text-sm">
          <span className="font-semibold">Explorer:</span>{" "}
          {explorerName.trim() || "____________________"}
        </p>

        <div className="mt-5 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold">
            IN MY WORDS, THIS JOB IS
          </p>
          <p className="mt-1 text-sm">
            {myWords.trim() || "________________________________________"}
          </p>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold">
            THIS DREAM CALLS ME BECAUSE
          </p>
          <p className="mt-1 text-sm">
            {whyMe.trim() || "________________________________________"}
          </p>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold">
            POWERS I&apos;M TRAINING
          </p>
          {pickedPowers.length === 0 ? (
            <p className="mt-1 text-sm">
              ________________________________________
            </p>
          ) : (
            <div className="mt-2 space-y-3">
              {pickedPowers.map(({ skill, power }) => (
                <div key={skill}>
                  <p className="text-sm font-semibold">
                    ✧ {power ? power.kidName : skill}
                  </p>
                  {power && (
                    <p className="text-xs text-text-secondary">
                      Tonight: {power.tonight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold">
            THE BUILD PATH — {buildPath.label.toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-text-secondary">{buildPath.meaning}</p>
        </div>

        <div className="mt-6 border border-gold/40 rounded-xl p-5">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold mb-3">
            GROWN-UP CORNER — FILLED IN TOGETHER
          </p>
          <div className="space-y-3 text-sm">
            <p>Someone we know who does work like this: ______________________</p>
            <p>One place in our town that touches this world: ______________________</p>
            <p>Grown-up&apos;s yes to one power practice (signature): ______________________</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-text-secondary evidence">
          Official career facts adapted from O*NET, by the U.S. Department of
          Labor. The important parts — the words, the why, the training — are
          yours.
        </p>
      </div>
    </div>
  );
}
