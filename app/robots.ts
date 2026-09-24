import type { MetadataRoute } from "next";

// Kept out of search indexes while the site is unpublished.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
