"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowsLeftRight,
  Broadcast,
  Copy,
  FilmSlate,
  FilmStrip,
  Gauge,
  GridFour,
  HardDrive,
  HardDrives,
  Monitor,
  MonitorArrowUp,
  Plugs,
  Selection,
  SquaresFour,
  Swap,
  TreeStructure,
  VideoCamera,
  Wrench,
  type Icon,
} from "@phosphor-icons/react";
import { GROUP_ACCENTS, type HardwareCategory } from "@/data/hardware";
import { useDemoModal } from "@/components/providers/DemoModalProvider";

const ICONS: Record<string, Icon> = {
  VideoCamera,
  FilmSlate,
  SquaresFour,
  Selection,
  Copy,
  HardDrives,
  MonitorArrowUp,
  FilmStrip,
  ArrowsLeftRight,
  Swap,
  Monitor,
  Gauge,
  GridFour,
  TreeStructure,
  Broadcast,
  Wrench,
  Plugs,
  HardDrive,
};

export default function HardwareCard({ item }: { item: HardwareCategory }) {
  const { openDemo } = useDemoModal();
  const IconCmp = ICONS[item.icon] ?? Monitor;
  const accent = GROUP_ACCENTS[item.group];

  return (
    <article className="glass glass-edge glass-hover group flex h-full flex-col overflow-hidden">
      {/* Visual plate — swaps to a real product image when provided */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-line-soft bg-[radial-gradient(380px_150px_at_50%_120%,rgba(0,168,123,0.12),transparent_70%)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-6"
          />
        ) : (
          <span
            aria-hidden="true"
            className={`icon-badge icon-badge-glow ${accent} relative size-16 rounded-2xl`}
          >
            <IconCmp size={30} weight="duotone" />
          </span>
        )}
        <span className="absolute top-3 left-3 rounded-full border border-line-soft bg-black/30 px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.14em] text-faint uppercase backdrop-blur-sm">
          {item.group}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="title-card text-ink">{item.name}</h3>
        <p className="text-[0.84rem] leading-relaxed text-mist">{item.blurb}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
          <button
            type="button"
            onClick={() => openDemo("Hardware Products")}
            className="cursor-pointer text-[0.8rem] font-semibold text-brand-soft transition-colors duration-300 hover:text-brand-bright"
          >
            Request a Demo
          </button>
          <Link
            href="/contact"
            className="text-[0.8rem] font-medium text-mist transition-colors duration-300 hover:text-ink"
          >
            Get Customized Product
          </Link>
        </div>
      </div>
    </article>
  );
}
