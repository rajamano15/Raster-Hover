import type { ImageLoaderProps } from "next/image";

/**
 * Image loader for the static GitHub Pages export.
 *
 * There is no image optimizer on Pages, so every image is served as-is. The
 * only job here is to prefix root-relative `/public` paths with the base path
 * (`/<repo>/`), which `next/image` does not do on its own for unoptimized
 * images. Absolute URLs and data URIs pass through untouched.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: ImageLoaderProps): string {
  if (src.startsWith("/") && !src.startsWith("//")) return `${BASE_PATH}${src}`;
  return src;
}
