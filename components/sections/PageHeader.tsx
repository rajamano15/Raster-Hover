import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

export type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
};

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  align = "left",
}: PageHeaderProps) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-lines absolute inset-0" />
      </div>
      <div
        className={`container-site flex flex-col gap-5 ${
          centered ? "items-center text-center" : "items-start"
        }`}
      >
        {crumbs && crumbs.length > 0 ? (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.76rem] text-faint">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 hover:text-brand-soft"
                  >
                    Home
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <CaretRight size={10} aria-hidden="true" />
                    {c.href && i < crumbs.length - 1 ? (
                      <Link
                        href={c.href}
                        className="transition-colors duration-300 hover:text-brand-soft"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-mist">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        <Reveal
          className={`flex max-w-3xl flex-col gap-5 ${
            centered ? "items-center" : "items-start"
          }`}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-page text-balance">{title}</h1>
          {lead ? <p className="lead text-pretty">{lead}</p> : null}
        </Reveal>

        {children ? <Reveal>{children}</Reveal> : null}
      </div>
    </section>
  );
}
