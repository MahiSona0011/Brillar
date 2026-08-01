"use client";

import { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ProductCard from "@/components/shop/ProductCard";
import FilterSidebar, { type Filters } from "@/components/shop/FilterSidebar";
import { COLLECTIONS, PRODUCTS, type Product } from "@/lib/data";

const DEFAULT_FILTERS: Filters = {
  metal: [],
  priceMin: 0,
  priceMax: 100000,
  carat: [],
  sort: "featured",
};

function matchesCarat(carat: number, range: string): boolean {
  if (range === "Under 1ct") return carat < 1;
  if (range === "1ct – 2ct") return carat >= 1 && carat < 2;
  if (range === "2ct – 5ct") return carat >= 2 && carat < 5;
  if (range === "5ct+") return carat >= 5;
  return true;
}

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products];
  if (sort === "price-asc")  return copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return copy.sort((a, b) => b.price - a.price);
  if (sort === "newest")     return copy.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection && slug !== "all") notFound();

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const rawProducts = useMemo(() => {
    if (slug === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === slug);
  }, [slug]);

  const filtered = useMemo(() => {
    let result = rawProducts.filter((p) => {
      if (filters.metal.length > 0 && !filters.metal.includes(p.metal)) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.carat.length > 0 && !filters.carat.some((c) => matchesCarat(p.diamond.carat, c))) return false;
      return true;
    });
    return sortProducts(result, filters.sort);
  }, [rawProducts, filters]);

  const title = collection?.label ?? "All Jewellery";
  const subtitle = collection?.subtitle ?? "Our complete collection";
  const description = collection?.description ?? "";
  const heroImage = collection?.heroImage ?? "";

  return (
    <>
      {/* Hero banner */}
      <section
        className="relative h-[40vh] min-h-[280px] flex items-end overflow-hidden"
        aria-label={`${title} collection`}
      >
        <div className="absolute inset-0 bg-[#111111]">
          {heroImage && (
            <ImageWithFallback
              src={heroImage}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover opacity-40"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[rgba(10,10,10,0.3)] to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8 md:px-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
              {subtitle}
            </p>
            <h1 className="font-cinzel text-3xl md:text-5xl tracking-[0.06em] text-[#F9F9F9]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 font-cormorant italic text-[#888888] text-lg max-w-xl leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#1E1E1E]">
          <p className="font-inter text-[11px] tracking-[0.08em] text-[#888888]">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 md:hidden font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] hover:text-[#F9F9F9] transition-colors"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filters
          </button>
        </div>

        <div className="flex gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="font-cinzel text-sm tracking-[0.08em] text-[#555555]">
                  No pieces match your filters
                </p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] md:hidden">
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 h-full w-80 bg-[#111111] border-r border-[#1E1E1E] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E1E1E]">
              <span className="font-cinzel text-sm tracking-[0.08em] text-[#F9F9F9]">Filters</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-[#555555] hover:text-[#F9F9F9] transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 py-4">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
