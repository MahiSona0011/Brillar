# Brillar Jewels & Jewellery

Luxury diamond e-commerce platform. Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis · Three.js

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Environment variables

Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
STRIPE_SECRET_KEY=...
CLOUDINARY_CLOUD_NAME=...
```

## Asset placeholders

Drop your assets before launch:

| Path | Purpose |
|------|---------|
| `public/videos/hero.mp4` | Hero looping background video |
| `public/images/hero-poster.jpg` | Video fallback poster |
| `public/images/collections/*.jpg` | Collection card images (6 files) |
| `public/images/products/*.jpg` | Product card images (6 files) |
| `public/og-image.jpg` | Open Graph image 1200x630 |

Without real images, cards show a dark gradient fallback automatically.

## Phase completion

| Phase | Status | Contents |
|-------|--------|---------|
| **1 — Foundation** | Done | Design system, nav, hero, collections, carousel, newsletter |
| **2 — Commerce** | Next | PLP, PDP, cart, checkout, auth, account dashboard |
| **3 — Differentiators** | Planned | Custom builder, 3D diamond (Three.js), gifting quiz, blog |
| **4 — Advanced** | Planned | AI search, AR try-on, digital passport, admin panel |

## Key files

```
src/
  app/
    globals.css             Tailwind v4 @theme tokens + base styles
    layout.tsx              Root layout: Lenis, CursorGlow, Navbar, Footer, WhatsApp
    page.tsx                Homepage composition
  components/
    layout/
      Navbar.tsx            Fixed nav, mega-menu, mobile drawer, search overlay
      Footer.tsx            4-column footer with SVG social icons
    home/
      Hero.tsx              Cinematic hero: letter-by-letter, parallax video, CTAs
      CollectionsGrid.tsx   Asymmetric 2-row editorial grid + GSAP ScrollTrigger
      BestsellerCarousel.tsx Embla drag carousel with sparkle hover particles
      BrandStatement.tsx    Editorial quote + animated stats
      Newsletter.tsx        Email subscription with submit state
    providers/
      LenisProvider.tsx     Buttery smooth scroll (Lenis)
    ui/
      CursorGlow.tsx        Canvas ambient gold spotlight cursor
      WhatsAppButton.tsx    Floating WhatsApp concierge with pulse glow
      ImageWithFallback.tsx Next/image with dark gradient error fallback
  lib/
    utils.ts                cn(), formatPrice(), lerp()
```
