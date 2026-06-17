"use client";

import React from 'react';

interface HudProps {
  location?: string;
  progress?: number;
  depth?: string;
  temp?: string;
  threatLevel?: string;
  activeJourney?: string;
}

export default function Hud({
  location = "Inner Cosmos",
  progress = 0,
  depth = "0 ly",
  temp = "Dreamlike",
  threatLevel = "Wonder",
  activeJourney,
}: HudProps) {
  return (
    <div className="hud-container opacity-95 pointer-events-none fixed top-20 right-6 z-40 text-right font-mono text-[10px] tracking-[1.5px] text-[#94E6FB] select-none">
      <div className="hud bg-[rgba(10,22,47,0.8)] border border-[#94E6FB]/40 px-3 py-2.5 rounded-sm backdrop-blur-md">
        <p className="t-body t-lh-1 t-500 t-11 t-ls-0.1 t-uppercase mb-0.5 text-[#C5BBAE]">{location}</p>
        
        <p className="t-body t-lh-1 t-500 t-8 t-ls-0.2 t-uppercase mb-1">
          DISCOVERY PROGRESS: <span className="font-semibold text-white">{Math.floor(progress)}%</span>
        </p>

        <div className="flex items-center justify-end gap-3 text-[9px] mb-1.5">
          <div>
            <span className="text-[#C5BBAE]">DEPTH:</span> <span className="font-semibold">{depth}</span>
          </div>
          <div className="w-px h-2.5 bg-[#94E6FB]/40" />
          <div>
            <span className="text-[#C5BBAE]">WONDER:</span> <span className="font-semibold">{temp}</span>
          </div>
        </div>

        <div className="mt-1 flex justify-end">
          <svg width="68" height="42" viewBox="0 0 68 42" className="opacity-80">
            <circle cx="34" cy="21" r="18" fill="none" stroke="#1f3a5f" strokeWidth="1" />
            <circle cx="34" cy="21" r="18" fill="none" stroke="#94E6FB" strokeWidth="0.8" strokeDasharray="2 3" />
            
            <g className={activeJourney === 'constellations' ? 'text-[#BFA16B]' : 'text-[#94E6FB]/70'}>
              <circle cx="22" cy="12" r="1.5" fill="currentColor" />
              <circle cx="30" cy="8" r="1.2" fill="currentColor" />
              <circle cx="46" cy="14" r="1.4" fill="currentColor" />
              <circle cx="38" cy="28" r="1.3" fill="currentColor" />
              <line x1="22" y1="12" x2="30" y2="8" stroke="currentColor" strokeWidth="0.7" />
              <line x1="30" y1="8" x2="46" y2="14" stroke="currentColor" strokeWidth="0.6" />
              <line x1="46" y1="14" x2="38" y2="28" stroke="currentColor" strokeWidth="0.7" />
            </g>

            {activeJourney === 'heroes' && (
              <g className="text-[#BFA16B]">
                <circle cx="18" cy="25" r="1" fill="currentColor" />
                <circle cx="50" cy="30" r="0.9" fill="currentColor" />
                <line x1="18" y1="25" x2="50" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
              </g>
            )}

            {activeJourney === 'nebula' && (
              <circle cx="34" cy="21" r="12" fill="#7BA3C9" fillOpacity="0.15" />
            )}
          </svg>
        </div>

        <div className="mt-1 text-[8px] tracking-[1px] text-[#BFA16B]">
          SPARK INTENSITY — {threatLevel}
        </div>
      </div>
    </div>
  );
}
