"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package, ShoppingBag, TrendingUp, Users, Eye, Check,
  AlertCircle, ArrowUpRight, BarChart3, Settings, LogOut,
} from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS = [
  { id: "ORD-2024-0891", product: "Eternelle Solitaire",     amount: 8500,  status: "fulfilled",  date: "2024-12-18" },
  { id: "ORD-2024-0890", product: "Céleste Necklace",        amount: 9600,  status: "processing", date: "2024-12-18" },
  { id: "ORD-2024-0889", product: "Lumière Halo",            amount: 12400, status: "fulfilled",  date: "2024-12-17" },
  { id: "ORD-2024-0888", product: "Maison Drop Earrings",    amount: 16800, status: "shipped",    date: "2024-12-17" },
  { id: "ORD-2024-0887", product: "Tennis Classic",          amount: 22000, status: "fulfilled",  date: "2024-12-16" },
  { id: "ORD-2024-0886", product: "Soleil Diamond Studs",    amount: 11200, status: "cancelled",  date: "2024-12-15" },
  { id: "ORD-2024-0885", product: "Aurora Trilogy",          amount: 18600, status: "processing", date: "2024-12-15" },
  { id: "ORD-2024-0884", product: "Eternelle Bridal Set",    amount: 14800, status: "fulfilled",  date: "2024-12-14" },
];

const STATUS_STYLES: Record<string, string> = {
  fulfilled:  "bg-[#0A2A15] text-[#4CAF80] border-[#2A6B4A]/40",
  shipped:    "bg-[#1A2D6B]/20 text-[#7090D0] border-[#1A2D6B]/40",
  processing: "bg-[#3A2A0A]/30 text-[#C09040] border-[#6B4A1A]/40",
  cancelled:  "bg-[#2A0A0A]/30 text-[#C06060] border-[#6B1A1A]/40",
};

const ADMIN_KEY = "BRILLAR";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="font-cinzel text-lg tracking-[0.1em] text-[#D4AF37]">◆ BRILLAR</p>
            <p className="font-inter text-xs tracking-[0.12em] uppercase text-[#555555] mt-1">Admin Portal</p>
          </div>
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-[8px] p-6">
            <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] mb-2">
              Access key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setKeyError(false); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (key === ADMIN_KEY) setAuthenticated(true);
                  else setKeyError(true);
                }
              }}
              placeholder="Enter admin key"
              className={`w-full bg-[#0A0A0A] border rounded-[4px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] outline-none transition-colors ${
                keyError ? "border-[#C06060]/60" : "border-[#2A2A2A] focus:border-[#D4AF37]/40"
              }`}
            />
            {keyError && (
              <p className="mt-2 font-inter text-[10px] text-[#C06060] flex items-center gap-1">
                <AlertCircle size={10} /> Invalid access key
              </p>
            )}
            <button
              onClick={() => {
                if (key === ADMIN_KEY) setAuthenticated(true);
                else setKeyError(true);
              }}
              className="mt-4 w-full py-3 bg-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#0A0A0A] rounded-[2px] hover:bg-[#C9A730] transition-colors"
            >
              Sign in
            </button>
            <p className="mt-4 font-inter text-[9px] text-[#333333] text-center">
              Demo key: <span className="text-[#444444] font-mono">BRILLAR</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalRevenue = MOCK_ORDERS.filter((o) => o.status === "fulfilled").reduce((s, o) => s + o.amount, 0);
  const totalProducts = PRODUCTS.length;
  const pendingOrders = MOCK_ORDERS.filter((o) => o.status === "processing").length;
  const catalogValue = PRODUCTS.reduce((s, p) => s + p.price, 0);

  const STATS = [
    { label: "Revenue (MTD)",    value: formatPrice(totalRevenue),   icon: TrendingUp,  delta: "+12.4%" },
    { label: "Active Products",  value: `${totalProducts}`,          icon: Package,     delta: "+2 new" },
    { label: "Pending Orders",   value: `${pendingOrders}`,          icon: ShoppingBag, delta: "needs action" },
    { label: "Catalog Value",    value: formatPrice(catalogValue),   icon: BarChart3,   delta: "retail estimate" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col fixed left-0 top-0 bottom-0 bg-[#0D0D0D] border-r border-[#1E1E1E] z-30 pt-8 px-4 pb-6">
        <Link href="/" className="flex items-center gap-2 font-cinzel text-sm tracking-[0.1em] text-[#D4AF37] mb-10 px-2">
          <span className="text-[10px]">◆</span> BRILLAR
        </Link>
        <nav className="flex-1 space-y-1">
          {[
            { id: "overview" as const, label: "Overview",  icon: BarChart3 },
            { id: "products" as const, label: "Products",  icon: Package },
            { id: "orders"   as const, label: "Orders",    icon: ShoppingBag },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] font-inter text-[11px] tracking-[0.06em] transition-colors ${
                activeTab === id
                  ? "bg-[#1A1A1A] text-[#D4AF37]"
                  : "text-[#555555] hover:text-[#888888] hover:bg-[#111111]"
              }`}
            >
              <Icon size={14} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </nav>
        <div className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] font-inter text-[11px] text-[#555555] hover:text-[#888888] hover:bg-[#111111] transition-colors"
          >
            <Eye size={14} strokeWidth={1.5} /> View site
          </Link>
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] font-inter text-[11px] text-[#555555] hover:text-[#C06060] hover:bg-[#1A0A0A] transition-colors"
          >
            <LogOut size={14} strokeWidth={1.5} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-56 pt-8 pb-16 px-6 md:px-10">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-8">
          <p className="font-cinzel text-sm tracking-[0.1em] text-[#D4AF37]">◆ Admin</p>
          <button onClick={() => setAuthenticated(false)} className="text-[#555555] hover:text-[#C06060]">
            <LogOut size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-1">
          {(["overview", "products", "orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-inter text-[10px] tracking-[0.06em] uppercase border transition-colors ${
                activeTab === tab
                  ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
                  : "border-[#2A2A2A] text-[#555555] hover:border-[#555555]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div>
            <div className="mb-8">
              <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Overview</h1>
              <p className="font-inter text-[11px] text-[#555555] mt-1">December 2024 · Brillar Admin</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {STATS.map(({ label, value, icon: Icon, delta }) => (
                <div key={label} className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">{label}</p>
                    <Icon size={14} strokeWidth={1.5} className="text-[#333333]" />
                  </div>
                  <p className="font-poppins text-xl font-[300] text-[#F9F9F9] tracking-[0.02em]">{value}</p>
                  <p className="mt-1 font-inter text-[9px] text-[#444444]">{delta}</p>
                </div>
              ))}
            </div>

            {/* Recent orders preview */}
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E1E]">
                <p className="font-cinzel text-sm tracking-[0.04em] text-[#F9F9F9]">Recent Orders</p>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="flex items-center gap-1 font-inter text-[10px] text-[#555555] hover:text-[#D4AF37] transition-colors"
                >
                  View all <ArrowUpRight size={10} strokeWidth={1.5} />
                </button>
              </div>
              <div className="divide-y divide-[#1A1A1A]">
                {MOCK_ORDERS.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#1A1A1A]/50 transition-colors">
                    <div>
                      <p className="font-mono text-[10px] text-[#555555]">{order.id}</p>
                      <p className="font-inter text-xs text-[#888888] mt-0.5">{order.product}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-poppins text-sm font-[300] text-[#D4AF37]">{formatPrice(order.amount)}</p>
                      <span className={`border rounded-full px-2 py-0.5 font-inter text-[9px] tracking-[0.06em] ${STATUS_STYLES[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Products ── */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Products</h1>
                <p className="font-inter text-[11px] text-[#555555] mt-1">{PRODUCTS.length} pieces in catalog</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] font-inter text-[10px] tracking-[0.08em] uppercase text-[#0A0A0A] rounded-[2px] hover:bg-[#C9A730] transition-colors">
                <Settings size={12} strokeWidth={1.5} /> Manage
              </button>
            </div>

            <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E1E1E]">
                    {["Product", "Category", "Price", "Badge", "Stock"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-inter text-[9px] tracking-[0.12em] uppercase text-[#444444]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} className="hover:bg-[#1A1A1A]/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <Link href={`/products/${p.slug}`} className="group">
                          <p className="font-cinzel text-xs tracking-[0.04em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors">{p.name}</p>
                          <p className="font-mono text-[9px] text-[#333333] mt-0.5">{p.id}</p>
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-inter text-[10px] capitalize text-[#555555]">{p.category}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-poppins text-xs font-[300] text-[#D4AF37]">{formatPrice(p.price)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        {p.badge ? (
                          <span className="font-inter text-[9px] tracking-[0.06em] text-[#888888] border border-[#2A2A2A] rounded-full px-2 py-0.5">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-[#333333]">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {p.inStock ? (
                          <div className="flex items-center gap-1 text-[#4CAF80]">
                            <Check size={10} strokeWidth={2.5} />
                            <span className="font-inter text-[9px]">In stock</span>
                          </div>
                        ) : (
                          <span className="font-inter text-[9px] text-[#C06060]">Out of stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {activeTab === "orders" && (
          <div>
            <div className="mb-8">
              <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Orders</h1>
              <p className="font-inter text-[11px] text-[#555555] mt-1">{MOCK_ORDERS.length} orders this month</p>
            </div>

            <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E1E1E]">
                    {["Order ID", "Product", "Amount", "Date", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-inter text-[9px] tracking-[0.12em] uppercase text-[#444444]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-[#1A1A1A]/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-[10px] text-[#555555]">{order.id}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-inter text-xs text-[#888888]">{order.product}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-poppins text-sm font-[300] text-[#D4AF37]">{formatPrice(order.amount)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-inter text-[10px] text-[#444444]">{order.date}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`border rounded-full px-2.5 py-0.5 font-inter text-[9px] tracking-[0.06em] ${STATUS_STYLES[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
