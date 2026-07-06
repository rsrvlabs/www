# Asset teardown — what the reference sites LOAD, and how they lay it out

**Founder hypothesis (2026-07-04, recorded here as the driver):** the root of our site reading
"AI-generated" is 素材 — the reference sites ship *real artifacts* (product UI, films, client
logos, faces, live numbers) laid out deliberately; ours is currently 100% typography +
code-generated texture with **zero real artifacts** (and the only rasters we ever shipped were
Midjourney/Flux generations — the exact anti-pattern, see `materials/README.md`).

**Method:** headless Chromium (playwright 1.59, 1440×900, 2026-07-04), full-scroll DOM census of
every `img` / `video` / inline `svg` / `canvas` / CSS `background-image` with rendered + natural
dimensions and absolute page offsets, plus the network log for formats/payloads. Tracking pixels
(google/reddit/twitter 1×1 gifs) excluded everywhere. Raw JSON + screenshots in the analysis
session scratchpad; re-run before trusting exact values long-term.

---

## 1 · insforge.dev — evidence without a single photograph

Page: 6,302px (~7.0 folds). **0 photos · 0 videos · 0 canvas · 0 CSS bg-images · 0 product
screenshots.** ~46 unique image files rendering as 234 `<img>` instances (marquee/column
duplication), + 19 visible inline SVGs. Measured media payload ≈ **0.1MB** — the whole page is
essentially vector.

### Inventory
| Asset class | Count | Format / size | Where |
|---|---|---|---|
| Ecosystem tool wordmarks (Claude, Cursor, Codex, Windsurf, Copilot, Cline, Qoder, Kiro, Trae, Antigravity…) | 11 files ×~10 instances | SVG, ~80–160×40, **mono/desaturated** | "Works perfectly with" marquee, top≈677px |
| Tool/product icons | ~14 files ×~9 | SVG/PNG 32×32 | animated columns of the transform diagram (~900–1,450px) |
| Feature vignettes (postgres wordmark, storage row, cron pill…) | 12 | SVG, ~120–216×24 | one per cell of the 12-cell services lattice |
| Safety-diagram pops (branch cards, test passed/failed, LIVE production) | 8 | SVG 40×40–286×88 | staged onto ONE inline SVG stage 1,278×484 (animated line-draw diagram, ~2,654px) |
| Community avatars | 8 | 48px, real users w/ @handles, served AVIF via `next/image` | testimonial cards ~3,876px |
| Pixel-art mascot sprite | 2 poses | SVG 132×100 | beside both CTAs (416px, 5,551px) |
| Trust chips | — | YC badge ~130px · GitHub **12.0k** in nav (0px) · "All systems operational" dot in footer | hero + chrome |
| Live usage odometers | 4 | text: 39,835 projects · 480,993 DB · 257,470 storage · 12,694,997 egress | ~5,850px |

### Layout roles
- **Nothing is full-bleed.** Every asset is inset inside a lattice cell or marquee band; the grid
  is the frame.
- Density ≈ 6.6 unique assets/fold (instances ~36/fold) — but all small, flat, vector; the page
  never reads "image-heavy".
- First third-party proof at **0px** (GitHub 12.0k in nav) / **~130px** (YC badge); first media
  asset 416px (mascot); ecosystem logo wall inside fold 1 at **677px**.

### Grounding pattern
No photography, no screenshots — grounding is **borrowed logos + real people + deterministic
numbers**: the ecosystem marquee (11 recognizable dev-tool logos, mono), 8 real community
avatars with handles, dated changelog cards, and live usage counters. The product itself is
abstracted into an animated SVG diagram rather than screenshotted. Lesson: a dark typographic
site CAN feel real with zero rasters — **if the vector layer carries real-world referents**
(logos people recognize, numbers that could only come from a running system).

---

## 2 · ploy.ai — film + real faces + one real screenshot, wrapped in a bespoke 3D motif

Page: 9,865px (~11 folds). **7 video files (~9.4MB webm/mp4) · 21 unique images · 26 inline
SVGs · 0 canvas.** Total media ≈ 12MB, video-budgeted (every file ≤2.2MB).

### Inventory
| Asset class | Count | Format / size | Where |
|---|---|---|---|
| Hero brand film | 1 | mp4 **1.1MB** + poster jpg, 1376×866, autoplay/muted/loop/no-controls | **full-bleed at 96px** — live-action office footage (real space, real people) under condensed display type |
| Balloon 3D renders (brand motif) | 5 + footer | **webm w/ alpha** 0.65–2.2MB, muted loop, IO-played | inset everywhere: 446px beside headlines, 785px section center, **120px INSIDE headline text** (video-in-typography), 986×1368 composition, footer wordmark |
| Client logo wall | 11 | png/svg/ico marks 28px + name, **colored** (favicon-grade) | marquee at ~1,157px, "Trusted by" |
| Real product screenshot | 1 | webp, natural 2,784×712 (retina 2×), displayed 1,392×705 | "SEO Audit Blueprint results panel" — full-width, **clipped `bottom-0` into a rounded panel** (peek, not dump) |
| Simulated product-UI cards | ~6 | code-built (not images): stat cards "2 pages built / 323 visitors / $2K pipeline" w/ area charts, agent-activity cards "11:42PM · @ads found a competitor positioning shift" | pink + yellow claim sections |
| Expert avatars | 8 people | webp 24px round, real known names (Bryant Chou, Julian Shapiro…) | playbook-card bylines ~4,591px |
| Announcement card | 1 | YouTube thumb 58px + text "$27M seed" | floating over hero ~808px |

### Layout roles
- Hero = the only full-bleed asset; everything else inset or card-embedded.
- ~2.5–4 unique assets/fold, but the real signature: **some moving or evidentiary asset in
  virtually every fold** (film → logos → balloon → sim-UI → screenshot → faces → composition).
- First artifact at **96px** — a real film before you read a word of body copy.

### Grounding pattern
Layered reality: real office film (fold 0) → real client logos → real funding news → real
expert faces on advice cards → ONE real product screenshot. Claims are staged as
**honestly-stylized rebuilt UI** (plausible data + timestamps, clearly design-language-native,
never pretending to be a raw screenshot), while the one *actual* screenshot is cropped/peeking.
The 3D balloons prove a second rule: identity texture comes from **one bespoke asset family
reused everywhere**, not from variety.

---

## 3 · scrunch.com/blog — one commissioned cover system + authorship; body is typography

Post (`/blog/ai-search-q2-2026/`): 10,450px (~11.6 folds), **9 unique images, 0 video**.
Index (`/blog`): 6,683px (~7.4 folds), **24 unique images, 0 video**. Covers served from
Sanity CDN as AVIF (7–18KB LQIP → 0.2–2MB full), masters at **6000×4000 / 3000×2000 (3:2)**.

### Inventory
| Asset class | Count | Format / size | Where |
|---|---|---|---|
| Post cover series | 1 per post (~22 on index) | AVIF from png masters 3:2, cropped to **aspect 2:1** everywhere | featured 1,010×505 at **236px**; grid cards 489×245; carousel 216×216; list rows 280×140 (110×68 slot) |
| Post hero | 1 | 1,392×696 (2:1) at **452px** | between the narrow serif H1 and the 850px body |
| Author avatar | 1 | jpg 48px round, real person + bio | end of post ~8,740px |
| Related covers | 3 | 2:1 cards | ~9,273px |
| Body media | **0** | — | **~8,000px of pure typography** — data claims carried by linked citations, tables, blockquotes; not charts |
| Chrome | few | nav mega-menu preview jpgs, footer bg png, social icons | — |

### Layout roles
- Index: **100% of content units carry a cover** — the cover IS the list-item identity;
  ~3 assets/fold.
- Post: ~0.5 assets/fold overall; the body itself is **zero-asset** — scrunch spends its entire
  image budget on the door (cover) and the signature (author), nothing in between.
- First artifact: 236px (index) / 452px (post).

### Grounding pattern
The covers are a **single commissioned art series** (painterly smeared-gradient backdrop + one
matte 3D object — keyboard key, chain links, folded geometry) at photography-grade resolution:
not stock, not UI, instantly consistent. In-body credibility is **authorship + dense external
citations**, not imagery. Lesson for our `/research`: you don't need in-body charts; you need a
cover *system* and a real byline.

---

## 4 · The asset grammar (synthesized rules)

1. **Every claim beat is anchored by an evidence asset** — and the evidence type is chosen per
   register: ecosystem logos + live counters (infra), film + client logos + faces + news
   (product), authorship + citations + commissioned covers (editorial).
2. **The first real-world artifact lands in fold 1** on all three sites (96 / ~130–677 /
   236–452px). A first fold of pure self-description is the tell they all avoid.
3. **Logos:** mono/desaturated for ecosystem "works-with" walls; colored favicon-grade
   (28–40px mark + name) for customer walls; always marquee'd, never a static grid of giant logos.
4. **Faces are small and real:** 24–48px round avatars with names/handles attached to words
   those people actually said/wrote. Never hero-sized portraits, never stock humans.
5. **Product UI has exactly three honest treatments:** (a) real screenshot, cropped/clipped
   into a frame so it *peeks* (ploy); (b) UI **rebuilt in the site's design language** with
   plausible data + timestamps — stylized enough that nobody mistakes it for a raw capture;
   (c) abstracted into an animated diagram (insforge). Never a full raw dashboard dump.
6. **Videos loop muted:** no controls, IntersectionObserver-played, ≤~2MB each, webm-alpha for
   object motifs; video may live *inside* typography (ploy's 120px in-headline balloons).
7. **Deterministic numbers are load-bearing evidence:** live usage odometers, GitHub stars,
   dated changelogs, timestamps. Numbers that could only come from a running system beat
   adjectives.
8. **One bespoke asset family per brand** (pixel mascot / balloons / painterly-3D covers),
   reused at every scale — identity through repetition of ONE system, not asset variety.
9. **Payload discipline:** vector-only is viable (insforge ≈0.1MB); if you ship video, budget
   per-file; heavy covers go through a CDN transform pipeline with LQIP.
10. **Zero stock, zero generated filler** — across all three sites, not one stock photo and
    nothing that reads "made by a prompt". Absence of an asset is preferred to a fake one.

---

## 5 · Reserve asset plan — OUR real artifacts, mapped to beats

**Current state (the gap):** the live site ships *no* real artifact. Remaining rasters are
Midjourney-era JPEGs (`place-*.jpg` on the places cards) — rule-10 violations scheduled to die
(`invitation-dusk.jpg` died 2026-07-05: 06 went fully typographic per the interim plan below);
everything else is code texture (silk, grid-paper, braille, odometer) and typography. The one genuinely real visual is the **deck.gl globe** (05 — real
OpenFreeMap/Natural-Earth data). Register rule for everything below: **no fabricated evidence —
real artifacts only, with real timestamps; where nothing real exists yet, ship typography, not
filler** (already the `/research` hero rule; now site law).

### Beat map (landing)
| Beat | Evidence asset (real) | Treatment (per grammar) | Produce via |
|---|---|---|---|
| 01 Arrival | live counters fed by real brain/ops stats (log entries, tickets opened, briefs published, commits) | odometer machine-row under the hero, rule 7 | **session** (deterministic script over repo/brain data) |
| 02 Note | founder byline: name + 48px real photo | rule 4 — small, real, attached to the words | **founder capture** (one photo each) |
| 03 Doors | one artifact thumb per door: Fermi = real Discord brief crop · SW = real POC phone screen · Frontiers = client logo (only w/ permission) | inset in lattice cells, cropped/peeking (rule 5a) | Fermi: **session** (screenshot Fermi's actual us-equities posts) · SW: **founder capture** · logos: **founder ask** |
| 04 While you sleep | THE natural evidence beat — a real Fermi 盤後復盤早報 post **in Discord chrome** (bot avatar, channel name, ~08:00 timestamp), and/or the brain's real overnight `git log` rendered in the instrument panel | screenshot-in-frame (5a) + deterministic log (7) | **session** — both exist today |
| 05 Places | deck.gl globe — already real; replace the AI-generated `place-*.jpg` city cards with real photography or drop to typographic cards | rule 10 | **founder capture** (or delete imagery) — *do not touch now; another session owns places* |
| 06 Invitation | replace `invitation-dusk.jpg` with real dusk photography (Taipei, shot by founders) or go fully typographic | full-bleed only if real | **founder capture** (interim: typographic) |

### Subpages
- **/labs (Fermi LIVE):** real brief screenshots from the actual Discord channel (several days,
  dates visible), real scored-board numbers with dates. Feynman: one real advisor reply,
  EXPERIMENTAL tag in frame. — **session-producible.**
- **/sw:** POC phone screens in device chrome (rule 5a); founder capture from device/simulator.
- **/frontiers:** forward-deployed = humans — founder photos (small, rule 4) + client logos
  only with permission; until then, redacted real deliverable fragments beat placeholders.
- **/research:** scrunch model = cover *system* + byline. Candidate honest cover series:
  **renders of our own real visual systems** (globe, silk, braille, lattice) at 3:2 — our actual
  product surface as art, one consistent series. Author footers get the founder photos.
- **/effects:** stays effects-format until real client words exist (already law); when they do,
  they arrive as small avatars + verbatim quotes (rule 4), never restyled.
- **The deck:** real pitch-deck pages are legit artifacts (a "read the memo" surface or
  fundraising page) — founder decision on where/whether to expose.

### Capture ledger
- **Founder must capture:** founder portraits (2), SW POC phone screens, Taipei dusk + city
  photography (or approve typographic fallback), client-logo permissions.
- **A session can produce today:** Fermi Discord post screenshots (real channel, real
  timestamps), brain/terminal in action (Claude Code session or overnight git-log capture),
  live-counter pipelines from repo/brain stats, globe/silk/braille 3:2 renders for research
  covers. Gate: screenshots of Discord leave the brain's Discord surface untouched — capture is
  read-only; anything ambiguous goes through `ops/decision-rights.md`.

**Order of operations recommendation:** beat 04 first (real Fermi brief in Discord chrome — the
claim and the evidence are already both real, highest grounding-per-effort), then 03 door
thumbs, then 01 counters; founder-capture items land whenever the shoot happens.

### The night-apothecary asset spec (Le Labo mirror — brand-plate family, added 2026-07-05)

Le Labo's warmth mechanism (§6 below, measured) inverted onto our ground: they put warm-amber
photography on cold near-white paper (`#f6f8f6`, zero saturated CSS); we put warm-amber
**artifact specimens on cold near-black night** (`night` #0a0a0a ladder, zero-chroma per
DESIGN.md). The interface stays cold and hue-free; ALL warmth enters through one uniform
specimen family — warm subjects on cold ground, mirroring their warm-photos-on-cold-paper.

**Register (honest — resolves the rule-10 tension):** these are **brand plates**, the scrunch
commissioned-cover register (§3), *not evidence assets*. Rule 10 still bans generated imagery
anywhere it could read as evidence (screenshots, briefs, faces, numbers, client work). A
**founder-curated generated series** is admissible only as this clearly-artistic specimen
family — the same legitimacy as scrunch's painterly-3D covers — never labeled or framed as a
capture of something real, and every generation is curated by the founder before it ships.

**The family:** Reserve's artifacts as apothecary specimens on night — ONE object per frame on
a uniform near-black seamless. Constants below govern *treatment*; the founder chooses
*subjects* (candidates: printed brief/memo objects, kraft-bound research covers, instrument-
room hardware — things that could plausibly sit on our shelf; never a fake product).

**Concrete slots (mirroring their rendition ladder):**

| Slot | Ratio / master | Rendered | Le Labo analogue |
|---|---|---|---|
| Doors lattice cells | 1:1, 600×600 (ladder 360/600/1200) | ~265px square plate atop the existing spec-label rows | PLP card: photo → hairline → TITLE → spec row → action row |
| Subpage heroes (/labs /sw /frontiers) | ~3.8:1 strip, 2000×528 | 1440×380 band | PLP/family banner; their dark flat-lay is already night — ours is native |
| Research covers | 3:2, 3000×2000 | featured 1,010×505 → 110×68 rows | scrunch cover system — if the specimen family serves covers, ONE system per surface (rule 8), don't mix with the planned real-system renders |
| Product/detail surfaces (/labs Fermi) | 1:1, 1200×1200 + view thumbs | ~660px main + 80px thumbs | PDP main + bottle/label/box triptych → our object/detail/packaging views |
| Nav / index previews | 1:1, 600×600 | ~250px | their mega-menu plates (but lazy-load ours — see §6 payload note) |

**Draft AI-generation prompt-spec skeleton (style constants, every generation):**

- **GROUND:** uniform studio seamless, near-black — value `#0a0a0a`–`#171717` (night →
  night-soft), **zero chroma** (corner samples must read sat ≤3%, hue-free; DESIGN.md
  hue-inheritance lesson — never let the subject's warmth bleed into the ground).
- **LIGHT:** ONE soft directional key (upper-left), low fill; gentle falloff toward one corner
  (≤ ~12% luminance drop — their measured falloff); **soft natural contact shadow only** — no
  hard drop shadow, no rim glow, no reflection floor.
- **SUBJECT:** single object (or one arranged set), dead-center, front-on at eye level,
  ~55–70% of frame height; any label area faces camera but stays **blank/abstract** — no
  baked-in text (type is live HTML, the mono layer is ours).
- **GRADING:** warm material family — amber/kraft/brass, saturated-pixel median hue in the
  **20–45° window** (their measured 22–30°, widened to admit our `sun` gold), muted (mean sat
  ≤15%), warm-share ≥80% of saturated pixels; the subject may be nearly as desaturated as the
  ground with color only in its *material* (their amber-liquid pattern).
- **COMPOSITION/CONSISTENCY:** square 1:1 masters ≥1200×1200 (plus 2000×528 banner, 3000×2000
  cover variants); same seamless + same key across the whole family; slight honest exposure
  variance is fine (their corner window drifts ±35–73 RGB pts), style drift is not.
- **NEGATIVE:** no humans (faces are real-only, rule 4), no fake UI/screens (rule 5), no text,
  no logos, no neon/glow (accent budget stays ink-rare per DESIGN.md).
- **ACCEPTANCE GATE (deterministic):** re-run this census's pixel sampler on every candidate —
  4 corner blocks sat ≤3% and value within `#050505`–`#1f1f1f`; center-crop warm-share ≥80% of
  saturated pixels; reject anything that fails before the founder even sees it. (If we run the
  gate twice, it becomes a skill.)

> **Now executable (2026-07-06, founder chose path Ⓑ = photographic realism, founder-curated):**
> finalized paste-ready prompts → **`design-refs/specimen-prompts.md`**; the acceptance gate is
> a CLI → **`scripts/specimen-gate.py`** (`python scripts/specimen-gate.py <img|dir>`, exit 0
> only if all pass). Founder generates + curates; the gate rejects family-breakers first; Issac
> wires only gate-passing picks into the doors cells / subpage bands / Fermi PDP. Picks land in
> `public/specimens/`. A code-generated interim plate exists (scratchpad proof, passes the gate)
> if a slot must be filled before curation — but site law prefers type-only over filler.

---

## 6 · lelabofragrances.com — the specimen economy (fourth census, 2026-07-05)

The founder's luxury-brutalism reference, measured with the same method (headless chromium
1.59.1, 1440×900, full-scroll DOM census + network log), plus **pixel sampling of 15 downloaded
masters** (packshot grounds: corner/edge 12px-block averages + shadow strips; photography:
64×64 median-cut dominant colors + HSL histograms). Companion teardown (tokens/type/motion):
`design-refs/lelabo.md`. Pages: home `/` · PLP `/fine-fragrance.html` · family
`/santal-33.html` · buy PDP `/santal-33-147.html?size=50ml`.

**Access notes (honest):** geo-gate bypass needs `acdc_region`+`acdc_country_code`+
`ACDC_LOCALE` cookies AND `acdc_region` must be the **two-letter country** (`US`) —
`js_site_var.userRegion` is read from that cookie and `removeForeignCountryContent()` deletes
every non-matching `.acdc_country_selector` hero slide (with region `NA` the homepage renders
nav+footer only). OneTrust consent accepted first (the banner blocks module init in a fresh
profile). Hero/announcement content is country-targeted: raw HTML carries **7** hero slides
(EU/UK variants incl. 3 more films); a US visitor gets 4. US values recorded.

### Inventory

| Page | Height (folds) | Visible assets | First artifact | Payload (unique imgs) |
|---|---|---|---|---|
| Home | 1,171px (**1.3**) | 4-slide full-bleed carousel 1440×739: 3 documentary JPEGs (2000×1072, 562–609KB) + 1 Vimeo film (progressive MP4 1080p ≈2MB, muted, no controls, JS-played); 4-column caption strip overlays the hero's lower band; **0 packshots** | **112px** | ~4.8MB + ~2MB film |
| PLP | 3,202px (3.6) | 1 banner 2000×528 @1440×380 (210KB) + **20 packshots** 600×600 @265×265 | 112px | 3.5MB |
| Family | 3,574px (4.0) | 1 dark flat-lay banner (211KB) + **24 packshots** | 112px (band) | 4.3MB |
| Buy PDP | 1,867px (2.1) | main 1200×1200 @661×661 (159KB) + 3 view thumbs 140×140 @80×80 (bottle / label close-up / **kraft box**) + 2 rec packshots 360×360 @265×265 | **130px** | 3.7MB |

- **Formats:** photography = JPEG only (server-side rendition ladder `IMG_140/360/600/1200`;
  no srcset, no webp/avif, no LQIP, no lazy-load). Icons = PNG sprite 7–22px; logo = PNG stamp;
  **zero inline SVG, zero canvas**; video = Vimeo progressive MP4.
- **The inventory is nearly free:** 20 PLP SKUs = **571KB total** (11–55KB each); 24 family
  SKUs = 1.4MB. The payload sin is 7 nav mega-menu preview JPEGs (1500×1500 @250×250, ~2.7MB)
  **eager-loaded on every page** while hidden — 2014 fossil, not a pattern to copy.

### The packshot recipe (measured on 8 masters — the uniform-treatment mechanics)

- **Ground:** mid-grey studio seamless — corner samples `#5f`–`#86` (typical `#7d827e`),
  saturation ≤3%, hue cast 110–160° — the **same cold green-grey family as the page's
  `#f6f8f6`**. The specimens are cold.
- **Value L≈39–50%, much darker than the page:** each 265×265 cell reads as a distinct grey
  plate on near-white paper — the photo edge IS the card frame; no CSS border needed.
- **One soft key:** gentle directional falloff, one corner ~10–13% darker (e.g. TL `#7d827e`
  vs TR `#60615e`); honest exposure variance across the family (corner window drifts ±35–73
  RGB pts) — one shelf, not a clone-stamped synthetic ground.
- **Shadow:** soft natural contact shadow only — small objects read +3–4 luminance pts vs
  ground, the candle up to +20; no hard drop shadow, no reflection.
- **Object:** ONE product (or one arranged set) dead-center, front-on at eye level, label
  facing camera, ~55–70% of frame height, square 1:1 `[observed on all 44 grid cells + PDP]` —
  zero angle variation across the inventory.
- **The object is nearly as cold as the ground:** center-crop saturated-pixel share 0–21%;
  the only color is the product's own *material* (amber liquid, wax, kraft), 85–99% warm-hue
  where present.

### Placement & layout roles

- **Fold 1 by page type:** home = 100% atmosphere (full-bleed carousel at 112px); PLP/family =
  3.8:1 banner at 112px, grid immediately after; PDP = the 661px specimen at 130px beside the
  spec/buy column. **Text-on-image happens exactly twice** (home caption strip, family-hero
  title) — always white type on a dark/muted photo band; **never on packshots**.
- **Grid anatomy:** 4 columns at x=151/442/733/1024 → 291px pitch (265 cell + 26 gutter),
  418px row pitch; identical cells, no featured cell, no size hierarchy — the uniform
  treatment + uniform cells = the **inventory effect** (the grid reads as one stockroom shelf).
- **Specimen:atmosphere gradient by depth:** home 0:4 (all atmosphere) → PLP 20:1 →
  family 24:1 → PDP 6:0 (pure specimen). Atmosphere at the door, specimens on the shelf,
  spec-sheet at the SKU — the deeper the visitor goes, the colder the imagery.

### The warmth mechanism (quantified)

The interface is cold (`#f6f8f6` body, zero saturated CSS — lelabo.md §2) and the packshots
are cold (above). **All warmth is photographed material, graded into ONE kraft-amber family:**

- 5 of 6 sampled documentary/hero masters: saturated-pixel **median hue 22–30°**, warm-share
  **82–100%** — at three exposures: near-black warm (Santal hero L13%, family flat-lay L10%),
  mid kraft (body-hair-face hero L44%, mean sat 13.5%, 100% warm), pale grey-warm (PLP banner
  L56%, only 1.3% of pixels saturated — and 90% of those warm).
- The one outlier is deliberate: the current Cyprès 21 campaign hero is an **indigo nocturne**
  (median hue 210°, mean sat 51%) — one rotating campaign color at a time; everything else
  stays in the amber family.
- Mechanism, stated plainly: **a zero-warmth interface + cold specimens, with warmth entering
  exclusively as photographed material in one graded hue family. The warmth is literally the
  product.** (Inverted for our night ground → the §5 night-apothecary spec.)

### What it adds to §4's grammar

Confirms rule 8 at the extreme (one bespoke family: the label — and the specimen ground is a
second, photographic one) and rule 10 (zero stock, zero generated). New, additive:

- **Uniform specimen treatment IS the inventory effect** — identity through repetition of one
  photographic recipe; merchandising hierarchy deleted, the grid becomes a shelf.
- **Temperature inversion** — the interface carries zero warmth; the assets carry all of it,
  in one graded family. (Their paper is cold; ours is night — same move, §5.)
- **Atmosphere:specimen gradient by depth** — door pages get atmosphere, catalog pages get
  specimens, SKU pages get pure spec.
