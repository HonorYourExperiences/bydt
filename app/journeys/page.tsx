"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function JourneysPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-cream px-6">
        <div className="max-w-xl text-center">
          <div className="uppercase tracking-[3px] text-xs text-gold font-mono mb-3">EXPERIENCE</div>
          <h1 className="text-4xl mb-6">Journeys</h1>
          <p className="text-xl text-text-secondary mb-8">
            This immersive experience is currently being refined as part of our visual system rollout.
            In the meantime, explore the WonderLabs and our proof objects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wonderlabs" className="btn btn-primary">
              Explore WonderLabs
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Bring BYDT to Your Event
            </Link>
          </div>
          <p className="mt-8 text-sm text-text-secondary">
            The hand-drawn deep-space world (inspired by your references) lives on in our Canva assets and brand foundation.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
