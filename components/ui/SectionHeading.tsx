import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Heading level for the title (default h2). */
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignCls =
    align === "center" ? "text-center items-center mx-auto" : "items-start";
  return (
    <Reveal
      className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag className="display-section text-balance">{title}</Tag>
      {lead ? <p className="lead text-pretty">{lead}</p> : null}
    </Reveal>
  );
}
