export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "understanding-the-four-cs",
    title: "The Four Cs of Diamond Excellence",
    subtitle: "What separates an ordinary stone from an extraordinary one",
    category: "Education",
    excerpt:
      "Cut, colour, clarity and carat weight — the internationally recognised language of diamond quality. Understanding them transforms the way you see every stone.",
    body: `
<p class="lead">When you hold a diamond to the light and watch it scatter fire across the room, you are witnessing physics and artistry in perfect union. The Four Cs — Cut, Colour, Clarity and Carat Weight — are the global standard for assessing diamond quality, established by the Gemological Institute of America (GIA) in the 1950s. Understanding them is the first step toward choosing a stone that will move you.</p>

<h2>Cut: The Most Critical C</h2>
<p>Of all the Four Cs, cut has the most direct influence on a diamond's beauty. It determines how light enters the stone, bounces between its facets, and exits as the spectral fire we find so captivating. A perfectly cut diamond creates three optical effects: brilliance (white light return), fire (spectral dispersion), and scintillation (the play of light and dark as the stone moves).</p>
<p>The GIA grades cut on a five-point scale: Excellent, Very Good, Good, Fair, and Poor. At Brillar, we source exclusively Excellent-cut stones, because we believe that if you are investing in a diamond, it should perform at its absolute peak.</p>

<blockquote>A poorly cut one-carat diamond will look lifeless beside a superbly cut half-carat. Cut is the soul of a diamond.</blockquote>

<h2>Colour: The Subtlety of White</h2>
<p>Diamond colour is measured on a scale from D (completely colourless) to Z (light yellow or brown). The difference between adjacent grades is nearly imperceptible to an untrained eye, yet it significantly impacts value. D, E, and F are considered colourless; G through J are near-colourless and represent the sweet spot of beauty and value.</p>
<p>Interestingly, colour is best evaluated face-down on a white background. Face-up, the brilliance of a well-cut diamond can mask subtle colour tones entirely.</p>

<h2>Clarity: Reading the Inner World</h2>
<p>Clarity refers to the presence of internal characteristics (inclusions) and surface features (blemishes) formed during the diamond's crystallisation over billions of years underground. The GIA clarity scale runs from Flawless (FL) — no inclusions or blemishes visible under 10× magnification — down to Included (I1, I2, I3).</p>
<p>Most inclusions are completely invisible to the naked eye. A VS1 or VS2 diamond typically looks identical to a Flawless stone without magnification, yet costs a fraction of the price. Choosing an eye-clean VS or SI stone and reinvesting the savings in a better cut is often the wiser choice.</p>

<h2>Carat: Weight, Not Size</h2>
<p>Carat is a unit of weight, not size. One carat equals 0.2 grams. The cut and shape of a diamond affect its face-up appearance dramatically — an Oval or Marquise shape, for example, appears noticeably larger than a Round of the same carat weight.</p>
<p>Price increases disproportionately at certain thresholds (0.50 ct, 1.00 ct, 2.00 ct), as stones at these "magic numbers" command a significant premium. A 0.95 ct stone, identical in every other way, may cost considerably less than a 1.00 ct stone.</p>

<h2>A Fifth C: Confidence</h2>
<p>Every Brillar diamond comes with a GIA certificate — an independent, objective analysis of your stone's Four Cs. This document is your guarantee that what you have been told matches reality. It is the foundation of trust between jeweller and client, and it is non-negotiable.</p>
    `,
    author: "Isabelle Fontaine",
    authorTitle: "Senior Gemologist, GIA Graduate",
    date: "2026-04-18",
    readTime: 6,
    image: "/images/editorial/four-cs.jpg",
    featured: true,
    tags: ["education", "diamonds", "GIA"],
  },
  {
    slug: "modern-engagement-ring-2026",
    title: "The Modern Engagement Ring",
    subtitle: "How proposals — and the rings that mark them — are evolving in 2026",
    category: "Bridal",
    excerpt:
      "Brides of 2026 are choosing with unprecedented confidence. Oval cuts are ascendant, coloured diamond accents are having a moment, and the old rules no longer apply.",
    body: `
<p class="lead">The engagement ring has always been a mirror of its era. In the 1920s, Art Deco geometric precision. In the 1950s, the solitaire's democratic ascent. In 2026, we are living through a quiet revolution — one defined by personal meaning over inherited convention.</p>

<h2>The Oval's Quiet Dominance</h2>
<p>The Oval cut has overtaken the Round Brilliant as the shape most requested at our atelier consultations. Its appeal is clear: the elongated silhouette flatters the finger, makes a diamond appear larger than its carat weight suggests, and carries a sense of romantic softness absent from more geometric cuts.</p>
<p>Paired with a thin pavé band in yellow or rose gold, an oval solitaire reads simultaneously vintage and very now.</p>

<blockquote>We had 47 bespoke engagement ring consultations in the first quarter of 2026. Forty of them involved an oval diamond. Something has shifted.</blockquote>

<h2>Yellow Gold's Return</h2>
<p>After decades of white gold and platinum dominance, yellow gold is back — and it is here to stay. The warmth of 18-karat yellow gold flatters all skin tones and adds character to a stone, particularly warm-toned diamonds in the G-to-I colour range. Choosing a slightly warmer colour and reinvesting in cut quality, set in yellow gold, is one of the best-kept secrets in fine jewellery.</p>

<h2>East-West Settings</h2>
<p>An "East-West" setting orients an oval, marquise, or emerald-cut diamond horizontally across the finger rather than vertically. It is unexpected, architectural, and modern — a quiet way to announce that you are paying attention to design.</p>

<h2>Meaningful Personalisation</h2>
<p>Engravings, birthstone accents, and hidden diamonds on the interior shank have become standard requests. The ring is no longer purely outward-facing display; it is a private language between two people. Several of our clients have incorporated a small diamond on the ring's inner surface — invisible to the world, known only to the wearer.</p>

<h2>A Note on Budget</h2>
<p>The most important shift we see is clients making more deliberate, informed decisions. They arrive having researched the Four Cs, knowing their preferred cut grade, understanding what trade-offs they are willing to make. A client who knows they want an Excellent cut and an eye-clean clarity will never be disappointed by their stone. That knowledge is the most valuable thing we can offer.</p>
    `,
    author: "Camille Bertrand",
    authorTitle: "Head of Bridal Design",
    date: "2026-03-28",
    readTime: 5,
    image: "/images/editorial/engagement.jpg",
    featured: true,
    tags: ["bridal", "engagement", "trends"],
  },
  {
    slug: "inside-the-brillar-atelier",
    title: "Inside the Brillar Atelier",
    subtitle: "Where every piece begins as a drawing and ends as a legacy",
    category: "Atelier",
    excerpt:
      "Step behind the curtain of our New York atelier — the tools, the craftsmen, the silence, and the extraordinary precision that transforms raw material into lasting beauty.",
    body: `
<p class="lead">The atelier is on the fourth floor of a building on East 47th Street. From the outside, there is no sign. You know it is there because someone you trust has told you. Inside, the light is brilliant and cool — diamond-sorting light — and the only sounds are the soft percussion of graver against metal and the occasional hiss of a polishing wheel.</p>

<h2>The Bench</h2>
<p>Every Brillar jeweller works at a bench worn smooth by decades of use. The bench pin — a small wooden protrusion — holds the work piece steady as fine files, gravers, and burnishers shape metal into something precise and beautiful. The tools look almost surgical. In a sense, they are.</p>
<p>Each jeweller specialises. Our stone setter, Marcus, has been setting diamonds for twenty-three years. His hands work at a scale most people cannot perceive: the pavé stones he sets measure 1.2 millimetres in diameter. He places approximately forty of them per hour, each one sitting flush, tilted at the exact same angle, catching light identically.</p>

<blockquote>I do not think about the finished ring when I am setting. I think about this stone, this moment, this angle. Everything else is distraction.</blockquote>

<h2>The Casting Room</h2>
<p>A ring begins as a wax model — hand-carved or CAD-printed, depending on the design's complexity. The wax is invested in a plaster cylinder, which is then heated until the wax burns away, leaving a perfect cavity. Molten gold or platinum is centrifugally forced into this cavity, replicating every detail of the original model.</p>
<p>What emerges from the flask is rough — sprue attached, surface grainy, proportions approximate. The next eight to twelve hours of finishing will transform it entirely.</p>

<h2>The Diamond Grading Suite</h2>
<p>Every stone that enters the atelier is evaluated under a stereo microscope before it touches a setting. We verify the GIA certificate against the physical stone — checking the laser inscription on the girdle, confirming the proportions, assessing cut quality under high magnification. A stone that does not match its paper does not enter the inventory.</p>
<p>This process takes time. It is never skipped.</p>

<h2>The Final Inspection</h2>
<p>Before a piece is packaged, it spends thirty minutes under the eye of our quality director. She examines every prong, every stone, every millimetre of surface finish. The inspection sheet — handwritten — travels with the piece. It is not theater. It is the last line of defence against imperfection.</p>
    `,
    author: "Thomas Marchetti",
    authorTitle: "Master Jeweller, Atelier Director",
    date: "2026-02-14",
    readTime: 6,
    image: "/images/editorial/atelier.jpg",
    featured: false,
    tags: ["atelier", "craftsmanship", "behind-the-scenes"],
  },
  {
    slug: "styling-diamonds-day-to-evening",
    title: "Styling Diamonds: Day to Evening",
    subtitle: "A practical guide to wearing fine jewellery without second-guessing yourself",
    category: "Style",
    excerpt:
      "The old rules — diamonds only after dark, no mixing metals, never stack your engagement ring — are finished. Here is how to wear what you love, whenever you choose.",
    body: `
<p class="lead">The received wisdom of fine jewellery styling dates from an era when diamonds were reserved for grand occasions and the rest of life was left unadorned. That era is over. The most stylish people wear their finest pieces constantly — not to show off, but because they love them too much to leave them in a drawer.</p>

<h2>The Daytime Diamond</h2>
<p>A diamond stud earring is the easiest piece to wear daily. It transitions effortlessly from morning coffee to boardroom to dinner without a moment's thought. Our Soleil Diamond Studs, set with round brilliants in white gold, disappear into any outfit while adding a quiet luminosity that is hard to place but impossible to ignore.</p>
<p>A tennis bracelet, similarly, requires no contextualisation. It sits on the wrist and catches light throughout the day, drawing attention to your hands in the best possible way.</p>

<blockquote>A woman who wears her diamonds every day has understood something that a woman who keeps them locked away has not yet learned: they exist to be worn.</blockquote>

<h2>Stacking Intelligently</h2>
<p>Stacking rings is having a permanent cultural moment, and for good reason — it allows you to build a story on your hand rather than make a single statement. The key is to find a common thread: one metal family, one stone type, or one structural element (all bands, all pavé, all thin). Within that constraint, contrast is welcome.</p>
<p>Our Rosé Pavé Band was designed specifically to be worn with an engagement ring or solitaire, sitting flush against its neighbour, adding shimmer without competing for attention.</p>

<h2>Mixing Metals</h2>
<p>The prohibition on mixing metals has entirely dissolved. Yellow gold and white gold together create warmth and depth. The key is intentionality — a bracelet and earring in different metals looks considered; a scattered mismatch does not. Choose your anchor piece and build around it.</p>

<h2>Evening Transformation</h2>
<p>The transition from day to evening needs only one move: add one significant piece. If you have been wearing studs all day, change to drop earrings. If you have been wearing a simple solitaire, add a diamond necklace. The rest of your wardrobe can remain entirely as it was. One statement piece recalibrates the entire look.</p>
    `,
    author: "Amélie Rousseau",
    authorTitle: "Editorial Director",
    date: "2026-01-30",
    readTime: 4,
    image: "/images/editorial/styling.jpg",
    featured: false,
    tags: ["style", "how-to", "everyday"],
  },
  {
    slug: "diamond-care-and-storage",
    title: "Diamond Care & Storage",
    subtitle: "How to protect your investment and keep your pieces performing brilliantly",
    category: "Care",
    excerpt:
      "Diamonds are the hardest natural substance on earth, but they still require care. Here is everything you need to know to keep your pieces looking as they did on day one.",
    body: `
<p class="lead">Diamonds are virtually indestructible in ordinary wear. They will not scratch from everyday contact, will not fade, and will never corrode. But they are not invincible — and the settings that hold them require thoughtful care. A little attention goes a long way.</p>

<h2>Cleaning at Home</h2>
<p>The single most effective home cleaning method: warm water, a drop of dish soap, and a soft toothbrush. Soak the piece for two to three minutes, then gently brush the underside of the setting — the area most prone to grease and product build-up — and rinse under running water. Dry with a lint-free cloth.</p>
<p>Do this monthly. The difference in brilliance between a clean diamond and a slightly grimy one is substantial. Lotion, soap film, and natural skin oils coat the pavilion facets and dramatically reduce light return.</p>

<blockquote>A dirty diamond is a dull diamond. Cleaning costs two minutes and nothing else.</blockquote>

<h2>What to Avoid</h2>
<p>Chlorine bleach is the most dangerous common household substance for fine jewellery. It can weaken gold alloys and damage certain gemstones over time. Remove your rings before swimming in chlorinated pools. Similarly, hand sanitiser, while harmless to the stone itself, creates a film that dulls brilliance rapidly — rinse your rings after frequent use.</p>
<p>Ultrasonic cleaners are effective but require caution. Do not use them on pieces with fracture-filled diamonds, significant inclusions, or delicate pavé settings where the vibration may loosen small stones.</p>

<h2>Storage</h2>
<p>Store pieces individually — diamonds scratch other diamonds and softer gemstones. Each piece should have its own pouch or compartment. Keep jewellery away from direct sunlight and heat, which can affect certain stones and some gold alloys over time.</p>
<p>The Brillar box is designed for exactly this purpose: individual compartments lined with anti-tarnish fabric. Use it.</p>

<h2>Professional Maintenance</h2>
<p>Bring your fine jewellery to a qualified jeweller annually for a prong inspection. Prongs wear over years of daily use and can eventually allow a stone to loosen. A prong re-tip takes thirty minutes and costs very little; losing a diamond to a worn prong is a much more expensive lesson.</p>
    `,
    author: "Dr. Sophie Laurent",
    authorTitle: "Gemological Consultant",
    date: "2025-12-10",
    readTime: 4,
    image: "/images/editorial/care.jpg",
    featured: false,
    tags: ["care", "maintenance", "education"],
  },
  {
    slug: "the-language-of-gemstones",
    title: "The Language of Gemstones",
    subtitle: "What the stones we choose say about us — and about the people we give them to",
    category: "Education",
    excerpt:
      "Every gemstone carries centuries of meaning. From the diamond's associations with eternal commitment to the sapphire's royal connotations, understanding gem symbolism enriches every choice.",
    body: `
<p class="lead">Long before the Gemological Institute of America developed its grading standards, before cut quality could be expressed in percentages, human beings were imbuing stones with meaning. The earliest gemstone symbolism we can trace dates to ancient Mesopotamia, roughly 4,000 years ago. The vocabulary has evolved — but the impulse to read stories into extraordinary objects has never left us.</p>

<h2>The Diamond: Beyond Engagement</h2>
<p>The diamond's association with romantic commitment is surprisingly recent — a product of DeBeers' mid-20th century marketing, combined with genuine scarcity and physical hardness. But diamonds carried meaning long before engagement rings. Ancient Romans believed diamonds were splinters of falling stars; the Hindus used them as eyes in devotional statues; medieval Europeans thought diamonds were protective against poison.</p>
<p>The hardness — the fact that nothing can scratch a diamond except another diamond — makes it a genuinely apt symbol for unbreakable commitment. The marketing landed on something true.</p>

<blockquote>A diamond is a compressed message: I found the hardest thing on earth, and I am giving it to you.</blockquote>

<h2>Sapphire: Wisdom and Fidelity</h2>
<p>The sapphire's deep blue has long been associated with royalty, wisdom, and celestial authority. Medieval bishops wore sapphire rings as symbols of their connection to heaven. The most famous sapphire engagement ring in history — Princess Diana's 12-carat oval, now worn by Catherine, Princess of Wales — reignited the stone's romantic associations for a contemporary audience.</p>
<p>Sapphires come in every colour but red (those are rubies). Padparadscha sapphires, in a rare salmon-pink, are among the most sought-after and valuable gems in the world.</p>

<h2>Emerald: Rebirth and Hope</h2>
<p>The emerald's vivid green has been linked to Venus, the goddess of love, and to spring's renewal across multiple cultures. Cleopatra famously wore emeralds and considered the mines she controlled a personal treasure. The stone's inclusions — present in virtually every natural emerald and called a "jardin" (garden) — are considered part of its character, not a flaw.</p>

<h2>Pearl: Purity and the Sea</h2>
<p>The only gem produced by a living creature, the pearl occupies a unique position in the jewellery canon. Its origin — irritant transformed into beauty through patient accretion — has made it a symbol of wisdom gained through experience. In Japanese tradition, a woman's pearl necklace is among the most significant gifts a mother can give a daughter.</p>
    `,
    author: "Isabelle Fontaine",
    authorTitle: "Senior Gemologist, GIA Graduate",
    date: "2025-11-22",
    readTime: 5,
    image: "/images/editorial/gemstones.jpg",
    featured: false,
    tags: ["education", "symbolism", "gemstones"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.featured);
}
