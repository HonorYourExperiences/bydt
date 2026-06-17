"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO - featuring the beautiful hand-drawn book cover */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-10 text-center">
        <img 
          src="/images/build-your-dreaming-things-cover.jpg" 
          alt="Build Your Dreaming Things book cover - hand-drawn illustration of a joyful child on a red rocket in deep space, surrounded by golden stars. Perfect child's perspective, hand-drawn dream style." 
          className="mx-auto w-full max-w-lg h-auto rounded-2xl shadow-2xl border border-gold/20 mb-8" 
        />

        <p className="max-w-2xl mx-auto text-xl text-text-secondary mb-10">
          We help children turn imagination into evidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn btn-primary text-base px-8">
            Book a WonderLab
          </Link>
          <Link href="/contact" className="btn btn-secondary text-base px-8">
            Bring BYDT to Your Event
          </Link>
        </div>

        <p className="mt-10 text-sm tracking-wide text-text-secondary">
          Honor their experiences. Protect their wonder.
        </p>
      </section>

      {/* THE RECOGNITION GAP — THE STEEL BEAM */}
      <section className="section bg-navy text-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="steel-beam max-w-3xl mx-auto mb-8">
            Children are not limited by potential.<br />They are often limited by recognition.
          </div>
          <p className="max-w-2xl mx-auto text-lg text-[#C5BBAE]">
            Most children are not limited by lack of potential. 
            They are limited by systems that do not know how to recognize it, nurture it, 
            or translate it into something they can hold and show.
          </p>
          <p className="mt-6 text-gold font-medium">BYDT builds that system — one experience at a time.</p>
        </div>
      </section>

      {/* THE BYDT METHOD */}
      <section className="section max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-2">THE METHOD</div>
          <h2>Four steps from spark to evidence</h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {[
            {
              num: "01",
              title: "Notice the spark",
              desc: "Something captures a child's attention. We take that seriously — not as a distraction, but as a signal worth following.",
            },
            {
              num: "02",
              title: "Name the capability",
              desc: "We put language to what the child is doing — observing, designing, persisting, questioning. We name it out loud, in their presence.",
            },
            {
              num: "03",
              title: "Build the thing",
              desc: "Children use real tools, real materials, and real processes. The thing they build is not a prop — it is proof.",
            },
            {
              num: "04",
              title: "Reflect into evidence",
              desc: "What they made becomes a record of who they are. Children leave with something they can show, share, and return to.",
            },
          ].map((step, index) => (
            <motion.div key={index} variants={item} className="card p-8 flex flex-col">
              <div className="step-number mb-6">{step.num}</div>
              <h3 className="mb-4 text-xl">{step.title}</h3>
              <p className="text-text-secondary flex-1 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="section bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-2">OFFERINGS</div>
              <h2>What We Create</h2>
            </div>
            <p className="max-w-sm text-text-secondary">
              Every offering is designed to make capability visible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "WonderCards", desc: "Structured prompt cards that help children notice, name, and begin building from their own curiosity. Designed for easy facilitation anywhere." },
              { title: "Step-Into WonderCards", desc: "A deeper, guided experience that takes children through the full BYDT method — from spark to a finished, documentable artifact they can keep." },
              { title: "Aviation WonderLab", desc: "Build. Fly. Notice. Change. Fly again. Children form teams, name an airline, build paper aircraft by hand, test them on a real runway, and refine from evidence." },
              { title: "Cape-Able Heroes", desc: "Children discover and declare their own heroic capability — not through fiction, but through recognizing what they actually do and are." },
              { title: "Custom Experiences", desc: "Tailored WonderLabs, 3D printed prototypes, event activities, and meaning-making tools for camps, schools, and special programs." },
            ].map((offering, i) => (
              <div key={i} className="card p-9 group">
                <h3 className="mb-4 group-hover:text-gold transition-colors">{offering.title}</h3>
                <p className="text-text-secondary mb-6">{offering.desc}</p>
                <Link href="/wonderlabs" className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Explore WonderLabs <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-2">WHO IT'S FOR</div>
          <h2>One program. Three relationships.<br />Every child seen.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { who: "For Children", text: "A place where what they notice, imagine, and attempt is treated as evidence of real capability — not just potential." },
            { who: "For Parents", text: "Help seeing and naming what their child is already doing, so encouragement becomes rooted and specific, not just kind." },
            { who: "For Programs", text: "Camps, schools, libraries, and community spaces can offer BYDT as an enrichment experience that sends children home more certain of themselves." },
          ].map((audience, i) => (
            <div key={i} className="card p-9">
              <div className="text-gold font-mono text-sm tracking-widest mb-3">0{i + 1}</div>
              <h3 className="mb-4">{audience.who}</h3>
              <p className="text-text-secondary">{audience.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/for-parents-camps-presenters" className="btn btn-ghost">
            See how it fits your setting
          </Link>
        </div>
      </section>

      {/* EVIDENCE & IMPACT */}
      <section className="section max-w-4xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="mb-6">What children leave with</h2>
          <p className="text-xl text-text-secondary mb-8">
            Not just skills. Foundations.<br />
            Curiosity. Self-trust. Creativity. Identity. Communication. Capability.
          </p>
          <p className="evidence text-lg">
            “The thing they build is not a prop — it is proof.”
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-3">THE FOUNDER</div>
            <h2 className="mb-6">Rian Howard</h2>
            <div className="space-y-4 text-text-secondary text-[15px] leading-relaxed">
              <p>
                Rian brings a background in aviation, engineering, quality, manufacturing, 
                youth imagination, and systems thinking.
              </p>
              <p>
                BYDT is his answer to the gap between what children carry inside them 
                and what the world is prepared to recognize.
              </p>
            </div>
            <Link href="/about" className="inline-flex mt-8 text-sm font-semibold text-gold hover:underline items-center gap-1">
              Read the full story <ArrowRight size={15} />
            </Link>
          </div>
          <div className="flex-1 w-full aspect-[4/3] bg-[#EDE6DA] rounded-2xl flex items-center justify-center border border-border">
            <div className="text-center text-text-secondary text-sm font-mono tracking-widest">
              PORTRAIT<br />COMING SOON
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section text-center max-w-xl mx-auto px-6">
        <h2 className="mb-4">Ready to give children evidence of their own capability?</h2>
        <p className="text-text-secondary mb-10">
          We respond to every inquiry within two business days.
        </p>
        <Link href="/contact" className="btn btn-primary px-10 text-base">
          Start the conversation
        </Link>
      </section>

      <Footer />
    </>
  );
}
