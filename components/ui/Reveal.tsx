import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element. */
  as?: "div" | "section" | "li" | "span";
};

/** Static layout wrapper. Content renders immediately — no scroll animation. */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
}: RevealProps) {
  return <Tag className={className}>{children}</Tag>;
}
