"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const menu = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Machinery", href: "/machinery" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md h-16"
          : "bg-slate-950/85 backdrop-blur-md h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link
          href="/"
          className={`font-black text-xl tracking-wide flex items-center gap-2 ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
        >
          <Image
            src="/images/logo.jpeg"
            alt="Liyon Lanka Engineering Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain rounded-full"
            priority
          />
          <span>Liyon Lanka Engineering</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition ${
                scrolled
                  ? "text-slate-700 hover:text-amber-600"
                  : "text-slate-200 hover:text-amber-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          className={scrolled ? "text-slate-900 lg:hidden" : "text-white lg:hidden"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-xl px-6 py-4 space-y-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-slate-800 font-semibold py-2 hover:text-amber-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
