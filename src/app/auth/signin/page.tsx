"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-10">
          <span className="font-cinzel text-2xl tracking-[0.14em] text-[#D4AF37]">◆ BRILLAR</span>
        </Link>

        <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-8">
          <div className="mb-7">
            <h1 className="font-cinzel text-xl tracking-[0.08em] text-[#F9F9F9] mb-1">Sign in</h1>
            <p className="font-cormorant italic text-[#888888]">
              Welcome back to Brillar.
            </p>
          </div>

          {/* Google SSO — not configured yet */}
          <button
            type="button"
            disabled
            title="Google sign-in coming soon"
            className="flex w-full items-center justify-center gap-3 h-11 border border-[#2A2A2A] rounded-[2px] font-inter text-xs tracking-[0.06em] text-[#888888] opacity-40 cursor-not-allowed mb-5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.31a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.39-3.44 2.39-5.88z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2.01c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.86v2.07A7.999 7.999 0 008 16z" fill="#34A853"/>
              <path d="M3.52 9.52A4.8 4.8 0 013.27 8c0-.53.09-1.04.25-1.52V4.41H.86A8 8 0 000 8c0 1.29.31 2.51.86 3.59l2.66-2.07z" fill="#FBBC05"/>
              <path d="M8 3.18c1.17 0 2.22.4 3.05 1.19l2.28-2.28C11.97.8 10.16 0 8 0A7.999 7.999 0 00.86 4.41l2.66 2.07C4.15 4.59 5.92 3.18 8 3.18z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#1E1E1E]" />
            <span className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#444444]">or</span>
            <div className="flex-1 h-px bg-[#1E1E1E]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888]">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="font-inter text-[9px] tracking-[0.08em] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2px] px-4 py-3 pr-11 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444] hover:text-[#888888] transition-colors"
                >
                  {showPw ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-inter text-[10px] tracking-[0.06em] text-[#C06080] bg-[#6B2A3A]/10 border border-[#6B2A3A]/20 rounded-[2px] px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative flex h-12 w-full items-center justify-center gap-2 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-60 mt-2"
            >
              <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                {loading ? "Signing in…" : (
                  <>
                    <Lock size={12} strokeWidth={1.5} />
                    Sign in securely
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        <p className="mt-5 text-center font-inter text-[11px] tracking-[0.04em] text-[#555555]">
          New to Brillar?{" "}
          <Link href="/auth/register" className="text-[#D4AF37] hover:opacity-70 transition-opacity">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
