import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WhatWeBuild() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl mb-12">
          <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">OUTPUTS</div>
          <h1 className="mb-6">What We Build</h1>
          <p className="text-xl text-text-secondary">
            Not just skills. Foundations. The things children make become records of who they are — 
            proof that their ideas mattered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            "WonderCards & printed experiences",
            "Kid-friendly prototypes & 3D printed artifacts",
            "Interactive event installations",
            "Custom meaning-making tools for programs",
            "Aviation builds and flight records",
            "Personal capability documents & reflections",
          ].map((item, index) => (
            <div key={index} className="card p-8">
              <div className="text-gold text-4xl font-display mb-6 opacity-60">0{index + 1}</div>
              <p className="text-lg leading-tight">{item}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-md mx-auto">
          <p className="text-text-secondary mb-8">
            Fabrication is one output. The deeper work is recognition, translation, structure, practice, and evidence.
          </p>
          <Link href="/contact" className="btn btn-secondary">
            Commission a custom experience
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
