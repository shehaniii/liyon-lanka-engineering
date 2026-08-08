"use client";

import Link from "next/link";
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
          ? "bg-white shadow-lg h-16"
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        <Link
          href="/"
          className={`text-2xl font-bold ${
            scrolled ? "text-blue-900" : "text-white"
          }`}
        >
          Liyon Lanka Engineering
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition ${
                scrolled
                  ? "text-gray-700 hover:text-blue-700"
                  : "text-white hover:text-blue-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          className={scrolled ? "text-black lg:hidden" : "text-white lg:hidden"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-md">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}