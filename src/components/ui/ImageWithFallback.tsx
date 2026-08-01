"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

export default function ImageWithFallback({ src, alt, fallbackClassName, ...props }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={fallbackClassName ?? "absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]"}
        aria-label={alt}
        role="img"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
