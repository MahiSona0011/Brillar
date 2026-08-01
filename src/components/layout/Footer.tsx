import Link from "next/link";

const FOOTER_LINKS = {
  Collections: [
    { label: "Diamond rings",  href: "/collections/rings"     },
    { label: "Bridal",         href: "/collections/bridal"    },
    { label: "Earrings",       href: "/collections/earrings"  },
    { label: "Necklaces",      href: "/collections/necklaces" },
    { label: "Bracelets",      href: "/collections/bracelets" },
    { label: "Custom design",  href: "/custom"                },
  ],
  Services: [
    { label: "Book consultation", href: "/appointments"  },
    { label: "Custom atelier",    href: "/atelier"       },
    { label: "Diamond education", href: "/editorial"     },
    { label: "Care & repair",     href: "/care"          },
    { label: "Certificate verify",href: "/verify"        },
  ],
  Company: [
    { label: "Our story",      href: "/about"           },
    { label: "Sustainability", href: "/sustainability"   },
    { label: "Press",          href: "/press"            },
    { label: "Careers",        href: "/careers"          },
    { label: "Contact",        href: "/contact"          },
  ],
};

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-[#D4AF37]/10 bg-[#0A0A0A]"
    >
      {/* Upper footer */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-cinzel text-xl tracking-[0.12em] text-[#F9F9F9] mb-6">
              <span className="text-[#D4AF37]">◆</span>
              BRILLAR
            </Link>
            <p className="font-inter text-sm text-[#555555] leading-relaxed max-w-xs mb-8">
              Crafting heirlooms of extraordinary brilliance since 1987. Every stone, every setting, every moment — made for eternity.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                {
                  label: "Instagram",
                  href: "#",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  label: "YouTube",
                  href: "#",
                  path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                },
                {
                  label: "Pinterest",
                  href: "#",
                  path: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z",
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Brillar on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/20 text-[#555555] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-cinzel text-[10px] tracking-[0.12em] text-[#D4AF37] uppercase mb-6">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-[#555555] hover:text-[#888888] transition-colors duration-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="divider-gold mx-8 md:mx-16" />

      {/* Lower footer */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-inter text-xs text-[#333333]">
          © {new Date().getFullYear()} Brillar Jewels & Jewellery. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy policy", "Terms of service", "Cookie preferences"].map((item) => (
            <Link
              key={item}
              href="#"
              className="font-inter text-xs text-[#333333] hover:text-[#555555] transition-colors duration-400"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* Payment icons text representation */}
          {["Visa", "Mastercard", "PayPal", "Stripe"].map((p) => (
            <span key={p} className="font-poppins text-[9px] tracking-[0.04em] text-[#333333] border border-[#2A2A2A] rounded-[2px] px-2 py-0.5">
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
