"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Heart, Calendar, Settings, ChevronRight, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import SignOutButton from "@/components/ui/SignOutButton";

const MENU = [
  { href: "/account/orders",       icon: Package,  label: "Orders",       desc: "View and track your orders" },
  { href: "/account/wishlist",     icon: Heart,    label: "Wishlist",     desc: "Pieces you have saved" },
  { href: "/account/appointments", icon: Calendar, label: "Appointments", desc: "Upcoming consultations" },
  { href: "/account/settings",     icon: Settings, label: "Settings",     desc: "Profile and preferences" },
];

const TIER_COLORS: Record<string, string> = {
  PEARL:   "text-[#E8E8E8]",
  GOLD:    "text-[#D4AF37]",
  DIAMOND: "text-[#90C0E8]",
  ELITE:   "text-[#C090E8]",
};

const TIER_LABELS: Record<string, string> = {
  PEARL: "Pearl", GOLD: "Gold", DIAMOND: "Diamond", ELITE: "Elite",
};

const TIER_THRESHOLDS: Record<string, { next: string; nextAt: number }> = {
  PEARL:   { next: "Gold",    nextAt: 1000 },
  GOLD:    { next: "Diamond", nextAt: 2500 },
  DIAMOND: { next: "Elite",   nextAt: 5000 },
  ELITE:   { next: "Elite",   nextAt: 5000 },
};

export interface AccountUser {
  name: string | null;
  email: string | null;
  loyaltyTier: string;
  loyaltyPoints: number;
}

export interface RecentOrder {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  itemName: string;
}

export default function AccountView({
  user,
  recentOrder,
}: {
  user: AccountUser;
  recentOrder: RecentOrder | null;
}) {
  const displayName = user.name?.split(" ")[0] || "there";
  const { next: nextTier, nextAt } = TIER_THRESHOLDS[user.loyaltyTier] ?? TIER_THRESHOLDS.PEARL;
  const prevThreshold = user.loyaltyTier === "PEARL" ? 0 : user.loyaltyTier === "GOLD" ? 1000 : user.loyaltyTier === "DIAMOND" ? 2500 : 5000;
  const tierProgress = user.loyaltyTier === "ELITE"
    ? 100
    : Math.min(100, Math.round(((user.loyaltyPoints - prevThreshold) / (nextAt - prevThreshold)) * 100));

  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-2">My account</p>
        <h1 className="font-cinzel text-3xl tracking-[0.06em] text-[#F9F9F9]">
          Welcome back, {displayName}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar profile card */}
        <aside className="space-y-5">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-6"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-12 w-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <span className="font-cinzel text-base text-[#D4AF37]">
                  {(user.name || user.email || "?").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">{user.name || "Brillar Client"}</p>
                <p className="font-inter text-[10px] tracking-[0.04em] text-[#555555] mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Loyalty tier */}
            <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-[4px] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={13} strokeWidth={1.5} className="text-[#D4AF37]" />
                  <span className={`font-cinzel text-xs tracking-[0.08em] ${TIER_COLORS[user.loyaltyTier]}`}>
                    {TIER_LABELS[user.loyaltyTier]} Member
                  </span>
                </div>
                <span className="font-poppins font-[300] text-xs text-[#D4AF37]">
                  {user.loyaltyPoints.toLocaleString()} pts
                </span>
              </div>
              <div className="h-1 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D4AF37] rounded-full transition-all duration-700"
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
              <p className="mt-2 font-inter text-[9px] tracking-[0.06em] text-[#444444]">
                {user.loyaltyTier === "ELITE" ? "Top tier reached" : `${100 - tierProgress}% to ${nextTier}`}
              </p>
            </div>
          </motion.div>

          {/* Nav links */}
          <nav aria-label="Account navigation">
            <ul className="space-y-1">
              {MENU.map(({ href, icon: Icon, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-4 py-3 rounded-[4px] text-[#888888] hover:bg-[#111111] hover:text-[#F9F9F9] transition-all duration-200 group"
                  >
                    <Icon size={15} strokeWidth={1.5} className="flex-shrink-0" />
                    <span className="font-inter text-xs tracking-[0.06em]">{label}</span>
                    <ChevronRight size={12} strokeWidth={1.5} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <SignOutButton className="block w-full text-center font-inter text-[10px] tracking-[0.1em] uppercase text-[#444444] hover:text-[#888888] transition-colors py-2" />
        </aside>

        {/* Main content */}
        <div className="space-y-6">
          {/* Recent order */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-cinzel text-base tracking-[0.06em] text-[#F9F9F9]">Recent Order</h2>
              <Link href="/account/orders" className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">
                View all
              </Link>
            </div>

            {recentOrder ? (
              <div className="flex items-center justify-between p-4 bg-[#0D0D0D] border border-[#1E1E1E] rounded-[4px]">
                <div>
                  <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">{recentOrder.itemName}</p>
                  <p className="font-inter text-[10px] tracking-[0.06em] text-[#555555] mt-1">
                    Order BRL-{recentOrder.id.slice(-8).toUpperCase()} · {new Date(recentOrder.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 bg-[#2A6B4A]/15 text-[#4CAF80] border border-[#2A6B4A]/30 rounded-full font-inter text-[9px] tracking-[0.1em] uppercase">
                    {recentOrder.status}
                  </span>
                  <p className="mt-1 font-poppins font-[300] text-sm text-[#D4AF37]">
                    {formatPrice(recentOrder.total)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#0D0D0D] border border-[#1E1E1E] rounded-[4px] text-center">
                <p className="font-inter text-xs text-[#555555]">No orders yet.</p>
                <Link href="/collections" className="mt-2 inline-block font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity">
                  Start shopping
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MENU.map(({ href, icon: Icon, label, desc }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              >
                <Link
                  href={href}
                  className="group flex flex-col gap-3 p-6 bg-[#111111] border border-[#1E1E1E] rounded-[8px] hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <Icon size={20} strokeWidth={1} className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors" />
                  <div>
                    <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] mb-1">{label}</p>
                    <p className="font-inter text-[10px] tracking-[0.04em] text-[#555555]">{desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Newsletter preferences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#0D0D0D] border border-[#D4AF37]/10 rounded-[8px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] mb-1">Private client access</p>
              <p className="font-inter text-[10px] tracking-[0.04em] text-[#555555]">
                Get early access to new collections, exclusive events, and private sale invitations.
              </p>
            </div>
            <Link
              href="/appointments"
              className="flex-shrink-0 inline-flex h-10 items-center px-6 border border-[#D4AF37] font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] hover:bg-[#D4AF37]/5 transition-all duration-300"
            >
              Book consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
