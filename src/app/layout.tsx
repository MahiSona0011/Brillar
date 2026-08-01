import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://brillarjewels.com"
  ),
  title: {
    template: "%s — Brillar",
    default:  "Brillar Jewels & Jewellery — Crafted for Eternity",
  },
  description:
    "Brillar crafts extraordinary diamond jewellery — engagement rings, bridal sets, earrings, necklaces, and bespoke pieces. Every stone GIA-certified, every setting made for eternity.",
  keywords: ["diamond jewellery", "luxury rings", "engagement rings", "bridal jewellery", "GIA certified diamonds"],
  openGraph: {
    type:        "website",
    locale:      "en_US",
    siteName:    "Brillar Jewels & Jewellery",
    title:       "Brillar Jewels & Jewellery — Crafted for Eternity",
    description: "World-class diamond jewellery crafted for eternity.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Brillar Jewels & Jewellery" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F9F9F9] antialiased">
        <CurrencyProvider>
        <CartProvider>
          <LenisProvider>
            <CursorGlow />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <CartDrawer />
          </LenisProvider>
        </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
