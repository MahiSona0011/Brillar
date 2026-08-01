"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/data";

interface Props {
  product: Product;
}

export default function AddToCart({ product }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[2]
  );
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize,
      metal: product.metal,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888]">
              Ring Size
            </label>
            <button className="font-inter text-[10px] tracking-[0.08em] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">
              Size guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                aria-label={`Size ${size}`}
                className={`h-9 w-9 rounded-[2px] font-inter text-xs transition-all duration-300 ${
                  selectedSize === size
                    ? "border border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                    : "border border-[#2A2A2A] text-[#555555] hover:border-[#444444] hover:text-[#888888]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className="group relative flex h-13 w-full items-center justify-center gap-2.5 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase rounded-[2px] overflow-hidden transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ height: "52px" }}
      >
        <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="relative z-10 flex items-center gap-2 text-[#D4AF37] group-hover:text-[#0A0A0A]"
            >
              <Check size={14} strokeWidth={1.5} />
              Added to cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="relative z-10 flex items-center gap-2 text-[#D4AF37] group-hover:text-[#0A0A0A]"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              {product.inStock ? "Add to cart" : "Out of stock"}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Secondary: Book consultation */}
      <a
        href="/appointments"
        className="flex h-12 w-full items-center justify-center border border-[#2A2A2A] font-inter text-xs tracking-[0.1em] uppercase text-[#555555] rounded-[2px] hover:border-[#444444] hover:text-[#888888] transition-all duration-300"
      >
        Book private viewing
      </a>
    </div>
  );
}
