import type { MetadataRoute } from "next";

// FORMERA is a fictional demo built for a WALKFLOW portfolio review, so the
// whole site stays out of search indexes regardless of where it's deployed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
