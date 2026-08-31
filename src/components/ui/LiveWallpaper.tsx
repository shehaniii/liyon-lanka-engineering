"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  Video,
  Layers,
  Play,
  Pause,
  Image as ImageIcon,
} from "lucide-react";

export type WallpaperMode = "video" | "blueprint" | "industrial" | "slideshow";

interface LiveWallpaperProps {
  fallbackImage?: string;
  className?: string;
}

// ---- Your 4 uploaded images go here ----
// Place the actual files in /public/images/ and update the filenames below.
const slideshowImages = [
  "/images/hero1.jpeg",
  "/images/hero2.jpeg",
  "/images/hero3.jpeg",
  "/images/hero4.jpeg",
];

const SLIDE_INTERVAL_MS = 3000; // 3 seconds

export default function LiveWallpaper({
  fallbackImage = "/images/hero1.jpeg",
  className = "",
}: LiveWallpaperProps) {
  const [mode, setMode] = useState<WallpaperMode>("video");
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 140,
  });

  // Video loop sources (Civil construction / Heavy engineering timelapses)
  const videoSources = [
    "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-large-cranes-41484-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-heavy-machinery-excavating-earth-at-a-construction-site-41485-large.mp4",
  ];
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
      return next;
    });
  };

  // ---- Slideshow auto-advance every 3 seconds ----
  useEffect(() => {
    if (mode !== "slideshow" || !isPlaying) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [mode, isPlaying]);

  // Canvas interactive particle network (Blueprint / Matrix)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Particle class
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      color: string;
    }

    let particles: Particle[] = [];

    const getColors = () => {
      if (mode === "blueprint") {
        return ["rgba(56, 189, 248, ", "rgba(96, 165, 250, ", "rgba(14, 165, 233, "];
      } else if (mode === "industrial") {
        return ["rgba(245, 158, 11, ", "rgba(251, 191, 36, ", "rgba(217, 119, 6, "];
      } else {
        return ["rgba(56, 189, 248, ", "rgba(251, 191, 36, ", "rgba(255, 255, 255, "];
      }
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / (mode === "blueprint" ? 8500 : 12000));
      const colors = getColors();

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (mode === "blueprint" ? 0.9 : 0.6),
          vy: (Math.random() - 0.5) * (mode === "blueprint" ? 0.9 : 0.6),
          size: Math.random() * 2.2 + 1.2,
          baseAlpha: Math.random() * 0.4 + 0.3,
          color,
        });
      }
    };

    initParticles();

    // Slideshow mode doesn't use the particle network — skip rendering it
    // entirely so no lines/dots overlay on top of the photos.
    if (mode === "slideshow") {
      ctx.clearRect(0, 0, width, height);
      return () => window.removeEventListener("resize", handleResize);
    }

    // Render loop
    const render = () => {
      if (isPlaying) {
        ctx.clearRect(0, 0, width, height);

        // In blueprint mode, draw a subtle engineering grid background
        if (mode === "blueprint") {
          ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
          ctx.lineWidth = 1;
          const gridSize = 60;
          for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }
        }

        // Draw and update particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse interaction
          if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRef.current.radius) {
              const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
              p.x -= (dx / dist) * force * 3;
              p.y -= (dy / dist) * force * 3;
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.baseAlpha})`;
          ctx.fill();

          // Connect nearby nodes with engineering vectors/lines
          const maxDistance = mode === "blueprint" ? 130 : 100;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * (mode === "blueprint" ? 0.35 : 0.2);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${p.color}${alpha})`;
              ctx.lineWidth = mode === "blueprint" ? 1.2 : 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isPlaying]);

  // Handle mouse movements for interactive physics
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = null;
    mouseRef.current.y = null;
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Base Fallback Image (shown behind video mode while it loads) */}
      <Image
        src={fallbackImage}
        alt="Liyon Lanka Engineering Background"
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ${
          mode === "video" && videoLoaded
            ? "opacity-30"
            : mode === "slideshow"
            ? "opacity-0"
            : "opacity-70"
        }`}
      />

      {/* 2. Live Video Background */}
      {mode === "video" && (
        <video
          ref={videoRef}
          key={videoSources[activeVideoIndex]}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100 scale-105" : "opacity-70"
          }`}
          style={{ transition: "opacity 1.2s ease, transform 10s ease" }}
        >
          <source src={videoSources[activeVideoIndex]} type="video/mp4" />
        </video>
      )}

      {/* 3. Image Slideshow — cross-fades between 4 images every 3s */}
      {mode === "slideshow" && (
        <div className="absolute inset-0 w-full h-full">
          {slideshowImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Liyon Lanka Engineering — slide ${i + 1}`}
              fill
              priority={i === 0}
              className={`object-cover transition-opacity ease-in-out ${
                i === slideIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"
              }`}
              style={{ transitionDuration: "1200ms" }}
            />
          ))}
        </div>
      )}

      {/* 4. Ambient Dynamic Lighting & Gradients */}
      {mode === "industrial" && (
        <div className="absolute inset-0 bg-radial from-amber-600/25 via-slate-950/85 to-slate-950 transition-all duration-1000" />
      )}
      {mode === "blueprint" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/90 to-slate-950 transition-all duration-1000" />
      )}

      {/* 5. Interactive HTML5 Canvas (Blueprint & Constellation Particle Network) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 6. Sleek Vignette and Contrast Dark Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 pointer-events-none z-10" />

      {/* 7. Subtle Blueprint Grid Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 8. Slideshow progress dots (only shown in slideshow mode) */}
      {mode === "slideshow" && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === slideIndex ? "w-6 bg-amber-400" : "w-1.5 bg-slate-500/60 hover:bg-slate-300/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* 9. Interactive Live Wallpaper Switcher / Controller (Bottom-Right Widget) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 p-1.5 rounded-full shadow-2xl">
          {/* Slideshow Mode Toggle */}
          <button
            onClick={() => setMode("slideshow")}
            title="Image Slideshow Mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mode === "slideshow"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <ImageIcon size={13} />
            <span className="hidden sm:inline">Gallery</span>
          </button>

          {/* Video Mode Toggle */}
          <button
            onClick={() => {
              setMode("video");
              if (mode === "video") {
                setActiveVideoIndex((prev) => (prev + 1) % videoSources.length);
              }
            }}
            title="Cinematic Live Video Mode (Click again to change clip)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mode === "video"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Video size={13} />
            <span className="hidden sm:inline">Cinematic</span>
          </button>

          {/* Blueprint Mode Toggle */}
          <button
            onClick={() => setMode("blueprint")}
            title="Interactive Blueprint Matrix Mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mode === "blueprint"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Layers size={13} />
            <span className="hidden sm:inline">Blueprint</span>
          </button>

          {/* Industrial Mode Toggle */}
          <button
            onClick={() => setMode("industrial")}
            title="Industrial Glow Mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mode === "industrial"
                ? "bg-amber-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">Industrial</span>
          </button>

          {/* Play/Pause Animation Toggle */}
          <button
            onClick={togglePlayPause}
            title={isPlaying ? "Pause Live Wallpaper" : "Resume Live Wallpaper"}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition ml-0.5"
            aria-label={isPlaying ? "Pause Live Wallpaper" : "Play Live Wallpaper"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}
