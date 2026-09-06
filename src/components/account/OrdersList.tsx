"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export interface OrderSummary {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: { name: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:    "bg-[#1A2D6B]/20 text-[#7090D0] border-[#1A2D6B]/40",
  CONFIRMED:  "bg-[#2A6B4A]/15 text-[#4CAF80] border-[#2A6B4A]/30",
  PROCESSING: "bg-[#1A2D6B]/20 text-[#7090D0] border-[#1A2D6B]/40",
  SHIPPED:    "bg-[#3A2A1A]/20 text-[#C09060] border-[#3A2A1A]/40",
  DELIVERED:  "bg-[#2A6B4A]/15 text-[#4CAF80] border-[#2A6B4A]/30",
  CANCELLED:  "bg-[#6B2A3A]/15 text-[#C06080] border-[#6B2A3A]/30",
  REFUNDED:   "bg-[#6B2A3A]/15 text-[#C06080] border-[#6B2A3A]/30",
};

export default function OrdersList({ orders }: { orders: OrderSummary[] }) {
  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
      >
        <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
        My account
      </Link>

      <div className="mb-8">
        <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Order History</h1>
        <p className="mt-1.5 font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555]">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-5 hover:border-[#2A2A2A] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#1E1E1E]">
              <div>
                <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">
                  BRL-{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="font-inter text-[10px] tracking-[0.06em] text-[#555555] mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 border rounded-full font-inter text-[9px] tracking-[0.1em] uppercase ${STATUS_COLORS[order.status] ?? STATUS_COLORS.PENDING}`}>
                  {order.status}
                </span>
                <span className="font-poppins font-[300] text-base text-[#D4AF37]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-inter text-xs tracking-[0.04em] text-[#888888]">
                    {item.name}
                  </p>
                ))}
              </div>
              <ChevronRight size={11} strokeWidth={1.5} className="text-[#D4AF37]/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <Package size={40} strokeWidth={1} className="text-[#333333]" />
          <p className="font-cinzel text-sm tracking-[0.08em] text-[#555555]">No orders yet</p>
          <Link href="/collections" className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity">
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
}
