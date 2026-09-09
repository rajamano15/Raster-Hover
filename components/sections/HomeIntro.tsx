import {
  Database,
  FlowArrow,
  Scan,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const CAPABILITIES = [
  {
    icon: FlowArrow,
    accent: "accent-teal",
    title: "Clinical Workflows",
    copy: "Software shaped around how clinical teams actually work.",
  },
  {
    icon: Scan,
    accent: "accent-cyan",
    title: "Imaging & Radiology",
    copy: "PACS, RIS and teleradiology built for imaging departments.",
  },
  {
    icon: Database,
    accent: "accent-indigo",
    title: "Information Management",
    copy: "Hospital, laboratory and pharmacy information in one flow.",
  },
  {
    icon: ShareNetwork,
    accent: "accent-violet",
    title: "Interoperability",
    copy: "Devices, equipment and systems that speak to each other.",
  },
];

/** Decorative signal visualisation — imaging waveform over a data grid. */
function SignalPanel() {
  return (
    <GlassCard className="relative h-full min-h-64 overflow-hidden p-0 sm:min-h-80">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:34px_34px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(420px_220px_at_70%_20%,rgba(0,168,123,0.12),transparent_70%)]"
      />
      <svg
        viewBox="0 0 560 320"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Baseline */}
        <line
          x1="0"
          y1="170"
          x2="560"
          y2="170"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        {/* Static faint pulse trace */}
        <path
          d="M0 170 L90 170 L110 170 L122 128 L134 208 L146 170 L210 170 L228 156 L246 170 L330 170 L342 118 L354 224 L366 170 L430 170 L448 158 L466 170 L560 170"
          fill="none"
          stroke="rgba(0,168,123,0.22)"
          strokeWidth="1.5"
        />
        {/* Animated bright sweep along the same trace */}
        <path
          className="ecg-path"
          d="M0 170 L90 170 L110 170 L122 128 L134 208 L146 170 L210 170 L228 156 L246 170 L330 170 L342 118 L354 224 L366 170 L430 170 L448 158 L466 170 L560 170"
          fill="none"
          stroke="#14cf9c"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(20,207,156,0.65))" }}
        />
      </svg>
      {/* Corner labels — the connected system domains */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 border-t border-line-soft bg-black/25 p-4 backdrop-blur-sm">
        {["PACS", "RIS", "EMR", "LIS", "IoMT"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-line px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-mist"
          >
            {label}
          </span>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 text-[0.68rem] tracking-[0.14em] text-brand-soft uppercase sm:inline-flex">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,168,123,0.9)]"
          />
          Connected
        </span>
      </div>
    </GlassCard>
  );
}

export default function HomeIntro() {
  return (
    <section className="section" aria-labelledby="intro-heading">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Raster Images"
              title={
                <span id="intro-heading">
                  Technology that connects healthcare.
                </span>
              }
              lead="Raster Images provides healthcare software and hardware solutions designed to improve clinical workflows, information management, imaging, interoperability and digital healthcare operations."
            />
          </div>
          <Reveal>
            <SignalPanel />
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c.title}>
              <GlassCard hover className="h-full p-5">
                <span
                  aria-hidden="true"
                  className={`icon-badge ${c.accent} mb-4 size-10 rounded-xl`}
                >
                  <c.icon size={20} weight="duotone" />
                </span>
                <h3 className="text-[0.98rem] font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[0.83rem] leading-relaxed text-mist">
                  {c.copy}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
