# Raster Images — Website

Premium dark healthcare-technology website for **Raster Images**
(*Revolutionizing Digital Healthcare*), built with Next.js 15, TypeScript,
Tailwind CSS v4 and Framer Motion.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

> **Note:** don't run `npm run build` while `npm run dev` is running — both
> write to `.next/` and the dev server will start throwing module-manifest
> errors. If that happens: stop the dev server, `rm -rf .next`, start it again.

## Design system

Defined centrally in [`app/globals.css`](app/globals.css) — no hard-coded
colors inside components.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#050807` | Page background (near-black, never pure #000) |
| `--color-ink` | `#EDF3F1` | Primary text |
| `--color-mist` | `#9FB0A9` | Muted text |
| `--color-faint` | `#71817A` | Tertiary labels |
| `--color-brand` | `#00A87B` | Paolo Veronese Green — CTAs, accents, glow |
| `--color-brand-bright` | `#14CF9C` | Hover / icon accents |
| `--color-brand-ink` | `#031510` | Text on green buttons (AA contrast) |
| `--color-line` | `rgba(255,255,255,0.08)` | Glass borders |
| `--ease-premium` | `cubic-bezier(0.16,1,0.3,1)` | All major motion |

- **Typography:** Bai Jamjuree (local files in `app/fonts/`, loaded via
  `next/font/local`). Regular/Medium default; SemiBold for headings only.
- **Glass surfaces:** `.glass`, `.glass-deep`, `.glass-hover`, `.glass-edge`,
  and `.glass-inset` (for rows nested inside cards). All share the
  `--radius-card` (1.125rem) and `--blur-card` (16px) tokens, an inner
  top highlight + faint green inner glow, and two cursor-tracked hover
  effects (border ring + interior spotlight) driven by `BorderGlow`.
- **Type hierarchy:** `.display-hero`, `.display-page`, `.display-section`,
  `.title-card`, `.eyebrow`, `.lead` (fluid `clamp()` scales, 320px → 1920px).
- Reduced motion is respected globally (CSS media query + `useReducedMotion`).

## Where to add real content

All content that must never be fabricated lives as **typed, empty
collections** — drop entries in and the pages render them automatically
(until then, elegant empty states are shown):

| File | Powers |
|---|---|
| `data/content.ts` | News & events, job openings, team members, client logos, downloads |
| `data/hardware.ts` | Hardware categories — add `image: "/products/x.webp"` per item to replace the icon plate |
| `data/solutions.ts` | Solution categories + products (PACS/RIS link to raster.in) |
| `data/site.ts` | Contact details, offices, nav |

## Forms / backend

Both forms (contact + demo request, page **and** modal) validate client-side
and funnel through a single stub: [`lib/submit.ts`](lib/submit.ts). Connect a
real API/CRM endpoint there — nothing else needs to change.

## Hero

The hero adapts the provided `hero-section/` (typing headline, layered
hologram, spotlight X-ray reveal that follows the cursor). The provided cyan
assets are re-tinted to brand green via a CSS `hue-rotate` filter
(`.hologram-tint`). The 34 MB `3d-hologram-animation.webm` loads **only** on
≥1024px viewports, after idle, when reduced-motion and data-saver are off —
smaller screens get the static hologram image. For production, consider
re-encoding that webm to a smaller bitrate.

## Structure

```
app/            routes (11 pages + 4 solution-category pages, sitemap, robots)
components/
  layout/       Navbar (utility bar + main nav + mobile menu), Footer
  sections/     Hero, PageHeader, CTASection, HomeIntro, FAQSection, …
  solutions/    SolutionExplorer (interactive category tabs)
  products/     HardwareCard, HardwareGrid (filterable)
  forms/        ContactForm, DemoForm, Field primitives
  providers/    DemoModalProvider (opens the demo modal from anywhere)
  ui/           Button, GlassCard, Modal, FAQAccordion, Reveal, EmptyState, …
data/           all editable content, separated from UI
lib/            motion tokens, validation, submission stub
```
