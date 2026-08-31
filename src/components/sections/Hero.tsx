"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Award, ShieldCheck, Building2, PhoneCall } from "lucide-react";
import LiveWallpaper from "@/components/ui/LiveWallpaper";

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-slate-950">
      {/* Dynamic Live Wallpaper Background */}
      <LiveWallpaper fallbackImage="/images/hero1.jpeg" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-12">
        <div className="max-w-3xl">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-md text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Engineering • Construction • Heavy Machinery</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Building Sri Lanka's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              Future Together
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow">
            Leading engineering contractor delivering precision civil infrastructure,
            commercial developments, and advanced heavy equipment solutions across Sri Lanka.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            >
              <PhoneCall size={18} className="text-amber-400" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Key Metrics / Highlights Bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">15+ Years</p>
                <p className="text-xs text-slate-300">Industry Excellence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">120+ Projects</p>
                <p className="text-xs text-slate-300">Completed Islandwide</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">100% Safety</p>
                <p className="text-xs text-slate-300">ISO Certified Standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors group cursor-pointer"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100">
          Scroll
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}