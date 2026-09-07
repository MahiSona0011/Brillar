import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { COLLECTIONS, getProductsByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore Brillar's complete diamond jewellery collections — rings, necklaces, earrings, bracelets, bridal sets, and bespoke creations.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-24">
      {/* Heading */}
      <div className="mb-16">
        <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
          Discover
        </p>
        <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.06em] text-[#F9F9F9]">
          Our Collections
        </h1>
        <p className="mt-4 font-cormorant italic text-[#888888] text-xl max-w-lg">
          Every piece in our collection is a dialogue between diamond and light.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {COLLECTIONS.map((col, i) => {
          const productCount = getProductsByCategory(col.category).length;
          return (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group block"
            aria-label={`${col.label} — ${col.subtitle}`}
          >
            <div
              className={`relative overflow-hidden rounded-[8px] bg-[#1A1A1A] ${
                i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
              }`}
            >
              <div className="skeleton absolute inset-0" aria-hidden="true" />
              <ImageWithFallback
                src={col.image}
                alt={col.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-transparent to-transparent" />
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 rounded-[8px] transition-all duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-inter text-[9px] tracking-[0.14em] uppercase text-[#888888] mb-1">
                  {col.subtitle}
                </p>
                <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9]">
                  {col.label}
                </h2>
                {productCount > 0 && (
                  <p className="mt-1 font-inter text-[10px] tracking-[0.06em] text-[#555555]">
                    {productCount} pieces
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="font-inter text-[10px] tracking-[0.1em]">Explore</span>
                  <ArrowRight size={11} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
