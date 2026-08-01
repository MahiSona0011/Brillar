import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, RefreshCw, Truck } from "lucide-react";
import ImageGallery from "@/components/shop/ImageGallery";
import GIACertificate from "@/components/shop/GIACertificate";
import OwnershipPassport from "@/components/shop/OwnershipPassport";
import AddToCart from "@/components/shop/AddToCart";
import ProductCard from "@/components/shop/ProductCard";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      images: [{ url: product.images[0], width: 1200, height: 630 }],
    },
  };
}

const GUARANTEES = [
  { icon: Shield,    label: "Lifetime warranty",  desc: "Every Brillar piece is guaranteed for life." },
  { icon: Truck,     label: "Free insured delivery", desc: "Complimentary tracked & insured shipping." },
  { icon: RefreshCw, label: "30-day returns",      desc: "Return or exchange within 30 days." },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: "Brillar" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Brillar Jewels & Jewellery" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-inter text-[10px] tracking-[0.08em] uppercase text-[#555555]">
            <li><Link href="/" className="hover:text-[#888888] transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/collections" className="hover:text-[#888888] transition-colors">Collections</Link></li>
            <li>/</li>
            <li>
              <Link href={`/collections/${product.category}`} className="hover:text-[#888888] transition-colors">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#888888]">{product.name}</li>
          </ol>
        </nav>

        {/* Back link */}
        <Link
          href={`/collections/${product.category}`}
          className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
        >
          <ArrowLeft size={12} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to {product.category}
        </Link>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div>
            <ImageGallery images={product.images} name={product.name} />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-7">
            {/* Title block */}
            <div>
              {product.badge && (
                <span className="inline-block mb-3 font-inter text-[9px] tracking-[0.12em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 rounded-full px-2.5 py-0.5">
                  {product.badge}
                </span>
              )}
              <h1 className="font-cinzel text-2xl md:text-3xl tracking-[0.06em] text-[#F9F9F9] leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 font-inter text-[11px] tracking-[0.08em] uppercase text-[#555555]">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-poppins font-[300] text-2xl tracking-[0.04em] text-[#D4AF37]">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="font-inter text-sm text-[#444444] line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="divider-gold" />

            {/* Description */}
            <p className="font-cormorant text-[#888888] text-base leading-[1.8] italic">
              {product.description}
            </p>

            <div className="divider-gold" />

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Metal",    value: product.metal },
                { label: "Carat",    value: `${product.diamond.carat}ct` },
                { label: "Cut",      value: product.diamond.cut },
                { label: "Color",    value: product.diamond.color },
                { label: "Clarity",  value: product.diamond.clarity },
                { label: "Shape",    value: product.diamond.shape },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#111111] rounded-[4px] px-3.5 py-2.5 border border-[#1E1E1E]">
                  <p className="font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]">{label}</p>
                  <p className="mt-0.5 font-inter text-[11px] tracking-[0.04em] text-[#F9F9F9]">{value}</p>
                </div>
              ))}
            </div>

            <div className="divider-gold" />

            {/* Add to cart */}
            <AddToCart product={product} />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {GUARANTEES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={18} strokeWidth={1} className="text-[#D4AF37]/60" />
                  <p className="font-inter text-[9px] tracking-[0.06em] uppercase text-[#555555]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate section */}
        <div className="mt-20">
          <div className="divider-gold mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            <div>
              <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
                Diamond quality
              </p>
              <h2 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9] mb-4">
                The Brillar Certificate
              </h2>
              <p className="font-cormorant italic text-[#888888] text-lg leading-[1.8]">
                Every diamond in our collection is individually examined and documented. Our in-house gemologists apply the same rigorous standards as the world&apos;s leading certification bodies, ensuring that what arrives at your door is exactly what we described.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Cut, color, clarity, and carat precisely measured",
                  "Polish and symmetry graded to Excellent standard",
                  "Fluorescence documented for full transparency",
                  "Unique certificate ID registered to your piece",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-1 text-[#D4AF37] text-[10px]">◆</span>
                    <p className="font-inter text-[11px] tracking-[0.04em] text-[#888888]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <GIACertificate spec={product.diamond} productName={product.name} />
            </div>
          </div>
        </div>

        {/* Digital Passport */}
        <div className="mt-16">
          <div className="divider-gold mb-12" />
          <div className="mb-6">
            <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-2">
              Provenance & authenticity
            </p>
            <h2 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">
              Digital Ownership Passport
            </h2>
          </div>
          <OwnershipPassport product={product} />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="divider-gold mb-12" />
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-[#D4AF37] mb-3">
                  You may also love
                </p>
                <h2 className="font-cinzel text-2xl tracking-[0.06em] text-[#F9F9F9]">
                  Related pieces
                </h2>
              </div>
              <Link
                href={`/collections/${product.category}`}
                className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] hover:text-[#D4AF37] transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
