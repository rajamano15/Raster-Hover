"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { HERO_STATS, type Stat } from "@/data/stats";
import { EASE } from "@/lib/motion";

function formatValue(v: number) {
  return Math.round(v).toLocaleString("en-US");
}

function StatItem({ stat }: { stat: Stat }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.7,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [reduce, stat.value]);

  return (
    <li className="flex flex-col items-center gap-1.5 last:col-span-2 min-[480px]:last:col-span-1">
      <span className="text-[1.75rem] leading-none font-semibold tracking-tight text-ink sm:text-[2.1rem]">
        {formatValue(display)}
        {stat.suffix ? (
          <span className="text-brand-bright">{stat.suffix}</span>
        ) : null}
      </span>
      <span className="text-[0.66rem] font-medium tracking-[0.18em] text-mist uppercase">
        {stat.label}
      </span>
    </li>
  );
}

/** Full-width statistics band pinned to the bottom of the hero. */
export default function StatsBar() {
  return (
    <div className="glass-band relative z-10">
      <ul
        aria-label="Company statistics"
        className="container-site grid grid-cols-2 gap-x-4 gap-y-7 py-7 text-center min-[480px]:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:py-8"
      >
        {HERO_STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </ul>
    </div>
  );
}
