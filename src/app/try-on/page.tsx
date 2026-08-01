"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import type { Product } from "@/lib/data";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

// Predefined overlay positions per jewelry category
const PLACEMENT: Record<string, { top: string; left: string; label: string; hint: string }> = {
  rings:     { top: "72%", left: "38%", label: "Ring finger",   hint: "Displayed on left ring finger" },
  necklaces: { top: "28%", left: "50%", label: "Décolletage",   hint: "Displayed at the collarbone" },
  earrings:  { top: "22%", left: "72%", label: "Right ear",     hint: "Displayed at the right earlobe" },
  bracelets: { top: "68%", left: "62%", label: "Right wrist",   hint: "Displayed on the wrist" },
  bridal:    { top: "72%", left: "38%", label: "Ring finger",   hint: "Displayed on left ring finger" },
  custom:    { top: "50%", left: "50%", label: "Custom",        hint: "Position adjustable" },
};

// Model placeholder images by category (using Unsplash via picsum for demo)
const MODEL_IMAGES: Record<string, string> = {
  rings:     "/images/try-on/model-rings.jpg",
  necklaces: "/images/try-on/model-necklace.jpg",
  earrings:  "/images/try-on/model-earrings.jpg",
  bracelets: "/images/try-on/model-bracelet.jpg",
  bridal:    "/images/try-on/model-rings.jpg",
};

const FEATURED = PRODUCTS.filter((p) => p.featured).slice(0, 8);

export default function TryOnPage() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [scale, setScale] = useState(1);
  const [showHint, setShowHint] = useState(true);
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const viewRef = useRef<HTMLDivElement>(null);

  const placement = selected ? (PLACEMENT[selected.category] ?? PLACEMENT.rings) : null;
  const modelSrc = selected ? (MODEL_IMAGES[selected.category] ?? MODEL_IMAGES.rings) : null;

  function onDragStart(e: React.PointerEvent) {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: overlayPos.x, oy: overlayPos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: React.PointerEvent) {
    if (!dragging) return;
    setOverlayPos({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  }

  function resetView() {
    setScale(1);
    setOverlayPos({ x: 0, y: 0 });
  }

  function selectProduct(p: Product) {
    setSelected(p);
    setScale(1);
    setOverlayPos({ x: 0, y: 0 });
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <div className="text-center py-12 px-8 border-b border-[#D4AF37]/10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={12} strokeWidth={1.5} className="text-[#D4AF37]" />
          <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#D4AF37]">Brillar Studio</p>
        </div>
        <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9] mb-3">
          Virtual Try-On
        </h1>
        <p className="font-cormorant text-lg italic text-[#888888] max-w-sm mx-auto">
          Envision each piece before it is yours. Select a creation and see it placed on a model.
        </p>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10">
          {/* ── Viewer ── */}
          <div>
            <div
              ref={viewRef}
              className="relative bg-[#111111] border border-[#1E1E1E] rounded-[12px] overflow-hidden"
              style={{ aspectRatio: "3/4", maxHeight: "75vh" }}
            >
              {!selected ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                    <Camera size={24} strokeWidth={1} className="text-[#333333]" />
                  </div>
                  <div className="text-center">
                    <p className="font-cinzel text-sm tracking-[0.06em] text-[#444444]">Select a piece to begin</p>
                    <p className="font-inter text-[10px] text-[#333333] mt-1">Choose from the collection below</p>
                  </div>
                  {/* Decorative diamond pattern */}
                  <div className="absolute inset-0 pointer-events-none opacity-5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="absolute text-[#D4AF37]"
                        style={{ top: `${8 + (i % 4) * 24}%`, left: `${10 + Math.floor(i / 4) * 35}%`, fontSize: 10 }}>
                        ◆
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Model image */}
                  <ImageWithFallback
                    src={modelSrc!}
                    alt="Model"
                    fill
                    sizes="(max-width: 1280px) 100vw, 60vw"
                    className="object-cover object-top"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.4)] to-transparent pointer-events-none" />

                  {/* Jewelry overlay — draggable */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: placement!.top,
                      left: placement!.left,
                      transform: `translate(-50%, -50%) translate(${overlayPos.x}px, ${overlayPos.y}px) scale(${scale})`,
                      cursor: dragging ? "grabbing" : "grab",
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale }}
                    onPointerDown={onDragStart}
                    onPointerMove={onDragMove}
                    onPointerUp={() => setDragging(false)}
                    className="select-none touch-none"
                  >
                    {/* Glow ring */}
                    <div className="absolute inset-0 -m-3 rounded-full bg-[#D4AF37]/10 blur-md pointer-events-none" />
                    {/* Product thumbnail */}
                    <div className="relative h-16 w-16 rounded-full border-2 border-[#D4AF37]/60 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#111111]">
                      <ImageWithFallback
                        src={selected.images[0]}
                        alt={selected.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Hint */}
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgba(10,10,10,0.85)] border border-[#D4AF37]/20 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-sm"
                      >
                        <Info size={10} strokeWidth={1.5} className="text-[#D4AF37]" />
                        <span className="font-inter text-[10px] text-[#888888]">
                          {placement!.hint} · Drag to reposition
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Controls */}
            {selected && (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] border border-[#2A2A2A] text-[#555555] hover:text-[#F9F9F9] hover:border-[#444444] transition-colors"
                    aria-label="Scale down"
                  >
                    <ZoomOut size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setScale((s) => Math.min(2, s + 0.2))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] border border-[#2A2A2A] text-[#555555] hover:text-[#F9F9F9] hover:border-[#444444] transition-colors"
                    aria-label="Scale up"
                  >
                    <ZoomIn size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={resetView}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] border border-[#2A2A2A] text-[#555555] hover:text-[#F9F9F9] hover:border-[#444444] transition-colors"
                    aria-label="Reset"
                  >
                    <RotateCcw size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <Link
                  href={`/products/${selected.slug}`}
                  className="flex items-center gap-2 font-inter text-[11px] tracking-[0.08em] uppercase text-[#D4AF37] hover:text-[#E6C78B] transition-colors group"
                >
                  View this piece
                  <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* ── Selection panel ── */}
          <div>
            {/* Selected product details */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111111] border border-[#D4AF37]/20 rounded-[8px] p-5 mb-6"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative h-14 w-14 flex-shrink-0 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
                      <ImageWithFallback src={selected.images[0]} alt={selected.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-cinzel text-sm tracking-[0.04em] text-[#F9F9F9]">{selected.name}</p>
                      <p className="font-inter text-[10px] text-[#555555] mt-0.5">{selected.subtitle}</p>
                      <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#D4AF37]/60 mt-1.5">
                        {placement?.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product grid */}
            <p className="font-inter text-[9px] tracking-[0.18em] uppercase text-[#555555] mb-4">
              Featured pieces
            </p>
            <div className="grid grid-cols-2 gap-3">
              {FEATURED.map((product) => (
                <button
                  key={product.id}
                  onClick={() => selectProduct(product)}
                  className={`group relative rounded-[6px] overflow-hidden border transition-all duration-300 text-left ${
                    selected?.id === product.id
                      ? "border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/20"
                      : "border-[#1E1E1E] hover:border-[#2A2A2A]"
                  }`}
                >
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {selected?.id === product.id && (
                      <div className="absolute inset-0 bg-[#D4AF37]/10 flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <span className="text-[#0A0A0A] text-[8px] font-bold">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="font-cinzel text-[10px] tracking-[0.04em] text-[#888888] group-hover:text-[#F9F9F9] transition-colors truncate">
                      {product.name}
                    </p>
                    <p className="font-inter text-[9px] capitalize text-[#444444] mt-0.5">{product.category}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Browse all CTA */}
            <div className="mt-6 pt-5 border-t border-[#1A1A1A]">
              <p className="font-inter text-[10px] text-[#444444] mb-3">
                See more than just these pieces — browse the full collection.
              </p>
              <Link
                href="/collections"
                className="flex items-center justify-center gap-2 w-full py-3 border border-[#D4AF37]/30 font-inter text-[11px] tracking-[0.1em] uppercase text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors rounded-[2px] group"
              >
                Browse all collections
                <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mt-12 flex items-start gap-3 bg-[#111111] border border-[#1E1E1E] rounded-[6px] p-4 max-w-xl">
          <Info size={13} strokeWidth={1.5} className="text-[#444444] flex-shrink-0 mt-0.5" />
          <p className="font-inter text-[10px] leading-relaxed text-[#444444]">
            Virtual Try-On uses illustrative model images to give a sense of scale and placement.
            For an immersive in-person experience, we invite you to visit our atelier for a private consultation —{" "}
            <Link href="/appointments" className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors underline underline-offset-2">
              book an appointment
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
