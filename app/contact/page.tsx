import type { Metadata } from "next";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import OfficeCard from "@/components/ui/OfficeCard";
import DemoCTA from "@/components/ui/DemoCTA";
import ContactForm from "@/components/forms/ContactForm";
import { MAP_EMBED_URL, OFFICES, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Raster Images — healthcare software and hardware enquiries. Head office in Salem, Tamil Nadu with offices in Noida, India and Puchong Selangor, Malaysia.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s build better healthcare technology."
        lead="Send an enquiry about any product or solution — or request a demo and see it working with your own workflows in mind."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Contact form and offices">
        <div className="container-site grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          {/* Enquiry form */}
          <Reveal>
            <GlassCard className="glass-edge p-6 sm:p-9">
              <h2 className="text-xl font-semibold text-ink">Send an enquiry</h2>
              <p className="mt-1.5 mb-7 text-[0.9rem] text-mist">
                Fields marked <span className="text-brand-bright">*</span> are
                required. Our team will get back to you shortly.
              </p>
              <ContactForm />
            </GlassCard>
          </Reveal>

          {/* Direct contact + offices */}
          <div className="space-y-5">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-[1.02rem] font-semibold text-ink">
                  Prefer to talk?
                </h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-3 text-[0.92rem] text-mist transition-colors duration-300 hover:text-brand-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="icon-badge accent-teal size-9 rounded-lg"
                    >
                      <Phone size={16} weight="duotone" />
                    </span>
                    {SITE.phone}
                  </a>
                  <a
                    href={SITE.emailHref}
                    className="flex items-center gap-3 text-[0.92rem] text-mist transition-colors duration-300 hover:text-brand-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="icon-badge accent-sky size-9 rounded-lg"
                    >
                      <EnvelopeSimple size={16} weight="duotone" />
                    </span>
                    {SITE.email}
                  </a>
                </div>
                <div className="mt-5 border-t border-line-soft pt-5">
                  <p className="mb-3 text-[0.82rem] text-faint">
                    Want to see a solution first?
                  </p>
                  <DemoCTA size="sm" withArrow />
                </div>
              </GlassCard>
            </Reveal>

            {OFFICES.map((office, i) => (
              <Reveal key={office.id}>
                <OfficeCard office={office} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section pt-0" aria-label="Head office location">
        <div className="container-site">
          <Reveal>
            <GlassCard className="glass-edge overflow-hidden p-2 sm:p-3">
              <iframe
                src={MAP_EMBED_URL}
                title="Raster Images head office on Google Maps — Salem, Tamil Nadu"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full rounded-xl border-0 grayscale-[0.4] invert-[0.88] hue-rotate-180 sm:h-[420px]"
              />
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
