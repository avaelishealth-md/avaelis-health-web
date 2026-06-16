import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://avaelishealth.com.au";

export default function robots(): MetadataRoute.Robots {
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
