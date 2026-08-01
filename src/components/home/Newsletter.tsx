"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-[120px] mx-auto max-w-[1440px] px-8 md:px-16"
    >
      <div className="relative overflow-hidden rounded-[16px] bg-[#111111] border border-[#D4AF37]/10 px-8 md:px-20 py-20 text-center">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <span className="font-inter text-[9px] tracking-[0.18em] uppercase text-[#D4AF37]">
            The Brillar inner circle
          </span>

          <h2
            id="newsletter-heading"
            className="mt-4 font-cinzel text-2xl md:text-4xl tracking-[0.06em] text-[#F9F9F9]"
          >
            A legacy in light
          </h2>

          <p className="mt-4 font-cormorant italic text-lg text-[#888888] max-w-md mx-auto leading-relaxed">
            Private previews, new collection drops, and curated stories from our ateliers — exclusively for members.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 flex flex-col items-center gap-2"
            >
              <span className="font-cinzel text-[#D4AF37] text-sm tracking-[0.08em]">◆</span>
              <p className="font-inter text-sm text-[#888888]">
                Welcome to the inner circle. Expect the extraordinary.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto"
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#D4AF37]/50 rounded-[2px] px-5 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative flex h-[46px] items-center gap-2 px-7 bg-[#D4AF37] hover:bg-[#E6C78B] rounded-[2px] font-inter text-xs tracking-[0.08em] uppercase text-[#0A0A0A] transition-colors duration-400 disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Join"}
                <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </button>
            </form>
          )}

          <p className="mt-5 font-inter text-[10px] text-[#333333]">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
