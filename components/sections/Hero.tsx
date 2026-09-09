"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EASE } from "@/lib/motion";
import StatsBar from "@/components/sections/StatsBar";

const HEADLINE = "Revolutionizing Digital Healthcare";

/** Looping typewriter for the headline; renders static text under reduced motion. */
function useTypingText(text: string, enabled: boolean) {
  const [typed, setTyped] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setTyped(text);
      return;
    }
    let charIndex = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      setTyped(text.substring(0, charIndex));
      let delay: number;
      if (!deleting && charIndex < text.length) {
        charIndex += 1;
        delay = 80;
      } else if (!deleting && charIndex === text.length) {
        deleting = true;
        delay = 2400;
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
        delay = 38;
      } else {
        deleting = false;
        delay = 500;
      }
      timer = window.setTimeout(tick, delay);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [text, enabled]);

  return typed;
}

/** Full-screen branded loader shown until the hero assets are ready. */
function HeroPreloader({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="hero-preloader"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={
            reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 1.005 }
          }
          transition={{ duration: 0.65, ease: EASE }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-9 bg-bg"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(640px_360px_at_50%_38%,rgba(0,168,123,0.1),transparent_68%)]"
          />
          <motion.img
            src="/logo.webp"
            alt="Raster Images"
            width={196}
            height={30}
            className="relative h-7 w-auto"
            animate={
              reduce ? undefined : { opacity: [0.65, 1, 0.65] }
            }
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
          <svg
            viewBox="0 0 240 48"
            width="220"
            height="44"
            aria-hidden="true"
            className="relative"
          >
            <path
              d="M0 24 L58 24 L70 24 L80 8 L92 40 L102 24 L146 24 L156 17 L166 24 L240 24"
              fill="none"
              stroke="rgba(0,168,123,0.22)"
              strokeWidth="1.5"
            />
            <path
              className="loader-ecg"
              d="M0 24 L58 24 L70 24 L80 8 L92 40 L102 24 L146 24 L156 17 L166 24 L240 24"
              fill="none"
              stroke="#14cf9c"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(20,207,156,0.7))" }}
            />
          </svg>
          <span className="sr-only">Loading Raster Images</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type HologramStageProps = {
  onBaseLoad: () => void;
  onRevealLoad: () => void;
};

/** Layered hologram stage — video loop, base image, spotlight X-ray reveal. */
function HologramStage({ onBaseLoad, onRevealLoad }: HologramStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState<"a" | "b">("a");
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const raf = useRef(0);

  // Load the (large) animation only on capable desktop setups, once idle.
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const id = hasIdle
      ? window.requestIdleCallback(() => setShowVideo(true))
      : window.setTimeout(() => setShowVideo(true), 1200);
    return () => {
      if (hasIdle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [reduce]);

  // Gapless dual-buffer loop crossfade (ported from the provided hero).
  useEffect(() => {
    if (!showVideo) return;
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    let active = a;
    let buffer = b;
    let transitioning = false;
    const fade = 0.6;

    const onTime = () => {
      if (!active.duration || transitioning) return;
      if (active.duration - active.currentTime <= fade) {
        transitioning = true;
        buffer.currentTime = 0;
        buffer.play().catch(() => {});
        setActiveVideo(buffer === a ? "a" : "b");
        window.setTimeout(() => {
          active.pause();
          active.currentTime = 0;
          const t = active;
          active = buffer;
          buffer = t;
          transitioning = false;
        }, fade * 1000);
      }
    };

    a.addEventListener("timeupdate", onTime);
    b.addEventListener("timeupdate", onTime);
    a.play().catch(() => {});
    return () => {
      a.removeEventListener("timeupdate", onTime);
      b.removeEventListener("timeupdate", onTime);
    };
  }, [showVideo]);

  const updateSpot = useCallback((clientX: number, clientY: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      stage.style.setProperty("--mx", `${x}%`);
      stage.style.setProperty("--my", `${y}%`);
    });
  }, []);

  return (
    <div
      ref={stageRef}
      className={`hologram-stage ${touched ? "is-touched" : ""}`}
      onMouseMove={(e) => updateSpot(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        setTouched(true);
        updateSpot(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => updateSpot(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={() => setTouched(false)}
      role="img"
      aria-label="Interactive holographic anatomy visualisation — move the cursor to reveal the internal scan layer"
    >
      {/* Tinted layers: brand-green hologram */}
      <div className="hologram-tint absolute inset-0" aria-hidden="true">
        {showVideo ? (
          <>
            <video
              ref={videoARef}
              className={`hologram-video ${activeVideo === "a" ? "is-active" : ""}`}
              src="/hero/3d-hologram-animation.webm"
              muted
              playsInline
              preload="auto"
            />
            <video
              ref={videoBRef}
              className={`hologram-video ${activeVideo === "b" ? "is-active" : ""}`}
              src="/hero/3d-hologram-animation.webm"
              muted
              playsInline
              preload="auto"
            />
          </>
        ) : null}
        <img
          className="hologram-base"
          src="/hero/3d-hologram.webp"
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          onLoad={onBaseLoad}
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) onBaseLoad();
          }}
        />
      </div>

      {/* Untinted anatomical reveal layer (spotlight masked) */}
      <div className="hologram-reveal" aria-hidden="true">
        <img
          src="/hero/muscle-fiber.webp"
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          onLoad={onRevealLoad}
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) onRevealLoad();
          }}
        />
      </div>

      <div className="hologram-scanlines" aria-hidden="true" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const typed = useTypingText(HEADLINE, !reduce);

  /* ── Loading gate: hero images + fonts, min display, 6s failsafe ── */
  const loadedAssets = useRef(new Set<string>());
  const [assetsReady, setAssetsReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [minPassed, setMinPassed] = useState(false);
  const [forceDone, setForceDone] = useState(false);

  const markAsset = useCallback((key: "bg" | "holo" | "reveal") => {
    loadedAssets.current.add(key);
    if (loadedAssets.current.size >= 3) setAssetsReady(true);
  }, []);

  useEffect(() => {
    let mounted = true;
    const minTimer = window.setTimeout(() => setMinPassed(true), 500);
    const failsafe = window.setTimeout(() => setForceDone(true), 6000);
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (mounted) setFontsReady(true);
    });
    return () => {
      mounted = false;
      window.clearTimeout(minTimer);
      window.clearTimeout(failsafe);
    };
  }, []);

  const heroLoaded = ((assetsReady && fontsReady) || forceDone) && minPassed;

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: heroLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
          transition: { duration: 0.85, ease: EASE, delay },
        };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex flex-col overflow-hidden pt-28 lg:pt-36"
      aria-labelledby="hero-title"
    >
      <HeroPreloader visible={!heroLoaded} />

      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/hero/hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
          onLoad={() => markAsset("bg")}
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) markAsset("bg");
          }}
        />
        {/* Dark scrim for text legibility over the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,7,0.86)_0%,rgba(5,8,7,0.55)_36%,rgba(5,8,7,0.35)_62%,#050807_97%)]" />
        <div className="grid-lines absolute inset-0" />
      </div>

      {/* ── Copy ── */}
      <div className="container-site flex flex-col items-center text-center">
        <motion.p
          {...enter(0.05)}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium tracking-[0.22em] text-mist uppercase backdrop-blur-md"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(0,168,123,0.9)]"
          />
          Healthcare Software &amp; Hardware
        </motion.p>

        <motion.h1
          {...enter(0.14)}
          id="hero-title"
          className="display-hero grid max-w-4xl"
        >
          <span className="sr-only">{HEADLINE}</span>
          {/* Height reservation. The typewriter retypes the headline forever,
              and at narrow widths a partial headline wraps to fewer lines than
              the full one — so without a sizer holding the tallest state the
              h1 shrinks and grows on every cycle, reflowing the whole page
              below it (the footer visibly bounces). This sizer occupies the
              same grid cell as the animated text and is never smaller. */}
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1"
          >
            {HEADLINE}
            <span className="typing-cursor">|</span>
          </span>
          <span aria-hidden="true" className="col-start-1 row-start-1">
            <span className="text-brand-gradient">{typed}</span>
            {!reduce ? <span className="typing-cursor">|</span> : null}
          </span>
        </motion.h1>

        <motion.p {...enter(0.24)} className="lead mt-6 max-w-2xl text-pretty">
          Healthcare software and hardware solutions designed to connect
          clinical workflows, medical data, and intelligent technology.
        </motion.p>
      </div>

      {/* ── Hologram stage ── */}
      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 40 },
              animate: heroLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 },
              transition: { duration: 1.1, ease: EASE, delay: 0.42 },
            })}
        className="container-site relative mt-4 flex flex-1 flex-col justify-end sm:mt-0"
      >
        <div className="relative mx-auto w-full max-w-5xl">
          <HologramStage
            onBaseLoad={() => markAsset("holo")}
            onRevealLoad={() => markAsset("reveal")}
          />
        </div>
      </motion.div>

      {/* ── Statistics band (full page width) ── */}
      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 24 },
              animate: heroLoaded
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 },
              transition: { duration: 0.9, ease: EASE, delay: 0.55 },
            })}
        className="w-full"
      >
        <StatsBar />
      </motion.div>

      {/* Seamless fade into page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  );
}
