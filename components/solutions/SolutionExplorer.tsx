"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CaretRight,
  Hospital,
  MonitorPlay,
  PlugsConnected,
  Scan,
  type Icon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { SOLUTION_CATEGORIES } from "@/data/solutions";
import ProductIcon from "@/components/solutions/ProductIcon";
import { EASE } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

const ICONS: Record<string, Icon> = {
  scan: Scan,
  hospital: Hospital,
  plugs: PlugsConnected,
  "monitor-play": MonitorPlay,
};

export default function SolutionExplorer() {
  const [active, setActive] = useState(SOLUTION_CATEGORIES[0].slug);
  const reduce = useReducedMotion();
  const { openDemo } = useDemoModal();
  const category =
    SOLUTION_CATEGORIES.find((c) => c.slug === active) ?? SOLUTION_CATEGORIES[0];
  const ActiveIcon = ICONS[category.icon];

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.65fr)] lg:gap-7">
      {/* ── Category rail ── */}
      <div
        role="tablist"
        aria-label="Solution categories"
        aria-orientation="vertical"
        className="scrollbar-none -mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {SOLUTION_CATEGORIES.map((c, i) => {
          const CIcon = ICONS[c.icon];
          const isActive = c.slug === active;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              id={`sol-tab-${c.slug}`}
              aria-selected={isActive}
              aria-controls="sol-panel"
              onClick={() => setActive(c.slug)}
              className={`rounded-card relative shrink-0 snap-start cursor-pointer border bg-white/[0.03] text-left backdrop-blur-md transition-colors duration-300 lg:shrink ${
                isActive
                  ? "border-line-brand"
                  : "border-line hover:border-white/15"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="sol-active-bg"
                  transition={{ duration: 0.5, ease: EASE }}
                  aria-hidden="true"
                  className="rounded-card absolute inset-0 bg-gradient-to-br from-brand/12 via-transparent to-transparent shadow-[0_0_36px_-12px_rgba(0,168,123,0.45)]"
                />
              ) : null}
              <span className="relative flex items-center gap-3.5 px-4 py-3.5 lg:px-5 lg:py-4">
                <span
                  aria-hidden="true"
                  className={`icon-badge ${c.accent} size-10 shrink-0 rounded-xl ${
                    isActive ? "icon-badge-glow" : "opacity-70"
                  }`}
                >
                  <CIcon size={20} weight="duotone" />
                </span>
                <span className="pr-2">
                  <span
                    className={`block text-[0.92rem] font-semibold whitespace-nowrap transition-colors duration-300 lg:whitespace-normal ${
                      isActive ? "text-ink" : "text-mist"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="mt-0.5 hidden text-[0.76rem] text-faint lg:block">
                    {c.products.length} products
                  </span>
                </span>
                <CaretRight
                  size={14}
                  aria-hidden="true"
                  className={`ml-auto hidden shrink-0 transition-all duration-300 lg:block ${
                    isActive
                      ? `translate-x-0 ${c.accent} text-[var(--accent)]`
                      : "-translate-x-1 text-faint"
                  }`}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active category panel ── */}
      <div
        id="sol-panel"
        role="tabpanel"
        aria-labelledby={`sol-tab-${category.slug}`}
        className="glass glass-edge relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(480px_220px_at_85%_-40px,rgba(0,168,123,0.1),transparent_66%)]"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={category.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative flex h-full flex-col gap-6 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className={`icon-badge icon-badge-glow ${category.accent} size-12 shrink-0 rounded-2xl`}
              >
                <ActiveIcon size={24} weight="duotone" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-1 text-[0.92rem] leading-relaxed text-mist">
                  {category.description}
                </p>
              </div>
            </div>

            <motion.ul
              initial="hidden"
              animate="idle"
              variants={{
                hidden: {},
                idle: { transition: { staggerChildren: 0.05 } },
              }}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {category.products.map((p) => {
                const inner = (
                  <>
                    <ProductIcon icon={p.icon} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[0.9rem] font-semibold text-ink">
                          {p.name}
                        </span>
                        <CaretRight
                          size={13}
                          weight="bold"
                          aria-hidden="true"
                          className="shrink-0 text-brand-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </span>
                      <span className="mt-1 block text-[0.78rem] leading-relaxed text-faint">
                        {p.blurb}
                      </span>
                    </span>
                  </>
                );
                return (
                  // `hover` here is what plays each glyph's gesture — hovering
                  // anywhere on the row drives the icon, not just the badge.
                  <motion.li
                    key={p.name}
                    variants={{ hidden: {}, idle: {} }}
                    whileHover="hover"
                  >
                    <Link
                      href={`/solutions/${category.slug}/${p.slug}`}
                      className="glass-inset group flex cursor-pointer items-start gap-3 px-4 py-3 transition-all duration-300 hover:border-line-brand hover:bg-brand/[0.05]"
                    >
                      {inner}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-line-soft pt-5 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  openDemo(
                    category.slug === "hospital-management"
                      ? "Hospital Management"
                      : undefined,
                  )
                }
                className="w-full sm:w-auto"
              >
                Request a Demo
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
