"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface JourneyData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  spotlight: string;
  stats: Array<{ icon?: string; text: string }>;
  links: Array<{ label: string; href: string }>;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  journey: JourneyData | null;
}

export default function JourneyModal({ isOpen, onClose, journey }: Props) {
  if (!journey) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-cream text-navy shadow-2xl border border-border"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-50 text-gold hover:text-navy text-3xl leading-none"
              aria-label="Close journey"
            >
              ×
            </button>

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-5/12 relative bg-navy/5">
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="w-full h-full object-cover lg:rounded-l-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/20 to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 bg-navy/70 text-gold text-[10px] px-2 py-0.5 rounded tracking-widest">FROM MY HANDS</div>
              </div>

              <div className="lg:w-7/12 p-6 lg:p-8">
                <div className="mb-5">
                  <span className="uppercase tracking-[3px] text-xs text-gold font-mono">PROJECT SPOTLIGHT</span>
                  <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight mt-1 leading-none">
                    {journey.title}
                  </h3>
                  <p className="text-gold/80 text-sm mt-1">{journey.subtitle}</p>
                </div>

                <div className="prose prose-sm max-w-none text-text-secondary mb-6 leading-relaxed">
                  <p>{journey.description}</p>
                  <p className="mt-3">{journey.spotlight}</p>
                </div>

                {journey.stats.length > 0 && (
                  <div className="mb-6">
                    <h4 className="uppercase text-xs tracking-[2px] text-gold font-mono mb-3">KEY EVIDENCE</h4>
                    <div className="space-y-2.5">
                      {journey.stats.map((stat, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <div className="w-5 text-gold mr-2">✧</div>
                          <span className="text-text-secondary">{stat.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {journey.links.length > 0 && (
                  <div>
                    <h4 className="uppercase text-xs tracking-[2px] text-gold font-mono mb-2">FLOAT DEEPER</h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                      {journey.links.map((link, i) => (
                        <Link key={i} href={link.href} className="text-gold hover:underline" onClick={onClose}>
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
