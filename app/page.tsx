import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HomeIntro from "@/components/sections/HomeIntro";
import HardwareShowcase from "@/components/sections/HardwareShowcase";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SolutionExplorer from "@/components/solutions/SolutionExplorer";

export const metadata: Metadata = {
  title: "Raster Images — Revolutionizing Digital Healthcare",
  description:
    "Healthcare software and hardware solutions — PACS, RIS, teleradiology, hospital management, EMR, lab information systems, IoMT interfacing and professional hardware for modern healthcare environments.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />

      {/* Healthcare Solutions explorer */}
      <section
        className="section relative overflow-hidden"
        aria-labelledby="solutions-heading"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="Healthcare Solutions"
            title={
              <span id="solutions-heading">
                Connected technology for modern healthcare environments.
              </span>
            }
            lead="Explore our solution categories — from radiology and hospital management to device interfacing and specialised clinical applications."
          />
          <Reveal className="mt-12">
            <SolutionExplorer />
          </Reveal>
        </div>
      </section>

      <HardwareShowcase />
      <FAQSection />
      <CTASection />
    </>
  );
}
