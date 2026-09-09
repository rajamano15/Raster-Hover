"use client";

import { useEffect } from "react";

const SELECTOR = ".glass, .glass-deep, .border-glow";

/**
 * Site-wide cursor tracking for the card glow effects (border ring +
 * interior spotlight). One delegated pointermove listener sets
 * --bgx/--bgy (cursor position relative to the card) on whichever card
 * surface the pointer is over; the visuals are pure CSS (globals.css).
 */
export default function BorderGlow() {
  useEffect(() => {
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest?.(SELECTOR) as HTMLElement | null;
      if (!card) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--bgx", `${clientX - rect.left}px`);
        card.style.setProperty("--bgy", `${clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
