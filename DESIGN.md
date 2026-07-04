# Reserve design system — brutalist × French minimal

The design spec for `rsrvlabs/www` (and later the Reserve research blog). Aesthetic target
(founder, 2026-07-03/04): **法式簡約 × 黑鏡科技, unmistakably post-2026 — explicitly NOT the
"Google / engineer 華國美學" look.** References analyzed 2026-07-04: insforge.dev (component +
motion grammar), ploy.ai (component play), scrunch.com blog (editorial system). Tokens live in
`src/app/globals.css`; this file is the *why* and the rules.

## The thesis — 暗色系法式簡約 (night-first, founder decision 2026-07-04)

**The site is dark-based.** Founder ruling: the warm-cream base was legacy-copy residue, not the
brand ("暗色系的法式簡約…色盤之類的都要改掉"). The brand tone is **dark French minimalism ×
Black Mirror glass**: neutral near-black (`night`) as the ground, cream `paper` as the *voice*
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

### 2026-07-04 amendment — brutalist × French minimal (the ground goes NEUTRAL)

**Founder direction change (2026-07-04):** the aesthetic is **brutalist web design × French
minimal** — raw **neutral** near-blacks as the ground (NOT warm brown — the warm-hue dark
ground was rejected as 大便色), hard 1px borders, stark contrast, structure exposed. Cream
serif `paper` stays as the TEXT voice; the one gold `sun` accent is retuned (chroma 0.12 →
0.10) for the neutral ground. Step 0 (this reset) re-derived the night ladder as zero-chroma
OKLCH from insforge's **rendered** values (`design-refs/insforge.md`, computed section):
`night oklch(0.145 0 0)` ≈ #0a0a0a · `night-soft oklch(0.205 0 0)` ≈ #171717 ·
`night-deep oklch(0.12 0 0)` ≈ #050505; night lines/lattices/grain neutralized; the hero silk
recolored bronze → graphite `#2e2e2e` (dark fabric, not metal). Sections change one step at a
time with founder approval — no redesign rides along with a token flip.

**Lesson (recorded so it isn't relearned): hue inheritance across ground-flips is a trap.**
When the site flipped cream→dark, the night tokens inherited the paper palette's warm hue
(~60°) — a hue that reads "expensive" at L 0.96 reads **brown** at L 0.22. When a ground
flips, re-derive its neutrals from zero; don't scale the old hue down the lightness axis.
(Both reference darks are hue-free: insforge's rendered ladder #0a0a0a/#161616/#262626 and
ploy's #f4f4f4→#212121→#000 carry chroma 0 — color lives only in the accent.) In the globe
(`visuals/city-map.tsx`) the GROUND token-mirrors (NIGHT/NIGHT_DEEP/WATER — canvas backdrop,
map background, fog, water) followed the reset to neutral hex; the warm land-relief tuning
(ink/dusk/sun/moss/sand constants) is imagery-layer and untouched at Step 0 — re-tune it in
the places step. Same for the weather haze raster: desaturated via CSS `grayscale` (a warm
JPEG screen-blended over neutral ground re-browns the whole section) — interim only;
removed entirely at Step 3 (the section is now pure code-generated structure).

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
- **Dark sections (`night`):** surfaces stepped `night → +1 → +2` (insforge's rendered
  #0a0a0a→#161616→#262626, ours as zero-chroma OKLCH); borders 2-step (structural vs card);
  **exactly ONE accent** — default `sun` (warm gold reads French even in the dark; chroma
  retuned 0.12→0.10 on the neutral ground; do NOT add a second accent without updating this
  file).
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

## Blog blueprint (Reserve research — SHIPPED 2026-07-04, from scrunch)

Wide→narrow funnel: mono metadata bar (left-hairline items) → serif H1 at ~1140px → hero image
~1496px `aspect-2/1` → **body at 850px, 19px serif, line-height 1.7**; 5rem drop cap on the first
paragraph; centered italic serif pull quotes (~31px, no border); dashed-divider tables + related
grid; mono `::marker` numbered lists; author footer behind a dashed hairline. Dark "data study"
interlude sections reuse the dark-section grammar above.

**Implemented at night** on `/research` (index: featured series entry + list rows with mono
`NN · S01` markers and honest `PUBLISHED / IN PROGRESS` status) and
`/research/ai-native-company` (post: metadata bar → narrow serif H1 → 850px body → drop cap →
centered pull quote → dashed author footer). **Font call (tested 2026-07-04): Gambarino holds
at 19px/1.7 as body** — legible, warm, only mildly display-flavored on screenshots — so body
prose stays serif per the trichotomy; revisit only if long-form (>2k words) posts feel tiring.
No hero image until an honest one exists (no stock, no generated filler).

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
- **2026-07-04 — layer 2 SHIPPED** (places night globe · subpage editorial kit · research blog):
  the places map reads night end-to-end — natural-earth raster desaturated to moon-stone relief
  on near-black ocean (hue-rotation to "warm" it turns the Sahara lavender; don't retry), road
  casings + pattern fills hidden, waterway lines/aeroways sunk to ink, stacked park greens calmed —
  and city + major-country labels re-enabled in kicker grammar (uppercase, 0.14em tracking,
  latin-only, paper on night-deep halo): the machine layer annotating the planet. Base style stays
  openfreemap `liberty` (its `dark` sibling ships no building-3d and no natural_earth — verified).
  Subpages: mono metadata bars under every H1, punch-card Entry rows via the shared
  `site/punch-card.tsx` (extracted from DoorCard), grid-paper-night title bands, real dashed row
  dividers. `/research` wears the blog blueprint (above). Screens harness waits for the globe
  restore before the places shot.
- **2026-07-04 — Step 1 SHIPPED** (hero typography + accent + decrypt, from insforge computed
  values): display scale-contrast — hero clamp cap raised 6.5rem → **7.4rem** (NOT the ~8rem
  first proposed: measured, line 1 needs ~11px of width per font-px, so >120px wraps inside
  the 1328px content column), slope 7.5vw, tracking −0.03em, leading 1.02 (insforge H1
  grammar: wt400 big-but-light, tight leading — Gambarino stays); hero kicker dropped to
  0.62rem / 0.3em tracking for scale-contrast against the display; **single gold accent
  span** on "AI-native" (insforge single-accent signature — sun at chroma 0.10 reads gilded,
  not loud, on the neutral ground); hero kicker enters by **decrypt/scramble**
  (`visuals/decrypt-text.tsx` — hand-rolled ~40-line client component, no deps, house
  enter-ease feel, reduced-motion renders final text; **veil-gated** via the new
  `reserve:veil-lifted` window event from `arrival-veil.tsx`, because mount-time entrances
  finish unseen behind the opaque veil); bottom machine row (EST. MMXXIV · BOOTSTRAPPED ·
  TAIPEI) → scrunch left-hairline metadata items at 0.6rem mono. Hero grid-paper band
  considered and skipped: the silk shader is the hero's texture; a lattice over moving
  fabric competes (grid-paper stays the flat-dark-section grammar).
- **2026-07-04 — Step 2 SHIPPED** (doors → collapsed-border lattice, from insforge): the
  03 · Index section rebuilt as ONE engineered grid — square cells sharing 1px `night-line`
  borders via CSS grid `gap-px` over a `night-line` container ground (the container color IS
  the shared border, so no nth-child edge de-duping needed), outer frame a clean 1px
  `night-line-strong` with `bg-clip-padding` so the two alpha lines don't compound (2-step
  borders: frame > partitions). Cell plan: thin legend strip (the section kicker + `five
  doors · 03/06` machine plate lives IN the lattice as its header cell), flagship spanning
  the full row, then the 2×2 doors. Copy unchanged. Hover keeps the punch-card craft —
  corner dots→sun, night-soft surface rise, title underline — but **drops the ploy tilt
  inside the lattice** (a rotating cell shears its shared borders and breaks the engineered
  read; tilt lives on in subpage `PunchSurface` entries). Entrance: the plate rises once as
  a single unit and cell contents stagger in behind it (framer variants, house enter ease,
  `useReducedMotion` zeroes translations) — the grid never appears half-built.
- **2026-07-04 — Step 3 SHIPPED** (weather → instrument panel, from insforge + ploy): the
  04 · While you sleep section is now **fully code-generated** — the interim grayscaled haze
  JPEG (`weather-ambient.jpg` + CSS grayscale + scroll parallax) deleted (warm-era residue;
  raster ambience fought the neutral ground) and replaced with pure structure: the grid-paper
  lattice + ONE zero-chroma radial glow lifting the panel zone. Timeline + odometer stats
  merged onto **one collapsed-border lattice panel** (Step 2 grammar: grid `gap-px` over
  `night-line` ground, 1px `night-line-strong` frame, `bg-clip-padding`): mono timestamp rail
  right-aligned against a shared vertical line, rows densified (py-4 → py-3, 0.88rem/1.55
  lines), stats as the panel's bottom readout row — the editorial air between timeline and
  stats collapsed to a shared 1px line (founder fidelity note: bias TIGHTER, insforge's
  line-density, over loose editorial spacing). Pulsing dots kept (sun fill only on the 08:00
  beat); enter-once plate + content stagger (doors grammar); dashed machine footer (04/06)
  unchanged. Odometer retimed to insforge's COMPUTED slot transition `transform .4s
  cubic-bezier(.22,1,.36,1)` (was 0.9s), and a real bug fixed: framer `useInView` with bare
  `margin: "-15%"` insets **horizontally** too (15% of viewport width), so the leftmost stat
  never intersected and "01" rendered as "00" — in-view trigger margins must be vertical-only
  (`0px 0px -10% 0px`).
- **Convergence note:** legacy framer `ease: [0.19, 1, 0.22, 1]` arrays should migrate to the
  house pair (`[0.22, 1, 0.36, 1]`) as each section is revamped — don't batch-churn them.
- Next layers (design-revamp ticket): enter-once choreography upgrades, materials re-shoot.

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
