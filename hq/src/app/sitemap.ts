import type { MetadataRoute } from "next";

import { primaryNav, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return primaryNav.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.6,
  }));
}
