"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Filters {
  metal: string[];
  priceMin: number;
  priceMax: number;
  carat: string[];
  sort: string;
}

const DEFAULT_FILTERS: Filters = {
  metal: [],
  priceMin: 0,
  priceMax: 100000,
  carat: [],
  sort: "featured",
};

const METALS = ["18k White Gold", "18k Yellow Gold", "18k Rose Gold", "Platinum"];
const CARATS = ["Under 1ct", "1ct – 2ct", "2ct – 5ct", "5ct+"];
const SORTS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest",     label: "Newest" },
];

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}

function FilterGroup({ label, children }: FilterGroupProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#1E1E1E] py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-inter text-[10px] tracking-[0.12em] uppercase text-[#888888] hover:text-[#F9F9F9] transition-colors"
      >
        {label}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FilterSidebar({ filters, onChange }: Props) {
  function toggleMetal(m: string) {
    const metals = filters.metal.includes(m)
      ? filters.metal.filter((x) => x !== m)
      : [...filters.metal, m];
    onChange({ ...filters, metal: metals });
  }

  function toggleCarat(c: string) {
    const carats = filters.carat.includes(c)
      ? filters.carat.filter((x) => x !== c)
      : [...filters.carat, c];
    onChange({ ...filters, carat: carats });
  }

  const hasFilters = filters.metal.length > 0 || filters.carat.length > 0;

  return (
    <aside className="w-full" aria-label="Product filters">
      {/* Sort (mobile visible, desktop in sidebar) */}
      <div className="mb-2">
        <label className="block font-inter text-[10px] tracking-[0.12em] uppercase text-[#888888] mb-3">
          Sort by
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] px-3 py-2 font-inter text-xs text-[#F9F9F9] appearance-none cursor-pointer focus:outline-none focus:border-[#D4AF37]/40"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="divider-gold my-5" />

      {hasFilters && (
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="mb-4 font-inter text-[9px] tracking-[0.1em] uppercase text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
        >
          Clear filters
        </button>
      )}

      {/* Metal */}
      <FilterGroup label="Metal">
        <div className="space-y-2.5">
          {METALS.map((m) => (
            <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`h-3.5 w-3.5 border rounded-[2px] flex items-center justify-center transition-colors ${
                  filters.metal.includes(m)
                    ? "border-[#D4AF37] bg-[#D4AF37]"
                    : "border-[#333333] group-hover:border-[#555555]"
                }`}
                onClick={() => toggleMetal(m)}
              >
                {filters.metal.includes(m) && (
                  <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggleMetal(m)}
                className="font-inter text-[11px] tracking-[0.04em] text-[#888888] group-hover:text-[#F9F9F9] transition-colors"
              >
                {m}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Carat */}
      <FilterGroup label="Carat Weight">
        <div className="space-y-2.5">
          {CARATS.map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`h-3.5 w-3.5 border rounded-[2px] flex items-center justify-center transition-colors ${
                  filters.carat.includes(c)
                    ? "border-[#D4AF37] bg-[#D4AF37]"
                    : "border-[#333333] group-hover:border-[#555555]"
                }`}
                onClick={() => toggleCarat(c)}
              >
                {filters.carat.includes(c) && (
                  <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggleCarat(c)}
                className="font-inter text-[11px] tracking-[0.04em] text-[#888888] group-hover:text-[#F9F9F9] transition-colors"
              >
                {c}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup label="Price Range">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block font-inter text-[9px] tracking-[0.08em] uppercase text-[#555555] mb-1">Min</label>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] px-2.5 py-1.5 font-inter text-[11px] text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/40"
                min={0}
                step={500}
              />
            </div>
            <div className="flex-1">
              <label className="block font-inter text-[9px] tracking-[0.08em] uppercase text-[#555555] mb-1">Max</label>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] px-2.5 py-1.5 font-inter text-[11px] text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/40"
                min={0}
                step={500}
              />
            </div>
          </div>
        </div>
      </FilterGroup>
    </aside>
  );
}
