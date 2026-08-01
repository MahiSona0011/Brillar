import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Shield, CheckCircle, ArrowLeft, Diamond } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import PassportQR from "@/components/shop/PassportQR";

interface Props {
  params: Promise<{ id: string }>;
}

function getProductByCertId(id: string) {
  return PRODUCTS.find((p) => p.diamond.certificateId === id);
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.diamond.certificateId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductByCertId(id);
  if (!product) return { title: "Passport Not Found" };
  return {
    title: `${product.name} — Digital Passport | Brillar`,
    description: `Verify the authenticity and provenance of ${product.name}. Certificate ${id}.`,
    robots: { index: false, follow: false },
  };
}

const GRADE_QUALITY: Record<string, string> = {
  IF: "Internally Flawless",
  VVS1: "Very Very Slightly Included 1",
  VVS2: "Very Very Slightly Included 2",
  VS1: "Very Slightly Included 1",
  VS2: "Very Slightly Included 2",
  SI1: "Slightly Included 1",
  SI2: "Slightly Included 2",
  D: "Exceptional White",
  E: "Exceptional White+",
  F: "Rare White",
  G: "Rare White+",
  H: "White",
  I: "Slightly Tinted White",
};

export default async function PassportPage({ params }: Props) {
  const { id } = await params;
  const product = getProductByCertId(id);
  if (!product) notFound();

  const { diamond } = product;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="mx-auto max-w-2xl px-6 md:px-8 py-12">
        {/* Header */}
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
        >
          <ArrowLeft size={11} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to product
        </Link>

        {/* Passport card */}
        <div className="border border-[#D4AF37]/25 rounded-[12px] overflow-hidden">
          {/* Top band */}
          <div className="bg-gradient-to-r from-[#111111] to-[#0D0D0D] px-8 py-6 border-b border-[#D4AF37]/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#D4AF37] text-xs">◆</span>
                  <span className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#D4AF37]">Brillar Jewels</span>
                </div>
                <h1 className="font-cinzel text-xl md:text-2xl tracking-[0.04em] text-[#F9F9F9]">
                  Digital Ownership Passport
                </h1>
                <p className="mt-1 font-inter text-[10px] text-[#555555]">
                  Certificate of Authenticity & Provenance
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0A2A15] border border-[#2A6B4A]/40 rounded-full px-3 py-1.5 flex-shrink-0">
                <CheckCircle size={11} className="text-[#4CAF80]" strokeWidth={2} />
                <span className="font-inter text-[9px] tracking-[0.08em] text-[#4CAF80]">Verified</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Piece identity */}
            <div>
              <p className="font-inter text-[9px] tracking-[0.16em] uppercase text-[#555555] mb-3">Piece</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-[9px] text-[#444444] mb-0.5">Name</p>
                  <p className="font-cinzel text-sm tracking-[0.04em] text-[#F9F9F9]">{product.name}</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] text-[#444444] mb-0.5">Certificate ID</p>
                  <p className="font-mono text-sm text-[#D4AF37]">{diamond.certificateId}</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] text-[#444444] mb-0.5">Metal</p>
                  <p className="font-inter text-xs text-[#888888]">{product.metal}</p>
                </div>
                <div>
                  <p className="font-inter text-[9px] text-[#444444] mb-0.5">Category</p>
                  <p className="font-inter text-xs text-[#888888] capitalize">{product.category}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#1A1A1A]" />

            {/* Diamond grading */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Diamond size={13} strokeWidth={1.5} className="text-[#D4AF37]" />
                <p className="font-inter text-[9px] tracking-[0.16em] uppercase text-[#555555]">Diamond Grading Report</p>
              </div>

              {/* The 4Cs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Carat Weight", value: `${diamond.carat}ct`, sub: "Total weight" },
                  { label: "Cut Grade",    value: diamond.cut, sub: "Shape & proportions" },
                  { label: "Color Grade",  value: diamond.color, sub: GRADE_QUALITY[diamond.color] ?? "" },
                  { label: "Clarity",      value: diamond.clarity, sub: GRADE_QUALITY[diamond.clarity] ?? "" },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-[#111111] border border-[#1E1E1E] rounded-[6px] p-4">
                    <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#444444] mb-1">{label}</p>
                    <p className="font-cinzel text-base tracking-[0.04em] text-[#D4AF37]">{value}</p>
                    <p className="font-inter text-[9px] text-[#333333] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Additional specs */}
              <div className="space-y-0">
                {[
                  { label: "Shape",         value: diamond.shape },
                  { label: "Polish",        value: diamond.polish },
                  { label: "Symmetry",      value: diamond.symmetry },
                  { label: "Fluorescence",  value: diamond.fluorescence },
                  { label: "Depth %",       value: `${diamond.depth}%` },
                  { label: "Table %",       value: `${diamond.table}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#1A1A1A] last:border-0">
                    <span className="font-inter text-[10px] tracking-[0.06em] text-[#444444]">{label}</span>
                    <span className="font-inter text-[10px] text-[#888888]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#1A1A1A]" />

            {/* QR + verification */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <PassportQR certId={diamond.certificateId} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={13} strokeWidth={1.5} className="text-[#D4AF37]" />
                  <p className="font-inter text-[9px] tracking-[0.16em] uppercase text-[#555555]">Authenticity Guarantee</p>
                </div>
                <p className="font-inter text-[11px] leading-relaxed text-[#444444]">
                  This passport is permanently linked to certificate <span className="text-[#555555] font-mono">{diamond.certificateId}</span>.
                  The QR code can be scanned at any time to verify this record has not been altered.
                  Brillar guarantees the authenticity, provenance, and grading accuracy of every piece we create.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    "Independently graded by Brillar master gemologists",
                    "Diamond conflict-free, responsibly sourced",
                    "Lifetime authentication available on request",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] text-[8px] mt-1">◆</span>
                      <p className="font-inter text-[10px] text-[#444444]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer band */}
          <div className="bg-[#0D0D0D] border-t border-[#D4AF37]/10 px-8 py-4 flex items-center justify-between">
            <p className="font-inter text-[9px] tracking-[0.08em] text-[#333333]">
              © {new Date().getFullYear()} Brillar Jewels & Jewellery. All rights reserved.
            </p>
            <Link
              href="/"
              className="font-cinzel text-[10px] tracking-[0.1em] text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
            >
              ◆ BRILLAR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
