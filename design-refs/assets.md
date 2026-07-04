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
Midjourney-era JPEGs (`place-*.jpg` on the places cards, `invitation-dusk.jpg` in 06) — rule-10
violations scheduled to die; everything else is code texture (silk, grid-paper, braille,
odometer) and typography. The one genuinely real visual is the **deck.gl globe** (05 — real
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
