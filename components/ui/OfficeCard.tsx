import { MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Office } from "@/data/site";

export default function OfficeCard({ office }: { office: Office }) {
  return (
    <article className="glass glass-edge p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[0.92rem] font-semibold text-ink">
          <MapPin
            size={16}
            weight="duotone"
            aria-hidden="true"
            className="shrink-0 text-brand-bright"
          />
          {office.label}
        </h3>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.62rem] font-medium tracking-[0.14em] text-faint uppercase">
          {office.country}
        </span>
      </div>
      <address className="mt-3 text-[0.84rem] leading-relaxed text-mist not-italic">
        {office.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
    </article>
  );
}
