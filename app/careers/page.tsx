import type { Metadata } from "next";
import {
  ArrowUpRight,
  Briefcase,
  Cpu,
  HeartStraight,
  MapPin,
  Monitor,
  PlugsConnected,
  RocketLaunch,
  Stethoscope,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { OPEN_POSITIONS } from "@/data/content";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the future of digital healthcare at Raster Images — careers in healthcare software, medical imaging, integration and hardware.",
  alternates: { canonical: "/careers" },
};

const WHY = [
  {
    icon: HeartStraight,
    accent: "accent-rose",
    title: "Work that matters",
    copy: "The software and hardware you build supports clinicians and patients in real healthcare environments.",
  },
  {
    icon: RocketLaunch,
    accent: "accent-amber",
    title: "Full-stack healthcare tech",
    copy: "From imaging systems to device interfacing to professional hardware — the problem space is broad and deep.",
  },
  {
    icon: UsersThree,
    accent: "accent-cyan",
    title: "Close to the users",
    copy: "We work directly with hospitals, imaging centres and laboratories, so you see your work in use.",
  },
];

const EXPERTISE = [
  { icon: Monitor, label: "Healthcare software development" },
  { icon: Stethoscope, label: "Medical imaging — PACS / RIS" },
  { icon: PlugsConnected, label: "Integration & device interfacing" },
  { icon: Cpu, label: "Hardware & production technology" },
  { icon: UsersThree, label: "Implementation & support" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the future of digital healthcare."
        lead="Join a team creating the software and hardware that connects modern clinical environments."
        crumbs={[{ label: "Careers" }]}
      />

      {/* Why work with us */}
      <section className="section pt-6 md:pt-8" aria-label="Why work with us">
        <div className="container-site grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal as="div" key={w.title} className="h-full">
              <GlassCard hover className="h-full p-6">
                <span
                  aria-hidden="true"
                  className={`icon-badge ${w.accent} mb-4 size-11 rounded-xl`}
                >
                  <w.icon size={22} weight="duotone" />
                </span>
                <h2 className="text-[1.02rem] font-semibold text-ink">
                  {w.title}
                </h2>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-mist">
                  {w.copy}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="section pt-0" aria-label="Areas of expertise">
        <div className="container-site">
          <Reveal>
            <GlassCard className="relative overflow-hidden px-6 py-9 sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_200px_at_85%_-40px,rgba(0,168,123,0.09),transparent_66%)]"
              />
              <div className="relative">
                <span className="eyebrow">Areas of expertise</span>
                <h2 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
                  Where our teams spend their time
                </h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {EXPERTISE.map((e) => (
                    <li
                      key={e.label}
                      className="flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-4 py-2.5"
                    >
                      <e.icon
                        size={17}
                        weight="duotone"
                        aria-hidden="true"
                        className="text-brand-bright"
                      />
                      <span className="text-[0.84rem] font-medium text-mist">
                        {e.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Open positions */}
      <section className="section pt-0" aria-labelledby="positions-heading">
        <div className="container-site">
          <Reveal className="mb-8">
            <h2 id="positions-heading" className="display-section">
              Open positions
            </h2>
          </Reveal>
          {OPEN_POSITIONS.length > 0 ? (
            <ul className="space-y-4">
              {OPEN_POSITIONS.map((job) => (
                <Reveal as="li" key={job.id}>
                  <GlassCard
                    hover
                    className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="title-card text-ink">{job.title}</h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-faint">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} aria-hidden="true" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={13} aria-hidden="true" /> {job.type}
                        </span>
                      </p>
                      <p className="mt-2 max-w-2xl text-[0.86rem] leading-relaxed text-mist">
                        {job.description}
                      </p>
                    </div>
                    <Button
                      href={job.applyHref ?? SITE.emailHref}
                      variant="secondary"
                      size="sm"
                      className="shrink-0"
                    >
                      Apply
                      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    </Button>
                  </GlassCard>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <EmptyState
                icon={Briefcase}
                title="No current openings"
                description="There are no advertised positions right now — but we are always interested in people who care about healthcare technology. Send us your resume and we will keep it on file."
                action={
                  <Button
                    href={`${SITE.emailHref}?subject=Career%20Enquiry%20—%20Resume`}
                    variant="secondary"
                    size="sm"
                  >
                    Submit your resume
                  </Button>
                }
              />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
