# Reserve design system — French minimal × Black Mirror

The design spec for `rsrvlabs/www` (and later the Reserve research blog). Aesthetic target
(founder, 2026-07-03/04): **法式簡約 × 黑鏡科技, unmistakably post-2026 — explicitly NOT the
"Google / engineer 華國美學" look.** References analyzed 2026-07-04: insforge.dev (component +
motion grammar), ploy.ai (component play), scrunch.com blog (editorial system). Tokens live in
`src/app/globals.css`; this file is the *why* and the rules.

## The thesis — 暗色系法式簡約 (night-first, founder decision 2026-07-04)

**The site is dark-based.** Founder ruling: the warm-cream base was legacy-copy residue, not the
brand ("暗色系的法式簡約…色盤之類的都要改掉"). The brand tone is **dark French minimalism ×
Black Mirror glass**: warm near-black (`night`) as the ground, cream `paper` as the *voice*
(text, hairlines, rare surfaces), one gold `sun` accent. The French half is carried by
**typography, whitespace, and hairlines** — not by a cream background. Three layers on the dark
ground:

1. **A mono "machine" layer** — ALL metadata (labels, dates, tags, stats, nav, list markers) in
   mono. Serif speaks to humans; mono is the machine annotating the page.
2. **Technical grammar** — grid-paper texture, collapsed 1px lattices, odometer numbers, the
   night-shift timeline: the instrument room aesthetic.
3. **Engineered motion** — enter-once choreography and sub-200ms micro-interactions; never
   decorative scroll-jack.

Token names keep their meanings (`paper` = the light values, `night` = the dark ground) — what
flipped is which one is the background. Legacy pastoral imagery sinks into the night (reduced
opacity + night fades) until the materials re-shoot lands. **"Room/rooms" language is purged**
(legacy copy residue — founder call, same date).

## Typography (role trichotomy — hierarchy from role, not weight)

| Role | Face | Used for |
|---|---|---|
| Content / display | **Gambarino** (existing serif) | H1/H2, body prose, pull quotes — display sizes at **weight 400** (32–54px+, leading ≤1.1 for display, 1.7 for prose) |
| Machine / metadata | **mono** (pick: IBM Plex Mono or Departure Mono; pin in tokens) | tags, dates, bylines, stats, table labels, list markers (`decimal-leading-zero` → "01. 02."), nav sublabels |
| UI chrome | **Supreme** (existing sans) | buttons, forms, small UI |

Rule: if a string is *about* the content (metadata), it's mono. If it *is* the content, serif.

## Color rules

- **No pure white / pure black anywhere** (scrunch's "expensive" trick; our OKLCH tokens already
  comply — keep it that way).
- **Paper sections:** paper/ink + hairlines; accent budget ≈ zero. Branded `::selection` (already
  ink-on-paper inversion — keep as signature).
- **Dark sections (`night`):** surfaces stepped `night → +1 → +2` (like insforge #0f0f0f→#161616→
  #262626 but in our warm-dark OKLCH); borders 2-step (structural vs card); **exactly ONE accent**
  — default `sun` (warm gold reads French even in the dark; do NOT add a second accent without
  updating this file).
- **Separator discipline:** paper sections divide with **1px dashed ink@12–15%** hairlines (no
  shadows, no boxes); dark sections divide with **collapsed solid 1px lattices** (cells share
  borders, outer edges removed). Two grammars, never mixed in one section.

## Motion rules

- **Enter-once choreography** (insforge grammar): IntersectionObserver (~`-25%` rootMargin) flips a
  class once; a short CSS/GSAP timeline runs — line-draws via `stroke-dashoffset`, elements pop
  with back-out overshoot `cubic-bezier(.34,1.56,.64,1)` at 300–350ms, staggered. No re-trigger.
- **Micro-interactions 120–200ms**: `brightness(.96)` on filled buttons; `bg-white/5` (dark) or
  `bg-ink/4` (paper) on ghosts; animated `h-px` underline `w-0 → w-full` 200–300ms (use
  `box-decoration-break: clone` for wrapping links); image hover `scale(1.02–1.05)` 300–500ms.
- **Numbers = odometer slots** (overflow-hidden digit columns, `transform .4s
  cubic-bezier(.22,1,.36,1)`, `tabular-nums`).
- **Ambient motion is rAF translate3d** (already the deck.gl/lenis world) — cheap, GPU, endless.
- **`prefers-reduced-motion` is mandatory** on every animation.
- Lenis smooth-scroll stays; **no scroll-jacking** (choreograph on enter, don't scrub the story).

## Texture

- Paper grain overlay (existing) on paper sections.
- **Grid-paper background** on dark/technical sections: two 1px linear-gradients at ~40px,
  border-color at ~50–60% alpha, masked to fade at edges.
- Gradient-border "hub" trick for the one hero element per dark section:
  `background: linear-gradient(surface,surface) padding-box, linear-gradient(90deg, ink-inverse,
  accent) border-box` + transparent border.

## Blog blueprint (Reserve research — future, from scrunch)

Wide→narrow funnel: mono metadata bar (left-hairline items) → serif H1 at ~1140px → hero image
~1496px `aspect-2/1` → **body at 850px, 19px serif, line-height 1.7**; 5rem drop cap on the first
paragraph; centered italic serif pull quotes (~31px, no border); dashed-divider tables + related
grid; mono `::marker` numbered lists; author footer behind a dashed hairline. Dark "data study"
interlude sections reuse the dark-section grammar above.

## ploy.ai findings (component play — verified from fetched source)

Astro + React islands + Tailwind 4 + **GSAP/ScrollTrigger**; monochrome + pastel "ink-pair"
accents; FK Screamer condensed display. Techniques adopted into our rules:

- **Ink-pair accents:** any accent color ships WITH a hand-picked dark "ink" text color for
  on-accent contrast, both as semantic tokens (never auto-black on accent).
- **U+2800 Braille micro-animations** in small mono tiles (JS frame generator: base 10240 + dot
  bits; patterns like rain/orbit/helix) — "machine thinking" texture at ~1KB. Perfect for our dark
  sections; candidate for the arrival veil's loading state.
- **Punch-card corner dots + hover-paint:** tiny corner dots as card identity; flood the card with
  its accent on group-hover (300ms ease-out, `--accent` var).
- **Scroll-scrubbed char fill:** split a display headline into char spans; ScrollTrigger `scrub:1`
  tweens color from ~12%-alpha ink to full ink between per-heading `data-scrollstart/end` — reveal
  tied to reading pace. (Our one sanctioned scrub effect; still not scroll-jack.)
- **Per-char elastic button hover:** stagger .017, .15s power2, settle `elastic.out(1,0.5)`.
- **House easing pair** (their consistency lesson): one entrance ease (~.7s `cubic-bezier(.22,1,.36,1)`)
  + one UI ease (.15–.3s `cubic-bezier(.32,.72,0,1)`) — matches our motion rules above; do not
  multiply easings per component.
- **30-line card-tilt hook** (mousemove rotateX ±8°/rotateY ±12°, shadow from tilt angle,
  `prefers-reduced-motion` bail) — no library needed.
- **Ambient loops start `paused`**, played by IntersectionObserver — performance + battery win;
  apply to any marquee/loop we add.

## Implementation status

- **2026-07-04 — layer 1 SHIPPED** (tokens + machine layer + weather interlude): `@theme` gained
  the pinned mono stack, house easings (`--ease-enter/ui/pop`), night surface/line ladder;
  utilities `.kicker` / `.link-underline` / `.grid-paper-night` / `.hairline-dashed(-night)`;
  all six section labels converted to mono kickers with `NN ·` machine indices; weather wears the
  full dark grammar (grid-paper lattice + dashed-hairline mono footer with left-hairline items +
  `04/06` index); wordmark's Write link → mono + growing underline.
- **Convergence note:** legacy framer `ease: [0.19, 1, 0.22, 1]` arrays should migrate to the
  house pair (`[0.22, 1, 0.36, 1]`) as each section is revamped — don't batch-churn them.
- Next layers (design-revamp ticket): dark-section card lattices where real cell grids exist,
  odometer stats, enter-once choreography upgrades, materials re-shoot, Braille loading texture.

## Site information architecture (agreed direction, 2026-07-04)

**The landing is the company's most-meta frame** (founder's words) — the story layer, not the
product docs. Phase 1 (now): one domain, path-based IA with the founder's categorization
(**verbatim — do not re-bucket**, founder 2026-07-04):

- `/` — the landing (meta frame, six beats)
- `/sw` — **Flagship SW** (top-level, NOT nested under labs; slug is a working name — the real
  domain follows the product's still-TBD name at graduation)
- `/labs` — finance 產品 (Fermi `LIVE`, Feynman `EXPERIMENTAL`) + beauty tech (Glow `EXPLORING`)
- `/frontiers` — client work (forward-deployed AI engineering)
- `/research` — blogs (the scrunch blueprint above)
- `/effects` — Effects & testimonials (own top-level item; NO fabricated quotes — effects format
  until real client words are collected)

Every product carries an honest mono status tag (`LIVE / IN TESTING / EXPERIMENTAL / EXPLORING`).
Phase 2: SW graduates to its own domain/brand when named + launching. Phase 3: standalone Fermi
surface only if the B2B white-label pivot lands.

## Reference teardowns (evidence base)

Exact tokens / component recipes / motion specs from the three founder-chosen sites live in
**`design-refs/`** (insforge.md · ploy.md · scrunch.md — extracted 2026-07-04 from fetched
production assets, each with an "already adopted / not yet" ledger). Implement from those files,
not from memory; re-verify exact values against the live sites before long-term bets.

## Process rules

- Tokens change ONLY in `globals.css` `@theme` + a matching note here. No ad-hoc hex in components.
- Every new section states which grammar it uses (paper vs dark) — mixing needs a reason written here.
- Reference teardowns (raw HTML/CSS of insforge/scrunch) are in the analysis session scratchpad;
  re-fetch fresh if lifting exact rules.
