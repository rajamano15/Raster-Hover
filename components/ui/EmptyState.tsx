import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import GlassCard from "./GlassCard";

type EmptyStateProps = {
  icon: Icon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

/** Elegant placeholder shown where real content will land later. */
export default function EmptyState({
  icon: IconCmp,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <GlassCard
      className={`flex flex-col items-center gap-5 px-6 py-14 text-center sm:py-20 ${className}`}
    >
      <span
        aria-hidden="true"
        className="icon-badge accent-teal size-14 rounded-2xl"
      >
        <IconCmp size={26} weight="duotone" />
      </span>
      <div className="max-w-md space-y-2.5">
        <h3 className="title-card text-ink">{title}</h3>
        <p className="text-[0.925rem] leading-relaxed text-mist">{description}</p>
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </GlassCard>
  );
}
