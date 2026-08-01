import Link from "next/link";
import { ARTICLES } from "@/lib/editorial";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import NewsletterForm from "@/components/editorial/NewsletterForm";

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="font-inter text-[9px] tracking-[0.15em] uppercase text-[#D4AF37]">
      {label}
    </span>
  );
}

export default function EditorialPage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Hero */}
      <div className="text-center py-16 px-8 border-b border-[#D4AF37]/10">
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
          The Brillar Edit
        </p>
        <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.06em] text-[#F9F9F9] mb-3">
          Stories from the Atelier
        </h1>
        <p className="font-cormorant text-lg italic text-[#888888] max-w-sm mx-auto">
          Education, inspiration, and the craft behind every piece.
        </p>
      </div>

      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-16">
        {/* ─── Featured articles ─────────────────────── */}
        {featured.length > 0 && (
          <div className="mb-16">
            <p className="font-inter text-[9px] tracking-[0.2em] uppercase text-[#555555] mb-8">
              Featured
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={`/editorial/${article.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/9] rounded-[8px] overflow-hidden bg-[#1A1A1A] mb-4">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.7)] to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <CategoryBadge label={article.category} />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-cinzel text-xl tracking-[0.04em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors duration-300 mb-2">
                      {article.title}
                    </h2>
                    <p className="font-inter text-[11px] leading-relaxed text-[#888888] mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[#555555]">
                      <span className="font-inter text-[10px]">{article.author}</span>
                      <span className="text-[#333333]">·</span>
                      <span className="font-inter text-[10px]">{article.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── Divider ───────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#1E1E1E]" />
          <span className="text-[#D4AF37] text-xs">◆</span>
          <div className="flex-1 h-px bg-[#1E1E1E]" />
        </div>

        {/* ─── All articles grid ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/editorial/${article.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] rounded-[8px] overflow-hidden bg-[#1A1A1A] mb-4">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <CategoryBadge label={article.category} />
              <h3 className="mt-2 font-cinzel text-base tracking-[0.04em] text-[#F9F9F9] group-hover:text-[#D4AF37] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="mt-1.5 font-inter text-[11px] leading-relaxed text-[#888888] line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-3 text-[#555555]">
                <span className="font-inter text-[10px]">{article.author}</span>
                <span className="text-[#333333]">·</span>
                <span className="font-inter text-[10px]">{article.readTime} min</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Newsletter CTA ─────────────────────────── */}
        <div className="mt-20 border-t border-[#D4AF37]/10 pt-16 text-center">
          <p className="font-cinzel text-xl tracking-[0.06em] text-[#F9F9F9] mb-2">
            The Brillar Letter
          </p>
          <p className="font-inter text-sm text-[#888888] mb-6 max-w-sm mx-auto">
            Monthly dispatches on diamonds, design, and the world of fine jewellery.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
