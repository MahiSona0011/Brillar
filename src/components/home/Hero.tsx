"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HEADLINE = "Crafted for Eternity";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onScroll = () => {
      const y = window.scrollY;
      video.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotate: 4 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotate: 0,
      transition: {
        delay: 0.6 + i * 0.045,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const easing = [0.25, 0.46, 0.45, 0.94] as const;

  const fadeUp = (delay: number) => ({
    initial:  { opacity: 0, y: 20 },
    animate:  ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.8, ease: easing },
  });

  return (
    <section
      aria-label="Brillar hero — crafted for eternity"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-[115%] w-full object-cover -top-[7.5%]"
          poster="/images/hero-poster.jpg"
        >
          {/* Replace src with your actual luxury video */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient when no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A]" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.2)] via-[rgba(10,10,10,0.45)] to-[rgba(10,10,10,0.8)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Gold pill tag */}
        <motion.div {...fadeUp(0.2)} className="mb-8">
          <span className="inline-flex items-center gap-2 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 font-inter text-[10px] tracking-[0.14em] text-[#D4AF37] uppercase">
            <span className="text-[#D4AF37]">◆</span>
            New Collection — Eternelle 2026
          </span>
        </motion.div>

        {/* Letter-by-letter headline */}
        <h1
          className="font-cinzel font-[400] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.08em] text-[#F9F9F9] leading-tight overflow-hidden"
          aria-label={HEADLINE}
        >
          {HEADLINE.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={i}
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              aria-hidden="true"
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(1.1)}
          className="mt-6 font-cormorant text-lg md:text-xl italic text-[#888888] tracking-[0.04em] max-w-sm"
        >
          Where diamonds become art
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(1.35)}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/collections"
            className="group relative inline-flex h-12 items-center px-8 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A]"
          >
            <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
            <span className="relative z-10">Explore collection</span>
          </Link>
          <Link
            href="/appointments"
            className="inline-flex h-12 items-center px-8 border border-[#F9F9F9]/30 font-inter text-xs tracking-[0.1em] uppercase text-[#F9F9F9]/70 rounded-[2px] hover:border-[#F9F9F9]/60 hover:text-[#F9F9F9] transition-all duration-400"
          >
            Book consultation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.7)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[9px] tracking-[0.16em] uppercase text-[#555555]">
          Scroll to discover
        </span>
        <ChevronDown
          size={14}
          strokeWidth={1}
          className="text-[#D4AF37] animate-chevron-bob"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
