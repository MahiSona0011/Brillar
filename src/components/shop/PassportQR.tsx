"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

interface Props {
  certId: string;
}

export default function PassportQR({ certId }: Props) {
  const [url, setUrl] = useState(`/passport/${certId}`);

  useEffect(() => {
    setUrl(`${window.location.origin}/passport/${certId}`);
  }, [certId]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-[6px]">
        <QRCodeSVG
          value={url}
          size={100}
          bgColor="transparent"
          fgColor="#D4AF37"
          level="H"
        />
      </div>
      <p className="font-mono text-[8px] text-[#333333] tracking-wider">{certId}</p>
    </div>
  );
}
