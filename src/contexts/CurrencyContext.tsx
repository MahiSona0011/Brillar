"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Currency = "USD" | "GBP" | "EUR" | "INR";

const RATES: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  INR: 83.5,
};

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  INR: "₹",
};

const LOCALES: Record<Currency, string> = {
  USD: "en-US",
  GBP: "en-GB",
  EUR: "de-DE",
  INR: "en-IN",
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (usd: number) => number;
  format: (usd: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  convert: (n) => n,
  format: (n) => `$${n.toLocaleString()}`,
  symbol: "$",
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const stored = localStorage.getItem("brillar_currency") as Currency | null;
    if (stored && stored in RATES) setCurrencyState(stored);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("brillar_currency", c);
  }, []);

  const convert = useCallback((usd: number) => Math.round(usd * RATES[currency]), [currency]);

  const format = useCallback(
    (usd: number) => {
      const amount = usd * RATES[currency];
      return new Intl.NumberFormat(LOCALES[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format, symbol: SYMBOLS[currency] }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export { RATES, SYMBOLS };
