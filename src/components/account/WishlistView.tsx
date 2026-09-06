"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, X } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/utils";
import { toggleWishlist } from "@/lib/actions/wishlist";
import type { Product } from "@/lib/data";

export default function WishlistView({ products }: { products: Product[] }) {
  const [items, setItems] = useState(products);
  const [, startTransition] = useTransition();

  function remove(id: string) {
    setItems((w) => w.filter((p) => p.id !== id));
    startTransition(async () => {
      try {
        await toggleWishlist(id);
      } catch {
        // revert on failure
        setItems(products);
      }
    });
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
      >
        <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
        My account
      </Link>

      <div className="mb-8">
        <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Wishlist</h1>
        <p className="mt-1.5 font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555]">
          {items.length} {items.length === 1 ? "piece" : "pieces"} saved
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Heart size={40} strokeWidth={1} className="text-[#333333]" />
          <p className="font-cinzel text-sm tracking-[0.08em] text-[#555555]">Your wishlist is empty</p>
          <Link href="/collections" className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity">
            Discover pieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group"
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1A1A1A]">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); remove(product.id); }}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(10,10,10,0.7)] text-[#C06080] hover:text-[#F9F9F9] transition-colors"
                  >
                    <X size={13} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="mt-3 px-0.5">
                  <p className="font-cinzel text-xs tracking-[0.06em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </p>
                  <p className="mt-2 font-poppins font-[300] text-sm text-[#D4AF37]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
