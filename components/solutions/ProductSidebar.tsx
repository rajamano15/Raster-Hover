import Link from "next/link";
import { SOLUTION_CATEGORIES } from "@/data/solutions";

type Props = {
  /** Slug of the category whose product is currently open. */
  categorySlug: string;
  /** Slug of the open product. */
  productSlug: string;
};

/**
 * Grouped product rail — every category heading followed by its products, with
 * the open one marked. Server-rendered: the active item is known from the route
 * params, so this needs no client JS.
 *
 * On mobile it collapses into a `<details>` disclosure rather than pushing the
 * article a full screen down.
 */
export default function ProductSidebar({ categorySlug, productSlug }: Props) {
  const nav = (
    <nav aria-label="Healthcare Solutions products">
      {SOLUTION_CATEGORIES.map((category) => (
        <div key={category.slug} className="mb-6 last:mb-0">
          {/* Heading only — category pages no longer exist. */}
          <p
            className={`${category.accent} px-4 py-2 text-[0.82rem] font-semibold tracking-wide text-[var(--accent)]`}
          >
            {category.name}
          </p>
          <ul className="mt-1">
            {category.products.map((product) => {
              const isActive =
                category.slug === categorySlug && product.slug === productSlug;
              return (
                <li key={product.slug}>
                  <Link
                    href={`/solutions/${category.slug}/${product.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`${category.accent} block border-l-2 px-4 py-2.5 text-[0.88rem] transition-all duration-300 ${
                      isActive
                        ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] font-semibold text-ink"
                        : "border-transparent text-mist hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:bg-white/[0.02] hover:text-ink"
                    }`}
                  >
                    {product.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile: collapsed by default so the article stays at the top. */}
      <details className="glass mb-8 p-2 lg:hidden">
        <summary className="cursor-pointer list-none px-3 py-2 text-[0.85rem] font-semibold text-ink">
          Browse all products
        </summary>
        <div className="mt-3 border-t border-line-soft pt-3">{nav}</div>
      </details>

      {/* Desktop: full rail beside the article.

          Not sticky and not height-capped: the complete list of 22 rows is
          around 1000px tall, so pinning it would put the last categories out
          of reach on any viewport shorter than ~1110px. It scrolls with the
          page instead, and every product is visible. */}
      <aside className="hidden lg:block lg:self-start">
        <div className="glass p-3">{nav}</div>
      </aside>
    </>
  );
}
