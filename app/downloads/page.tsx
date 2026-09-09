import type { Metadata } from "next";
import {
  Buildings,
  DownloadSimple,
  FilePdf,
  FileText,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { DOWNLOAD_CATEGORIES } from "@/data/content";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Product brochures, software documentation, hardware documentation and company information from Raster Images.",
  alternates: { canonical: "/downloads" },
};

const CATEGORY_ICONS: Record<string, { glyph: Icon; accent: string }> = {
  brochure: { glyph: FilePdf, accent: "accent-rose" },
  software: { glyph: FileText, accent: "accent-sky" },
  hardware: { glyph: Wrench, accent: "accent-amber" },
  company: { glyph: Buildings, accent: "accent-indigo" },
};

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Documentation & resources."
        lead="Brochures and documentation for our software and hardware — ask our team if you need something before it appears here."
        crumbs={[{ label: "Downloads" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Download categories">
        <div className="container-site grid gap-5 sm:grid-cols-2">
          {DOWNLOAD_CATEGORIES.map((category, i) => {
            const { glyph: IconCmp, accent } =
              CATEGORY_ICONS[category.icon] ??
              { glyph: FileText, accent: "accent-sky" };
            return (
              <Reveal as="div" key={category.id} className="h-full">
                <GlassCard className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`icon-badge ${accent} size-11 shrink-0 rounded-xl`}
                    >
                      <IconCmp size={22} weight="duotone" />
                    </span>
                    <div>
                      <h2 className="text-[1.05rem] font-semibold text-ink">
                        {category.name}
                      </h2>
                      <p className="mt-0.5 text-[0.82rem] text-mist">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex-1">
                    {category.items.length > 0 ? (
                      <ul className="divide-y divide-line-soft">
                        {category.items.map((item) => (
                          <li key={item.id}>
                            <a
                              href={item.file}
                              download
                              className="group flex items-center justify-between gap-3 py-3 transition-colors duration-300 hover:text-brand-soft"
                            >
                              <span className="text-[0.88rem] font-medium text-mist group-hover:text-brand-soft">
                                {item.title}
                              </span>
                              <span className="flex items-center gap-2 text-[0.75rem] text-faint">
                                {item.size}
                                <DownloadSimple
                                  size={16}
                                  aria-hidden="true"
                                  className="text-brand-bright"
                                />
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="rounded-xl border border-dashed border-line bg-white/[0.015] px-4 py-6 text-center text-[0.82rem] text-faint">
                        Documents will be added here soon.
                      </p>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection
        title="Need a brochure or document now?"
        lead="Tell us which product you are evaluating and our team will send you the latest material directly."
        secondaryLabel="Request Documents"
        secondaryHref="/contact"
      />
    </>
  );
}
