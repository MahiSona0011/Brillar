"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency, type Currency } from "@/contexts/CurrencyContext";
import { ChevronDown } from "lucide-react";

const OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: "USD", label: "USD", symbol: "$" },
  { value: "GBP", label: "GBP", symbol: "£" },
  { value: "EUR", label: "EUR", symbol: "€" },
  { value: "INR", label: "INR", symbol: "₹" },
];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = OPTIONS.find((o) => o.value === currency) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 font-inter text-[10px] tracking-[0.06em] text-[#555555] hover:text-[#D4AF37] transition-colors duration-300"
        aria-label="Switch currency"
        aria-expanded={open}
      >
        <span>{current.symbol}</span>
        <span>{current.label}</span>
        <ChevronDown size={9} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-20 bg-[#111111] border border-[#2A2A2A] rounded-[4px] overflow-hidden z-50 shadow-xl">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setCurrency(opt.value); setOpen(false); }}
              className={`w-full px-3 py-2 text-left font-inter text-[10px] tracking-[0.06em] transition-colors duration-200 ${
                opt.value === currency
                  ? "text-[#D4AF37] bg-[#1A1A1A]"
                  : "text-[#555555] hover:text-[#F9F9F9] hover:bg-[#1A1A1A]"
              }`}
            >
              {opt.symbol} {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
