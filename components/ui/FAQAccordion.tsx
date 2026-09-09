"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { useId, useState } from "react";
import type { FaqItem } from "@/data/faq";
import { EASE } from "@/lib/motion";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className="glass glass-edge divide-y divide-line-soft overflow-hidden">
      {items.map((item, i) => {
        const open = openIndex === i;
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left transition-colors duration-300 hover:bg-white/[0.025] sm:px-7"
              >
                <span
                  className={`text-[0.95rem] font-medium transition-colors duration-300 sm:text-base ${
                    open ? "text-brand-soft" : "text-ink"
                  }`}
                >
                  {item.question}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    open
                      ? "border-line-brand bg-brand/10 text-brand-bright"
                      : "border-line text-mist"
                  }`}
                >
                  <Plus size={15} weight="bold" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }
                  }
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.92rem] leading-relaxed text-mist sm:px-7 sm:pr-20">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
