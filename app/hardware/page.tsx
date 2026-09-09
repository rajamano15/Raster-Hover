import type { Metadata } from "next";
import { Info } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import HardwareGrid from "@/components/products/HardwareGrid";

export const metadata: Metadata = {
  title: "Hardware Products",
  description:
    "Professional hardware for healthcare and digital workflows — cameras, live production switchers, converters, storage, monitoring, streaming, servers and more.",
  alternates: { canonical: "/hardware" },
};

export default function HardwarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hardware Products"
        title="Professional hardware for healthcare & digital workflows."
        lead="High-performance hardware and production technology for demanding professional environments."
        crumbs={[{ label: "Hardware Products" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Hardware catalog">
        <div className="container-site space-y-8">
          <Reveal>
            <p className="glass-inset flex max-w-3xl items-start gap-3 px-5 py-4 text-[0.85rem] leading-relaxed text-mist">
              <Info
                size={18}
                weight="duotone"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand-bright"
              />
              This is an enterprise catalogue, not a store — every deployment is
              configured for your environment. Request a demo or a customised
              product and our team will guide you to the right configuration.
            </p>
          </Reveal>
          <HardwareGrid />
        </div>
      </section>

      <CTASection
        title="Need a customised hardware configuration?"
        lead="Tell us about your environment — our team will recommend and configure the right hardware for your workflows."
        solution="Hardware Products"
        secondaryLabel="Get a Customized Product"
        secondaryHref="/contact"
      />
    </>
  );
}
