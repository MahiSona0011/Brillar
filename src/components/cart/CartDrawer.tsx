"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, count, subtotal, removeItem, updateQty, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[90] h-full w-full max-w-md bg-[#111111] border-l border-[#222222] flex flex-col"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E1E]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-[#D4AF37]" />
                <span className="font-cinzel text-sm tracking-[0.1em] text-[#F9F9F9]">
                  Your Cart
                </span>
                {count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] font-inter text-[10px] text-[#0A0A0A]">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-[#555555] hover:text-[#F9F9F9] transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={40} strokeWidth={1} className="text-[#333333]" />
                  <p className="font-cinzel text-sm tracking-[0.08em] text-[#555555]">
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity"
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const key = `${item.id}-${item.size ?? ""}`;
                    return (
                      <li key={key} className="flex gap-4 py-5 border-b border-[#1E1E1E]">
                        {/* Image */}
                        <div className="relative h-24 w-20 flex-shrink-0 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-cinzel text-xs tracking-[0.06em] text-[#F9F9F9]">
                                {item.name}
                              </p>
                              <p className="mt-0.5 font-inter text-[9px] tracking-[0.08em] uppercase text-[#555555]">
                                {item.metal}
                                {item.size && ` · Size ${item.size}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#444444] hover:text-[#F9F9F9] transition-colors"
                            >
                              <X size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            {/* Qty controls */}
                            <div className="flex items-center gap-2 border border-[#2A2A2A] rounded-[2px]">
                              <button
                                onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center text-[#555555] hover:text-[#F9F9F9] transition-colors"
                              >
                                <Minus size={11} strokeWidth={1.5} />
                              </button>
                              <span className="font-inter text-xs text-[#F9F9F9] min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center text-[#555555] hover:text-[#F9F9F9] transition-colors"
                              >
                                <Plus size={11} strokeWidth={1.5} />
                              </button>
                            </div>
                            <span className="font-poppins font-[300] text-sm tracking-[0.04em] text-[#D4AF37]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#1E1E1E] px-6 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-inter text-xs tracking-[0.08em] uppercase text-[#888888]">
                    Subtotal
                  </span>
                  <span className="font-poppins font-[300] text-base tracking-[0.04em] text-[#F9F9F9]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-inter text-[10px] tracking-[0.06em] text-[#555555]">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group relative flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A]"
                >
                  <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                  <span className="relative z-10">Proceed to checkout</span>
                </Link>

                {/* View cart link */}
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#888888] transition-colors"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
