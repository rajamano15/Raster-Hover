import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from a sub-path (`/<repo>/`). The deploy
 * workflow sets NEXT_PUBLIC_BASE_PATH to that sub-path; local dev leaves it
 * empty so the site runs at `/` as usual.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Emit a fully static site to `out/` for GitHub Pages.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Pages has no image optimizer. The custom loader serves source files as-is
  // and prepends the base path, which `next/image` skips for unoptimized images.
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  // Emit `about/index.html` instead of `about.html` so plain static hosting
  // resolves `/about/` without rewrite rules.
  trailingSlash: true,

  experimental: {
    /**
     * Rewrites barrel imports (`import { Phone } from "@phosphor-icons/react"`)
     * into direct per-icon module imports. Without this, every route pulls the
     * whole ~1,500-icon barrel through the dev compiler: 13.6k modules and a
     * 1.5–5.5s compile the first time each route is visited. With it, routes
     * compile ~1.6k modules in 0.4–1.4s. Production output is unchanged
     * (the prod build already tree-shakes the barrel).
     */
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@phosphor-icons/react/dist/ssr",
      "framer-motion",
    ],
  },
};

export default nextConfig;
