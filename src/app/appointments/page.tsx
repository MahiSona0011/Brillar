"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Video, Sparkles, Check, Clock, Shield, Star } from "lucide-react";

// ─── Tier data ─────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: "complimentary",
    icon: Video,
    label: "Complimentary",
    badge: null,
    price: "No charge",
    duration: "30 min",
    location: "Virtual or In-store",
    desc: "A no-commitment introduction to the Brillar collection. Meet one of our advisors and discover pieces aligned to your style.",
    features: [
      "Collection overview",
      "Style consultation",
      "Virtual or in-person",
      "Diamond education basics",
    ],
  },
  {
    id: "signature",
    icon: MapPin,
    label: "Signature",
    badge: "Most Popular",
    price: "Complimentary",
    duration: "60 min",
    location: "In-store, New York",
    desc: "A private showing in our atelier. Champagne, curated pieces, and dedicated one-on-one time with our senior jewellery advisor.",
    features: [
      "Private atelier viewing",
      "Champagne service",
      "GIA certificate review",
      "Styling & pairing guidance",
      "Priority access to new arrivals",
    ],
  },
  {
    id: "bespoke",
    icon: Sparkles,
    label: "Bespoke",
    badge: "By Invitation",
    price: "Complimentary",
    duration: "90 min",
    location: "In-store, New York",
    desc: "Begin your bespoke jewellery journey. Meet our master jeweller, review diamond parcels, and sketch the first outline of your custom creation.",
    features: [
      "Master jeweller consultation",
      "Diamond parcel review",
      "Design sketching session",
      "Bespoke price estimate",
      "Priority production slot",
      "Dedicated aftercare",
    ],
  },
];

const TIMES = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:30 PM"];

type TierId = "complimentary" | "signature" | "bespoke";

// ─── Main page ─────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [tier, setTier]     = useState<TierId | null>(null);
  const [date, setDate]     = useState("");
  const [time, setTime]     = useState("");
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [notes, setNotes]   = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked]   = useState(false);

  const canSubmit = !!(tier && date && time && name.trim() && email.trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setBooked(true);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative py-20 px-8 text-center border-b border-[#D4AF37]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05)_0%,transparent_65%)]" />
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mb-4">
          Private Appointments
        </p>
        <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.06em] text-[#F9F9F9] mb-4">
          Experience Brillar.
          <br />
          <span className="text-[#D4AF37]">In Person.</span>
        </h1>
        <p className="font-cormorant text-xl italic text-[#888888] max-w-lg mx-auto">
          Some conversations are best had face to face. Our atelier is a place of unhurried beauty — where you can hold a diamond to the light and know, with certainty, that it is the one.
        </p>

        {/* Trust bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: Shield, label: "Private & discreet" },
            { icon: Star,   label: "By-appointment only" },
            { icon: Clock,  label: "No rush, ever" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[#555555]">
              <Icon size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
              <span className="font-inter text-[10px] tracking-[0.1em] uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Tiers ─────────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-8 md:px-16 py-20">
        <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#555555] mb-10 text-center">
          Choose your experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TIERS.map((t) => {
            const Icon = t.icon;
            const isSelected = tier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTier(t.id as TierId)}
                className={`relative text-left p-6 rounded-[8px] border transition-all duration-400 ${
                  isSelected
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/5"
                    : "border-[#1E1E1E] bg-[#111111] hover:border-[#2A2A2A]"
                }`}
              >
                {t.badge && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#D4AF37] rounded-[2px] font-inter text-[8px] tracking-[0.1em] uppercase text-[#0A0A0A]">
                    {t.badge}
                  </span>
                )}

                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-4 border ${isSelected ? "bg-[#D4AF37]/10 border-[#D4AF37]/30" : "bg-[#1A1A1A] border-[#2A2A2A]"}`}>
                  <Icon size={16} strokeWidth={1.5} className={isSelected ? "text-[#D4AF37]" : "text-[#555555]"} />
                </div>

                <p className={`font-cinzel text-base tracking-[0.06em] mb-1 ${isSelected ? "text-[#D4AF37]" : "text-[#F9F9F9]"}`}>
                  {t.label}
                </p>
                <p className="font-inter text-[10px] text-[#555555] mb-1">
                  {t.duration} · {t.location}
                </p>
                <p className="font-inter text-[11px] leading-relaxed text-[#888888] mb-4">
                  {t.desc}
                </p>

                <ul className="space-y-1.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check size={10} strokeWidth={2} className={isSelected ? "text-[#D4AF37]" : "text-[#555555]"} />
                      <span className="font-inter text-[10px] text-[#888888]">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                  <p className="font-poppins font-[300] text-sm text-[#D4AF37]">{t.price}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── Booking form ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-start">
          {/* Left: form */}
          <div>
            <h2 className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-1">
              Reserve your appointment
            </h2>
            <p className="font-inter text-[11px] text-[#555555] mb-8">
              {tier ? `${TIERS.find((t) => t.id === tier)?.label} experience selected.` : "Select an experience above to continue."}
            </p>

            {booked ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] border border-[#D4AF37]/20 rounded-[8px] p-10 text-center space-y-4"
              >
                <div className="flex justify-center">
                  <div className="h-14 w-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <Check size={22} strokeWidth={1.5} className="text-[#D4AF37]" />
                  </div>
                </div>
                <p className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9]">
                  Your appointment is requested
                </p>
                <p className="font-inter text-sm text-[#888888] max-w-xs mx-auto leading-relaxed">
                  A member of our team will confirm your appointment within 4 hours by email.
                </p>
                <div className="pt-2 text-left max-w-xs mx-auto space-y-1">
                  {[
                    ["Experience", TIERS.find((t) => t.id === tier)?.label],
                    ["Date", date],
                    ["Time", time],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">{k}</span>
                      <span className="font-inter text-[11px] text-[#F9F9F9]">{v}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setBooked(false);
                    setTier(null);
                    setDate("");
                    setTime("");
                    setName("");
                    setEmail("");
                  }}
                  className="mt-2 font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
                >
                  Book another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {/* Date */}
                <div>
                  <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                    Preferred date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                    Preferred time <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`px-4 py-2 rounded-[2px] font-inter text-xs border transition-all duration-200 ${
                          time === t
                            ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                            : "border-[#2A2A2A] text-[#555555] hover:border-[#3A3A3A]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                      Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Sophia"
                      className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                      Email <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                    Tell us about your visit (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Occasion, pieces you're interested in, any special requirements…"
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !canSubmit}
                  className="group relative flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10">
                    {loading ? "Reserving your time…" : "Request appointment"}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right: atelier info */}
          <div className="space-y-5">
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-6">
              <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] mb-4">
                The Brillar Atelier
              </p>
              <div className="space-y-3">
                {[
                  { label: "Address", value: "12 East 47th Street, 4th Floor\nNew York, NY 10017" },
                  { label: "Hours", value: "Monday – Saturday\n10:00 AM – 6:00 PM" },
                  { label: "Phone", value: "+1 (212) 555 0192" },
                  { label: "Email", value: "atelier@brillar.com" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-inter text-[9px] tracking-[0.12em] uppercase text-[#555555]">
                      {label}
                    </p>
                    <p className="font-inter text-xs text-[#888888] mt-0.5 whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] border border-[#D4AF37]/15 rounded-[8px] p-6">
              <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9] mb-3">
                What to expect
              </p>
              <ul className="space-y-3">
                {[
                  "You will be greeted by name on arrival",
                  "Pieces are curated to your preferences in advance",
                  "There is no pressure and no obligation",
                  "All visits include complimentary champagne",
                  "A follow-up summary is sent within 24 hours",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#D4AF37] text-xs mt-0.5 flex-shrink-0">◆</span>
                    <span className="font-inter text-[11px] leading-relaxed text-[#888888]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quote strip ────────────────────────────────── */}
      <section className="border-t border-[#D4AF37]/10 py-16 px-8 text-center">
        <p className="font-cormorant text-2xl md:text-3xl italic text-[#888888] max-w-2xl mx-auto leading-relaxed">
          &ldquo;The finest jewellery is not bought. It is discovered — in a moment of stillness, when the right stone catches the light in exactly the right way.&rdquo;
        </p>
        <p className="mt-4 font-inter text-[10px] tracking-[0.15em] uppercase text-[#555555]">
          Élise Mercier, Founder
        </p>
      </section>
    </div>
  );
}
