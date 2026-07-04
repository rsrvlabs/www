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
motion rules) · **hero display scale-contrast** (Step 1 2026-07-04: wt400 big-but-light +
tight leading from the computed H1 values — hero at clamp cap 7.4rem / leading 1.02 /
tracking −0.03em, kicker shrunk + wider-tracked) · **single-accent headline span** (Step 1:
"AI-native" in sun — one accent per headline, their `#6ee7b7`-span signature) ·
**collapsed-border lattice** (Step 2 2026-07-04: landing 03 · Index doors as one engineered
grid — ours via grid `gap-px` over a `night-line` ground instead of their nth-of-type edge
removal, same collapsed read; outer frame 1px `night-line-strong` + `bg-clip-padding`,
2-step borders; legend header cell carries the section's machine plate). **Not yet:**
gradient-border hub, line-draw choreography, marquee, agent-view toggle.

## Computed (rendered) values — 2026-07-04 live extraction

> Extracted from the LIVE rendered page (gstack browse headless, 1440×900, networkidle +
> settle) via `getComputedStyle` — not static CSS. Founder asked for computed values.

- **Body (rendered):** background `rgb(10,10,10)` = **`#0a0a0a`** · color `#ffffff` · font
  `Inter`. **DIFFERENCE vs static analysis:** we recorded bg as `#000`/`#0f0f0f`; the actual
  page ground is **#0a0a0a** (Tailwind `neutral-950`). `#000` is only the nav bar; `#0f0f0f`
  appears as the agent-toggle track.
- **H1 (hero):** Manrope · 48px · **weight 400** · letter-spacing normal · line-height
  56.16px (**1.17** — static analysis said 48/64; rendered is tighter) · `#ffffff`.
- **H2:** section H2 renders **48px** (static said 40) · feature H2 32px — both Manrope 400.
- **Surfaces (computed):**
  - nav: bg `#000000`, border `#333333`
  - change-card: bg **`#161616`**, border 1px `#333333`, radius 4px, no shadow
  - community-btn: bg **`#262626`**, border 1px `#414141`, radius 4px
  - stats card: bg transparent, border 1px **`#404040`**, radius 6px
  - primary CTA: bg `#ffffff`, radius 4px · Sign Up / toggle pill: bg `#6ee7b7`, radius 4px / 999px
  - YC badge: bg `rgba(255,90,0,.1)`, border `rgba(255,90,0,.4)`, radius 8px
- **Accents (page-wide saturated-color scan):** `#6ee7b7` (8 elements — the single accent,
  confirmed) · `#ff5a00` (3 — YC badge branding only). No other saturated color renders.
- **:root custom properties (live):** hover ladder `--alpha-inverse-4/8/12/16` =
  `#ffffff0a/14/1f/29` (4/8/12/16% white — static said .04/.06/.08); grayscale is Tailwind
  **neutral** = true zero-chroma OKLCH: `neutral-950 oklch(14.5% 0 0)` (= the #0a0a0a body),
  `-900 oklch(20.5% 0 0)`, `-800 oklch(26.9% 0 0)`, `-700 oklch(37.1% 0 0)`,
  `-500 oklch(55.6% 0 0)`, `-400 oklch(70.8% 0 0)` (= muted text #a3a3a3). 209 vars total.
- **Takeaway for our neutral ladder:** insforge's entire dark ground is **hue-free**
  (chroma 0) — ground #0a0a0a, surfaces #161616/#262626, borders #333/#404040/#414141,
  muted text #a3a3a3. The "expensive dark" here is neutral, not warm.
