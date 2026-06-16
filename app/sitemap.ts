import type { MetadataRoute } from "next";
import { listPublishedSlugs } from "@/lib/posts";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://avaelishealth.com.au";

// Posts come from Supabase, so render fresh rather than at build time.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const slugs = await listPublishedSlugs();
  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE}/writing/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
