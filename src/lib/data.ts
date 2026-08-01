export type Badge = "Bestseller" | "New" | "Bridal" | "Exclusive" | "Limited";
export type Metal = "18k White Gold" | "18k Yellow Gold" | "18k Rose Gold" | "Platinum";
export type Cut = "Round Brilliant" | "Cushion Cut" | "Oval" | "Pear" | "Emerald" | "Princess" | "Marquise";
export type Clarity = "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1" | "SI2";
export type Color = "D" | "E" | "F" | "G" | "H" | "I";
export type Category = "rings" | "necklaces" | "earrings" | "bracelets" | "bridal" | "custom";

export interface DiamondSpec {
  carat: number;
  cut: Cut;
  color: Color;
  clarity: Clarity;
  shape: string;
  certificateId: string;
  polish: "Excellent" | "Very Good" | "Good";
  symmetry: "Excellent" | "Very Good" | "Good";
  fluorescence: "None" | "Faint" | "Medium" | "Strong";
  depth: number;
  table: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  badge?: Badge;
  metal: Metal;
  diamond: DiamondSpec;
  sizes?: string[];
  inStock: boolean;
  featured: boolean;
  new: boolean;
  tags: string[];
}

export interface Collection {
  slug: string;
  label: string;
  subtitle: string;
  description: string;
  image: string;
  heroImage: string;
  category: Category;
  productCount: number;
}

// ─── Collections ──────────────────────────────────────────────────────────────

export const COLLECTIONS: Collection[] = [
  {
    slug: "rings",
    label: "Diamond Rings",
    subtitle: "Solitaire & Pavé",
    description: "From classic solitaires to intricate pavé bands, each ring is a testament to our master craftsmen's skill and an eternal symbol of love.",
    image: "/images/collections/rings.jpg",
    heroImage: "/images/collections/rings.jpg",
    category: "rings",
    productCount: 24,
  },
  {
    slug: "bridal",
    label: "Bridal",
    subtitle: "Engagement & Wedding",
    description: "Every love story deserves the perfect beginning. Our bridal collection is designed to mark the most meaningful moments of your journey together.",
    image: "/images/collections/bridal.jpg",
    heroImage: "/images/collections/bridal.jpg",
    category: "bridal",
    productCount: 18,
  },
  {
    slug: "necklaces",
    label: "Necklaces",
    subtitle: "Pendants & Chains",
    description: "Wear your light. Each diamond necklace captures and scatters brilliance with every breath, every movement, every glance.",
    image: "/images/collections/necklaces.jpg",
    heroImage: "/images/collections/necklaces.jpg",
    category: "necklaces",
    productCount: 16,
  },
  {
    slug: "earrings",
    label: "Earrings",
    subtitle: "Drops & Studs",
    description: "From delicate diamond studs to dramatic drop earrings, our collection frames every face with timeless brilliance.",
    image: "/images/collections/earrings.jpg",
    heroImage: "/images/collections/earrings.jpg",
    category: "earrings",
    productCount: 20,
  },
  {
    slug: "bracelets",
    label: "Bracelets",
    subtitle: "Tennis & Bangles",
    description: "Adorn your wrist with the shimmer of exceptional diamonds. Our bracelets are crafted to be worn and treasured for generations.",
    image: "/images/collections/bracelets.jpg",
    heroImage: "/images/collections/bracelets.jpg",
    category: "bracelets",
    productCount: 12,
  },
  {
    slug: "custom",
    label: "Custom",
    subtitle: "Bespoke Creations",
    description: "The most personal jewelry is the kind you imagine yourself. Collaborate with our designers to create a one-of-a-kind piece that is entirely yours.",
    image: "/images/collections/custom.jpg",
    heroImage: "/images/collections/custom.jpg",
    category: "custom",
    productCount: 0,
  },
];

// ─── Products ──────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "eternelle-solitaire",
    name: "Eternelle Solitaire",
    subtitle: "18k White Gold · VS1 · Round Brilliant",
    description: "The Eternelle Solitaire is the purest expression of diamond beauty. A single, perfectly proportioned round brilliant diamond — hand-selected for its extraordinary fire and scintillation — is held in an ultra-fine six-prong setting that lets maximum light enter from every angle. The shank tapers gracefully toward the center, creating an elegant silhouette on the hand.",
    price: 8500,
    comparePrice: 9200,
    images: [
      "/images/products/ring-1.jpg",
      "/images/products/ring-1b.jpg",
      "/images/products/ring-1c.jpg",
      "/images/products/ring-1d.jpg",
    ],
    category: "rings",
    badge: "Bestseller",
    metal: "18k White Gold",
    diamond: {
      carat: 1.02,
      cut: "Round Brilliant",
      color: "G",
      clarity: "VS1",
      shape: "Round",
      certificateId: "BRL-2024-001",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 61.4,
      table: 57,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: true,
    new: false,
    tags: ["solitaire", "engagement", "classic"],
  },
  {
    id: "prod-002",
    slug: "lumiere-halo",
    name: "Lumière Halo",
    subtitle: "18k Yellow Gold · VVS2 · Cushion Cut",
    description: "The Lumière Halo surrounds a velvety cushion-cut diamond with a glittering halo of micro-pavé diamonds, creating an illusion of extraordinary size and brilliance. Set in warm 18-karat yellow gold that flatters all skin tones, this ring radiates the warmth of golden light with every movement.",
    price: 12400,
    images: [
      "/images/products/ring-2.jpg",
      "/images/products/ring-2b.jpg",
      "/images/products/ring-2c.jpg",
    ],
    category: "rings",
    badge: "New",
    metal: "18k Yellow Gold",
    diamond: {
      carat: 1.51,
      cut: "Cushion Cut",
      color: "F",
      clarity: "VVS2",
      shape: "Cushion",
      certificateId: "BRL-2024-002",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "Faint",
      depth: 63.2,
      table: 58,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: true,
    new: true,
    tags: ["halo", "engagement", "yellow-gold"],
  },
  {
    id: "prod-003",
    slug: "rose-pave-band",
    name: "Rosé Pavé Band",
    subtitle: "18k Rose Gold · SI1 · Pavé Setting",
    description: "A whisper of romance made tangible. The Rosé Pavé Band features a continuous stream of round brilliant diamonds set in lustrous rose gold, creating an unbroken river of light around the finger. Soft, feminine, and endlessly wearable, it pairs beautifully with any engagement ring.",
    price: 4200,
    images: [
      "/images/products/ring-3.jpg",
      "/images/products/ring-3b.jpg",
    ],
    category: "rings",
    badge: "Bridal",
    metal: "18k Rose Gold",
    diamond: {
      carat: 0.55,
      cut: "Round Brilliant",
      color: "G",
      clarity: "SI1",
      shape: "Round",
      certificateId: "BRL-2024-003",
      polish: "Very Good",
      symmetry: "Very Good",
      fluorescence: "None",
      depth: 62.1,
      table: 56,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: false,
    new: false,
    tags: ["band", "wedding", "rose-gold", "pavé"],
  },
  {
    id: "prod-004",
    slug: "maison-drop-earrings",
    name: "Maison Drop Earrings",
    subtitle: "Platinum · VS2 · Pear Shape · 2ct Total",
    description: "Drama distilled to its most elegant form. The Maison Drop Earrings feature two perfectly matched pear-shaped diamonds — each one selected for its extraordinary symmetry — suspended from a delicate platinum bale studded with pavé diamonds. They graze the neck with every turn of the head, catching light in their distinctive teardrop form.",
    price: 16800,
    images: [
      "/images/products/earrings-1.jpg",
      "/images/products/earrings-1b.jpg",
      "/images/products/earrings-1c.jpg",
    ],
    category: "earrings",
    badge: "Exclusive",
    metal: "Platinum",
    diamond: {
      carat: 2.04,
      cut: "Pear",
      color: "E",
      clarity: "VS2",
      shape: "Pear",
      certificateId: "BRL-2024-004",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 60.8,
      table: 59,
    },
    inStock: true,
    featured: true,
    new: false,
    tags: ["earrings", "drop", "pear", "platinum"],
  },
  {
    id: "prod-005",
    slug: "celeste-necklace",
    name: "Céleste Necklace",
    subtitle: "18k White Gold · VVS1 · Oval Pendant",
    description: "Named for the celestial sphere, the Céleste Necklace presents a breathtaking oval diamond suspended from an impossibly fine diamond-set chain. The oval cut maximizes carat weight while creating the appearance of elongated elegance. It rests at the décolletage and moves as you move, alive with light.",
    price: 9600,
    images: [
      "/images/products/necklace-1.jpg",
      "/images/products/necklace-1b.jpg",
      "/images/products/necklace-1c.jpg",
    ],
    category: "necklaces",
    badge: "Bestseller",
    metal: "18k White Gold",
    diamond: {
      carat: 1.25,
      cut: "Oval",
      color: "F",
      clarity: "VVS1",
      shape: "Oval",
      certificateId: "BRL-2024-005",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 62.5,
      table: 58,
    },
    inStock: true,
    featured: true,
    new: false,
    tags: ["necklace", "pendant", "oval", "white-gold"],
  },
  {
    id: "prod-006",
    slug: "tennis-classic",
    name: "Tennis Classic",
    subtitle: "18k White Gold · F Color · 5ct Total",
    description: "The tennis bracelet is one of the most coveted pieces in fine jewelry, and the Brillar Tennis Classic is its apex expression. A continuous line of 36 perfectly matched round brilliant diamonds — all F color, all VS clarity — flows around the wrist in a supple, four-prong channel that allows maximum light and movement.",
    price: 22000,
    images: [
      "/images/products/bracelet-1.jpg",
      "/images/products/bracelet-1b.jpg",
      "/images/products/bracelet-1c.jpg",
    ],
    category: "bracelets",
    badge: "Bestseller",
    metal: "18k White Gold",
    diamond: {
      carat: 5.04,
      cut: "Round Brilliant",
      color: "F",
      clarity: "VS2",
      shape: "Round",
      certificateId: "BRL-2024-006",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 61.8,
      table: 57,
    },
    inStock: true,
    featured: true,
    new: false,
    tags: ["bracelet", "tennis", "white-gold"],
  },
  {
    id: "prod-007",
    slug: "aurora-trilogy",
    name: "Aurora Trilogy",
    subtitle: "18k White Gold · VVS2 · Three Stone",
    description: "Three stones, three moments: your past, present, and future. The Aurora Trilogy frames a brilliant oval center stone between two perfectly matched trillion-cut diamonds. Together, they create a harmony of light that speaks of a love story that spans time.",
    price: 18600,
    images: [
      "/images/products/ring-4.jpg",
      "/images/products/ring-4b.jpg",
    ],
    category: "rings",
    badge: "New",
    metal: "18k White Gold",
    diamond: {
      carat: 2.10,
      cut: "Oval",
      color: "E",
      clarity: "VVS2",
      shape: "Oval",
      certificateId: "BRL-2024-007",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 63.1,
      table: 59,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: false,
    new: true,
    tags: ["trilogy", "three-stone", "oval", "engagement"],
  },
  {
    id: "prod-008",
    slug: "soleil-studs",
    name: "Soleil Diamond Studs",
    subtitle: "18k White Gold · VS1 · Round Brilliant · 2ct Total",
    description: "Every woman needs the perfect diamond studs — and perfection is exactly what the Soleil delivers. A matched pair of round brilliant diamonds, each precisely 1.00 carat, nestled in martini-style settings that hold them close and secure while maximizing their brilliance from every angle.",
    price: 11200,
    images: [
      "/images/products/earrings-2.jpg",
      "/images/products/earrings-2b.jpg",
    ],
    category: "earrings",
    badge: "Bestseller",
    metal: "18k White Gold",
    diamond: {
      carat: 2.02,
      cut: "Round Brilliant",
      color: "G",
      clarity: "VS1",
      shape: "Round",
      certificateId: "BRL-2024-008",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 61.6,
      table: 57,
    },
    inStock: true,
    featured: false,
    new: false,
    tags: ["studs", "earrings", "classic", "everyday"],
  },
  {
    id: "prod-009",
    slug: "bridal-eternelle-set",
    name: "Eternelle Bridal Set",
    subtitle: "18k White Gold · VVS1 · Matching Ring + Band",
    description: "Two rings, one love story. The Eternelle Bridal Set pairs our iconic solitaire engagement ring with a custom-fitted diamond wedding band that slots perfectly beneath it, presenting an uninterrupted sweep of brilliance. Together, they are greater than the sum of their parts.",
    price: 14800,
    images: [
      "/images/products/bridal-set-1.jpg",
      "/images/products/bridal-set-1b.jpg",
      "/images/products/bridal-set-1c.jpg",
    ],
    category: "bridal",
    badge: "Bridal",
    metal: "18k White Gold",
    diamond: {
      carat: 1.52,
      cut: "Round Brilliant",
      color: "F",
      clarity: "VVS1",
      shape: "Round",
      certificateId: "BRL-2024-009",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 61.3,
      table: 57,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: false,
    new: false,
    tags: ["bridal", "set", "engagement", "wedding"],
  },
  {
    id: "prod-010",
    slug: "marquise-solitaire",
    name: "Marquise Solitaire",
    subtitle: "18k Platinum · VS2 · Marquise Cut",
    description: "The marquise cut was created for royalty, and it shows. Its elongated form and pointed tips create the illusion of a longer, more slender finger, while its 58 facets deliver extraordinary fire. Set in platinum to complement the diamond's icy brilliance, this piece commands attention.",
    price: 13500,
    images: [
      "/images/products/ring-5.jpg",
      "/images/products/ring-5b.jpg",
    ],
    category: "rings",
    badge: "Exclusive",
    metal: "Platinum",
    diamond: {
      carat: 1.42,
      cut: "Marquise",
      color: "E",
      clarity: "VS2",
      shape: "Marquise",
      certificateId: "BRL-2024-010",
      polish: "Excellent",
      symmetry: "Very Good",
      fluorescence: "None",
      depth: 59.8,
      table: 56,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: false,
    new: false,
    tags: ["marquise", "solitaire", "platinum", "unique"],
  },
  {
    id: "prod-011",
    slug: "riviere-necklace",
    name: "Rivière Necklace",
    subtitle: "18k White Gold · D-F Color · 10ct Total",
    description: "A Rivière — a river of diamonds — is among the most prestigious jewelry styles in the world. Ours features 15 perfectly graduated round brilliant diamonds in an impeccable color range, suspended in the lightest possible open settings so each stone appears to float above the collarbone.",
    price: 38500,
    images: [
      "/images/products/necklace-2.jpg",
      "/images/products/necklace-2b.jpg",
    ],
    category: "necklaces",
    badge: "Exclusive",
    metal: "18k White Gold",
    diamond: {
      carat: 10.25,
      cut: "Round Brilliant",
      color: "E",
      clarity: "VVS2",
      shape: "Round",
      certificateId: "BRL-2024-011",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 61.5,
      table: 57,
    },
    inStock: true,
    featured: false,
    new: false,
    tags: ["rivière", "necklace", "statement", "luxury"],
  },
  {
    id: "prod-012",
    slug: "eternity-band",
    name: "Eternity Band",
    subtitle: "18k White Gold · VS1 · Full Eternity",
    description: "The full eternity band — diamonds running unbroken around the entire circumference — is the ultimate symbol of love without end. Each round brilliant diamond is individually set and calibrated to ensure perfect continuity of sparkle from every angle.",
    price: 6800,
    images: [
      "/images/products/ring-6.jpg",
      "/images/products/ring-6b.jpg",
    ],
    category: "bridal",
    badge: "Bridal",
    metal: "18k White Gold",
    diamond: {
      carat: 2.10,
      cut: "Round Brilliant",
      color: "G",
      clarity: "VS1",
      shape: "Round",
      certificateId: "BRL-2024-012",
      polish: "Excellent",
      symmetry: "Excellent",
      fluorescence: "None",
      depth: 62.0,
      table: 57,
    },
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    inStock: true,
    featured: false,
    new: false,
    tags: ["eternity", "band", "wedding", "anniversary"],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}
