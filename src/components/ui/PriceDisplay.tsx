"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

interface Props {
  usd: number;
  className?: string;
}

export default function PriceDisplay({ usd, className }: Props) {
  const { format } = useCurrency();
  return <span className={className}>{format(usd)}</span>;
}
