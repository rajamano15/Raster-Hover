"use client";

import { memo, useEffect, useRef } from "react";

/**
 * Dot Field — adapted from React Bits (MIT), `Backgrounds/DotField`.
 * https://reactbits.dev/backgrounds/dot-field
 *
 * The simulation is the original: two displacement modes (bulge and
 * velocity-based force), the mouse-speed "engagement" ramp that fades the
 * effect in only while the cursor is actually moving, sparkle sizing, wave
 * offset, and the single-path batched fill that keeps a few thousand dots
 * cheap. Adapted to run as a site-wide background rather than a box inside a
 * page:
 *
 *  1. Fixed to the viewport, not measured from a parent element.
 *  2. Cursor tracked via clientX/clientY instead of pageX/pageY. The original
 *     subtracts a scroll-inclusive offset captured at resize time; against a
 *     fixed layer that offset goes stale the moment the page scrolls, and the
 *     displacement would trail the cursor by exactly the scroll distance.
 *  3. Honours prefers-reduced-motion (paints one static field, no rAF loop)
 *     and idles while the tab is hidden.
 *  4. No cursor-following radial glow — ambient spotlights are reserved for
 *     cards (see BorderGlow). The dot displacement is a movement, not a light,
 *     so it stays.
 */

const TWO_PI = Math.PI * 2;

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type DotFieldProps = {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
};

const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 15,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = false,
  bulgeStrength = 67,
  sparkle = true,
  waveAmplitude = 0,
  gradientFrom = "#00A87B",
  gradientTo = "rgba(180, 151, 207, 0.25)",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const engagement = useRef(0);

  // Read live prop values inside the loop without re-creating it every render.
  const propsRef = useRef({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });
  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let frameCount = 0;

    const buildDots = (w: number, h: number) => {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let i = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[i++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    };

    const beginFill = () => {
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      ctx.fillStyle = grad;
      ctx.beginPath();
    };

    const paintStatic = () => {
      const p = propsRef.current;
      const rad = p.dotRadius / 2;
      beginFill();
      for (const d of dotsRef.current) {
        ctx.moveTo(d.ax + rad, d.ay);
        ctx.arc(d.ax, d.ay, rad, 0, TWO_PI);
      }
      ctx.fill();
    };

    const doResize = () => {
      // Viewport-sized: this layer is fixed, so it never needs a parent rect.
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      buildDots(w, h);
      if (reduce) paintStatic();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const updateMouseSpeed = () => {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    };

    const tick = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const p = propsRef.current;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;

      beginFill();

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          if (isBulge) {
            const f = 1 - dist / cr;
            const push = f * f * p.bulgeStrength * eng;
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
          } else {
            // Force mode: velocity accumulates from cursor speed, so fast
            // sweeps scatter the field and it drifts back on its own.
            const move = (500 / dist) * (m.speed * p.cursorForce);
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (p.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        // Sparkle: a deterministic hash picks ~3% of dots each few frames to
        // draw oversized, so the field twinkles without per-dot state.
        let r = rad;
        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if (hash % 100 < 3) r = rad * 1.8;
        }

        ctx.moveTo(drawX + r, drawY);
        ctx.arc(drawX, drawY, r, 0, TWO_PI);
      }

      ctx.fill();
      rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    };

    doResize();
    window.addEventListener("resize", onResize);

    let speedInterval: ReturnType<typeof setInterval> | undefined;
    if (!reduce) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      speedInterval = setInterval(updateMouseSpeed, 20);
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (speedInterval) clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Dot geometry changes need the grid rebuilt; the loop reads everything else
  // live from propsRef.
  useEffect(() => {
    const { w, h } = sizeRef.current;
    if (w > 0 && h > 0) {
      const step = dotRadius + dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let i = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[i++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }
  }, [dotRadius, dotSpacing]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
});

export default DotField;
