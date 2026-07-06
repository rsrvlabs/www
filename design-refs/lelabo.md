# lelabofragrances.com — the luxury-brutalism archetype (specimen grammar)

> Extracted 2026-07-05 from the LIVE rendered site (www's playwright 1.59 chromium, 1440×900,
> full-scroll DOM census + `getComputedStyle`) plus fetched production HTML/CSS/JS (381KB HTML,
> 4 CSS bundles 387KB). Founder's new key reference: the apothecary/utilitarian register —
> products presented as *specimens*, decoration replaced by information. Pages measured:
> home `/` · PLP `/fine-fragrance.html` (DISCOVERY Classic Collection) · family page
> `/santal-33.html` · buy PDP `/santal-33-147.html?size=50ml`.
> **Access note (honest):** the site geo-gates ("SELECT YOUR LOCATION", geo-IP was TH); census
> run as **United States** by seeding `acdc_region/acdc_country_code/ACDC_LOCALE` cookies (the
> gate requires all three). Values are US-site rendered values.

## 1 · Stack fingerprint

- **Estée Lauder in-house platform ("ACDC")**, server-rendered Java (`lelabo-java` in image
  paths), behind Cloudflare. **No SPA, no React/Next** — jQuery 3.5.1 + jQuery UI, slick + owl
  carousels, selectize, formstone, simplebar. OneTrust consent; Solr search; Vimeo progressive
  MP4 for films; images via `lelabo.ips.photos` rendition server (`IMG_140/360/600/1200` ladder).
- **Zero inline SVG on every page measured.** Icons are a PNG sprite
  (`css/images/sprite/ico-*.png`, 7–22px); the logo is a PNG stamp graphic (`logonew.png`
  147×43 — distressed rubber-stamp texture, not live type).
- Self-hosted EOT/WOFF fonts (see §3). The whole front-end reads ~2014 and hasn't chased a
  single trend — the brutalism is partly *fossilization*, and it works for the brand ("slow
  perfumery"). Lesson: their register comes from **discipline, not technology**.

## 2 · Computed tokens (recorded faithfully — light/clinical, NOT adapted to our night ground)

**The expected "kraft" palette does not exist in CSS.** The stylesheet is clinical
white/grey/black; all warmth (kraft, manila, brass, wood) enters exclusively through
**photographed material**. The one body tint is *cold*, not warm:

- **Ground:** body `#f6f8f6` (near-white with a faint *green-grey* cast — cold lab paper);
  surfaces `#ffffff`, `#f7f7f5`, `#f9f9f9`.
- **Ink:** body color literally `#000000`; working greys `#262626` `#333333` `#404040`
  `#424242`; muted `#6c6c6c`, `#808080`.
- **Grey blocks:** announcement bar `#595959` (white Magda mono on it) · ADD TO CART button
  `#424242` (white caps). These two greys are the only "filled" surfaces.
- **Hairlines:** 1px solid `#ececec` / `#ebebeb` / `#e7e7e7` / `#e8e8e8`, plus
  `rgba(38,38,38,.15)`. Hairlines do all separation work — no shadows, no cards-with-elevation.
- **Accent: NONE.** Full-page saturated-color scan finds zero saturated color on home/PLP/PDP.
  No brand color, no link blue (links are black/grey + underline). Color exists only inside
  photographs.
- **Radius: 0 everywhere** (single 3px exception in the search field). No pill, no rounded card.
- Region gate (fold 0 for a first-time visitor): full-bleed workshop photograph + white modal
  strip, mono `Location:` selectize, grey `ENTER SITE` block — the label grammar starts before
  the site does.

## 3 · Typography — a three-face system with NO serif and a 26px ceiling

| Role | Face (files) | Rendered use |
|---|---|---|
| Display / identity | **Bell Gothic Std** (`bellgothicstd-black` declared wt400, bold 700) — 1930s AT&T phone-book gothic: condensed, industrial, pre-digital | ALL headings + nav + product titles, UPPERCASE, weight 400: nav 13px · card titles **19px/24.7** · home captions 23px · page/buy titles **26px/33.8**. Letter-spacing `normal` everywhere. Also the **body default** (14px/18.2). |
| Label / voice | **Magda** (`magda-light`=400, `MagdaPro`=700) — **true monospace typewriter** (verified: `iiii`=`MMMM`=30.8px @14px, 0.55em advance) | the announcement bar, product type ("eau de parfum" 16px/700), descriptions 14px/700 lh 18.2, card spec rows, search + newsletter + personalization inputs, lowercase utility links (`view more` `view stores` `view list`, underlined, `#6c6c6c`) |
| Commerce chrome | **"Helvetica"** = Helvetica Neue LT Std **Light Condensed** (`ltcn` file) | footer links 14px, prices 13px (cards) / 20px uppercase `#404040` (buy), breadcrumbs 14px/0.28px ls, form labels (`Size:` `Quantity:` `For:`) |

- **The biggest type on the entire site is 26px.** No hero display type at all — identity is
  carried by the stamp logo + the label grammar, and the site *whispers*. (Contrast: our hero
  clamp cap is 7.4rem.)
- Casing grammar: display/titles UPPERCASE Bell Gothic · utility links lowercase mono ·
  chrome sentence-case Helvetica-cond. The mono is the *product's* voice (it is the same
  typewriter voice printed on the physical bottle labels); the gothic is the *institution's*.

## 4 · The SPECIMEN grammar — products as apothecary items

The core discovery. Nothing on the commerce surfaces is "designed" in the decorative sense;
every unit is a **specimen + label block**:

- **Specimen photography:** every SKU is ONE object, centered, on the same grey seamless
  studio ground, square 1:1 (600×600 renditions rendered 265×265; buy page 1200×1200 at
  661×661), flat natural shadow. No lifestyle, no models, no context in the grid — context
  lives only in films/heroes.
- **The label IS the design system.** The physical bottle label (typewriter block: `SANTAL 33 /
  50ml e 1.7 FL.OZ.LIQ. / eau de parfum / natural spray / vaporisateur / in your city / date of
  preparation / your name here`) is the brand's densest artifact, and the site is that label
  scaled up: same mono face, same spec-row structure, same hairline separations.
- **Card anatomy (PLP/family grid, measured):** `photo 265×265` → hairline → `TITLE` (Bell
  Gothic 19 caps, own row, min-height 38) → hairline → **spec row** (Magda mono 14: `237 ml` ⏎
  `perfuming shower gel` — quantity + register, lowercase) → hairline → **action row**
  (`Add to Cart` Helvetica 14 left · `USD $65.00` Helvetica 13 right). 1px `#ececec` internal
  hairlines; radius 0; no shadow; hover changes NOTHING but underline.
- **Dense utilitarian inventory grid:** 4 columns × 267px cells, 23px gutters, cell height 384,
  20–24 identical cells per page, **no featured cell, no size variation, no merchandising
  hierarchy** — a stockroom shelf, not a showroom. (PLP: 20 SKUs in 3.6 folds; family page: 24.)
- **The personalization line — the one intimate gesture, rendered as a form field:** buy-page
  spec table rows `Size:` / `Quantity:` / `For: [personalize here...] (23)` — a Magda-mono text
  input, maxlength 23, live countdown counter, caption `View personalization: label and box`.
  Luxury = *your name typed onto the specimen label*, not gold foil.
- **What replaces decoration: information.** `date of preparation` on every label · the
  announcement bar's one claim ("Every Le Labo creation is mindfully blended, labeled and
  packed by hand") · size/type spec rows · char counter · `USD` prefix on every price ·
  breadcrumb always visible. Facts are the ornament.
- Family-page structure: breadcrumb + 26px title band → full-bleed **dark flat-lay** hero
  (raw ingredients + bottle + kraft box on black cloth, name overlaid white 26px) → the SKU
  inventory grid. Even the "brand moment" is a specimen tray.

## 5 · Asset inventory + grammar

| Page | Height (folds) | Visible assets | First artifact | Density |
|---|---|---|---|---|
| Home | 1,171px (**1.3**) | 3 hero JPEGs 2000×1072 (~170–550KB) + 2 Vimeo MP4s, rotating full-bleed 1440×739 | **112px** (directly under nav) | the whole page = ONE artifact + caption strip + footer |
| PLP | 3,202px (3.6) | 1 banner JPEG 2000×528 + 20 SKU JPEGs 600×600 | 112px | ~5.9/fold |
| Family PDP | 3,574px (4.0) | 1 dark flat-lay banner + 24 SKU JPEGs | 112px (band) / ~170px (photo) | ~6.3/fold |
| Buy PDP | 1,867px (2.1) | 1200×1200 main + 80px thumbs + 360×360 recs | **130px** | ~4.8/fold |

- **Exactly two photographic registers, nothing else:** (a) specimen-on-grey for every SKU;
  (b) documentary workshop for heroes/films — real lab benches, brick, kraft boxes, hands at
  work, muted almost-monochrome grade. Zero illustration, zero 3D, zero abstract texture,
  zero stock-feel, zero generated anything.
- The homepage is **one fold**: nav (32px mono announcement bar + 81px header) + full-bleed
  carousel (2 photos + film) + a 4-column caption strip (Bell Gothic 23 title + Magda desc +
  `View More`) + footer. Radical inventory-first minimalism — the "site" is basically a door.
- Films: Vimeo progressive MP4 (1080p/540p renditions), muted, no controls, inside the same
  full-bleed slot — never decorative background video elsewhere.
- Icon layer: PNG sprites + payment marks + B-Corp badge (trust chip in footer, 100px).

## 6 · Motion — measured minimalism (what moves, and what deliberately doesn't)

- **Keyframes on the entire site: 3.** `homepageFadeOut` (opacity 1→0), `homepageFadeIn`
  (literally opacity 1→1 — a no-op fix class), `dot-flashing` (slider-dot loader swapping two
  sprite PNGs). That's the complete choreography inventory.
- **Transition census (all 4 bundles):** `all .3s` ×30 · `all .2s` ×8 · `opacity .3s` ×8 ·
  a handful of .4/.5s. No easing curves specified anywhere — default `ease` throughout. No
  house easing system; duration discipline (200–300ms) is the only rule.
- **Hover census (97 rules):** dominated by `text-decoration: underline` (17 + 9 + 2 + 2
  variants) and `text-decoration: none`; buttons invert to `#333`/`#fff`; a few opacity
  .8/.9 fades. **Card-image hover verified live: no transform, no opacity change, no zoom —
  the only response is the title link underlining.** No scale, no tilt, no lift, no glow.
- **Scroll: nothing.** 3 IntersectionObservers in the JS — ALL analytics impressions or
  pausing the hero autoplay. No enter-once reveals, no parallax, no scroll-driven anything,
  no GSAP/AOS (animate.css ships but its classes appear unused on measured pages).
- The one ambient motion: the homepage hero crossfade (slick fade, ~6s cadence). Everything
  else on the site holds perfectly still. **Stillness is the luxury signal** — the page
  behaves like the object: inert, heavy, printed.

## 7 · What Reserve takes — two adaptation paths (founder leans A-first; decide at the founder meeting)

**The transferable core (path-independent):** the specimen grammar. Our five doors/products
presented as apothecary items — uniform cells, label-block anatomy (TITLE / mono spec row /
action row, hairline-separated), photography (when it exists) as specimen-on-uniform-ground,
facts as the only ornament, hover = underline. Le Labo also *proves* the assets.md rules at
the extreme: one bespoke asset family (the label), zero fake artifacts, information over
decoration.

### PATH A — keep the night ground, adopt the Le Labo structure

Tokens stay (`night` ladder, `paper` voice, single `sun` accent, mono machine layer). Adopt:

1. **Spec-label card anatomy** into the doors lattice + subpage PunchSurface entries: each cell
   becomes photo/plate → hairline → TITLE row → hairline → mono spec row (status · register ·
   quantity, e.g. `LIVE · us-equities · daily 08:00`) → hairline → action row (link left,
   machine fact right). Our `night-line` collapsed lattice already gives the hairline skeleton;
   what changes is **cell-internal structure** (rows, not free composition).
2. **Uniform inventory density:** cells identical, no size hierarchy. Tension to resolve at the
   meeting: Step 2's flagship-spans-full-row cell is *merchandising*; Le Labo would make SW a
   same-size cell in the inventory. (Data point, not a recommendation.)
3. **The personalization line as a component:** one mono input line as the intimate gesture —
   e.g. the invitation beat becomes `For: [____]` feeding the mailto subject, char-counted.
   One field, no form.
4. **Kill remaining decoration, including the silk** (founder debt #1 resolves as *delete*, not
   recolor): Le Labo carries a luxury brand with zero texture layers — type + hairlines + real
   photography only. Grid-paper stays only if reclassified as *information* (the lattice), not
   mood. The stamp-logo idea (identity as one bespoke graphic artifact) is the honest
   replacement for shader ambience.
5. **Motion tightening, not addition:** keep enter-once choreography (our grammar, they have
   none) but adopt their hover stillness — audit out every remaining hover
   scale/tilt/brightness on cards; hover = underline + surface step only. Durations already
   comply (200–300ms).
6. **Casing/voice merge:** their lowercase mono utility links (`view more`) match our
   `link-underline`; adopt lowercase-mono as the standard utility-link register on night.
7. **A 26px lesson, not a 26px rule:** we keep the 7.4rem hero (our register is
   concept-site, theirs is commerce), but subpage/product surfaces can drop toward
   label-scale display — titles that inform rather than perform.

### PATH B — the full kraft/paper utilitarian flip

Flip the ground to their actual values (recorded in §2 — note it is **cold** `#f6f8f6`, not
warm kraft): body `#f6f8f6`, surfaces `#fff`, ink `#000`→`#424242` ladder, hairlines
`#ececec`-family, muted `#6c6c6c`, filled blocks `#595959`/`#424242`, radius 0, **accent
deleted** (they have none — `sun` would survive only as rare ink, or die). Implications:

1. Every night-grammar section (Steps 1–7 of the revamp) re-derives on paper; dashed-ink
   hairlines already exist for paper sections, but the solid-`#ececec` ladder + grey filled
   blocks are new tokens. The DESIGN.md hue-inheritance lesson applies in reverse: derive the
   light ladder from zero, don't lighten night values.
2. **Kraft warmth cannot come from CSS** — on Le Labo it is 100% photographed material. PATH B
   is therefore **gated on the materials re-shoot** (real kraft/lab/workshop photography of our
   own artifacts); flipping before that exists yields a cold empty lab page with no material
   soul — the exact "AI-generated" smell we're fighting, inverted.
3. Dark survives only as photographic interludes (their flat-lay-on-black band = our former
   night sections demoted to imagery, e.g. the Fermi Discord-at-night capture as a full-bleed
   evidence band).
4. Silk, globe-night styling, night lattices all re-tokenize; the machine layer stays mono but
   flips to `#424242`-on-paper. Biggest-bang order if chosen: tokens → doors inventory grid →
   buy-style product pages on /labs.

No recommendation recorded here beyond the founder's stated lean: **A-first, pending the
founder meeting.**

## Already adopted in www (PATH A — BLACK APOTHECARY round 2026-07-05, SPECIMEN PROPAGATION 2026-07-06)

**Spec-label card anatomy** (§7.1 — **now full**: landing doors lattice cells AND the subpage
PunchSurface entries end in a solid `night-line` hairline + mono spec row of honest machine
facts; the flagship/featured spec row doubles as its action row with a still `enter →` /
`read the first essay →` right. Shared `site/spec-row.tsx` factors the recipe so landing +
subpage read as one system; doors left untouched, founder-gated) · **personalization line**
(§7.3 — the invitation's `for: [___]` mono input feeds the mailto subject; no char counter,
restraint call) · **silk deleted** (§7.4 — founder debt #1 resolved as delete; hero is pure
night + grid-paper, which stays as *information*, the lattice) · **hover stillness** (§7.5 —
all hover translate/tilt removed site-wide, hover = underline/color/surface step only; now a
DESIGN.md motion rule) · **lowercase-mono utility links** (§7.6 — `.label-mono` register:
`enter →` / `← back to the studio` / `← all research` / `read the first essay →`; uppercase
`.kicker` stays the machine plate) · **label-scale subpage display** (§7.7 — the 7.4rem display
concept is landing-only; subpage/product/blog heroes dropped to ~3.5rem label-scale, codified as
the DESIGN.md "Title register" rule). **Not yet / open:** uniform inventory density (§7.2 —
flagship still spans the full row; founder-meeting item) · stamp-logo bespoke identity
artifact (§7.4) · specimen PHOTOGRAPHY plates (no real assets exist — plate slot stays
type-only until founder-curated) · PATH B entirely (gated on the materials re-shoot).

## Method / provenance

Headless chromium (playwright 1.59.1, www's cache), 1440×900, US-region cookies, full-scroll
census of img/video/svg/canvas/bg-image + `getComputedStyle` on body/palette/typography/
controls/grids; static fetch of `style.css` `style-new.css` `redesign-style.css`
`acdc-style.css` + site JS for keyframes/transitions/hover/IO census; hover verified live on a
PLP card. Raw JSON + screenshots in the analysis session scratchpad. Re-fetch before trusting
exact values long-term.
