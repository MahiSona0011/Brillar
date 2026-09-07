import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="flex justify-center mb-10">
          <span className="font-cinzel text-2xl tracking-[0.14em] text-[#D4AF37]">◆ BRILLAR</span>
        </Link>

        <div className="bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-8">
          <h1 className="font-cinzel text-xl tracking-[0.08em] text-[#F9F9F9] mb-3">
            Password reset
          </h1>
          <p className="font-inter text-sm leading-relaxed text-[#888888]">
            Self-service password reset isn&apos;t available yet in this demo. Please email{" "}
            <a href="mailto:atelier@brillar.com" className="text-[#D4AF37] hover:opacity-70 transition-opacity">
              atelier@brillar.com
            </a>{" "}
            and we&apos;ll help you regain access.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="mt-6 inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors group"
        >
          <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
