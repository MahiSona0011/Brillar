"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CheckoutSuccessPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!elements) return;
    gsap.fromTo(elements, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out", delay: 0.3,
    });
  }, { scope: sectionRef });

  const orderNumber = `BRL-${Date.now().toString().slice(-6)}`;

  return (
    <main ref={sectionRef} className="min-h-[80vh] flex items-center justify-center px-8 py-24">
      <div className="max-w-xl w-full text-center">
        {/* Animated diamond */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative h-20 w-20">
            <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
              <path d="M40 5L68 26H12L40 5Z" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="1" />
              <path d="M12 26L5 40L40 75L75 40L68 26H12Z" fill="#D4AF37" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1" />
              <path d="M12 26L40 75L5 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M68 26L40 75L75 40" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M5 40H75" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
              <path d="M12 26H68" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="40" cy="38" r="3" fill="#D4AF37" fillOpacity="0.6" />
            </svg>
            {/* Glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.6, 1.6] }}
              transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#D4AF37]"
            />
          </div>
        </motion.div>

        <p className="reveal-item font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
          Order confirmed
        </p>
        <h1 className="reveal-item font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9] mb-4">
          Thank you
        </h1>
        <p className="reveal-item font-cormorant italic text-[#888888] text-lg leading-relaxed mb-8 max-w-sm mx-auto">
          Your order has been received and is being prepared with the utmost care. We will send you a confirmation shortly.
        </p>

        <div className="reveal-item divider-gold mb-8" />

        <div className="reveal-item bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-5 mb-8 text-left space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555]">Order number</span>
            <span className="font-cinzel text-sm tracking-[0.08em] text-[#D4AF37]">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555]">Status</span>
            <span className="font-inter text-[11px] text-[#4CAF80]">Confirmed</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555]">Est. delivery</span>
            <span className="font-inter text-[11px] text-[#F9F9F9]">3–5 business days</span>
          </div>
        </div>

        <div className="reveal-item space-y-3">
          <Link
            href="/account/orders"
            className="group relative flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A]"
          >
            <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10">Track your order</span>
          </Link>
          <Link
            href="/collections"
            className="flex items-center justify-center font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#888888] transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
