import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock } from "lucide-react";
import { ARTICLES, getArticleBySlug } from "@/lib/editorial";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} | The Brillar Edit`,
    description: article.excerpt,
    openGraph: { images: [article.image] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category
  ).slice(0, 2);

  const otherRelated =
    related.length < 2
      ? ARTICLES.filter(
          (a) => a.slug !== slug && !related.includes(a)
        ).slice(0, 2 - related.length)
      : [];

  const allRelated = [...related, ...otherRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* ─── Hero image ─────────────────────────────── */}
      <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.3)] via-transparent to-[#0A0A0A]" />
      </div>

      {/* ─── Article content ─────────────────────────── */}
      <div className="mx-auto max-w-2xl px-8 -mt-16 relative z-10 pb-20">
        <Link
          href="/editorial"
          className="inline-flex items-center gap-1.5 font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#D4AF37] transition-colors mb-8 group"
        >
          <ArrowLeft size={11} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
          The Brillar Edit
        </Link>

        {/* Meta */}
        <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
          {article.category}
        </p>
        <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.04em] text-[#F9F9F9] mb-3 leading-snug">
          {article.title}
        </h1>
        <p className="font-cormorant text-xl italic text-[#888888] mb-8">
          {article.subtitle}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-4 pb-8 border-b border-[#1E1E1E] mb-10">
          <div className="h-9 w-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
            <span className="font-cinzel text-[10px] text-[#D4AF37]">
              {article.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-inter text-xs text-[#F9F9F9]">{article.author}</p>
            <p className="font-inter text-[10px] text-[#555555]">{article.authorTitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-[#555555]">
            <Clock size={11} strokeWidth={1.5} />
            <span className="font-inter text-[10px]">{article.readTime} min read</span>
          </div>
        </div>

        {/* Body */}
        <div
          className="editorial-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[#1E1E1E] flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#111111] border border-[#2A2A2A] rounded-full font-inter text-[9px] tracking-[0.1em] uppercase text-[#555555]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related articles */}
        {allRelated.length > 0 && (
          <div className="mt-16">
            <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#555555] mb-6">
              Continue reading
            </p>
            <div className="space-y-6">
              {allRelated.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/editorial/${rel.slug}`}
                  className="group flex gap-4 items-start"
                >
                  <div className="relative h-16 w-24 flex-shrink-0 rounded-[4px] overflow-hidden bg-[#1A1A1A]">
                    <ImageWithFallback
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="font-inter text-[9px] tracking-[0.15em] uppercase text-[#D4AF37] mb-1">
                      {rel.category}
                    </p>
                    <p className="font-cinzel text-sm tracking-[0.04em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {rel.title}
                    </p>
                    <p className="mt-0.5 font-inter text-[10px] text-[#555555]">
                      {rel.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
