"use client";

import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Badge = "Bestseller" | "New" | "Bridal" | "Exclusive";

interface Product {
  id:       string;
  name:     string;
  subtitle: string;
  price:    number;
  image:    string;
  href:     string;
  badge:    Badge;
}

const PRODUCTS: Product[] = [
  {
    id:       "eternelle-solitaire",
    name:     "Eternelle solitaire",
    subtitle: "18k white gold · VS1 · Round brilliant",
    price:    8500,
    image:    "https://images.unsplash.com/photo-1677768061375-cd600727e274?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/eternelle-solitaire",
    badge:    "Bestseller",
  },
  {
    id:       "lumière-halo",
    name:     "Lumière halo",
    subtitle: "18k yellow gold · VVS2 · Cushion cut",
    price:    12400,
    image:    "https://images.unsplash.com/photo-1737402655755-c72aa4086639?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/lumiere-halo",
    badge:    "New",
  },
  {
    id:       "rosé-pavé-band",
    name:     "Rosé pavé band",
    subtitle: "18k rose gold · SI1 · Pavé setting",
    price:    4200,
    image:    "https://images.unsplash.com/photo-1598560915470-3a84f9d1b0fc?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/rose-pave-band",
    badge:    "Bridal",
  },
  {
    id:       "maison-drop-earrings",
    name:     "Maison drop earrings",
    subtitle: "Platinum · VS2 · Pear shape · 2ct total",
    price:    16800,
    image:    "https://images.unsplash.com/photo-1671513579768-6f950fe62d5c?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/maison-drop-earrings",
    badge:    "Exclusive",
  },
  {
    id:       "céleste-necklace",
    name:     "Céleste necklace",
    subtitle: "18k white gold · VVS1 · Oval pendant",
    price:    9600,
    image:    "https://images.unsplash.com/photo-1747933509433-c58152c10ee7?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/celeste-necklace",
    badge:    "Bestseller",
  },
  {
    id:       "tennis-classic",
    name:     "Tennis classic",
    subtitle: "18k white gold · F color · 5ct total",
    price:    22000,
    image:    "https://images.unsplash.com/photo-1705575518997-82a71bcc75a2?q=80&w=1400&auto=format&fit=crop",
    href:     "/products/tennis-classic",
    badge:    "Bestseller",
  },
];

const BADGE_COLORS: Record<Badge, string> = {
  Bestseller: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30",
  New:        "bg-[#2A6B4A]/15 text-[#4CAF80] border-[#2A6B4A]/30",
  Bridal:     "bg-[#6B2A3A]/15 text-[#C06080] border-[#6B2A3A]/30",
  Exclusive:  "bg-[#1A2D6B]/20 text-[#7090D0] border-[#1A2D6B]/40",
};

const SPARKLE_POSITIONS = [
  { top: "20%", left: "15%"  },
  { top: "35%", right: "12%" },
  { top: "60%", left: "8%"   },
  { top: "70%", right: "18%" },
];

function SparkleParticles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {SPARKLE_POSITIONS.map((pos, i) => (
        <motion.svg
          key={i}
          style={pos as React.CSSProperties}
          className="absolute"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          <path
            d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5 Z"
            fill="#D4AF37"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="embla__slide flex-shrink-0 w-[80vw] sm:w-[340px] lg:w-[320px] pr-5"
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <Link href={product.href} className="group block">
        {/* Image area */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1A1A1A]">
          <div className="skeleton absolute inset-0" aria-hidden="true" />
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Sparkle particles on hover */}
          <SparkleParticles />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 font-inter text-[9px] tracking-[0.1em] uppercase ${BADGE_COLORS[product.badge]}`}>
              {product.badge}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 px-1">
          <h3 className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors duration-400">
            {product.name}
          </h3>
          <p className="mt-1 font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">
            {product.subtitle}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-poppins font-[300] text-sm tracking-[0.04em] text-[#D4AF37]">
              {formatPrice(product.price)}
            </span>
            <button
              aria-label={`Add ${product.name} to wishlist`}
              onClick={(e) => e.preventDefault()}
              className="text-[#555555] hover:text-[#D4AF37] transition-colors duration-300"
            >
              <Heart size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BestsellerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align:       "start",
    containScroll: "trimSnaps",
    dragFree:    true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      aria-labelledby="bestsellers-heading"
      className="py-[120px] overflow-hidden"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
            Most coveted
          </p>
          <h2
            id="bestsellers-heading"
            className="font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9]"
          >
            Bestsellers
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous products"
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center border border-[#333333] rounded-full text-[#555555] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-400"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Next products"
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center border border-[#333333] rounded-full text-[#555555] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-400"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
