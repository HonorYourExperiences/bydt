import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WonderLabs() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-3xl">
          <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">EXPERIENCES</div>
          <h1 className="mb-6">WonderLabs</h1>
          <p className="text-xl text-text-secondary">
            Hands-on experiences designed to make capability visible. 
            Every WonderLab turns a child’s spark into something they can see, hold, and return to.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {[
            {
              title: "WonderCards",
              desc: "Structured prompt cards that help children notice, name, and begin building from their own curiosity. Easy to facilitate anywhere.",
            },
            {
              title: "Step-Into WonderCards",
              desc: "A deeper guided experience that takes children through the full method — from spark to a finished, documentable artifact they can keep.",
            },
            {
              title: "Aviation WonderLab",
              desc: "Build. Fly. Notice. Change. Fly again. Children form teams, name an airline, build paper aircraft, test them on a real runway, and refine from evidence.",
              link: "#",
            },
            {
              title: "Cape-Able Heroes",
              desc: "Children discover and declare their own heroic capability — not through fiction, but through recognizing what they actually do and are.",
            },
          ].map((exp, i) => (
            <div key={i} className="card p-9 flex flex-col">
              <h3 className="mb-4">{exp.title}</h3>
              <p className="text-text-secondary flex-1">{exp.desc}</p>
              {exp.link && (
                <Link href={exp.link} className="mt-6 text-sm font-semibold text-gold hover:underline">
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-navy text-cream p-10 md:p-14 rounded-2xl text-center">
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Every offering is designed to make capability visible. 
            Children leave with something real they know about themselves.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Bring a WonderLab to Your Program
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
