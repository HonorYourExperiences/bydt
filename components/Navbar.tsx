"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/wonderlabs", label: "WonderLabs" },
    { href: "/what-we-build", label: "What We Build" },
    { href: "/for-parents-camps-presenters", label: "For Programs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="font-display text-2xl font-semibold tracking-[-0.02em] text-navy group-hover:text-gold transition-colors">
            BYDT
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[3px] text-text-secondary hidden sm:block">
            Build Your Dreaming Things
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-navy hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA + Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="btn btn-primary hidden md:inline-flex text-sm"
          >
            Book a WonderLab
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-navy"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-cream px-6 py-8 flex flex-col gap-6 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-navy hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary mt-2 w-full justify-center"
          >
            Book a WonderLab
          </Link>
        </div>
      )}
    </nav>
  );
}
