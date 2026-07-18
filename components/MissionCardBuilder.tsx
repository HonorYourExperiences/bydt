"use client";

import { useState } from "react";
import type { Dream, Quest, QuestRing } from "@/lib/wonder-atlas";
import { RING_LABELS } from "@/lib/wonder-atlas";

// Builds the printable Wonder Mission Card. Everything stays on this device:
// no network calls, no storage — state lives only until the tab closes.

interface Props {
  dream: Dream;
}

const RING_ORDER: QuestRing[] = ["tonight", "around-town", "big-day"];

function questKey(ring: QuestRing, index: number) {
  return `${ring}:${index}`;
}

export default function MissionCardBuilder({ dream }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [explorerName, setExplorerName] = useState("");

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else if (next.size < 3) {
        next.add(key);
      }
      return next;
    });
  };

  const chosen: Array<{ ring: QuestRing; quest: Quest }> = [];
  for (const ring of RING_ORDER) {
    dream.quests[ring].forEach((quest, i) => {
      if (selected.has(questKey(ring, i))) chosen.push({ ring, quest });
    });
  }

  return (
    <div>
      {/* Quest rings with selection */}
      <div className="space-y-12 print:hidden">
        {RING_ORDER.map((ring) => (
          <div key={ring}>
            <div className="flex items-baseline gap-4 mb-2">
              <h3 className="text-gold">{RING_LABELS[ring].label}</h3>
              <span className="text-sm text-text-secondary evidence">
                {RING_LABELS[ring].note}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              {dream.quests[ring].map((quest, i) => {
                const key = questKey(ring, i);
                const isChosen = selected.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    aria-pressed={isChosen}
                    className={`card p-6 text-left flex flex-col transition-colors ${
                      isChosen ? "border-gold bg-[#FFFEF9]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-lg">{quest.title}</h4>
                      <span
                        className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-sm ${
                          isChosen
                            ? "bg-gold border-gold text-navy"
                            : "border-border text-transparent"
                        }`}
                        aria-hidden
                      >
                        ✓
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mt-2 flex-1">
                      {quest.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border text-xs space-y-1">
                      <p>
                        <span className="font-mono uppercase tracking-[2px] text-gold">
                          Where&nbsp;
                        </span>
                        <span className="text-text-secondary">{quest.where}</span>
                      </p>
                      <p>
                        <span className="font-mono uppercase tracking-[2px] text-gold">
                          Bring back&nbsp;
                        </span>
                        <span className="text-text-secondary">
                          {quest.evidence}
                        </span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Card assembly */}
      <div className="mt-14 print:mt-0">
        <div className="print:hidden">
          <div className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">
            YOUR MISSION CARD
          </div>
          <p className="text-text-secondary mb-6">
            {chosen.length === 0
              ? "Pick up to three quests above and your mission card will build itself here."
              : `${chosen.length} quest${chosen.length > 1 ? "s" : ""} chosen. Add your first name if you want it on the card — it stays on this page and is never sent anywhere.`}
          </p>
          {chosen.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-end">
              <div>
                <label htmlFor="explorer-name">Explorer&apos;s first name (optional)</label>
                <input
                  id="explorer-name"
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
              >
                Print the mission card
              </button>
            </div>
          )}
        </div>

        {chosen.length > 0 && (
          <div
            id="mission-card"
            className="proof-artifact rounded-2xl p-8 md:p-10 max-w-2xl"
          >
            <div className="artifact-header">
              WONDER MISSION CARD ✧ BUILD YOUR DREAMING THINGS
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h3 className="font-display text-2xl">
                Mission: {dream.title}
              </h3>
              <span className="text-gold text-2xl">{dream.icon}</span>
            </div>
            <p className="evidence text-sm mt-1">{dream.oneLiner}</p>

            <p className="mt-5 text-sm">
              <span className="font-semibold">Explorer:</span>{" "}
              {explorerName.trim() || "____________________"}
            </p>

            <div className="mt-6 space-y-5">
              {chosen.map(({ ring, quest }, i) => (
                <div key={i} className="border-t border-border pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold">
                    {RING_LABELS[ring].label}
                  </p>
                  <p className="font-semibold mt-1">{quest.title}</p>
                  <p className="text-sm text-text-secondary mt-1">
                    {quest.where} — bring back: {quest.evidence}
                  </p>
                </div>
              ))}
            </div>

            {/* The grown-up blank — the family completes the card, not the app */}
            <div className="mt-8 border border-gold/40 rounded-xl p-5">
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-gold mb-3">
                GROWN-UP FLIGHT PLAN — FILLED IN TOGETHER
              </p>
              <div className="space-y-4 text-sm">
                <p>Where exactly (our town&apos;s spot): ______________________________</p>
                <p>When we&apos;ll go: ______________________________</p>
                <p>Going with: ______________________________</p>
                <p>Grown-up&apos;s yes (signature): ______________________________</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-text-secondary evidence">
              A mission becomes real when a grown-up says yes and the evidence
              comes home. Keep this card — it&apos;s proof you started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
