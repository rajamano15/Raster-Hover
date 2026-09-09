"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import Button from "./Button";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

type DemoCTAProps = {
  label?: string;
  solution?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  withArrow?: boolean;
  children?: ReactNode;
};

/** Opens the Request-a-Demo modal from anywhere (server pages included). */
export default function DemoCTA({
  label = "Request a Demo",
  solution,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
}: DemoCTAProps) {
  const { openDemo } = useDemoModal();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => openDemo(solution)}
    >
      {label}
      {withArrow ? (
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      ) : null}
    </Button>
  );
}
