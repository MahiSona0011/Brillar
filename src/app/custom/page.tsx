"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Diamond, Sparkles } from "lucide-react";

const DiamondViewer = dynamic(
  () => import("@/components/custom/DiamondViewer"),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#0d0d0d] animate-pulse rounded-[8px]" /> }
);

// ─── Step data ─────────────────────────────────────────────────────────────

const SHAPES = [
  { id: "Round Brilliant", symbol: "◉", desc: "The classic — maximum brilliance" },
  { id: "Princess",        symbol: "◼", desc: "Modern square with sparkle" },
  { id: "Oval",            symbol: "⬭", desc: "Elegant & finger-lengthening" },
  { id: "Emerald",         symbol: "▬", desc: "Step-cut clarity showcase" },
  { id: "Pear",            symbol: "🔻", desc: "Teardrop silhouette, romantic" },
  { id: "Cushion",         symbol: "◆", desc: "Soft corners, vintage soul" },
  { id: "Radiant",         symbol: "✦", desc: "Brilliant-cut, rectangular" },
  { id: "Marquise",        symbol: "◇", desc: "Elongated, maximises carat" },
];

const METALS = [
  { id: "18k White Gold", swatch: "#dcdce8", desc: "Cool, contemporary lustre" },
  { id: "18k Yellow Gold", swatch: "#D4AF37", desc: "Timeless warm radiance" },
  { id: "18k Rose Gold", swatch: "#d4907a", desc: "Romantic blush warmth" },
  { id: "Platinum", swatch: "#e0e0e4", desc: "Rare, enduring purity" },
];

const CARATS = [
  { id: "0.5ct", label: "0.50 ct", price: 3500 },
  { id: "0.75ct", label: "0.75 ct", price: 5200 },
  { id: "1.0ct", label: "1.00 ct", price: 8500 },
  { id: "1.5ct", label: "1.50 ct", price: 15000 },
  { id: "2.0ct", label: "2.00 ct", price: 28000 },
  { id: "3.0ct", label: "3.00 ct", price: 52000 },
];

const SETTINGS = [
  { id: "Solitaire", premium: 0,    desc: "One diamond. Pure perfection." },
  { id: "Halo",      premium: 1500, desc: "A crown of micro-pavé diamonds." },
  { id: "Pavé",      premium: 2000, desc: "Diamond-studded band, continuous shimmer." },
  { id: "Three-Stone", premium: 3500, desc: "Past, present and future." },
  { id: "Vintage",   premium: 2500, desc: "Milgrain & filigree detailing." },
];

const METAL_PREMIUM: Record<string, number> = {
  "18k White Gold": 0,
  "18k Yellow Gold": 500,
  "18k Rose Gold": 500,
  Platinum: 2500,
};

const STEPS = [
  { id: 0, label: "Shape" },
  { id: 1, label: "Metal" },
  { id: 2, label: "Carat" },
  { id: 3, label: "Setting" },
  { id: 4, label: "Review" },
];

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

// ─── Sub-components ────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all duration-500 ${
                i < current
                  ? "bg-[#D4AF37] border-[#D4AF37]"
                  : i === current
                  ? "border-[#D4AF37] bg-transparent"
                  : "border-[#333333] bg-transparent"
              }`}
            >
              {i < current ? (
                <Check size={11} strokeWidth={2.5} className="text-[#0A0A0A]" />
              ) : (
                <span
                  className={`font-inter text-[9px] ${
                    i === current ? "text-[#D4AF37]" : "text-[#444444]"
                  }`}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <span
              className={`font-inter text-[8px] tracking-[0.1em] uppercase ${
                i === current ? "text-[#D4AF37]" : i < current ? "text-[#888888]" : "text-[#333333]"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-8 sm:w-14 mx-1 transition-all duration-700 ${
                i < current ? "bg-[#D4AF37]/60" : "bg-[#222222]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function CustomPage() {
  const [step, setStep]       = useState(0);
  const [shape, setShape]     = useState<string | null>(null);
  const [metal, setMetal]     = useState<string | null>(null);
  const [carat, setCarat]     = useState<string | null>(null);
  const [setting, setSetting] = useState<string | null>(null);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [notes, setNotes]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dir, setDir]         = useState(1);

  const canProceed = [
    !!shape,
    !!metal,
    !!carat,
    !!setting,
    !!(name.trim() && email.trim()),
  ][step] ?? false;

  function go(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canProceed) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setDone(true);
  }

  const caratData    = CARATS.find((c) => c.id === carat);
  const settingData  = SETTINGS.find((s) => s.id === setting);
  const estimatedBase = (caratData?.price ?? 0) + (settingData?.premium ?? 0) + (METAL_PREMIUM[metal ?? ""] ?? 0);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 30 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d * -30 }),
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center py-20 px-8 text-center border-b border-[#D4AF37]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mb-4">
          Bespoke Creation
        </p>
        <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.06em] text-[#F9F9F9] mb-4">
          Design Your Legacy
        </h1>
        <p className="font-cormorant text-xl italic text-[#888888] max-w-md">
          Every extraordinary piece begins with a vision. Ours begins with yours.
        </p>
        <div className="mt-8 flex items-center gap-6 text-[#555555]">
          {["Master Craftsmen", "GIA Certified Diamonds", "Lifetime Warranty"].map((t) => (
            <span key={t} className="flex items-center gap-1.5 font-inter text-[10px] tracking-[0.08em] uppercase">
              <span className="text-[#D4AF37] text-xs">◆</span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Builder ────────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
        {done ? (
          // ── Success state ──────────────────────────────
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6"
          >
            <div className="h-20 w-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
              <Sparkles size={32} strokeWidth={1} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">
                Your vision has been received
              </p>
              <p className="mt-3 font-inter text-sm text-[#888888] max-w-sm mx-auto leading-relaxed">
                Our master jeweller will contact you within 24 hours to begin your bespoke journey.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-left max-w-xs w-full">
              {[
                ["Shape", shape],
                ["Metal", metal],
                ["Carat", caratData?.label ?? carat],
                ["Setting", setting],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#111111] border border-[#1E1E1E] rounded-[4px] px-3 py-2">
                  <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">{k}</p>
                  <p className="font-cinzel text-xs tracking-[0.04em] text-[#F9F9F9] mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <Link
              href="/"
              className="mt-4 font-inter text-[10px] tracking-[0.12em] uppercase text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
            >
              Return home
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-start">
            {/* ── Left: Step content ──────────────────── */}
            <div>
              <StepIndicator current={step} />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Step 0: Shape */}
                  {step === 0 && (
                    <div>
                      <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
                        Choose your diamond shape
                      </h2>
                      <p className="font-inter text-[11px] text-[#555555] mb-6">
                        The shape defines the personality of your piece.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {SHAPES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setShape(s.id)}
                            className={`p-4 rounded-[4px] border text-center transition-all duration-300 ${
                              shape === s.id
                                ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                                : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                            }`}
                          >
                            <span className="block text-2xl mb-2">{s.symbol}</span>
                            <p className={`font-cinzel text-[10px] tracking-[0.06em] ${shape === s.id ? "text-[#D4AF37]" : "text-[#F9F9F9]"}`}>
                              {s.id}
                            </p>
                            <p className="font-inter text-[9px] text-[#555555] mt-0.5">{s.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Metal */}
                  {step === 1 && (
                    <div>
                      <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
                        Select the metal
                      </h2>
                      <p className="font-inter text-[11px] text-[#555555] mb-6">
                        The setting metal frames your diamond's character.
                      </p>
                      <div className="space-y-3">
                        {METALS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setMetal(m.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-[4px] border transition-all duration-300 ${
                              metal === m.id
                                ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                                : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                            }`}
                          >
                            <span
                              className="h-8 w-8 rounded-full flex-shrink-0 border border-white/10"
                              style={{ backgroundColor: m.swatch }}
                            />
                            <div className="text-left flex-1">
                              <p className={`font-cinzel text-sm tracking-[0.06em] ${metal === m.id ? "text-[#D4AF37]" : "text-[#F9F9F9]"}`}>
                                {m.id}
                              </p>
                              <p className="font-inter text-[10px] text-[#555555] mt-0.5">{m.desc}</p>
                            </div>
                            {METAL_PREMIUM[m.id] > 0 && (
                              <span className="font-inter text-[10px] text-[#555555]">
                                +{formatPrice(METAL_PREMIUM[m.id])}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Carat */}
                  {step === 2 && (
                    <div>
                      <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
                        Choose the carat weight
                      </h2>
                      <p className="font-inter text-[11px] text-[#555555] mb-6">
                        Larger diamonds are rarer — and more breathtaking.
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {CARATS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setCarat(c.id)}
                            className={`p-5 rounded-[4px] border text-center transition-all duration-300 ${
                              carat === c.id
                                ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                                : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                            }`}
                          >
                            <p className={`font-cinzel text-lg tracking-[0.04em] ${carat === c.id ? "text-[#D4AF37]" : "text-[#F9F9F9]"}`}>
                              {c.label}
                            </p>
                            <p className="font-inter text-[10px] text-[#555555] mt-1">
                              from {formatPrice(c.price)}
                            </p>
                          </button>
                        ))}
                      </div>
                      <p className="mt-4 font-inter text-[10px] text-[#444444] italic">
                        * Prices are indicative starting points. Final price depends on cut, colour & clarity.
                      </p>
                    </div>
                  )}

                  {/* Step 3: Setting */}
                  {step === 3 && (
                    <div>
                      <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
                        Select the setting style
                      </h2>
                      <p className="font-inter text-[11px] text-[#555555] mb-6">
                        The setting holds your diamond and tells its story.
                      </p>
                      <div className="space-y-3">
                        {SETTINGS.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSetting(s.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-[4px] border transition-all duration-300 ${
                              setting === s.id
                                ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                                : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                            }`}
                          >
                            <Diamond
                              size={16}
                              strokeWidth={1.5}
                              className={setting === s.id ? "text-[#D4AF37]" : "text-[#555555]"}
                            />
                            <div className="text-left flex-1">
                              <p className={`font-cinzel text-sm tracking-[0.06em] ${setting === s.id ? "text-[#D4AF37]" : "text-[#F9F9F9]"}`}>
                                {s.id}
                              </p>
                              <p className="font-inter text-[10px] text-[#555555] mt-0.5">{s.desc}</p>
                            </div>
                            <span className="font-inter text-[10px] text-[#555555]">
                              {s.premium > 0 ? `+${formatPrice(s.premium)}` : "Included"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <form onSubmit={submit}>
                      <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
                        Review & request a quote
                      </h2>
                      <p className="font-inter text-[11px] text-[#555555] mb-6">
                        Our jeweller will reach out within 24 hours to begin your creation.
                      </p>

                      {/* Summary card */}
                      <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-[8px] p-5 mb-6">
                        <p className="font-inter text-[9px] tracking-[0.15em] uppercase text-[#555555] mb-4">
                          Your selection
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            ["Shape", shape],
                            ["Metal", metal],
                            ["Carat", caratData?.label ?? carat],
                            ["Setting", setting],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">{k}</p>
                              <p className="font-cinzel text-xs tracking-[0.04em] text-[#F9F9F9] mt-0.5">{v}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#2A2A2A] flex justify-between items-center">
                          <p className="font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">
                            Estimated starting price
                          </p>
                          <p className="font-poppins font-[300] text-lg text-[#D4AF37]">
                            {formatPrice(estimatedBase)}
                          </p>
                        </div>
                      </div>

                      {/* Contact form */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                              Your name <span className="text-[#D4AF37]">*</span>
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              placeholder="Sophia"
                              className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                              Email <span className="text-[#D4AF37]">*</span>
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="you@example.com"
                              className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                            Notes (optional)
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Occasion, timeline, any specific requests…"
                            className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !canProceed}
                        className="group relative mt-6 flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10">
                          {loading ? "Sending your vision…" : "Request a bespoke quote"}
                        </span>
                      </button>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {step < 4 && (
                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <button
                      onClick={() => go(step - 1)}
                      className="flex items-center gap-1.5 px-5 h-10 border border-[#2A2A2A] rounded-[2px] font-inter text-xs tracking-[0.08em] uppercase text-[#888888] hover:border-[#444444] hover:text-[#F9F9F9] transition-all"
                    >
                      <ChevronLeft size={13} strokeWidth={1.5} />
                      Back
                    </button>
                  )}
                  <button
                    onClick={() => go(step + 1)}
                    disabled={!canProceed}
                    className="group relative flex items-center gap-1.5 px-6 h-10 border border-[#D4AF37] rounded-[2px] font-inter text-xs tracking-[0.08em] uppercase text-[#D4AF37] overflow-hidden transition-all duration-400 hover:text-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                    <span className="relative z-10 flex items-center gap-1.5">
                      Continue
                      <ChevronRight size={13} strokeWidth={1.5} />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: 3D Preview (sticky) ──────────── */}
            <div className="hidden lg:block sticky top-24 self-start">
              <div className="h-[460px] rounded-[12px] overflow-hidden border border-[#D4AF37]/10">
                <DiamondViewer metal={metal ?? undefined} carat={carat ?? undefined} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {metal && (
                  <div className="bg-[#111111] border border-[#1E1E1E] rounded-[4px] px-3 py-2">
                    <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">Metal</p>
                    <p className="font-cinzel text-[10px] text-[#F9F9F9] mt-0.5">{metal}</p>
                  </div>
                )}
                {carat && caratData && (
                  <div className="bg-[#111111] border border-[#1E1E1E] rounded-[4px] px-3 py-2">
                    <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">Carat</p>
                    <p className="font-cinzel text-[10px] text-[#F9F9F9] mt-0.5">{caratData.label}</p>
                  </div>
                )}
              </div>
              <p className="mt-3 font-inter text-[9px] tracking-[0.08em] text-[#333333] text-center">
                Drag to rotate · Preview is illustrative
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─── Process section ────────────────────────────── */}
      {!done && (
        <section className="border-t border-[#D4AF37]/10 py-16 px-8 md:px-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-8 text-center">
              How it works
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: "01", label: "Design online", desc: "Configure shape, metal, carat & setting in our builder" },
                { n: "02", label: "Jeweller consult", desc: "Our master jeweller refines your vision in a private session" },
                { n: "03", label: "Handcrafted", desc: "Your piece is hand-set and quality-inspected at our atelier" },
                { n: "04", label: "Delivered", desc: "Insured delivery in our signature packaging with GIA cert" },
              ].map((p) => (
                <div key={p.n}>
                  <p className="font-cinzel text-3xl text-[#D4AF37]/20 mb-3">{p.n}</p>
                  <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] mb-1">{p.label}</p>
                  <p className="font-inter text-[11px] leading-relaxed text-[#555555]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
