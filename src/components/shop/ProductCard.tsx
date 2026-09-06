"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { Product, Badge } from "@/lib/data";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toggleWishlist } from "@/lib/actions/wishlist";

const BADGE_COLORS: Record<Badge, string> = {
  Bestseller: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30",
  New:        "bg-[#2A6B4A]/15 text-[#4CAF80] border-[#2A6B4A]/30",
  Bridal:     "bg-[#6B2A3A]/15 text-[#C06080] border-[#6B2A3A]/30",
  Exclusive:  "bg-[#1A2D6B]/20 text-[#7090D0] border-[#1A2D6B]/40",
  Limited:    "bg-[#3A2A1A]/20 text-[#C09060] border-[#3A2A1A]/40",
};

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { format } = useCurrency();
  const { status } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleWishlistClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (status !== "authenticated") {
      router.push("/auth/signin?callbackUrl=/collections");
      return;
    }
    setSaved((s) => !s);
    startTransition(async () => {
      try {
        await toggleWishlist(product.id);
      } catch {
        setSaved((s) => !s); // revert on failure
      }
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      aria-label={`${product.name} — ${format(product.price)}`}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1A1A1A]">
          <div className="skeleton absolute inset-0" aria-hidden="true" />
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.25)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 font-inter text-[9px] tracking-[0.1em] uppercase ${BADGE_COLORS[product.badge]}`}>
                {product.badge}
              </span>
            </div>
          )}

          <button
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(10,10,10,0.6)] transition-all duration-300 ${
              saved ? "text-[#D4AF37] opacity-100" : "text-[#555555] hover:text-[#D4AF37] opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart size={14} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 px-0.5">
          <h3 className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-1 font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">
            {product.subtitle}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-poppins font-[300] text-sm tracking-[0.04em] text-[#D4AF37]">
                {format(product.price)}
              </span>
              {product.comparePrice && (
                <span className="font-inter text-[10px] text-[#444444] line-through">
                  {format(product.comparePrice)}
                </span>
              )}
            </div>
            <span className="font-inter text-[9px] tracking-[0.08em] uppercase text-[#D4AF37]/60">
              {product.diamond.carat}ct
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
