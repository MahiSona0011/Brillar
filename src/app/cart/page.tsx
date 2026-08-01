"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, count, subtotal, removeItem, updateQty, clearCart } = useCart();

  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 5000 ? 0 : 95;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-32 flex flex-col items-center gap-6 text-center">
        <ShoppingBag size={48} strokeWidth={1} className="text-[#333333]" />
        <h1 className="font-cinzel text-2xl tracking-[0.08em] text-[#F9F9F9]">Your cart is empty</h1>
        <p className="font-cormorant italic text-[#888888] text-lg">
          Discover our collection and find your perfect piece.
        </p>
        <Link
          href="/collections"
          className="group relative inline-flex h-12 items-center px-8 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A]"
        >
          <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10">Explore collection</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="font-cinzel text-3xl tracking-[0.06em] text-[#F9F9F9]">Your Cart</h1>
          <p className="mt-2 font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555]">
            {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="font-inter text-[10px] tracking-[0.08em] uppercase text-[#444444] hover:text-[#F9F9F9] transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* Items */}
        <div>
          <div className="divider-gold mb-6" />
          <ul className="space-y-0">
            {items.map((item) => {
              const key = `${item.id}-${item.size ?? ""}`;
              return (
                <li key={key} className="flex gap-5 py-7 border-b border-[#1E1E1E]">
                  <Link href={`/products/${item.slug}`} className="relative h-28 w-24 flex-shrink-0 rounded-[4px] overflow-hidden bg-[#1A1A1A] group">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.slug}`} className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] hover:text-[#D4AF37] transition-colors">
                          {item.name}
                        </Link>
                        <p className="mt-1 font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">
                          {item.metal}
                          {item.size && ` · Size ${item.size}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#444444] hover:text-[#F9F9F9] transition-colors"
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 border border-[#2A2A2A] rounded-[2px]">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                          aria-label="Decrease"
                          className="flex h-8 w-8 items-center justify-center text-[#555555] hover:text-[#F9F9F9] transition-colors"
                        >
                          <Minus size={11} strokeWidth={1.5} />
                        </button>
                        <span className="font-inter text-xs text-[#F9F9F9] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                          aria-label="Increase"
                          className="flex h-8 w-8 items-center justify-center text-[#555555] hover:text-[#F9F9F9] transition-colors"
                        >
                          <Plus size={11} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="font-poppins font-[300] text-base tracking-[0.04em] text-[#D4AF37]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-28 bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-6 space-y-4">
            <h2 className="font-cinzel text-base tracking-[0.08em] text-[#F9F9F9] pb-4 border-b border-[#1E1E1E]">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-inter text-[11px] tracking-[0.06em] text-[#888888]">Subtotal</span>
                <span className="font-inter text-[11px] text-[#F9F9F9]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter text-[11px] tracking-[0.06em] text-[#888888]">Shipping</span>
                <span className="font-inter text-[11px] text-[#F9F9F9]">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter text-[11px] tracking-[0.06em] text-[#888888]">Est. tax (8%)</span>
                <span className="font-inter text-[11px] text-[#F9F9F9]">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="divider-gold" />

            <div className="flex justify-between">
              <span className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">Total</span>
              <span className="font-poppins font-[300] text-lg tracking-[0.04em] text-[#D4AF37]">
                {formatPrice(total)}
              </span>
            </div>

            {shipping > 0 && (
              <p className="font-inter text-[9px] tracking-[0.06em] text-[#555555]">
                Free insured shipping on orders over $5,000
              </p>
            )}

            <Link
              href="/checkout"
              className="group relative flex h-12 w-full items-center justify-center gap-2 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] mt-2"
            >
              <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
              <span className="relative z-10 flex items-center gap-2">
                Checkout
                <ArrowRight size={13} strokeWidth={1.5} />
              </span>
            </Link>

            <Link
              href="/collections"
              className="flex items-center justify-center font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555] hover:text-[#888888] transition-colors"
            >
              Continue browsing
            </Link>

            {/* Trust badges */}
            <div className="pt-4 border-t border-[#1E1E1E] grid grid-cols-2 gap-2">
              {["Insured delivery", "Lifetime warranty", "30-day returns", "Secure checkout"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37] text-[8px]">◆</span>
                  <span className="font-inter text-[9px] tracking-[0.04em] text-[#555555]">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
