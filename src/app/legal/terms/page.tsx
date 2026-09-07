import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-10 group"
      >
        <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
        Back home
      </Link>

      <h1 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9] mb-8">Terms of Service</h1>

      <div className="space-y-6 font-inter text-sm leading-relaxed text-[#888888]">
        <p>
          Brillar Jewels &amp; Jewellery is a demonstration e-commerce project. These terms are
          placeholder content for portfolio purposes and do not constitute a binding legal agreement.
        </p>
        <p>
          By creating an account or placing an order in test mode, you acknowledge this is a sandbox
          environment: payments are processed via Stripe test mode and no real charges occur.
        </p>
        <p>
          For questions about this project, contact the site owner directly.
        </p>
      </div>
    </div>
  );
}
