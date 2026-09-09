import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
