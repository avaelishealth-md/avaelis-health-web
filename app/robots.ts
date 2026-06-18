import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.avaelishealth.com.au";

export default function robots(): MetadataRoute.Robots {
  // Keep preview builds and local dev out of search; only production is crawlable.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private + non-indexable surfaces (mirrors the middleware bypass list).
      disallow: ["/admin", "/auth", "/api", "/talk-summary"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
