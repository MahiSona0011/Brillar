import type { MetadataRoute } from "next";
import { PRODUCTS, COLLECTIONS } from "@/lib/data";
import { ARTICLES } from "@/lib/editorial";

const BASE = "https://brillarjewels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/collections`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/editorial`,   lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/custom`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quiz`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/appointments`,lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/try-on`,      lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = COLLECTIONS.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE}/editorial/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...articleRoutes];
}
