import type { Metadata } from "next";
import {
  ChatCircleText,
  EnvelopeSimple,
  MonitorPlay,
  Phone,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import DemoForm from "@/components/forms/DemoForm";
import { DEMO_SOLUTIONS } from "@/data/demo";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Request a personalised demonstration of Raster Images healthcare software and hardware — PACS, RIS, IHMS, EMR, LIS, IoMT, telemedicine and more.",
  alternates: { canonical: "/request-demo" },
};

const STEPS = [
  {
    icon: ChatCircleText,
    accent: "accent-sky",
    title: "Tell us about your environment",
    copy: "Share your organisation type and the solution you want to see.",
  },
  {
    icon: MonitorPlay,
    accent: "accent-violet",
    title: "Personalised demonstration",
    copy: "Our team walks you through the product against your workflows.",
  },
  {
    icon: UserCircle,
    accent: "accent-teal",
    title: "Customisation discussion",
    copy: "We follow up on customisation, integration and next steps.",
  },
];

export default async function RequestDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ solution?: string }>;
}) {
  const { solution } = await searchParams;
  const preset =
    solution && (DEMO_SOLUTIONS as readonly string[]).includes(solution)
      ? solution
      : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Request a Demo"
        title="See our technology working for you."
        lead="A personalised demonstration is the fastest way to understand how our software and hardware fit your environment."
        crumbs={[{ label: "Request a Demo" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Demo request">
        <div className="container-site grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* What happens next */}
          <div className="space-y-5 lg:sticky lg:top-36">
            <Reveal>
              <ol className="space-y-4">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className={`icon-badge ${step.accent} size-11 shrink-0 rounded-xl`}
                    >
                      <step.icon size={21} weight="duotone" />
                    </span>
                    <div>
                      <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-faint">
                        STEP {i + 1}
                      </p>
                      <h2 className="mt-0.5 text-[1rem] font-semibold text-ink">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-[0.86rem] leading-relaxed text-mist">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <GlassCard className="p-6">
                <p className="text-[0.9rem] font-medium text-ink">
                  Prefer to reach out directly?
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
              </GlassCard>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal>
            <GlassCard className="glass-edge p-6 sm:p-9">
              <h2 className="text-xl font-semibold text-ink">
                Request your demo
              </h2>
              <p className="mt-1.5 mb-7 text-[0.9rem] text-mist">
                Fields marked <span className="text-brand-bright">*</span> are
                required.
              </p>
              <DemoForm idPrefix="demo-page" presetSolution={preset} />
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
