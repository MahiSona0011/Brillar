"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    // Auto sign in right after successful registration
    const signInResult = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (signInResult?.ok) {
      router.push("/account");
    } else {
      // Account was created but auto sign-in failed — fall back to the success card
      setSuccess(true);
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex justify-center mb-10">
          <span className="font-cinzel text-2xl tracking-[0.14em] text-[#D4AF37]">◆ BRILLAR</span>
        </Link>

        <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-8">
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="text-4xl">◆</div>
              <h2 className="font-cinzel text-xl tracking-[0.08em] text-[#D4AF37]">Welcome to Brillar</h2>
              <p className="font-cormorant italic text-[#888888] text-base">
                Your account has been created. You will receive a confirmation email shortly.
              </p>
              <Link
                href="/auth/signin"
                className="inline-block mt-4 font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 rounded-full px-4 py-2 hover:bg-[#D4AF37]/5 transition-colors"
              >
                Sign in now
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="font-cinzel text-xl tracking-[0.08em] text-[#F9F9F9] mb-1">Create account</h1>
                <p className="font-cormorant italic text-[#888888]">
                  Join the world of Brillar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field}>
                      <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                        {field === "firstName" ? "First name" : "Last name"}
                      </label>
                      <input
                        type="text"
                        value={form[field]}
                        onChange={(e) => update(field, e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2px] px-3 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2px] px-4 py-3 pr-11 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444] hover:text-[#888888] transition-colors"
                    >
                      {showPw ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
                    </button>
                  </div>
                  <p className="mt-1.5 font-inter text-[9px] tracking-[0.06em] text-[#444444]">
                    Minimum 8 characters
                  </p>
                </div>

                {error && (
                  <p className="font-inter text-[10px] tracking-[0.06em] text-[#C06080] bg-[#6B2A3A]/10 border border-[#6B2A3A]/20 rounded-[2px] px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-12 w-full items-center justify-center border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-60 mt-2"
                >
                  <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10">
                    {loading ? "Creating account…" : "Create account"}
                  </span>
                </button>

                <p className="font-inter text-[9px] tracking-[0.04em] text-[#444444] text-center">
                  By creating an account, you agree to our{" "}
                  <Link href="/legal/terms" className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">Terms</Link>
                  {" "}and{" "}
                  <Link href="/legal/privacy" className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
                </p>
              </form>
            </>
          )}
        </div>

        {!success && (
          <p className="mt-5 text-center font-inter text-[11px] tracking-[0.04em] text-[#555555]">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#D4AF37] hover:opacity-70 transition-opacity">
              Sign in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
