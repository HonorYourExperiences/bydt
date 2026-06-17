import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-y-12">
        <div>
          <div className="font-display text-2xl font-semibold tracking-[-0.02em] text-navy mb-3">
            Build Your Dreaming Things
          </div>
          <p className="max-w-md text-text-secondary leading-relaxed">
            We help children turn imagination into evidence.
          </p>
          <p className="mt-6 text-sm text-text-secondary">
            Honor their experiences. Protect their wonder.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 text-sm">
          <div className="space-y-3">
            <div className="font-semibold text-navy">Explore</div>
            <Link href="/wonderlabs" className="block text-text-secondary hover:text-navy">WonderLabs</Link>
            <Link href="/what-we-build" className="block text-text-secondary hover:text-navy">What We Build</Link>
            <Link href="/about" className="block text-text-secondary hover:text-navy">The Story</Link>
          </div>
          <div className="space-y-3">
            <div className="font-semibold text-navy">Work With Us</div>
            <Link href="/for-parents-camps-presenters" className="block text-text-secondary hover:text-navy">For Camps &amp; Schools</Link>
            <Link href="/contact" className="block text-text-secondary hover:text-navy">Book a WonderLab</Link>
            <Link href="/contact" className="block text-text-secondary hover:text-navy">Bring BYDT to Your Event</Link>
          </div>
          <div className="space-y-3 md:col-span-1 col-span-2">
            <div className="font-semibold text-navy">Connect</div>
            <a 
              href="mailto:rhoward@buildyourdreamingthings.com" 
              className="block text-text-secondary hover:text-navy"
            >
              rhoward@buildyourdreamingthings.com
            </a>
            <p className="text-text-secondary text-xs mt-4">
              We respond within two business days.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between text-xs text-text-secondary gap-2">
          <div>© {new Date().getFullYear()} Build Your Dreaming Things. All rights reserved.</div>
          <div>Children are not limited by potential. They are often limited by recognition.</div>
        </div>
      </div>
    </footer>
  );
}
