import type { DiamondSpec } from "@/lib/data";

interface Props {
  spec: DiamondSpec;
  productName: string;
}

function SpecRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#1E1E1E] last:border-0">
      <span className="font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">{label}</span>
      <span className="font-inter text-[11px] tracking-[0.04em] text-[#F9F9F9]">{value}</span>
    </div>
  );
}

export default function GIACertificate({ spec, productName }: Props) {
  return (
    <div className="border border-[#2A2A2A] rounded-[8px] overflow-hidden">
      {/* Header */}
      <div className="bg-[#1A1A1A] px-5 py-4 flex items-center gap-3 border-b border-[#2A2A2A]">
        {/* Diamond SVG icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 2L22 9H6L14 2Z" fill="#D4AF37" fillOpacity="0.3" stroke="#D4AF37" strokeWidth="0.8" />
          <path d="M6 9L2 14L14 26L26 14L22 9H6Z" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="0.8" />
          <path d="M6 9L14 26L2 14" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M22 9L14 26L26 14" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M2 14H26" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
          <path d="M6 9H22" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
        </svg>
        <div>
          <p className="font-cinzel text-xs tracking-[0.1em] text-[#D4AF37]">Brillar Certificate</p>
          <p className="font-inter text-[9px] tracking-[0.08em] uppercase text-[#555555] mt-0.5">
            ID: {spec.certificateId}
          </p>
        </div>
      </div>

      {/* Diamond plot SVG */}
      <div className="flex justify-center bg-[#0D0D0D] py-6 border-b border-[#1E1E1E]">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-label="Diamond plot diagram">
          {/* Table */}
          <polygon points="32,35 68,35 75,50 50,80 25,50" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.6" />
          {/* Crown */}
          <polygon points="50,15 80,35 20,35" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.6" />
          {/* Table facets */}
          <line x1="50" y1="15" x2="32" y2="35" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="50" y1="15" x2="50" y2="35" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="50" y1="15" x2="68" y2="35" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="50" y1="15" x2="80" y2="35" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="50" y1="15" x2="20" y2="35" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          {/* Pavilion */}
          <line x1="32" y1="35" x2="50" y2="80" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="68" y1="35" x2="50" y2="80" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="25" y1="50" x2="50" y2="80" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="75" y1="50" x2="50" y2="80" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.35" />
          {/* Girdle */}
          <ellipse cx="50" cy="50" rx="26" ry="3" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Center sparkle */}
          <circle cx="50" cy="46" r="1.5" fill="#D4AF37" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Specs grid */}
      <div className="px-5 py-2">
        <SpecRow label="Shape" value={spec.shape} />
        <SpecRow label="Carat Weight" value={`${spec.carat} ct`} />
        <SpecRow label="Cut" value={spec.cut} />
        <SpecRow label="Color" value={spec.color} />
        <SpecRow label="Clarity" value={spec.clarity} />
        <SpecRow label="Polish" value={spec.polish} />
        <SpecRow label="Symmetry" value={spec.symmetry} />
        <SpecRow label="Fluorescence" value={spec.fluorescence} />
        <SpecRow label="Depth" value={`${spec.depth}%`} />
        <SpecRow label="Table" value={`${spec.table}%`} />
      </div>

      {/* Footer note */}
      <div className="px-5 py-4 bg-[#0D0D0D] border-t border-[#1E1E1E]">
        <p className="font-inter text-[9px] tracking-[0.06em] text-[#444444] leading-relaxed">
          Every Brillar diamond is individually selected and certified. This certificate accompanies your {productName} and serves as your permanent record of quality and provenance.
        </p>
      </div>
    </div>
  );
}
