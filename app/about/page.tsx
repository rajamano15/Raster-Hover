import type { Metadata } from "next";
import {
  ArrowRight,
  Cpu,
  FlowArrow,
  HeartStraight,
  Monitor,
  Scan,
  ShareNetwork,
  Stethoscope,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raster Images builds healthcare software and hardware for digital transformation — clinical information systems, medical imaging, interoperability and connected workflows.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  {
    icon: Monitor,
    accent: "accent-sky",
    title: "Healthcare Software",
    copy: "Radiology, hospital management, laboratory and clinical applications designed around real medical workflows.",
    href: "/solutions/radiology/pacs",
    linkLabel: "Explore solutions",
  },
  {
    icon: Cpu,
    accent: "accent-amber",
    title: "Healthcare Hardware",
    copy: "Professional hardware — from cameras and switchers to storage and servers — for healthcare and digital production environments.",
    href: "/hardware",
    linkLabel: "Explore hardware",
  },
  {
    icon: ShareNetwork,
    accent: "accent-violet",
    title: "Integration & Interoperability",
    copy: "Interfacing applications and IoMT connectivity that let equipment, devices and information systems work as one.",
    href: "/solutions/interfacing-applications/lab-equipment-interfacing",
    linkLabel: "Explore interfacing",
  },
];

const FOCUS_AREAS = [
  { icon: FlowArrow, label: "Medical Workflows" },
  { icon: Scan, label: "Imaging" },
  { icon: ShareNetwork, label: "Interoperability" },
  { icon: Stethoscope, label: "Clinical Information" },
  { icon: Cpu, label: "Healthcare Hardware" },
  { icon: HeartStraight, label: "Digital Transformation" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Raster Images"
        title="Technology built for better healthcare."
        lead="We create healthcare software and hardware that helps hospitals, imaging centres and laboratories run connected, digital-first clinical operations."
        crumbs={[{ label: "About" }]}
      />

      {/* What we do */}
      <section className="section pt-8 md:pt-10" aria-label="What we do">
        <div className="container-site grid gap-5 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal as="div" key={p.title} className="h-full">
              <GlassCard hover className="flex h-full flex-col p-7">
                <span
                  aria-hidden="true"
                  className={`icon-badge ${p.accent} mb-5 size-12 rounded-2xl`}
                >
                  <p.icon size={24} weight="duotone" />
                </span>
                <h2 className="text-lg font-semibold text-ink">{p.title}</h2>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-mist">
                  {p.copy}
                </p>
                <Button
                  href={p.href}
                  variant="ghost"
                  size="sm"
                  className="mt-5 justify-start self-start px-0"
                >
                  {p.linkLabel}
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </Button>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Focus areas band */}
      <section className="section pt-0" aria-label="Focus areas">
        <div className="container-site">
          <Reveal>
            <GlassCard className="relative overflow-hidden px-6 py-10 sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(560px_220px_at_15%_-40px,rgba(0,168,123,0.1),transparent_66%)]"
              />
              <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                <div>
                  <span className="eyebrow">Where we focus</span>
                  <h2 className="display-section mt-3">
                    Built around the realities of clinical work.
                  </h2>
                  <p className="lead mt-4">
                    Every solution we build serves the same goal — clinical
                    information that moves cleanly between people, systems and
                    devices.
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3">
                  {FOCUS_AREAS.map((f) => (
                    <li
                      key={f.label}
                      className="glass-inset flex flex-col items-start gap-2.5 p-4"
                    >
                      <f.icon
                        size={20}
                        weight="duotone"
                        aria-hidden="true"
                        className="text-brand-bright"
                      />
                      <span className="text-[0.82rem] font-medium text-mist">
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let’s talk about your healthcare environment"
        lead="Whether you are digitising a department or connecting an entire hospital, our team can walk you through the right combination of software and hardware."
      />
    </>
  );
}
