"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import type { Product } from "@/lib/data";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useCurrency } from "@/contexts/CurrencyContext";

// ─── Natural Language Parser ──────────────────────────────────────────────────

interface ParsedQuery {
  category?: string;
  metal?: string;
  maxPrice?: number;
  minPrice?: number;
  cut?: string;
  badge?: string;
  keywords: string[];
}

function parseK(s: string): number {
  const clean = s.replace(/,/g, "").toLowerCase();
  if (clean.endsWith("k")) return parseFloat(clean) * 1000;
  return parseFloat(clean);
}

function parseQuery(q: string): ParsedQuery {
  const lower = q.toLowerCase();

  const category =
    /\brings?\b/.test(lower) ? "rings" :
    /\bearrings?\b|\bstuds?\b|\bdrops?\b|\bhoops?\b/.test(lower) ? "earrings" :
    /\bnecklaces?\b|\bpendants?\b|\bchains?\b/.test(lower) ? "necklaces" :
    /\bbracelets?\b|\btennis\b|\bbangle/.test(lower) ? "bracelets" :
    /\bbridal\b|\bwedding\b|\bengagement\b/.test(lower) ? "bridal" :
    undefined;

  const metal =
    /rose\s*gold/.test(lower) ? "18k Rose Gold" :
    /yellow\s*gold/.test(lower) ? "18k Yellow Gold" :
    /white\s*gold/.test(lower) ? "18k White Gold" :
    /\bplatinum\b/.test(lower) ? "Platinum" :
    undefined;

  const cut =
    /\boval\b/.test(lower) ? "Oval" :
    /\bround\b/.test(lower) ? "Round Brilliant" :
    /\bcushion\b/.test(lower) ? "Cushion Cut" :
    /\bpear\b/.test(lower) ? "Pear" :
    /\bemerald\b/.test(lower) ? "Emerald" :
    /\bprincess\b/.test(lower) ? "Princess" :
    /\bmarquise\b/.test(lower) ? "Marquise" :
    undefined;

  const badge =
    /\bbest.?seller\b/.test(lower) ? "Bestseller" :
    /\bnew\b|\blatest\b/.test(lower) ? "New" :
    /\bexclusive\b/.test(lower) ? "Exclusive" :
    undefined;

  // price parsing
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  const underMatch = lower.match(/(?:under|below|less\s+than|up\s+to|max(?:imum)?)\s*\$?([\d,.k]+)/);
  if (underMatch) maxPrice = parseK(underMatch[1]);

  const rangeMatch = lower.match(/\$?([\d,.k]+)\s*(?:to|-)\s*\$?([\d,.k]+)/);
  if (rangeMatch) {
    minPrice = parseK(rangeMatch[1]);
    maxPrice = parseK(rangeMatch[2]);
  }

  const aboveMatch = lower.match(/(?:above|over|more\s+than|min(?:imum)?)\s*\$?([\d,.k]+)/);
  if (aboveMatch) minPrice = parseK(aboveMatch[1]);

  // budget keyword shortcuts
  if (/\bbudget\b|\baffordable\b|\bcheap(?:er)?\b/.test(lower)) maxPrice = maxPrice ?? 8000;
  if (/\bluxury\b|\bpremium\b|\bstatement\b/.test(lower)) minPrice = minPrice ?? 15000;

  const stopWords = new Set([
    "a","an","the","is","in","on","at","to","for","of","and","or","not",
    "i","me","my","we","you","your","show","me","find","want","need","looking",
    "something","under","above","below","between","price","budget","cost",
    "ring","earring","necklace","bracelet","bridal","wedding","engagement",
    "rose","yellow","white","gold","platinum","diamond","jewel","jewellery",
  ]);

  const keywords = lower
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((k) => k.length > 2 && !stopWords.has(k));

  return { category, metal, cut, badge, maxPrice, minPrice, keywords };
}

function scoreProduct(product: Product, parsed: ParsedQuery): number {
  let score = 0;

  if (parsed.category && product.category === parsed.category) score += 10;
  if (parsed.metal && product.metal === parsed.metal) score += 8;
  if (parsed.cut && product.diamond.cut === parsed.cut) score += 6;
  if (parsed.badge && product.badge === parsed.badge) score += 4;

  if (parsed.maxPrice !== undefined && product.price > parsed.maxPrice) return -999;
  if (parsed.maxPrice !== undefined && product.price <= parsed.maxPrice) score += 5;
  if (parsed.minPrice !== undefined && product.price >= parsed.minPrice) score += 3;

  const text = `${product.name} ${product.subtitle} ${product.description} ${product.tags.join(" ")} ${product.category}`.toLowerCase();
  for (const kw of parsed.keywords) {
    if (text.includes(kw)) score += 2;
  }
  if (product.featured) score += 1;

  return score;
}

function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const parsed = parseQuery(query);
  const hasFilters = parsed.category || parsed.metal || parsed.cut || parsed.badge || parsed.maxPrice || parsed.minPrice || parsed.keywords.length > 0;
  if (!hasFilters) return [];

  return PRODUCTS
    .map((p) => ({ product: p, score: scoreProduct(p, parsed) }))
    .filter(({ score }) => score > -999)
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score >= 0)
    .slice(0, 6)
    .map(({ product }) => product);
}

// ─── Recent Searches ──────────────────────────────────────────────────────────

const LS_KEY = "brillar_recent_searches";

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(q: string) {
  const prev = getRecent().filter((s) => s !== q);
  localStorage.setItem(LS_KEY, JSON.stringify([q, ...prev].slice(0, 5)));
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Rose gold engagement ring under $10,000",
  "Diamond studs for everyday",
  "Platinum ring with oval diamond",
  "Bridal set under $15,000",
  "Statement necklace over $20,000",
];

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { format } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const id = setTimeout(() => setResults(searchProducts(query)), 180);
    return () => clearTimeout(id);
  }, [query]);

  const handleSubmit = useCallback((q: string) => {
    if (!q.trim()) return;
    saveRecent(q.trim());
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[rgba(10,10,10,0.97)] backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-0 top-0 z-50 bg-[#0A0A0A] border-b border-[#D4AF37]/15 px-6 md:px-16 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input bar */}
            <div className="flex items-center gap-4 pt-6 pb-4 border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-2 text-[#D4AF37]/60">
                <Sparkles size={15} strokeWidth={1.5} />
              </div>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(query); }}
                placeholder="Try: &quot;Rose gold ring under $12,000&quot; or &quot;Oval diamond necklace&quot;"
                className="flex-1 bg-transparent font-inter text-lg md:text-xl text-[#F9F9F9] placeholder:text-[#2A2A2A] outline-none"
                aria-label="Search Brillar"
              />
              <button
                aria-label="Close search"
                onClick={onClose}
                className="flex-shrink-0 text-[#555555] hover:text-[#F9F9F9] transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-w-[900px] mx-auto mt-6">
              {/* Results */}
              {results.length > 0 && (
                <div>
                  <p className="font-inter text-[9px] tracking-[0.18em] uppercase text-[#555555] mb-4">
                    {results.length} result{results.length !== 1 ? "s" : ""} found
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => { handleSubmit(query); onClose(); }}
                        className="group flex gap-3 items-start p-3 rounded-[6px] border border-[#1A1A1A] hover:border-[#D4AF37]/25 hover:bg-[#111111] transition-all duration-300"
                      >
                        <div className="relative h-14 w-14 flex-shrink-0 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-cinzel text-xs tracking-[0.04em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="font-inter text-[10px] text-[#555555] truncate mt-0.5">
                            {product.subtitle}
                          </p>
                          <p className="font-poppins text-[11px] text-[#D4AF37] mt-1 font-[300]">
                            {format(product.price)}
                          </p>
                        </div>
                        <ArrowUpRight size={13} className="text-[#333333] group-hover:text-[#D4AF37] flex-shrink-0 transition-colors mt-0.5" strokeWidth={1.5} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query.trim() && results.length === 0 && (
                <div className="text-center py-8">
                  <p className="font-cormorant italic text-[#444444] text-lg mb-2">No pieces match your search.</p>
                  <p className="font-inter text-[10px] text-[#333333]">
                    Try adjusting your price range or category, or{" "}
                    <Link href="/appointments" onClick={onClose} className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors underline underline-offset-2">
                      speak with an expert
                    </Link>
                    .
                  </p>
                </div>
              )}

              {/* Empty state: suggestions + recent */}
              {!query.trim() && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recent.length > 0 && (
                    <div>
                      <p className="font-inter text-[9px] tracking-[0.18em] uppercase text-[#555555] mb-4 flex items-center gap-2">
                        <Clock size={10} strokeWidth={1.5} /> Recent searches
                      </p>
                      <ul className="space-y-2">
                        {recent.map((r) => (
                          <li key={r}>
                            <button
                              onClick={() => setQuery(r)}
                              className="font-inter text-sm text-[#444444] hover:text-[#D4AF37] transition-colors text-left"
                            >
                              {r}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <p className="font-inter text-[9px] tracking-[0.18em] uppercase text-[#555555] mb-4 flex items-center gap-2">
                      <Sparkles size={10} strokeWidth={1.5} /> Try asking
                    </p>
                    <ul className="space-y-2">
                      {SUGGESTIONS.map((s) => (
                        <li key={s}>
                          <button
                            onClick={() => setQuery(s)}
                            className="font-inter text-sm text-[#444444] hover:text-[#D4AF37] transition-colors text-left"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
