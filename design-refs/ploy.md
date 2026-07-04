# ploy.ai — component play & motion system

> Extracted 2026-07-04 from fetched production assets: 177KB static HTML, 2 CSS bundles, 10+ JS
> component chunks (incl. `use-card-tilt.js` read in full). Founder: 組件設計的很有趣.
> Stack: Astro + React islands, Tailwind v4 (CSS-first `@theme`), CVA variants,
> **GSAP + ScrollTrigger** + framer-motion islands + Swiper. No Lenis — scroll effects are pure
> ScrollTrigger scrub. Maps 1:1 onto our Next 16 + Tailwind 4 + GSAP + framer stack.

## Tokens

- **Scheme:** near-total monochrome + pastel accents. Light `#f4f4f4`/`#fff`, text `#212121`,
  secondary `#555`, borders `#e3e3e3` + alpha `#21212114`; full dark theme via `data-theme`
  (`#000`/`#080808`, text `#f5f5f5`).
- **Ink-pair accents** (the key trick): every accent ships with a hand-picked dark text color for
  use ON it — yellow `#fffa64`/`#f4ef4c` ↔ ink `#441f16`; green `#d1f48c`/`#d1f864` ↔ `#273416`;
  pink `#ffb8fc` ↔ `#9a0103`; blue `#c3dbff` ↔ `#0a0d27`. Data-viz `#5b8def` `#7cb518`.
- **Type:** FK Screamer ultra-condensed display — hero 144px → 56 mobile, `leading-[0.86]`,
  uppercase, `-0.02em`; body Geist variable 1.5; mono for terminal bits. Semantic font tokens
  (`--font-heading-bold-weight: 800`).
- **Radius by ROLE:** `--radius-button: 100rem` (pill) · `--radius-card: .75rem` ·
  `--radius-input: .375rem`. 1px borders everywhere. Token naming exemplary:
  `--ploy-text-tertiary`, `--ploy-button-primary-*` — all semantic, themed twice.

## Components

- **Punch card (signature):** 4 corner dots as card identity; CVA variants set `--punch-accent`;
  `hover-paint` variant floods the card bg with its accent on group-hover (300ms ease-out).
- **Braille tiles:** 36px mono tiles animating U+2800 dot-matrix frames (base 10240 + dot bits);
  patterns `helix` `waverows` `rain` `orbit`; accent on black. ~1KB.
- **Night-shift section** ("You slept 8 hours. Ploy didn't."): scrubbed timeline, pulsing status
  dots (`nightShiftDot 2.4s`), sweeping progress (`nightShiftProgress 1.8s`), live feed boxes.
- **Display heading:** every char wrapped `data-el="ploy-effect-char"`, GSAP-driven.
- **Film hero** (full-bleed autoplay video + poster), big-number counters
  (`data-visitors-start/end`), proof marquee, notebook cards, FAQ accordion, floating 3D balloon
  loop videos inline in headings.

## Motion

- **Hero intro:** `opacity:0; translateY(12px)` → 0, `.72s cubic-bezier(.22,1,.36,1)` `both`.
- **Scroll-scrubbed char fill:** ScrollTrigger `scrub:1`, per-heading `data-scrollstart="top 80%"`
  / `data-scrollend`, chars fill `#2121211f` → full ink; eases expo/power4; `clamp()` starts.
- **Per-char elastic button hover:** stagger `.017`, `.15s power2.out/in`, settle
  `elastic.out(1,0.5)`, rotationX/Y/Z per char.
- **Card tilt hook (30 lines):** mousemove → `rotateX ±8° / rotateY ±12° / scale 1.02`,
  `perspective: 800px`, shadow depth computed from tilt angle, `.3s ease-out`,
  **bails on prefers-reduced-motion**.
- **System:** UI transitions .15–.35s; house ease `cubic-bezier(.32,.72,0,1)`; entrance ease
  `cubic-bezier(.22,1,.36,1)`; marquee `36s linear` **initialized paused**, played by
  IntersectionObserver (`threshold: .15`); nav popover −6px/fade in, −4px out.

## Already adopted in www

house easing pair (tokens) · punch-card corners + tilt (doors, restrained: ±4/±6, no
hover-paint flood) · Braille rain (veil loader) · night-shift timeline concept
(04 · While you sleep, enter-once instead of scrub). **Not yet:** ink-pair accent system,
char-scrub fill, per-char elastic hover, film hero, paused-marquee pattern.
