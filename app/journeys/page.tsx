"use client";

import React, { useState, useRef } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Journey data with hand-drawn space dream theme
const JOURNEYS = [
  {
    id: 'constellations',
    title: 'Mapping the Constellations',
    subtitle: 'WonderCards — Notice the spark',
    image: '/images/space-dream-journey.jpg',
    description: 'In the quiet of deep space, a child notices the first spark — a single bright point of curiosity. With WonderCards in hand, the child names the light and begins to chart the unseen connections.',
    spotlight: 'From a child’s hand-drawn sketchbook come the first maps of inner galaxies. Every card is a prompt to see what was always there.',
    stats: [
      { text: '100% of children leave with a named constellation of their own ideas' },
      { text: 'WonderCards turn fleeting sparks into holdable evidence' },
    ],
    links: [
      { label: 'Explore WonderCards', href: '/wonderlabs' },
      { label: 'Bring this journey to your program', href: '/contact' },
    ],
  },
  {
    id: 'heroes',
    title: 'Heroes in the Void',
    subtitle: 'Aviation WonderLab + Cape-Able Heroes',
    image: '/images/space-dream-hero.jpg',
    description: 'Children launch paper planes that become rockets. They name their airline, test their builds against the infinite, and discover they are already the heroes of their own stories.',
    spotlight: 'Evidence appears in the form of flight logs, refined prototypes, and the quiet knowledge that “I can change course when the evidence tells me to.”',
    stats: [
      { text: 'Build. Fly. Notice. Change. Fly again.' },
      { text: '100% of participants declare their own heroic capability' },
    ],
    links: [
      { label: 'See the Aviation WonderLab', href: '/wonderlabs' },
      { label: 'Meet the Cape-Able Heroes', href: '/wonderlabs' },
    ],
  },
  {
    id: 'nebula',
    title: 'Evidence in the Nebulae',
    subtitle: 'Custom Experiences & Step-Into WonderCards',
    image: '/images/space-dream-journey.jpg',
    description: 'In the deepest reaches of a child’s dream, drawings and prototypes become real structures. A whole nebula of possibility condenses into something the child can point to and say: “I built that.”',
    spotlight: 'The child returns from the dream carrying physical proof — a 3D-printed planet, a finished artifact, a story only they could have told.',
    stats: [
      { text: 'Every journey ends with something real the child can show, share, and return to' },
      { text: 'Imagination translated into evidence the world can see' },
    ],
    links: [
      { label: 'See Custom Experiences', href: '/what-we-build' },
      { label: 'Start a journey for your group', href: '/contact' },
    ],
  },
];

export default function JourneysPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
  const [modalJourney, setModalJourney] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const activeJourney = JOURNEYS.find(j => j.id === activeJourneyId);

  const audioCtxRef = useRef<any>(null);
  const oscRef = useRef<any>(null);
  const gainRef = useRef<any>(null);

  const handleEnter = () => setShowLoader(false);

  const handleSelectJourney = (journey: any) => {
    setActiveJourneyId(journey.id);
    setModalJourney(journey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!oscRef.current) {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.value = 42; // deep dreamy hum
      filter.type = 'lowpass';
      filter.frequency.value = 250;
      gain.gain.value = 0;
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      lfo.start();
      oscRef.current = osc;
      gainRef.current = gain;
    }
    if (audioOn) {
      gainRef.current.gain.value = 0;
    } else {
      gainRef.current.gain.value = 0.015;
    }
    setAudioOn(!audioOn);
  };

  if (showLoader) {
    return <JourneyLoader onEnter={handleEnter} />;
  }

  return (
    <>
      {/* Custom immersive header for the experience */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 bg-[#0A162F]/90 backdrop-blur-md border-b border-[#94E6FB]/20">
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-2xl text-[#94E6FB] hover:text-white transition-colors">BYDT</Link>
            <div className="text-[#94E6FB]/40">•</div>
            <div className="text-sm tracking-[3px] text-[#C5BBAE] uppercase">The Dreams We Breathe</div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleAudio} className="flex items-center gap-1 text-xs tracking-[2px] text-[#94E6FB] hover:text-white transition-colors">
              AUDIO <span className={audioOn ? "text-emerald-400" : "text-red-400"}>{audioOn ? "ON" : "OFF"}</span>
            </button>
            <button className="flex items-center gap-1 text-xs tracking-[2px] text-[#94E6FB] hover:text-white transition-colors">
              SHARE
            </button>
          </div>
        </div>
      </header>

      {/* Immersive Starfield Background */}
      <div className="fixed inset-0 z-0">
        <StarfieldCanvas activeJourney={activeJourneyId || undefined} />
      </div>

      {/* Decorative hand-drawn frame */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute top-4 left-4 w-6 h-6 border border-[#94E6FB]/30" style={{ borderTop: 'none', borderLeft: 'none' }} />
        <div className="absolute top-4 right-4 w-6 h-6 border border-[#94E6FB]/30" style={{ borderTop: 'none', borderRight: 'none' }} />
        <div className="absolute bottom-4 left-4 w-6 h-6 border border-[#94E6FB]/30" style={{ borderBottom: 'none', borderLeft: 'none' }} />
        <div className="absolute bottom-4 right-4 w-6 h-6 border border-[#94E6FB]/30" style={{ borderBottom: 'none', borderRight: 'none' }} />
      </div>

      {/* HUD */}
      <Hud
        location={activeJourney ? activeJourney.title : "The Inner Cosmos"}
        progress={activeJourneyId ? 87 : 23}
        depth={activeJourneyId ? "∞ light-years" : "0.8 ly"}
        temp={activeJourneyId ? "Dreamlike" : "42 K"}
        threatLevel={activeJourneyId ? "Bright & Building" : "Gentle Spark"}
        activeJourney={activeJourneyId}
      />

      {/* Audio button */}
      <div className="fixed top-20 left-6 z-50">
        <button
          onClick={toggleAudio}
          className="btn btn--circle flex items-center gap-2 text-xs tracking-widest border border-[#94E6FB]/40 hover:border-[#94E6FB] px-3 py-1 rounded-full"
          aria-label="Toggle ambient audio"
        >
          <span className="text-[#94E6FB]">AUDIO</span>
          <span className={audioOn ? "text-emerald-400" : "text-red-400"}>{audioOn ? "ON" : "OFF"}</span>
        </button>
      </div>

      <main className="relative z-10 min-h-screen pt-16 pb-24 text-cream">
        {/* Title area */}
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="uppercase tracking-[4px] text-xs font-mono text-gold mb-3">THE DREAMS WE BREATHE</div>
          <h1 className="text-5xl md:text-6xl leading-none mb-6 tracking-[-0.02em]">
            Journey Through<br />a Child’s Cosmos
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-[#C5BBAE]">
            From a child’s hand-drawn perspective, deep space is not empty.<br />
            It is a vast, living sketchbook where every spark can be built into something real.
          </p>
          <p className="mt-4 text-sm tracking-widest text-gold/70">SELECT A CURRENT TO BEGIN THE JOURNEY</p>
        </div>

        {/* Breathing as central Inhale Exhale */}
        <div className="max-w-xl mx-auto px-6 mt-8 text-center">
          <div className="mb-5">
            <BreathingStar />
          </div>
          <p className="text-sm tracking-widest text-gold/70 mb-3">INHALE THE INFINITE • EXHALE WHAT YOU WILL BUILD</p>
        </div>

        {/* Three Journeys as currents */}
        <div className="max-w-5xl mx-auto px-6 mt-8">
          <div className="grid md:grid-cols-3 gap-4">
            {JOURNEYS.map((journey) => {
              const isActive = activeJourneyId === journey.id;
              return (
                <button
                  key={journey.id}
                  onClick={() => handleSelectJourney(journey)}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 min-h-[260px] flex flex-col ${isActive ? 'border-gold ring-2 ring-gold/50 scale-[1.015]' : 'border-gold/20 hover:border-gold/50'}`}
                >
                  <div className="relative flex-1">
                    <img 
                      src={journey.image} 
                      alt={journey.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-all" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/60 to-navy/95" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-1">CURRENT</div>
                      <h3 className="text-2xl leading-none text-cream group-hover:text-gold transition-colors drop-shadow">{journey.title}</h3>
                      <p className="text-sm text-[#C5BBAE] mt-2 line-clamp-2">{journey.spotlight}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-navy/90 border-t border-gold/10">
                    <div className="btn btn-primary text-sm inline-flex w-full justify-center">
                      Float In
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      {/* Rich Journey Modal */}
      <JourneyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        journey={modalJourney}
      />
    </>
  );
}

// Loader component (reference style)
function JourneyLoader({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [detail, setDetail] = useState("Connecting");
  const [location, setLocation] = useState("Searching");
  const [coords, setCoords] = useState("Searching");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + 11 + Math.random() * 7);
        if (next > 22 && location === "Searching") setLocation("The Inner Cosmos");
        if (next > 48 && detail === "Connecting") setDetail("Hand Forming");
        if (next > 72 && coords === "Searching") setCoords("Child's Eye • 0.00° Wonder");
        return next;
      });
    }, 160);

    return () => clearInterval(interval);
  }, [location, detail, coords]);

  const isLoaded = progress >= 100;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A162F] flex items-center justify-center overflow-hidden">
      <div className="site-loader__content w-full max-w-md px-6 text-[#94E6FB]">
        <div className="text-left font-mono text-sm tracking-[1.5px] space-y-px mb-8">
          <div>&gt; Detail: <span className="text-white/90">{detail}</span><span className="opacity-40">...</span></div>
          <div>&gt; Location: <span className="text-white/90">{location}</span></div>
          <div>&gt; Coordinates: <span className="text-white/90">{coords}</span></div>
        </div>

        <div className="relative mx-auto w-[220px] h-[220px] mb-6">
          <svg className="w-full h-full" viewBox="0 0 440 440">
            <mask id="loader-mask">
              <circle cx="220" cy="220" r="173.5" fill="white" />
            </mask>
            <g>
              <circle cx="220" cy="220" r="169" fill="none" stroke="#1f3a5f" strokeWidth="47" />
              <circle 
                cx="220" cy="220" r="169" 
                fill="none" stroke="#94E6FB" strokeWidth="47" 
                strokeDasharray="1062" 
                strokeDashoffset={1062 - (progress / 100) * 1062}
                style={{ transition: 'stroke-dashoffset 0.2s linear' }}
              />
            </g>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-[42px] font-mono tabular-nums leading-none text-white/90">{Math.floor(progress)}</div>
            <div className="text-[10px] tracking-[2px] mt-1 text-[#94E6FB]/70">DREAM DEPTH</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onEnter}
            disabled={!isLoaded}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#94E6FB] text-[#94E6FB] hover:bg-[#94E6FB] hover:text-[#0A162F] transition-all text-sm tracking-[1.5px] disabled:opacity-60"
          >
            {isLoaded ? "ENTER THE DREAM" : "FORMING THE SKETCH..."}
          </button>
          <p className="mt-4 text-[10px] tracking-widest text-[#94E6FB]/60">We use soft sounds to enhance your experience.</p>
        </div>
      </div>
    </div>
  );
}

// BreathingStar component (inline for the page)
function BreathingStar() {
  const [isBreathing, setIsBreathing] = React.useState(false);
  const [phase, setPhase] = React.useState<'inhale' | 'exhale'>('inhale');

  const handleBreathe = () => {
    if (!isBreathing) {
      setIsBreathing(true);
      setPhase('inhale');
      setTimeout(() => setPhase('exhale'), 2000);
      setTimeout(() => {
        setIsBreathing(false);
        setPhase('inhale');
      }, 4200);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleBreathe}
        animate={{ scale: isBreathing ? (phase === 'inhale' ? 1.4 : 0.72) : 1 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/70 text-gold cursor-pointer"
      >
        <div className="text-center">
          <div className="font-mono text-[9px] tracking-[3px] opacity-70">THE DREAM</div>
          <div className="text-base font-medium tracking-widest mt-px">{isBreathing ? phase.toUpperCase() : "BREATHE"}</div>
        </div>
        <div className="absolute text-gold/50 text-sm pointer-events-none">
          <span className="absolute -top-1 -left-2">✧</span>
          <span className="absolute -bottom-1 -right-2">✦</span>
        </div>
      </motion.button>
      <p className="text-[10px] tracking-[2px] text-gold/70">TAP TO BREATHE WITH THE STARS</p>
    </div>
  );
}

// Note: StarfieldCanvas, Hud, JourneyModal are assumed to be in components/ as per previous. For full, push them too if not present.
