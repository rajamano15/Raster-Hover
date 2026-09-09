import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CaretRight, Check } from "@phosphor-icons/react/dist/ssr";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import ProductSidebar from "@/components/solutions/ProductSidebar";
import { ALL_PRODUCTS, getProduct } from "@/data/solutions";

/**
 * The full set of routes is known at build time, so any other param is a real
 * 404 — not something to render on demand. Without this, an unknown slug
 * streams the loading shell (status 200) before `notFound()` can run, which
 * search engines read as a soft 404.
 */
export const dynamicParams = false;

type Params = { slug: string; product: string };

export function generateStaticParams(): Params[] {
  return ALL_PRODUCTS.map(({ category, product }) => ({
    slug: category.slug,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  const found = getProduct(slug, productSlug);
  if (!found) return {};
  const { category, product } = found;
  return {
    title: product.page?.title ?? product.name,
    description: product.blurb,
    alternates: { canonical: `/solutions/${category.slug}/${product.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, product: productSlug } = await params;
  const found = getProduct(slug, productSlug);
  if (!found) notFound();
  const { category, product } = found;
  const page = product.page;

  // Sibling products within the same category, for the footer rail.
  const siblings = category.products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="section pt-32 md:pt-40" aria-labelledby="product-title">
        <div className="container-site">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            {/* The index and category pages were removed in favour of the
                navbar mega menu, so those two crumbs are labels, not links —
                a breadcrumb must never point at a 404. */}
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.76rem] text-faint">
              <li>Healthcare Solutions</li>
              <li aria-hidden="true">
                <CaretRight size={11} />
              </li>
              <li>{category.name}</li>
              <li aria-hidden="true">
                <CaretRight size={11} />
              </li>
              <li className="text-mist">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-12">
            <ProductSidebar
              categorySlug={category.slug}
              productSlug={product.slug}
            />

            <div className="min-w-0">
              {/* The content sits on its own surface, matching the sidebar
                  card beside it. `.glass` also opts it into the cursor glow,
                  which is now card-only. */}
              <article className="glass glass-edge p-6 sm:p-8 lg:p-10">
              <Reveal>
                <p
                  className={`${category.accent} text-[0.76rem] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase`}
                >
                  {category.name}
                </p>
                <h1
                  id="product-title"
                  className="mt-3 text-3xl font-semibold text-balance text-ink sm:text-4xl"
                >
                  {page?.title ?? product.name}
                </h1>
                {page ? null : (
                  <p className="lead mt-5 max-w-2xl">{product.blurb}</p>
                )}
              </Reveal>

              {/* ── Body copy ── */}
              {page?.intro.length ? (
                <Reveal>
                  <div className="mt-7 space-y-5">
                    {page.intro.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[0.95rem] leading-[1.85] text-mist"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {/* ── Schematic diagram ── */}
              {page?.diagram ? (
                <Reveal className="mt-12">
                  <h2 className="title-card text-ink">Schematic Diagram</h2>
                  <GlassCard className="mt-4 overflow-hidden p-4 sm:p-6">
                    <Image
                      src={page.diagram.src}
                      alt={page.diagram.alt}
                      width={1200}
                      height={640}
                      className="h-auto w-full rounded-lg bg-white/[0.96] p-3"
                    />
                    {page.diagram.caption ? (
                      <p className="mt-3 text-[0.8rem] text-faint">
                        {page.diagram.caption}
                      </p>
                    ) : null}
                  </GlassCard>
                </Reveal>
              ) : null}

              {/* ── Benefits ── */}
              {page?.benefits?.items.length ? (
                <Reveal className="mt-12">
                  <h2 className="title-card text-ink">
                    {page.benefits.heading}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {page.benefits.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className={`${category.accent} mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)]`}
                        >
                          <Check size={12} weight="bold" />
                        </span>
                        <span className="text-[0.92rem] leading-relaxed text-mist">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {/* ── Salient features — two columns, as on the reference ── */}
              {page?.features?.items.length ? (
                <Reveal className="mt-12">
                  <h2 className="title-card text-ink">
                    {page.features.heading}
                  </h2>
                  {/* Multi-column, not a 2-col grid: the list must read down
                      the first column and then the second, and columns avoid
                      the ragged row-height gaps a grid produces. */}
                  <ul className="mt-5 gap-x-10 sm:columns-2">
                    {page.features.items.map((item) => (
                      <li
                        key={item}
                        className="mb-3 flex break-inside-avoid gap-2.5"
                      >
                        <span
                          aria-hidden="true"
                          className={`${category.accent} mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]`}
                        />
                        <span className="text-[0.9rem] leading-relaxed text-mist">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {/* External product page, where one exists on the current site. */}
              {product.href ? (
                <Reveal className="mt-12">
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-brand-soft transition-colors duration-300 hover:text-brand-bright"
                  >
                    View {product.name} on raster.in
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </a>
                </Reveal>
              ) : null}

              </article>

              {/* ── Sibling products — outside the card: related links, not
                  part of this product's content. ── */}
              {siblings.length ? (
                <Reveal className="mt-8">
                  <div>
                    <h2 className="text-[0.78rem] font-semibold tracking-[0.18em] text-faint uppercase">
                      More in {category.shortName}
                    </h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {siblings.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/solutions/${category.slug}/${s.slug}`}
                            className="glass-inset group block px-4 py-3 transition-all duration-300 hover:border-line-brand"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-[0.88rem] font-semibold text-ink">
                                {s.name}
                              </span>
                              <CaretRight
                                size={13}
                                weight="bold"
                                aria-hidden="true"
                                className="shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-0.5"
                              />
                            </span>
                            <span className="mt-1 block text-[0.78rem] leading-relaxed text-faint">
                              {s.blurb}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`See ${product.name} in action`}
        lead="Request a personalised demonstration, or ask us how this product can be customised for your organisation."
        solution={product.name}
      />
    </>
  );
}
