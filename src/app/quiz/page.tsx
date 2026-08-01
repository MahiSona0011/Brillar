"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

// ─── Quiz data ─────────────────────────────────────────────────────────────

interface Question {
  id: string;
  label: string;
  subtext: string;
  options: { value: string; emoji: string; desc: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "occasion",
    label: "What's the occasion?",
    subtext: "Tell us what you're celebrating.",
    options: [
      { value: "birthday",     emoji: "🎂", desc: "Birthday" },
      { value: "anniversary",  emoji: "♾️",  desc: "Anniversary" },
      { value: "engagement",   emoji: "💍", desc: "Engagement" },
      { value: "justbecause",  emoji: "✨", desc: "Just Because" },
      { value: "wedding",      emoji: "🤍", desc: "Wedding" },
    ],
  },
  {
    id: "style",
    label: "How would you describe their style?",
    subtext: "Choose the aesthetic that fits them best.",
    options: [
      { value: "classic",    emoji: "⟡", desc: "Classic & Timeless" },
      { value: "modern",     emoji: "◽", desc: "Modern & Minimal" },
      { value: "romantic",   emoji: "◇", desc: "Romantic & Feminine" },
      { value: "bold",       emoji: "◆", desc: "Bold & Statement" },
    ],
  },
  {
    id: "budget",
    label: "What is your budget?",
    subtext: "We have extraordinary pieces across every range.",
    options: [
      { value: "low",      emoji: "$",   desc: "Under $5,000" },
      { value: "mid",      emoji: "$$",  desc: "$5,000 – $12,000" },
      { value: "high",     emoji: "$$$", desc: "$12,000 – $25,000" },
      { value: "ultra",    emoji: "◆",   desc: "$25,000+" },
    ],
  },
  {
    id: "metal",
    label: "Which metal do they prefer?",
    subtext: "Metal tone sets the mood of a piece.",
    options: [
      { value: "white",   emoji: "○", desc: "White Gold / Platinum" },
      { value: "yellow",  emoji: "●", desc: "Yellow Gold" },
      { value: "rose",    emoji: "◎", desc: "Rose Gold" },
      { value: "any",     emoji: "◈", desc: "No Preference" },
    ],
  },
  {
    id: "priority",
    label: "What matters most to them?",
    subtext: "This helps us find the perfect match.",
    options: [
      { value: "sparkle",  emoji: "✦", desc: "Sparkle & Fire" },
      { value: "rarity",   emoji: "💎", desc: "Rarity & Exclusivity" },
      { value: "craft",    emoji: "⚒", desc: "Craftsmanship" },
      { value: "romance",  emoji: "🤍", desc: "The Story Behind It" },
    ],
  },
];

// ─── Recommendation logic ──────────────────────────────────────────────────

const BUDGET_RANGES: Record<string, [number, number]> = {
  low:   [0,     5000],
  mid:   [5000,  12000],
  high:  [12000, 25000],
  ultra: [25000, Infinity],
};

const CATEGORY_BY_OCCASION: Record<string, string[]> = {
  birthday:    ["earrings", "necklaces", "bracelets"],
  anniversary: ["rings", "bracelets", "necklaces"],
  engagement:  ["rings", "bridal"],
  justbecause: ["necklaces", "earrings", "bracelets"],
  wedding:     ["bridal", "rings", "earrings"],
};

const METAL_MAP: Record<string, string[]> = {
  white:  ["18k White Gold", "Platinum"],
  yellow: ["18k Yellow Gold"],
  rose:   ["18k Rose Gold"],
  any:    ["18k White Gold", "18k Yellow Gold", "18k Rose Gold", "Platinum"],
};

function score(product: Product, answers: Record<string, string>): number {
  let pts = 0;

  // Occasion → category preference
  const preferredCats = CATEGORY_BY_OCCASION[answers.occasion] ?? [];
  if (preferredCats.indexOf(product.category) === 0) pts += 3;
  else if (preferredCats.includes(product.category)) pts += 1;

  // Budget filter (hard disqualify)
  const [min, max] = BUDGET_RANGES[answers.budget] ?? [0, Infinity];
  if (product.price < min || product.price > max) return -999;

  // Metal match
  const preferredMetals = METAL_MAP[answers.metal] ?? [];
  if (preferredMetals.includes(product.metal)) pts += 3;

  // Style scoring
  if (answers.style === "classic" && product.tags.includes("solitaire")) pts += 2;
  if (answers.style === "classic" && product.tags.includes("classic"))   pts += 2;
  if (answers.style === "romantic" && product.metal === "18k Rose Gold") pts += 2;
  if (answers.style === "romantic" && product.tags.includes("halo"))     pts += 2;
  if (answers.style === "modern"   && product.tags.includes("minimal"))  pts += 2;
  if (answers.style === "bold"     && product.diamond.carat >= 1.5)      pts += 2;

  // Priority
  if (answers.priority === "sparkle" && product.diamond.cut === "Round Brilliant") pts += 2;
  if (answers.priority === "rarity"  && product.badge === "Exclusive")             pts += 3;
  if (answers.priority === "rarity"  && product.badge === "Limited")               pts += 3;
  if (answers.priority === "craft"   && product.tags.includes("bespoke"))          pts += 2;
  if (answers.priority === "romance" && (product.badge === "Bridal" || product.tags.includes("engagement"))) pts += 2;

  // Featured bonus
  if (product.featured) pts += 1;
  // New bonus
  if (product.new) pts += 0.5;

  return pts;
}

function getRecommendations(answers: Record<string, string>): Product[] {
  const scored = PRODUCTS.map((p) => ({ product: p, pts: score(p, answers) }))
    .filter((x) => x.pts > -999)
    .sort((a, b) => b.pts - a.pts);

  // Return top 3, falling back to featured products if not enough
  const top = scored.slice(0, 3).map((x) => x.product);
  if (top.length < 3) {
    const fallback = PRODUCTS.filter((p) => p.featured && !top.includes(p));
    return [...top, ...fallback].slice(0, 3);
  }
  return top;
}

// ─── Components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full h-px bg-[#1E1E1E] mb-12">
      <motion.div
        className="h-full bg-[#D4AF37]"
        initial={{ width: 0 }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

function RecommendationCard({ product, rank }: { product: Product; rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.12 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] rounded-[8px] overflow-hidden bg-[#1A1A1A] mb-3">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {rank === 0 && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-[#D4AF37] rounded-[2px]">
              <p className="font-inter text-[8px] tracking-[0.15em] uppercase text-[#0A0A0A]">
                Best Match
              </p>
            </div>
          )}
        </div>
        <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </p>
        <p className="mt-0.5 font-inter text-[10px] text-[#555555]">{product.subtitle}</p>
        <p className="mt-2 font-poppins font-[300] text-base text-[#D4AF37]">
          {formatPrice(product.price)}
        </p>
      </Link>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults]   = useState<Product[] | null>(null);
  const [dir, setDir]           = useState(1);

  const q = QUESTIONS[step];

  function choose(value: string) {
    setSelected(value);
  }

  function next() {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setDir(1);
      setStep(step + 1);
      setSelected(null);
    } else {
      setResults(getRecommendations(newAnswers));
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setResults(null);
    setDir(1);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <div className="text-center py-14 px-8 border-b border-[#D4AF37]/10">
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
          Gift Finder
        </p>
        <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9] mb-3">
          Find the Perfect Piece
        </h1>
        <p className="font-cormorant text-lg italic text-[#888888] max-w-sm mx-auto">
          Answer five questions. We'll find the jewel that speaks to them.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-8 py-14">
        {results ? (
          // ── Results ──────────────────────────────────
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
              <p className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9]">
                Your personalised selection
              </p>
            </div>
            <p className="font-inter text-[11px] text-[#555555] mb-10">
              Curated from our collection based on your answers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {results.map((p, i) => (
                <RecommendationCard key={p.id} product={p} rank={i} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/collections"
                className="group relative flex h-12 px-8 items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A]"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Browse all collections</span>
              </Link>
              <button
                onClick={restart}
                className="flex items-center gap-2 font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555] hover:text-[#888888] transition-colors"
              >
                <RefreshCw size={12} strokeWidth={1.5} />
                Retake the quiz
              </button>
            </div>
          </motion.div>
        ) : (
          // ── Quiz questions ────────────────────────────
          <>
            <ProgressBar current={step} total={QUESTIONS.length} />

            <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-[#555555] mb-2">
              {step + 1} of {QUESTIONS.length}
            </p>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.04em] text-[#F9F9F9] mb-2">
                  {q.label}
                </h2>
                <p className="font-inter text-sm text-[#555555] mb-8">{q.subtext}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className={`p-5 rounded-[4px] border text-left transition-all duration-300 ${
                        selected === opt.value
                          ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                          : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                      }`}
                    >
                      <span
                        className={`block text-2xl mb-2 ${
                          selected === opt.value ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        {opt.emoji}
                      </span>
                      <p
                        className={`font-cinzel text-xs tracking-[0.06em] ${
                          selected === opt.value ? "text-[#D4AF37]" : "text-[#F9F9F9]"
                        }`}
                      >
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (step > 0) {
                    setDir(-1);
                    setStep(step - 1);
                    setSelected(answers[QUESTIONS[step - 1].id] ?? null);
                  }
                }}
                className={`font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555] hover:text-[#888888] transition-colors ${
                  step === 0 ? "invisible" : ""
                }`}
              >
                ← Back
              </button>

              <button
                onClick={next}
                disabled={!selected}
                className="group relative flex h-11 px-8 items-center gap-2 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-400 hover:text-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                <span className="relative z-10 flex items-center gap-2">
                  {step === QUESTIONS.length - 1 ? "See my recommendations" : "Next"}
                  <ArrowRight size={13} strokeWidth={1.5} />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
