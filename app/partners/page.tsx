import type { Metadata } from "next";
import {
  Cpu,
  Handshake,
  HeartStraight,
  PlugsConnected,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The Raster Images partner ecosystem — technology, healthcare and hardware partnerships built on integration and collaboration.",
  alternates: { canonical: "/partners" },
};

const PILLARS = [
  {
    icon: Cpu,
    accent: "accent-amber",
    title: "Technology Partnerships",
    copy: "We work with technology providers to bring proven platforms into healthcare environments.",
  },
  {
    icon: HeartStraight,
    accent: "accent-rose",
    title: "Healthcare Ecosystem",
    copy: "Hospitals, imaging centres and laboratories shape how our solutions evolve.",
  },
  {
    icon: Handshake,
    accent: "accent-teal",
    title: "Hardware Partnerships",
    copy: "Professional hardware lines complement our software for complete deployments.",
  },
  {
    icon: PlugsConnected,
    accent: "accent-violet",
    title: "Integration Capabilities",
    copy: "Open interfacing lets partner systems and devices connect to our platforms.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="An ecosystem built on collaboration."
        lead="We partner across technology, healthcare and hardware so that our customers get connected solutions — not isolated products."
        crumbs={[{ label: "Partners" }]}
      />

      <section className="section pt-6 md:pt-8" aria-label="Partnership pillars">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal as="div" key={p.title} className="h-full">
              <GlassCard hover className="flex h-full flex-col p-6">
                <span
                  aria-hidden="true"
                  className={`icon-badge ${p.accent} mb-4 size-11 rounded-xl`}
                >
                  <p.icon size={22} weight="duotone" />
                </span>
                <h2 className="text-[1.02rem] font-semibold text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
                  {p.copy}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partner logos placeholder */}
      <section className="section pt-0" aria-label="Partner organisations">
        <div className="container-site">
          <Reveal>
            <EmptyState
              icon={Handshake}
              title="Partner organisations"
              description="Partner logos and profiles will be displayed here. If you already work with us and would like your organisation featured, get in touch."
              action={
                <Button href="/contact" variant="secondary" size="sm">
                  Contact us
                </Button>
              }
            />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Become a Partner"
        lead="If your technology, hardware or services belong in connected healthcare environments, let’s explore what we can build together."
        secondaryLabel="Become a Partner"
        secondaryHref="/contact"
      />
    </>
  );
}
