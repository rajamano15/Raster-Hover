"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretDown, EnvelopeSimple, List, Phone, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { MAIN_NAV, SITE, UTILITY_NAV } from "@/data/site";
import { SOLUTION_CATEGORIES } from "@/data/solutions";
import { EASE } from "@/lib/motion";
import { useDemoModal } from "@/components/providers/DemoModalProvider";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const { openDemo } = useDemoModal();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fallback close (back/forward, in-page anchors); links close it on click so
  // the overlay never lingers while the next route is still loading.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => setMegaOpen(false), [pathname]);

  // Escape closes the mega menu and returns focus to its trigger.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Pointer intent: open right away, but forgive a cursor that clips the gap
  // between the trigger and the panel on its way down.
  const openMega = () => {
    window.clearTimeout(hoverTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  // Scroll lock while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The mega item owns the whole /solutions tree.
  const solutionsActive = pathname.startsWith("/solutions");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Utility bar ─────────────────────────────────────── */}
      <div
        className={`hidden overflow-hidden bg-bg/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          scrolled
            ? "max-h-0 border-b-0 opacity-0"
            : "max-h-10 border-b border-line-soft opacity-100"
        }`}
      >
        <div className="container-site flex h-9 items-center justify-between">
          <div className="flex items-center gap-5 text-[0.72rem] text-faint">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 transition-colors duration-300 hover:text-brand-soft"
            >
              <Phone size={12} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="flex items-center gap-1.5 transition-colors duration-300 hover:text-brand-soft"
            >
              <EnvelopeSimple size={13} aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
          <nav aria-label="Secondary">
            <ul className="flex items-center gap-6">
              {UTILITY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[0.72rem] tracking-wide transition-colors duration-300 hover:text-brand-soft ${
                      isActive(item.href) ? "text-brand-soft" : "text-faint"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ── Main bar ────────────────────────────────────────── */}
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-line bg-[rgba(5,9,8,0.78)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            aria-label="Raster Images — home"
            className="relative shrink-0"
          >
            <Image
              src="/logo.webp"
              alt="Raster Images"
              width={196}
              height={30}
              priority
              className="h-[22px] w-auto sm:h-[26px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {MAIN_NAV.map((item) => {
                const active = item.mega
                  ? solutionsActive
                  : isActive(item.href ?? "");
                const underline = active ? (
                  <motion.span
                    layoutId="nav-active-dot"
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
                    aria-hidden="true"
                  />
                ) : null;
                const cls = `relative block px-3.5 py-2 text-[0.82rem] font-medium tracking-wide transition-colors duration-300 xl:px-4 ${
                  active ? "text-brand-soft" : "text-mist hover:text-ink"
                }`;

                if (item.mega) {
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaSoon}
                    >
                      <button
                        ref={megaTriggerRef}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="solutions-mega"
                        onClick={() => setMegaOpen((v) => !v)}
                        className={`${cls} flex cursor-pointer items-center gap-1.5`}
                      >
                        {item.label}
                        <CaretDown
                          size={11}
                          weight="bold"
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${
                            megaOpen ? "rotate-180" : ""
                          }`}
                        />
                        {underline}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href ?? "/"}
                      aria-current={active ? "page" : undefined}
                      className={cls}
                    >
                      {item.label}
                      {underline}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="hidden min-[420px]:block">
              <Button type="button" size="sm" onClick={() => openDemo()}>
                Request a Demo
              </Button>
            </span>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-line-brand hover:text-brand-soft lg:hidden"
            >
              {menuOpen ? (
                <X size={20} weight="bold" />
              ) : (
                <List size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* ── Healthcare Solutions mega menu (desktop) ───────── */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              id="solutions-mega"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-[rgba(5,9,8,0.94)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl lg:block"
            >
              <div className="container-site py-8">
                <nav aria-label="Healthcare Solutions">
                  <ul className="grid grid-cols-4 gap-x-8 gap-y-2">
                    {SOLUTION_CATEGORIES.map((category) => (
                      <li key={category.slug}>
                        <p
                          className={`${category.accent} mb-3 border-b border-line-soft pb-2 text-[0.72rem] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase`}
                        >
                          {category.name}
                        </p>
                        <ul className="space-y-0.5">
                          {category.products.map((product) => {
                            const href = `/solutions/${category.slug}/${product.slug}`;
                            const current = pathname === href;
                            return (
                              <li key={product.slug}>
                                <Link
                                  href={href}
                                  onClick={() => setMegaOpen(false)}
                                  aria-current={current ? "page" : undefined}
                                  className={`${category.accent} block rounded-lg px-2.5 py-1.5 text-[0.83rem] transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] hover:text-[var(--accent)] ${
                                    current
                                      ? "bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] font-semibold text-[var(--accent)]"
                                      : "text-mist"
                                  }`}
                                >
                                  {product.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-[rgba(4,7,6,0.94)] backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              initial={reduce ? undefined : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="container-site flex min-h-full flex-col justify-between gap-8 py-8"
            >
              <ul className="flex flex-col">
                {MAIN_NAV.map((item) => (
                  <motion.li
                    key={item.href ?? item.label}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: EASE },
                      },
                    }}
                  >
                    {item.mega ? (
                      /* The 18 products would swamp the mobile sheet, so they
                         sit behind a disclosure, open when already inside
                         /solutions. */
                      <details
                        open={solutionsActive}
                        className="border-b border-line-soft"
                      >
                        <summary
                          className={`flex cursor-pointer list-none items-center justify-between py-4 text-[1.35rem] font-medium transition-colors duration-300 ${
                            solutionsActive ? "text-brand-soft" : "text-ink"
                          }`}
                        >
                          {item.label}
                          <CaretDown
                            size={16}
                            weight="bold"
                            aria-hidden="true"
                            className="shrink-0 text-faint"
                          />
                        </summary>
                        <div className="space-y-5 pb-5">
                          {SOLUTION_CATEGORIES.map((category) => (
                            <div key={category.slug}>
                              <p
                                className={`${category.accent} mb-1.5 text-[0.72rem] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase`}
                              >
                                {category.name}
                              </p>
                              <ul>
                                {category.products.map((product) => {
                                  const href = `/solutions/${category.slug}/${product.slug}`;
                                  return (
                                    <li key={product.slug}>
                                      <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        aria-current={
                                          pathname === href ? "page" : undefined
                                        }
                                        className={`block py-2 text-[0.98rem] transition-colors duration-300 ${
                                          pathname === href
                                            ? "font-semibold text-brand-soft"
                                            : "text-mist hover:text-ink"
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
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href ?? "/"}
                        onClick={() => setMenuOpen(false)}
                        aria-current={
                          isActive(item.href ?? "") ? "page" : undefined
                        }
                        className={`flex items-center justify-between border-b border-line-soft py-4 text-[1.35rem] font-medium transition-colors duration-300 ${
                          isActive(item.href ?? "")
                            ? "text-brand-soft"
                            : "text-ink hover:text-brand-soft"
                        }`}
                      >
                        {item.label}
                        {isActive(item.href ?? "") ? (
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(0,168,123,0.8)]"
                          />
                        ) : null}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="space-y-7"
              >
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {UTILITY_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`text-[0.85rem] transition-colors duration-300 hover:text-brand-soft ${
                          isActive(item.href) ? "text-brand-soft" : "text-mist"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => {
                      setMenuOpen(false);
                      openDemo();
                    }}
                    className="w-full"
                  >
                    Request a Demo
                  </Button>
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Get a Customized Product
                  </Button>
                </div>

                <div className="flex flex-col gap-2 pb-4 text-[0.85rem] text-faint">
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-2 transition-colors duration-300 hover:text-brand-soft"
                  >
                    <Phone size={14} aria-hidden="true" /> {SITE.phone}
                  </a>
                  <a
                    href={SITE.emailHref}
                    className="flex items-center gap-2 transition-colors duration-300 hover:text-brand-soft"
                  >
                    <EnvelopeSimple size={15} aria-hidden="true" /> {SITE.email}
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
