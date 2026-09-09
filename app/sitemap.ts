import type { MetadataRoute } from "next";

// Required for `output: "export"`: metadata routes must be emitted at build time.
export const dynamic = "force-static";
import { SITE } from "@/data/site";
import { ALL_PRODUCTS } from "@/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "",
    "/about",
    "/hardware",
    "/partners",
    "/contact",
    "/request-demo",
    "/news-events",
    "/clients",
    "/careers",
    "/team",
    "/downloads",
  ];

  return [
    ...pages.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...ALL_PRODUCTS.map(({ category, product }) => ({
      url: `${SITE.url}/solutions/${category.slug}/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
