import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CalendarBlank,
  MapPin,
  Newspaper,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/sections/PageHeader";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { NEWS_ITEMS, type NewsItem } from "@/data/content";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "News and event appearances from Raster Images — healthcare software and hardware announcements.",
  alternates: { canonical: "/news-events" },
};

function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <GlassCard hover className="flex h-full flex-col overflow-hidden">
      {item.image ? (
        <div className="relative h-44 border-b border-line-soft">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.75rem] text-faint">
          <span className="rounded-full border border-line-brand bg-brand/10 px-2.5 py-0.5 font-medium text-brand-soft">
            {item.kind}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarBlank size={13} aria-hidden="true" />
            <time dateTime={item.date}>{date}</time>
          </span>
          {item.location ? (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} aria-hidden="true" />
              {item.location}
            </span>
          ) : null}
        </div>
        <h2 className="title-card text-ink">{item.title}</h2>
        <p className="text-[0.86rem] leading-relaxed text-mist">
          {item.description}
        </p>
        {item.href ? (
          <Button
            href={item.href}
            variant="ghost"
            size="sm"
            className="mt-auto justify-start self-start px-0"
          >
            Read more
            <ArrowRight size={14} weight="bold" aria-hidden="true" />
          </Button>
        ) : null}
      </div>
    </GlassCard>
  );
}

export default function NewsEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="What’s happening at Raster Images."
        lead="Announcements, product updates and the events where you can meet our team."
        crumbs={[{ label: "News & Events" }]}
      />

      <section className="section pt-4 md:pt-6" aria-label="News and events">
        <div className="container-site">
          {NEWS_ITEMS.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {NEWS_ITEMS.map((item, i) => (
                <Reveal as="li" key={item.id}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <EmptyState
                icon={Newspaper}
                title="No announcements yet"
                description="News and event appearances will be published here. In the meantime, reach out to our team for the latest on our products."
                action={
                  <Button href="/contact" variant="secondary" size="sm">
                    Contact us
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
