/**
 * Prefixes a `/public` path with the configured base path.
 *
 * `next/image` and `next/link` apply `basePath` automatically, but plain
 * `<img>`, `<video>` and `motion.img` tags do not. Route every raw asset URL
 * through this helper so the site works both at `/` (local dev) and under
 * `/<repo>/` on GitHub Pages.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
