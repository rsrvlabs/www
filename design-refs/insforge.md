# insforge.dev — dark component & motion grammar

> Extracted 2026-07-04 from fetched production assets: 232KB SSR HTML, 6 CSS bundles, the
> landing JS chunk. Founder praised its 元件設計與動效. Stack: Next.js App Router on Vercel,
> Tailwind + Radix/shadcn primitives, CSS Modules for bespoke components. **No motion library**
> — all choreography is CSS keyframes + IntersectionObserver + rAF; `prefers-reduced-motion`
> honored globally.

## Tokens

- **Color (dark-only):** bg `#000` / `#0f0f0f`; surfaces `#161616` `#181818` `#1f1f1f` `#262626`;
  borders `#333` (structural) / `#404040` (cards); muted text `#a3a3a3`; text `#fff`;
  **single accent `#6ee7b7`** (emerald-300). Hover ladder: `rgba(255,255,255,.04/.06/.08)`.
- **Type:** Manrope **weight 400** display (hero 48/64, sections 40/48, features 32) — big but
  light; Inter body; Fira Code / IBM Plex Mono / Departure Mono for code/labels;
  `font-variant-numeric: tabular-nums` on stats. Self-hosted next/font woff2.
- **Radius:** 4px / 6px, 999px pills; feature cells square (0). Padding rhythm 24/32/40/80.

## Components

- **Collapsed-border lattice:** 13 services as square cells sharing 1px `#333` borders
  (nth-of-type logic removes doubled/outer edges) — one engineered grid, not floating cards.
- **Grid-paper background:** two 1px linear-gradients at 40px in `rgba(51,51,51,.6)`,
  `mask-image` fade at edges.
- **Gradient-border hub:** `background: linear-gradient(#1f1f1f,#1f1f1f) padding-box,
  linear-gradient(90deg,#fff,#6ee7b7) border-box` + transparent border.
- **Logo marquee:** 90s linear infinite, `mask-image` edge fades, grayscale→color crossfade on
  hover (stacked mono+color SVGs, opacity .2s).
- **Odometer stats:** digit slots `0.62em × 1.1em` overflow-hidden; column translates
  `-N×1.1em`, `transform .4s cubic-bezier(.22,1,.36,1)`.
- **Nav underline:** `after:` pseudo `h-px w-0 → hover w-full`, bg-white, 200ms.
- **HUMAN/AGENT toggle** — serves a markdown "agent view" of the site (UA-sniffed llms.txt-style
  page for bots). Memorable positioning move.

## Motion

- **Enter-once choreography:** IntersectionObserver (`rootMargin: 0 0 -280px`) flips `is-playing`
  once → ~5s CSS timeline: SVG line-draws via `stroke-dashoffset` (.2–.4s), dots pop with
  back-out `cubic-bezier(.34,1.56,.64,1)` at ~.35s (`scale(0)→1.4→1`), labels rise `.3s
  ease-out`; JS computes inline delays.
- **Ambient rAF:** icon columns `translate3d` with `(t×speed+phase) % cyclePx`, tripled content,
  `will-change: transform`.
- **Hover grammar (120–200ms):** filled buttons `filter: brightness(.96)`; ghosts `bg-white/5`;
  icon chips `bg-neutral-700 → emerald-300 + text-black` on group-hover; feature titles
  `text-shadow: 0 0 8px rgba(255,255,255,.5)` glow; CTA press `transform 70ms ease-out`.

## Already adopted in www

grid-paper (`.grid-paper-night`; since 2026-07-04 also the title band on every subpage) ·
odometer (`visuals/odometer.tsx`) · hover-duration grammar · enter-once principle (DESIGN.md
motion rules). **Not yet:** collapsed-border lattice, gradient-border hub, line-draw
choreography, marquee, agent-view toggle.
