"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/data";

interface Props {
  product: Product;
}

export default function OwnershipPassport({ product }: Props) {
  const passportUrl = typeof window !== "undefined"
    ? `${window.location.origin}/passport/${product.diamond.certificateId}`
    : `/passport/${product.diamond.certificateId}`;

  return (
    <div className="bg-[#0D0D0D] border border-[#D4AF37]/20 rounded-[8px] p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* QR Code */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          <div className="p-4 bg-[#0A0A0A] border border-[#D4AF37]/15 rounded-[6px]">
            <QRCodeSVG
              value={passportUrl}
              size={120}
              bgColor="transparent"
              fgColor="#D4AF37"
              level="H"
            />
          </div>
          <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#444444] text-center">
            Scan to verify
          </p>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
            <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37]">
              Digital Ownership Passport
            </p>
          </div>
          <h3 className="font-cinzel text-lg tracking-[0.04em] text-[#F9F9F9] mb-1">
            {product.name}
          </h3>
          <p className="font-inter text-[11px] text-[#555555] mb-5">
            Certificate ID: <span className="text-[#888888] font-mono">{product.diamond.certificateId}</span>
          </p>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { label: "Carat",        value: `${product.diamond.carat}ct` },
              { label: "Color",        value: product.diamond.color },
              { label: "Clarity",      value: product.diamond.clarity },
              { label: "Cut",          value: product.diamond.cut },
              { label: "Polish",       value: product.diamond.polish },
              { label: "Symmetry",     value: product.diamond.symmetry },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-1.5 border-b border-[#1A1A1A]">
                <span className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#444444]">{label}</span>
                <span className="font-inter text-[10px] text-[#888888]">{value}</span>
              </div>
            ))}
          </div>

          <Link
            href={`/passport/${product.diamond.certificateId}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors group"
          >
            View full passport
            <ExternalLink size={10} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-[#1A1A1A]">
        <p className="font-inter text-[9px] tracking-[0.08em] text-[#333333] leading-relaxed">
          This digital passport is permanently registered to certificate <span className="text-[#444444]">{product.diamond.certificateId}</span>.
          It provides immutable proof of authenticity, provenance, and diamond characteristics for this piece.
          Scan the QR code or visit the passport URL to verify ownership and access the full certification record.
        </p>
      </div>
    </div>
  );
}
