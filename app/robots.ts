import type { MetadataRoute } from "next";

// Required for `output: "export"`: metadata routes must be emitted at build time.
export const dynamic = "force-static";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
