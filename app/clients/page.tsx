import type { Metadata } from "next";
import Image from "next/image";
import { Buildings } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { CLIENT_LOGOS } from "@/data/content";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Healthcare organisations that run on Raster Images software and hardware.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title="Trusted where it matters most."
        lead="Our software and hardware run in hospitals, imaging centres and laboratories — environments where reliability isn’t optional."
        crumbs={[{ label: "Clients" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Client logos">
        <div className="container-site">
          {CLIENT_LOGOS.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {CLIENT_LOGOS.map((client, i) => (
                <Reveal as="li" key={client.id}>
                  <div className="glass glass-hover flex h-28 items-center justify-center p-6">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={180}
                      height={64}
                      className="max-h-14 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="space-y-8">
              {/* Placeholder frames ready to accept real client logos */}
              <div
                aria-hidden="true"
                className="grid grid-cols-2 gap-4 opacity-60 sm:grid-cols-3 lg:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-line bg-white/[0.015]"
                  >
                    <span className="size-2 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
              <Reveal>
                <EmptyState
                  icon={Buildings}
                  title="Client logos coming soon"
                  description="We are preparing this space for the organisations we work with. Ask our team about relevant experience for your type of facility."
                  action={
                    <Button href="/contact" variant="secondary" size="sm">
                      Talk to Our Experts
                    </Button>
                  }
                />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
