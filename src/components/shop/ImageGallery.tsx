"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface Props {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <>
      <div className="flex gap-4">
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-3 w-16">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square rounded-[4px] overflow-hidden border transition-all duration-300 ${
                  i === active
                    ? "border-[#D4AF37]"
                    : "border-[#2A2A2A] hover:border-[#444444]"
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${name} view ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="flex-1 relative">
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[8px] bg-[#1A1A1A]">
            <div className="skeleton absolute inset-0" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={images[active]}
                  alt={`${name} view ${active + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Zoom button */}
            <button
              onClick={() => setZoomed(true)}
              aria-label="Zoom image"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(10,10,10,0.7)] text-[#888888] hover:text-[#F9F9F9] transition-colors"
            >
              <ZoomIn size={16} strokeWidth={1.5} />
            </button>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(10,10,10,0.7)] text-[#888888] hover:text-[#F9F9F9] transition-colors"
                >
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(10,10,10,0.7)] text-[#888888] hover:text-[#F9F9F9] transition-colors"
                >
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* Mobile dots */}
          {images.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-4 md:hidden">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-[#333333]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.95)] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl aspect-square"
            >
              <ImageWithFallback
                src={images[active]}
                alt={`${name} zoomed`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
