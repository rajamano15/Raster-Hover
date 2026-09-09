import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HARDWARE_CATEGORIES } from "@/data/hardware";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import HardwareCard from "@/components/products/HardwareCard";

const FEATURED_SLUGS = [
  "professional-cameras",
  "atem-switchers",
  "disk-recorders-storage",
  "streaming-encoding",
  "video-audio-monitoring",
  "servers",
];

export default function HardwareShowcase() {
  const featured = HARDWARE_CATEGORIES.filter((c) =>
    FEATURED_SLUGS.includes(c.slug),
  );

  return (
    <section
      className="section relative overflow-hidden"
      aria-labelledby="hardware-heading"
    >
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Hardware Products"
            title={
              <span id="hardware-heading">
                Professional hardware for healthcare &amp; digital workflows
              </span>
            }
            lead="High-performance hardware and production technology for demanding professional environments."
          />
          <Reveal className="shrink-0">
            <Button href="/hardware" variant="secondary">
              View All Hardware
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal as="li" key={item.slug}>
              <HardwareCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
