import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import BestsellerCarousel from "@/components/home/BestsellerCarousel";
import BrandStatement from "@/components/home/BrandStatement";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Brillar Jewels & Jewellery — Crafted for Eternity",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsGrid />
      <BestsellerCarousel />
      <BrandStatement />
      <Newsletter />
    </>
  );
}
