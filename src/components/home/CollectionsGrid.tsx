"use client";

import { useRef } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    id: "rings",
    label: "Diamond rings",
    subtitle: "Solitaire & pavé",
    href: "/collections/rings",
    image: "/images/products/ring-1.jpg",
    offset: "md:mt-0",
    aspect: "aspect-[3/4]",
  },
  {
    id: "bridal",
    label: "Bridal",
    subtitle: "Engagement & wedding",
    href: "/collections/bridal",
    image: "/images/products/bridal-set-1.jpg",
    offset: "md:mt-16",
    aspect: "aspect-[3/4]",
  },
  {
    id: "necklaces",
    label: "Necklaces",
    subtitle: "Pendants & chains",
    href: "/collections/necklaces",
    image: "/images/products/necklace-1.avif",
    offset: "md:mt-8",
    aspect: "aspect-[3/4]",
  },
];

export default function CollectionsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".collection-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Heading reveal
    const heading = sectionRef.current?.querySelector(".section-heading");
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collections-heading"
      className="mx-auto max-w-[1440px] px-8 md:px-16 py-[120px]"
    >
      {/* Section header */}
      <div className="section-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
            The collections
          </p>
          <h2
            id="collections-heading"
            className="font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9]"
          >
            Where diamonds<br />become art
          </h2>
        </div>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 font-inter text-xs tracking-[0.08em] text-[#888888] hover:text-[#D4AF37] transition-colors duration-400 group"
        >
          View all collections
          <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* 3-column asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={col.href}
            className={`collection-card group block ${col.offset}`}
            aria-label={`${col.label} — ${col.subtitle}`}
          >
            <div className={`relative ${col.aspect} overflow-hidden rounded-[8px] bg-[#1A1A1A]`}>
              {/* Skeleton loader */}
              <div className="skeleton absolute inset-0" aria-hidden="true" />

              {/* Product image */}
              <ImageWithFallback
                src={col.image}
                alt={`${col.label} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-transparent to-transparent" />

              {/* Gold hover border */}
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-[8px] transition-all duration-500" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-inter text-[9px] tracking-[0.14em] uppercase text-[#888888] mb-1">
                  {col.subtitle}
                </p>
                <h3 className="font-cinzel text-lg tracking-[0.06em] text-[#F9F9F9]">
                  {col.label}
                </h3>
                <div className="flex items-center gap-1 mt-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="font-inter text-[10px] tracking-[0.1em]">Discover</span>
                  <ArrowRight size={10} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Second row — smaller cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
        {[
          { label: "Earrings",   href: "/collections/earrings",   image: "/images/products/earrings-1.jpg"   },
          { label: "Bracelets",  href: "/collections/bracelets",  image: "/images/products/bracelet-1.jpg"  },
          { label: "Custom",     href: "/custom",                  image: "/images/products/ring-4.jpg"    },
        ].map((col, i) => (
          <Link
            key={col.label}
            href={col.href}
            className={`collection-card group block ${i === 1 ? "md:-mt-8" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#1A1A1A]">
              <div className="skeleton absolute inset-0" aria-hidden="true" />
              <ImageWithFallback
                src={col.image}
                alt={`${col.label} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-transparent to-transparent" />
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-[8px] transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-cinzel text-base tracking-[0.06em] text-[#F9F9F9]">{col.label}</h3>
                <div className="flex items-center gap-1 mt-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="font-inter text-[10px] tracking-[0.1em]">Discover</span>
                  <ArrowRight size={10} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
