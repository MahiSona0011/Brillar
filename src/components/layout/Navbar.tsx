"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import SearchOverlay from "@/components/layout/SearchOverlay";
import CurrencySwitcher from "@/components/ui/CurrencySwitcher";

const NAV_LINKS = [
  {
    label: "Collections",
    href: "/collections",
    mega: [
      { label: "Diamond Rings",  href: "/collections/rings",      desc: "Solitaire, halo & pavé" },
      { label: "Bridal",         href: "/collections/bridal",     desc: "Engagement & wedding" },
      { label: "Earrings",       href: "/collections/earrings",   desc: "Studs, hoops & drops" },
      { label: "Necklaces",      href: "/collections/necklaces",  desc: "Pendants & chains" },
      { label: "Bracelets",      href: "/collections/bracelets",  desc: "Tennis & bangle" },
      { label: "Custom",         href: "/custom",                 desc: "Design your legacy" },
    ],
  },
  { label: "Bridal",    href: "/collections/bridal", mega: null },
  { label: "Custom",    href: "/custom",              mega: null },
  { label: "Try On",    href: "/try-on",              mega: null },
  { label: "Editorial", href: "/editorial",           mega: null },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [megaOpen, setMegaOpen]   = useState<string | null>(null);
  const [drawerOpen, setDrawer]   = useState(false);
  const [searchOpen, setSearch]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(label);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 120);
  };

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-700",
          scrolled ? "bg-[rgba(10,10,10,0.95)] backdrop-blur-sm border-b border-[#D4AF37]/10" : "bg-transparent"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8 md:px-16"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-cinzel text-xl tracking-[0.12em] text-[#F9F9F9] hover:text-[#D4AF37] transition-colors duration-400"
            aria-label="Brillar — home"
          >
            <span className="text-[#D4AF37] text-sm">◆</span>
            BRILLAR
          </Link>

          {/* Desktop center links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.mega && openMega(link.label)}
                onMouseLeave={closeMega}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 font-inter text-[11px] uppercase tracking-[0.1em] text-[#888888]",
                    "hover:text-[#D4AF37] transition-colors duration-400"
                  )}
                >
                  {link.label}
                  {link.mega && <ChevronDown size={10} className="opacity-60" />}
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[520px] bg-[#111111] border border-[#D4AF37]/15 rounded-[8px] p-6"
                      onMouseEnter={() => openMega(link.label)}
                      onMouseLeave={closeMega}
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {link.mega.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group p-3 rounded-[4px] hover:bg-[#1A1A1A] transition-colors duration-300"
                          >
                            <p className="font-cinzel text-[11px] tracking-[0.06em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors duration-300">
                              {item.label}
                            </p>
                            <p className="mt-0.5 font-inter text-[10px] text-[#555555]">{item.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <div className="hidden md:block">
              <CurrencySwitcher />
            </div>
            <button
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="text-[#888888] hover:text-[#D4AF37] transition-colors duration-400"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/account/wishlist" aria-label="Wishlist" className="relative text-[#888888] hover:text-[#D4AF37] transition-colors duration-400">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <button
              aria-label={`Cart (${count} items)`}
              onClick={openCart}
              className="relative text-[#888888] hover:text-[#D4AF37] transition-colors duration-400"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] font-inter text-[8px] text-[#0A0A0A] leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <Link href="/account" aria-label="Account" className="hidden md:block text-[#888888] hover:text-[#D4AF37] transition-colors duration-400">
              <User size={18} strokeWidth={1.5} />
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawer(true)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
            >
              <span className="block h-px w-5 bg-[#888888]" />
              <span className="block h-px w-4 bg-[#888888]" />
              <span className="block h-px w-5 bg-[#888888]" />
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-[rgba(10,10,10,0.7)] backdrop-blur-sm"
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#111111] border-l border-[#D4AF37]/10 flex flex-col p-8"
              aria-label="Mobile navigation"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-cinzel text-sm tracking-[0.12em] text-[#D4AF37]">◆ BRILLAR</span>
                <button aria-label="Close menu" onClick={() => setDrawer(false)}>
                  <X size={20} className="text-[#888888] hover:text-[#F9F9F9] transition-colors" />
                </button>
              </div>
              <nav>
                <ul className="flex flex-col gap-6" role="list">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setDrawer(false)}
                        className="font-cinzel text-sm tracking-[0.08em] text-[#888888] hover:text-[#D4AF37] transition-colors duration-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto">
                <div className="divider-gold mb-6" />
                <Link href="/account" className="flex items-center gap-3 text-[#888888] hover:text-[#D4AF37] transition-colors">
                  <User size={16} strokeWidth={1.5} />
                  <span className="font-inter text-xs tracking-[0.06em]">My account</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Search overlay ────────────────────────────────────────── */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearch(false)} />
    </>
  );
}
