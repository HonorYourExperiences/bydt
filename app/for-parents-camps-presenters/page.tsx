import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ForPrograms() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl mb-16">
          <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">FOR ADULTS WHO CARE</div>
          <h1 className="mb-6">For Parents, Camps, Schools &amp; Presenters</h1>
          <p className="text-xl text-text-secondary">
            BYDT fits wherever children gather and leaders care about what they carry home.
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              who: "For Children",
              text: "BYDT gives children a place where what they notice, imagine, and attempt is treated as evidence of real capability — not just potential.",
            },
            {
              who: "For Parents",
              text: "We help parents see and name what their child is already doing — so encouragement becomes something rooted and specific, not just kind.",
            },
            {
              who: "For Programs",
              text: "Camps, schools, libraries, and community spaces can offer BYDT as an enrichment experience that sends children home with something real they know about themselves.",
            },
          ].map((section, i) => (
            <div key={i} className="border-l-4 border-gold pl-8">
              <h3 className="mb-3 text-gold">{section.who}</h3>
              <p className="text-lg text-text-secondary">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border text-center">
          <p className="max-w-xl mx-auto mb-8 text-text-secondary">
            Summer camps. STEM programs. Aviation days. Libraries. Community centers. 
            Homeschool groups. Elementary enrichment. Youth events.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Bring BYDT to Your Program
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
