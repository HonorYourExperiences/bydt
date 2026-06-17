import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        <div className="max-w-2xl">
          <div className="uppercase tracking-[3px] text-sm text-gold font-mono mb-3">THE STORY</div>
          <h1 className="mb-8">The Person Behind It</h1>

          <div className="prose prose-lg text-text-secondary space-y-6">
            <p className="text-xl">
              Rian Howard is the founder of Build Your Dreaming Things.
            </p>
            <p>
              He brings a background in aviation, engineering, quality, manufacturing, youth imagination, and systems thinking.
            </p>
            <p>
              His work is rooted in a simple belief: children are often not limited by lack of potential, 
              but by systems that do not know how to recognize, nurture, or translate it.
            </p>
            <p>
              BYDT is his answer to that gap.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border blueprint">
          <div className="steel-beam max-w-3xl">
            Children need more than encouragement.<br />
            They need places where effort becomes visible, ideas become speakable, and capability becomes believable.
          </div>
        </div>

        <div className="mt-16">
          <Link href="/contact" className="btn btn-secondary">
            Get in touch
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
