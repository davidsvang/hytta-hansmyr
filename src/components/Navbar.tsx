"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Historien", href: "#historien" },
  { label: "Hytten", href: "#hytten" },
  { label: "Guider", href: "#guider" },
  { label: "Aktiviteter", href: "#aktiviteter" },
  { label: "Booking", href: "#booking" },
  { label: "Dagbok", href: "#dagbok" },
  { label: "Galleri", href: "#galleri" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#2C2A1E]/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span
            className="font-playfair text-lg text-[#2C2A1E]"
            style={{ fontWeight: 400 }}
          >
            Hytta på{" "}
            <em className="text-[#3B5E2B]" style={{ fontStyle: "italic" }}>
              Hansmyr
            </em>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-caps text-[#5F5E5A] hover:text-[#3B5E2B] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="label-caps bg-[#3B5E2B] text-white px-4 py-2 rounded hover:bg-[#2C3D1E] transition-colors ml-2"
          >
            Se ledige datoer
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#2C2A1E]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#2C2A1E]/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-caps text-[#5F5E5A] hover:text-[#3B5E2B]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="label-caps bg-[#3B5E2B] text-white px-4 py-2 rounded text-center hover:bg-[#2C3D1E]"
            onClick={() => setMobileOpen(false)}
          >
            Se ledige datoer
          </a>
        </div>
      )}
    </header>
  );
}
