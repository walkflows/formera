import type { MetadataRoute } from "next";
import { properties } from "@/lib/data/properties";
import { guides } from "@/lib/data/guides";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://formera.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/properties",
    "/saved",
    "/about",
    "/guides",
    "/contact",
  ];

  const propertyRoutes = properties.map((p) => `/properties/${p.slug}`);
  const guideRoutes = guides.map((g) => `/guides/${g.slug}`);

  return [...staticRoutes, ...propertyRoutes, ...guideRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
