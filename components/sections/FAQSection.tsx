import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { FAQ_ITEMS } from "@/data/faq";
import { SITE } from "@/data/site";
import FAQAccordion from "@/components/ui/FAQAccordion";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function FAQSection() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="lg:sticky lg:top-36">
          <SectionHeading
            eyebrow="FAQ"
            title={<span id="faq-heading">Questions, answered.</span>}
            lead="Common questions about our healthcare software, hardware and demonstrations."
          />
          <Reveal className="mt-8">
            <GlassCard className="p-6">
              <p className="text-[0.9rem] font-medium text-ink">
                Still have questions?
              </p>
              <div className="mt-3 space-y-2 text-[0.85rem] text-mist">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2.5 transition-colors duration-300 hover:text-brand-soft"
                >
                  <Phone size={15} aria-hidden="true" className="text-brand-bright" />
                  {SITE.phone}
                </a>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-2.5 transition-colors duration-300 hover:text-brand-soft"
                >
                  <EnvelopeSimple
                    size={16}
                    aria-hidden="true"
                    className="text-brand-bright"
                  />
                  {SITE.email}
                </a>
              </div>
              <Button
                href="/contact"
                variant="secondary"
                size="sm"
                className="mt-5"
              >
                Talk to Our Experts
              </Button>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal>
          <FAQAccordion items={FAQ_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
