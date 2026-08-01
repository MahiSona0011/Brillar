"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Video, MapPin, Check } from "lucide-react";

type AppType = "IN_STORE" | "VIRTUAL" | "BESPOKE";

const APPOINTMENT_TYPES = [
  {
    id: "IN_STORE" as AppType,
    icon: MapPin,
    label: "In-store consultation",
    desc: "Visit our atelier in New York for a private showing",
    duration: "60 min",
  },
  {
    id: "VIRTUAL" as AppType,
    icon: Video,
    label: "Virtual consultation",
    desc: "Meet our gemologist from anywhere via video call",
    duration: "45 min",
  },
  {
    id: "BESPOKE" as AppType,
    icon: Calendar,
    label: "Bespoke design session",
    desc: "Begin your custom jewellery journey",
    duration: "90 min",
  },
];

const TIMES = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const MOCK_BOOKED = {
  type: "In-store consultation",
  date: "28 May 2026",
  time: "2:00 PM",
  status: "Confirmed",
};

export default function AppointmentsPage() {
  const [type, setType] = useState<AppType | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function book(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setBooked(true);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
      >
        <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
        My account
      </Link>

      <div className="mb-10">
        <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">Appointments</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upcoming */}
        <div>
          <h2 className="font-cinzel text-base tracking-[0.06em] text-[#F9F9F9] mb-5">Upcoming</h2>
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-[8px] p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">{MOCK_BOOKED.type}</p>
                <p className="font-inter text-[11px] tracking-[0.04em] text-[#888888] mt-0.5">
                  {MOCK_BOOKED.date} at {MOCK_BOOKED.time}
                </p>
              </div>
              <span className="px-2.5 py-0.5 bg-[#2A6B4A]/15 text-[#4CAF80] border border-[#2A6B4A]/30 rounded-full font-inter text-[9px] tracking-[0.1em] uppercase">
                {MOCK_BOOKED.status}
              </span>
            </div>
          </div>
        </div>

        {/* Book new */}
        <div>
          <h2 className="font-cinzel text-base tracking-[0.06em] text-[#F9F9F9] mb-5">Book a new appointment</h2>

          {booked ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] border border-[#D4AF37]/20 rounded-[8px] p-8 text-center space-y-3"
            >
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Check size={20} strokeWidth={1.5} className="text-[#D4AF37]" />
                </div>
              </div>
              <p className="font-cinzel text-base tracking-[0.06em] text-[#F9F9F9]">Appointment requested</p>
              <p className="font-inter text-[11px] tracking-[0.04em] text-[#888888]">
                We will confirm your appointment within 24 hours.
              </p>
              <button
                onClick={() => { setBooked(false); setType(null); setDate(""); setTime(""); }}
                className="mt-2 font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
              >
                Book another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={book} className="space-y-5">
              {/* Type */}
              <div className="space-y-2">
                {APPOINTMENT_TYPES.map(({ id, icon: Icon, label, desc, duration }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 border rounded-[4px] cursor-pointer transition-all duration-300 ${
                      type === id ? "border-[#D4AF37]/60 bg-[#D4AF37]/5" : "border-[#2A2A2A] hover:border-[#444444]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} className={type === id ? "text-[#D4AF37]" : "text-[#555555]"} />
                    <div className="flex-1">
                      <p className="font-cinzel text-xs tracking-[0.06em] text-[#F9F9F9]">{label}</p>
                      <p className="font-inter text-[9px] tracking-[0.04em] text-[#555555] mt-0.5">{desc}</p>
                    </div>
                    <span className="font-inter text-[9px] tracking-[0.06em] text-[#555555]">{duration}</span>
                    <input
                      type="radio"
                      className="sr-only"
                      checked={type === id}
                      onChange={() => setType(id)}
                      required
                    />
                  </label>
                ))}
              </div>

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
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  required
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
                      className={`px-3.5 py-2 rounded-[2px] font-inter text-xs border transition-all duration-200 ${
                        time === t
                          ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                          : "border-[#2A2A2A] text-[#555555] hover:border-[#444444]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any pieces you're interested in, occasion, budget range…"
                  className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !type || !date || !time}
                className="group relative flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">{loading ? "Booking…" : "Request appointment"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
