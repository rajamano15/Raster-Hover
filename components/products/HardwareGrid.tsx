"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { GROUP_ACCENTS, HARDWARE_CATEGORIES, HARDWARE_GROUPS, type HardwareGroup } from "@/data/hardware";
import HardwareCard from "./HardwareCard";

type Filter = "All" | HardwareGroup;

export default function HardwareGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const visible =
    filter === "All"
      ? HARDWARE_CATEGORIES
      : HARDWARE_CATEGORIES.filter((c) => c.group === filter);

  return (
    <div className="space-y-8">
      {/* Filter chips */}
      <div
        role="group"
        aria-label="Filter hardware by area"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {(["All", ...HARDWARE_GROUPS] as Filter[]).map((g) => {
          const active = filter === g;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(g)}
              className={`h-10 shrink-0 cursor-pointer rounded-full border px-4.5 text-[0.8rem] font-medium whitespace-nowrap transition-all duration-300 ${
                active
                  ? `${g === "All" ? "accent-teal" : GROUP_ACCENTS[g]} border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)] shadow-[0_0_24px_-8px_color-mix(in_oklab,var(--accent)_55%,transparent)]`
                  : "border-line bg-white/[0.02] text-mist hover:border-white/15 hover:text-ink"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} hardware categories
      </p>

      <motion.ul
        layout={reduce ? false : true}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visible.map((item) => (
          <motion.li layout={reduce ? false : true} key={item.slug}>
            <HardwareCard item={item} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
