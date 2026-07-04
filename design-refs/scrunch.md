# scrunch.com/blog — editorial system

> Extracted 2026-07-04 from fetched production assets: full SSR HTML of a post + the blog index
> + the 340KB CSS bundle. Founder: 整個 blog post 系統很好看. Stack: Astro + Sanity CMS +
> Tailwind v4, Cloudflare; images via cdn.sanity.io; JSON-LD Article schema. Directly portable
> to our stack (token system is literally Tailwind 4).

## Typography — the font-role trichotomy (their core move)

- **Newsreader (variable serif)** = ALL content: H1/H2/H3, body, lists, blockquotes.
- **IBM Plex Mono** = ALL metadata: tags, bylines, dates, table labels, list markers, "Author".
- **Inter** = UI chrome, H4, card descriptions, callouts.
- Scale: H1 `32px → 54px` @ lh 1.1 **weight 400**; H2 28→38 @110% wt500; H3 24; H4 19 Inter.
- **Body: 19px serif, line-height 1.7, measure 850px centered.** Rhythm: headings
  `mt-56/mb-16`, paragraphs `mt-16`, heading+first-para collapses to 4px. **5.2rem serif drop
  cap** on the first paragraph. Readability = big-serif-at-400 + 1.7 leading + warm ink on warm
  paper — never boldness.

## Tokens

- **Paper** `#f4f2ed` (page) / `#fbf9f6` `#f6f4ef` (panels) / `#f0eee9` (placeholders).
  **Ink** `#1d1107` (warm near-black, used for ~everything); dark section `#26180d`;
  dash color `#624c37`. **No pure white or black anywhere.**
- **Accent discipline:** brand accents exist (`#d4ff2a` `#2b4beb` `#eeba15`) but article bodies
  use ONLY `::selection` in `#d8fc3b`.
- **Signature separator:** everything divides with `1px dashed` ink@15% (tables use an
  8px-dash linear-gradient in `#624c37`). No shadows, no boxes.

## Post layout (the blueprint for /research)

- **Wide→narrow funnel:** mono metadata bar → H1 (max-w 1140px) → hero image (max-w 1496px,
  `aspect-2/1`, rounded-lg) → body snaps to 850px.
- **Metadata bar:** mono 14px items each with a **left hairline + pl-4**:
  `takes | By … | Published 07.01.2026`.
- **Floating summary callout** in the left margin at ≥3xl (280px, backdrop-blur, rounded-3xl);
  margin notes hang at `left:100%`. (TOC component exists but is disabled.)
- **Pull quotes:** centered italic serif **31px/1.25**, no border/background, my-48.
- **Lists:** `list-[decimal-leading-zero]` with **mono `::marker`** → "01. 02. 03."
- **Author footer:** dashed top border, grid `[310px_1fr]`, mono "Author" label, 48px round
  avatar, mono underlined name.
- **Related grid:** 3-col with **dashed-border gutters**; 2:1 images, hover `scale-1.03`.
- **Index page:** left-rail mono category nav w/ bar indicator + pre-rendered client search;
  full-width dark interlude (`#26180d` + faint SVG grid) for data studies; list rows
  (mono tag 120px col | serif title | right thumbnail, dashed dividers).

## Motion

- **`animate-underline`:** background-image underline growing 0→100% (1.5px,
  `.3s cubic-bezier(.25,.8,.25,1)`, **`box-decoration-break: clone`** so it wraps) — one class
  powers every link/card hover. Images `scale 1.02–1.05` over 300–500ms.

## Already adopted in www

font-role trichotomy (serif/mono/sans) · dashed hairlines (`.hairline-dashed`) ·
`.link-underline` · mono metadata bars w/ left hairlines (weather/invitation footers; since
2026-07-04 under every subpage H1 via `MetaBar`) · no-pure-B/W discipline · **blog blueprint
(2026-07-04, night-adapted):** /research index (featured entry + list rows: mono tag col |
serif title | dashed dividers, decimal-leading-zero `NN ·` markers) and the
/research/ai-native-company post (wide→narrow funnel, 850px body @ 19px serif/1.7 — Gambarino
tested and holds, drop cap, centered italic pull quote, dashed author footer).
**Not yet:** floating margin callouts, related grid w/ dashed gutters, dark data-study
interludes, hero image treatment (blocked on honest imagery), left-rail category nav + search
(needs >1 series).

## Caveat

Big serif at weight 400 lives or dies by the face — Newsreader is display-optical. Test
Gambarino at 19px/1.7 before committing body text to it; fall back to a body serif if it fails.

## Computed (rendered) values — 2026-07-04 live extraction

> Extracted from the LIVE rendered `/blog/ai-search-q2-2026/` (gstack browse headless,
> 1440×900, loaded + settle) via `getComputedStyle` — not static CSS.

- **Ground (rendered):** `<body>` computes plain **`#ffffff`** with `Inter` — the paper the
  reader actually sees is painted by the page wrapper div: **`rgb(251,249,246)` = `#fbf9f6`**.
  **DIFFERENCE vs static analysis:** we recorded the page paper as `#f4f2ed`; on this post the
  rendered ground is `#fbf9f6` (what we had catalogued as a "panel" value). Warm paper
  confirmed, exact value one step lighter than documented.
- **H1:** Newsreader Variable · **54px · weight 400 · line-height 59.4px (1.1)** · color
  `rgb(29,17,7)` = **`#1d1107`** — exact match with static (the warm near-black ink).
- **H2:** index "More articles" 48px/1.0 wt400; article H2 **38px/41.8 (1.1) wt500** — matches
  the documented 28→38@wt500 scale.
- **Body paragraph (computed):** Newsreader · **19px · line-height 32.3px (1.7)** · `#1d1107`
  · measured column width **850.0px** — the blueprint renders exactly as documented.
- **Metadata bar:** IBM Plex Mono **14px**, left hairline `border-left` in full-strength ink
  `#1d1107` (not alpha).
- **Dashed separators (computed):** ink at **15%** (`oklab(...)/0.15`) and a second stronger
  step at **30%** — static analysis only recorded the 15% one.
- **Surfaces:** nav borders `#e5e5e5`; Copy Link chip bg = ink @ 5%; pill buttons radius
  ~3.4e7px (radius-full).
- **Accents (page-wide scan):** brand blue `#2b4beb` (49 elements — nav/UI links) +
  `#2f4fff` (1). The lime `#d4ff2a` did not render anywhere on this post — article accent
  discipline confirmed: chrome carries the accent, the body carries none.
- **:root custom properties (live):** `--font-serif: var(--font-newsreader)` ·
  `--font-mono: var(--font-ibm-mono)` · `--font-sans: var(--font-inter)` (the trichotomy is
  encoded as tokens); Tailwind `neutral-*` zero-chroma grays present; 301 vars total (a
  `--cc-*` cookie-consent family is third-party noise — ignore).
