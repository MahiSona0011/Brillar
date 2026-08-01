"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "37+",   label: "Years of craft"     },
  { number: "18k",   label: "Diamonds certified" },
  { number: "96",    label: "Countries delivered" },
  { number: "100%",  label: "Conflict-free"       },
];

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Quote reveal word by word
    const words = sectionRef.current?.querySelectorAll(".quote-word");
    if (words) {
      gsap.fromTo(
        Array.from(words),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".quote-block"),
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Stats count up
    const statEls = sectionRef.current?.querySelectorAll(".stat-item");
    if (statEls) {
      gsap.fromTo(
        Array.from(statEls),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".stats-grid"),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef });

  const QUOTE = "Light, captured. Every Brillar diamond is a story of geological wonder transformed by human mastery into an object of timeless beauty.";

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111] py-[120px] overflow-hidden"
      aria-labelledby="brand-statement-heading"
    >
      {/* Decorative gold line */}
      <div className="divider-gold mx-8 md:mx-16 mb-20" />

      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Quote */}
          <div className="quote-block">
            <span
              className="block font-cormorant text-[#D4AF37] text-6xl md:text-8xl leading-none mb-6 -mt-4"
              aria-hidden="true"
            >
              "
            </span>
            <blockquote>
              <p
                className="font-cormorant italic text-2xl md:text-3xl text-[#F9F9F9] leading-relaxed tracking-[0.02em]"
                id="brand-statement-heading"
              >
                {QUOTE.split(" ").map((word, i) => (
                  <span key={i} className="quote-word inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </p>
              <footer className="mt-8">
                <cite className="font-inter text-xs tracking-[0.12em] uppercase text-[#555555] not-italic">
                  — Jean-Pierre Moreau, Master Gemologist
                </cite>
              </footer>
            </blockquote>
          </div>

          {/* Stats */}
          <div>
            <div className="stats-grid grid grid-cols-2 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <p className="font-cinzel text-4xl md:text-5xl tracking-[0.04em] text-gold-gradient">
                    {stat.number}
                  </p>
                  <div className="mt-3 h-px w-8 bg-[#D4AF37]/30" />
                  <p className="mt-3 font-inter text-xs tracking-[0.1em] uppercase text-[#555555]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="divider-gold mx-8 md:mx-16 mt-20" />
    </section>
  );
}
