import type { ComponentPropsWithoutRef } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  hover?: boolean;
  edge?: boolean;
  deep?: boolean;
};

export default function GlassCard({
  hover = false,
  edge = true,
  deep = false,
  className = "",
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      {...rest}
      className={`${deep ? "glass-deep" : "glass"} ${edge ? "glass-edge" : ""} ${
        hover ? "glass-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
