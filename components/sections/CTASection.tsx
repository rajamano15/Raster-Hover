import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import DemoCTA from "@/components/ui/DemoCTA";

type CTASectionProps = {
  title?: ReactNode;
  lead?: ReactNode;
  secondaryLabel?: string;
  secondaryHref?: string;
  solution?: string;
};

export default function CTASection({
  title = "See our healthcare technology in action",
  lead = "Request a personalised demonstration, or talk to our experts about a solution customised for your organisation.",
  secondaryLabel = "Talk to Our Experts",
  secondaryHref = "/contact",
  solution,
}: CTASectionProps) {
  return (
    <section className="section">
      <div className="container-site">
        <Reveal>
          <div className="glass glass-edge relative overflow-hidden px-6 py-14 text-center sm:px-12 md:py-20">
            {/* Ambient glow inside the panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_260px_at_50%_-40px,rgba(0,168,123,0.14),transparent_66%)]"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
              <span className="eyebrow">Get Started</span>
              <h2 className="display-section text-balance">{title}</h2>
              <p className="lead text-pretty">{lead}</p>
              <div className="mt-4 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
                <DemoCTA size="lg" solution={solution} className="w-full sm:w-auto" />
                <Button
                  href={secondaryHref}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
