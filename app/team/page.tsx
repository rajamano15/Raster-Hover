import type { Metadata } from "next";
import Image from "next/image";
import {
  LinkedinLogo,
  UserCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { TEAM_MEMBERS, type TeamMember } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "The people behind Raster Images — building healthcare software and hardware.",
  alternates: { canonical: "/team" },
};

/** Reusable member card — accepts photo, name, position, bio and LinkedIn. */
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <GlassCard hover className="flex h-full flex-col overflow-hidden">
      <div className="relative flex h-56 items-center justify-center border-b border-line-soft bg-[radial-gradient(320px_160px_at_50%_110%,rgba(0,168,123,0.1),transparent_70%)]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        ) : (
          <UserCircle
            size={64}
            weight="duotone"
            aria-hidden="true"
            className="text-mist/40"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h2 className="text-[1.02rem] font-semibold text-ink">{member.name}</h2>
        <p className="text-[0.8rem] font-medium tracking-wide text-brand-soft">
          {member.position}
        </p>
        {member.bio ? (
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-mist">
            {member.bio}
          </p>
        ) : null}
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.8rem] font-medium text-mist transition-colors duration-300 hover:text-brand-soft"
          >
            <LinkedinLogo size={16} aria-hidden="true" /> LinkedIn
          </a>
        ) : null}
      </div>
    </GlassCard>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="The people behind the technology."
        lead="Engineers, imaging specialists and implementation teams who build and support our healthcare solutions."
        crumbs={[{ label: "Our Team" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="Team members">
        <div className="container-site">
          {TEAM_MEMBERS.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {TEAM_MEMBERS.map((member, i) => (
                <Reveal as="li" key={member.id}>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <EmptyState
                icon={UsersThree}
                title="Team profiles coming soon"
                description="We are preparing profiles of the people who build and support our solutions. Until then, our team is one call away."
                action={
                  <Button href="/contact" variant="secondary" size="sm">
                    Contact the team
                  </Button>
                }
              />
            </Reveal>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
