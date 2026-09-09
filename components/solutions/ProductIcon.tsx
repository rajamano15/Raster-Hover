"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Baby,
  Broadcast,
  Camera,
  ChartLine,
  ClipboardText,
  Disc,
  Drop,
  FileText,
  Flask,
  Hospital,
  IdentificationCard,
  Images,
  Microscope,
  Package,
  Pill,
  Stethoscope,
  VideoCamera,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";
import type { ProductIcon as ProductIconKey } from "@/data/solutions";
import { EASE } from "@/lib/motion";

/* ── Motion presets ──────────────────────────────────────────────
   A small vocabulary of gestures rather than 18 bespoke animations, so the
   set reads as one family. Each glyph is paired with the gesture that
   matches what it depicts — a disc spins, a drop falls, a card flips.      */

type Preset = { keyframes: Record<string, number[]>; duration: number };

const PRESETS = {
  /** Full rotation — discs, anything that literally spins. */
  spin: { keyframes: { rotate: [0, 360] }, duration: 0.9 },
  /** Systole/diastole double-tap — vitals, capture, live video. */
  beat: { keyframes: { scale: [1, 1.18, 0.96, 1.09, 1] }, duration: 0.75 },
  /** Gentle fall and settle — droplets, infants. */
  bob: { keyframes: { y: [0, -3.5, 0, -1.5, 0] }, duration: 0.85 },
  /** Hand-held jitter — instruments, clipboards, glassware. */
  wiggle: { keyframes: { rotate: [0, -9, 8, -5, 0] }, duration: 0.65 },
  /** Outward radiate — signal, broadcast, connectivity. */
  ping: { keyframes: { scale: [1, 1.16, 1], opacity: [1, 0.7, 1] }, duration: 0.8 },
  /** Card turn — documents and identification. */
  flip: { keyframes: { rotateY: [0, 180, 360] }, duration: 0.9 },
  /** Lift and settle — records, buildings, growth. */
  rise: { keyframes: { y: [0, -4, 0], scale: [1, 1.07, 1] }, duration: 0.7 },
} satisfies Record<string, Preset>;

type PresetName = keyof typeof PRESETS;

/* Accent per product. Chosen for meaning where the subject has an obvious
   colour (blood → rose, pharmacy → lime, paediatrics → amber) and otherwise
   to keep neighbouring tiles in a grid distinct. */
const REGISTRY: Record<
  ProductIconKey,
  { glyph: Icon; preset: PresetName; accent: string }
> = {
  images: { glyph: Images, preset: "rise", accent: "accent-cyan" },
  clipboard: { glyph: ClipboardText, preset: "wiggle", accent: "accent-sky" },
  broadcast: { glyph: Broadcast, preset: "ping", accent: "accent-indigo" },
  disc: { glyph: Disc, preset: "spin", accent: "accent-violet" },
  camera: { glyph: Camera, preset: "beat", accent: "accent-teal" },
  hospital: { glyph: Hospital, preset: "rise", accent: "accent-teal" },
  pill: { glyph: Pill, preset: "wiggle", accent: "accent-lime" },
  drop: { glyph: Drop, preset: "bob", accent: "accent-rose" },
  file: { glyph: FileText, preset: "flip", accent: "accent-sky" },
  flask: { glyph: Flask, preset: "wiggle", accent: "accent-cyan" },
  baby: { glyph: Baby, preset: "bob", accent: "accent-amber" },
  package: { glyph: Package, preset: "rise", accent: "accent-indigo" },
  microscope: { glyph: Microscope, preset: "wiggle", accent: "accent-violet" },
  wifi: { glyph: WifiHigh, preset: "ping", accent: "accent-cyan" },
  chart: { glyph: ChartLine, preset: "rise", accent: "accent-lime" },
  video: { glyph: VideoCamera, preset: "beat", accent: "accent-rose" },
  stethoscope: { glyph: Stethoscope, preset: "beat", accent: "accent-sky" },
  "id-card": { glyph: IdentificationCard, preset: "flip", accent: "accent-amber" },
};

/** Badge: settles in on category change, then lights up on row hover. */
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  idle: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  hover: { scale: 1.08, transition: { duration: 0.3, ease: EASE } },
};

/** Accent halo that blooms out from behind the badge on hover. */
const haloVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  idle: { opacity: 0, scale: 0.7 },
  hover: {
    opacity: [0, 0.55, 0],
    scale: [0.7, 1.6, 1.9],
    transition: { duration: 1.1, ease: "easeOut", repeat: Infinity },
  },
};

type Props = {
  icon: ProductIconKey;
};

/**
 * Animated product glyph.
 *
 * Two moments of motion: a staggered pop-in when its category becomes active,
 * and a gesture replay whenever its row is hovered. Both are driven by variant
 * labels inherited from the list and the row, so hovering anywhere on the row —
 * not just the icon — plays the gesture, and the list owns the entrance timing.
 */
export default function ProductIcon({ icon }: Props) {
  const reduce = useReducedMotion();
  const { glyph: Glyph, preset, accent } = REGISTRY[icon];
  const { keyframes, duration } = PRESETS[preset];

  const glyphVariants: Variants = {
    hidden: {},
    idle: {},
    hover: reduce
      ? {}
      : { ...keyframes, transition: { duration, ease: EASE } },
  };

  return (
    <motion.span
      aria-hidden="true"
      variants={reduce ? undefined : badgeVariants}
      className={`icon-badge ${accent} relative size-9 shrink-0 rounded-lg`}
    >
      {!reduce ? (
        <motion.span
          variants={haloVariants}
          className="icon-halo pointer-events-none absolute inset-0 rounded-lg blur-md"
        />
      ) : null}
      <motion.span
        variants={glyphVariants}
        className="relative flex"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Glyph size={18} weight="duotone" />
      </motion.span>
    </motion.span>
  );
}
