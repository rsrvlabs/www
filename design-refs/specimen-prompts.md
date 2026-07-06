# Night-apothecary specimen prompts — founder-curated generation

Finalized, paste-ready image-generation prompts for the **specimen plate family**
(`design-refs/assets.md` §5). The founder generates candidates in his own image model,
`scripts/specimen-gate.py` mechanically rejects any that break the family, and the founder
curates one per slot from the passers. Model-agnostic wording + Midjourney flag hints.

## The thesis (founder, 2026-07-06): **DECONSTRUCTED devices laid out like Le Labo — future specimens**

Concept = still **未來感 by retrospection** (today's devices / *Black Mirror* gadgets as future
specimens). EXECUTION = Le Labo's own move, NOT antique cliché — the founder rejected the brass
bell-jar / vitrine ("古銅罩是傳統表達古董的老套手法"). Take the device **fully apart** and **lay
its components out flat on a surface** — knolling / an exploded teardown — exactly as Le Labo
lays out its raw ingredients, and shoot it with **the same warm documentary photographic texture
as lelabofragrances.com** (real, material, editorial, tactile — `design-refs/lelabo.md`). The
device dissected into a neat catalogue of parts IS the specimen: the deconstruction reads
"studied / preserved," the modern components read "future."

Fits our own teardown law — **Le Labo's warmth lives 100% in the photography, the interface stays
cold** (`assets.md` §6). The specimen plate is a WARM documentary flat-lay that drops into our
COLD night interface: the plate is the warm element, Le Labo's mechanism on our night ground.

Ground: shoot the flat-lay **overhead on a dark, warm-lit surface** (dark walnut / graphite /
slate) — keeps Le Labo's documentary warmth AND sits seamless on our near-black ground (edges
stay hue-free dark; warmth from the warm materials + raking light). **No brass apparatus, no bell
jars, no vitrines** — the parts speak for themselves, laid out.

## Register (read first — the honesty boundary)

These are **brand plates**, the scrunch commissioned-cover register — NOT evidence. Admissible
*only* as a clearly-artistic specimen family, never a capture of something real (no screenshots,
faces, briefs, numbers, client work — real-only, rules 4/5/10 in `assets.md`). Two hard lines:
- **Generic, unbranded devices only** — never a literal AirPod/branded gadget (no Apple etc.),
  never a mark or logo (already in the negatives). The device is an *archetype* ("a wireless
  earbud", "a bare module"), so it reads as a studied specimen, not a Reserve product and not a
  borrowed brand.
- **It must read as a specimen teardown / documentary flat-lay, never a clean product render.** A
  candidate that looks like a slick product mockup or a marketing hero shot is rejected even if it
  passes the colour gate — that's a human call the sampler can't make.

> **Gate note (flat-lay, v2 — retuned 2026-07-06 on the first real plate):** the gate now enforces
> a **dark, warm-consistent GROUND** (corners dark + no cold cast — a dark walnut/graphite surface
> passes; a cold blue/grey ground fails) + **one warm centre family** (warm-share ≥80%, hue 15–50°).
> The old "near-black zero-chroma corners" rule was for the abandoned object-on-night-seamless idea
> and wrongly failed a correct warm-wood flat-lay; the principle is unchanged (dark ground, one warm
> family, no cold cast). Ryvn's first earbud teardown passes clean (warm-share 99%, hue 26°).

## The style constants — paste into EVERY prompt

> overhead documentary flat-lay photograph, a single unbranded contemporary electronic device
> fully DISASSEMBLED into all its small components, each part laid out separately in a neat ordered
> grid (knolling / exploded teardown), catalogued like a specimen. Surface: a dark, warm-lit
> matte plane (dark walnut / graphite / slate), hue-free near-black at the edges. Soft warm raking
> light from the upper-left, gentle falloff; soft natural contact shadows under each part; no hard
> drop shadow, no rim light, no glow, no reflective floor. Material palette is a single muted warm
> family — warm dark wood, aged metal, gold circuit traces, copper, unbleached linen — the colour
> living in the warm materials and light; the plastic/white parts stay cool neutral. Real, tactile,
> editorial, material — the exact warm documentary photographic texture of Le Labo's own ingredient
> flat-lays. Calm, still, archival. Medium-format, 100mm, f8, even warm light.

Midjourney tail (append): `--style raw --ar 1:1 --no text, letters, logos, labels, brand marks, screens, UI, people, hands, faces, neon, glow, bright colors --v 6`
For other models: put the NEGATIVES (`no text / letters / logos / brand marks / screens / UI /
people / faces / neon / glow / bright colors`) in the negative-prompt field.

## The subjects — one DECONSTRUCTED device flat-lay per slot (candidates; founder may swap)

Each subject slots into the style constants above. The through-line is the **exploded teardown /
knolling** — a generic modern device taken apart and laid out flat, Le Labo-ingredient style.
None is a fake Reserve product; each is an unbranded archetype, dissected and catalogued.

| Slot | Door / surface | Subject line to insert | Ratio / master |
|---|---|---|---|
| Doors cell — FLAGSHIP (SW) | biosignal wearable | **a wireless earbud fully taken apart — the two shell halves, speaker driver, battery cell, gold flex-circuit, copper coil, mesh, silicone tip — laid out in a neat grid** | 1:1, 1200² |
| Doors cell — LABS (Fermi) | the desk that ships nightly | **a small server/compute module dismantled — the board with gold traces, heatsink, memory chips, connectors, screws — laid out in rows** | 1:1, 1200² |
| Doors cell — FRONTIERS | forward-deployed field work | **a sensor device disassembled — housing, lens, PCB, antenna coil, cell — laid out flat** | 1:1, 1200² |
| Doors cell — RESEARCH | the writing | **a solid-state drive taken apart — casing, board, gold-contact chips, controller — laid out in order** | 1:1, 1200² |
| Doors cell — EFFECTS | outcomes *(type-only until real words exist — generate only if the founder wants a plate)* | **a smartwatch dismantled — screen, back, battery, board, band — laid out flat** | 1:1, 1200² |
| Arrival / meta | the machine as specimen | **a small unbranded module fully exploded into every component, the most complete catalogue of parts, centred** | 1:1, 1200² |
| Subpage hero band — /sw | — | **the earbud teardown parts spread in a single long row across the frame** | 3.8:1, 2000×528 |
| Subpage hero band — /labs | — | **the compute-module parts spread in a long bench row** | 3.8:1, 2000×528 |
| Subpage hero band — /frontiers | — | **the sensor parts spread in a long field-kit row** | 3.8:1, 2000×528 |
| Research covers | scrunch cover system | **a device teardown flat-lay, tighter crop** (one system; generate 3–4, keep consistent) | 3:2, 3000×2000 |
| /labs Fermi PDP — main | product surface | **the compute-module teardown, full grid, centred** | 1:1, 1200² |
| /labs Fermi PDP — thumbs ×3 | detail triptych | **(a) the gold-trace board macro · (b) the connector cluster · (c) the loose screws + tool** — same teardown, three macro views | 1:1, 600² each |

Aspect flags: `--ar 1:1` (cells/PDP), `--ar 40:11` ≈ 3.8:1 (hero bands), `--ar 3:2` (covers).

## Consistency across the family (this is what makes it read as ONE catalog)

- Same seamless + same key light on every plate. In Midjourney, lock it: generate the first
  approved plate, then pass it as a **style reference** (`--sref <url>`) to every subsequent
  prompt, or reuse a fixed `--seed`. In other models, reuse the same seed / a reference image.
- Generate **4–8 candidates per slot**, then let the gate cut the failures before you choose.
- Slight honest exposure variance between plates is fine; style drift (a new background tone, a
  cold cast, a glow) is not — the gate catches the cold casts, your eye catches the rest.

## The acceptance gate — run before curating

```bash
# one image, or a whole candidate folder
python scripts/specimen-gate.py ~/Downloads/specimen-candidates/
python scripts/specimen-gate.py --json plate.png     # machine-readable
```

Prints `PASS`/`FAIL` per image with the numbers; exit 0 only if all pass. It enforces
`assets.md` §5: 4 corner blocks saturation ≤3% and value within `#050505`–`#1f1f1f` (the ground
stays hue-free near-black), and center warm-share ≥80% in hue 20–45° (the warmth is one amber
family). A `⚠ sat>18%` warning means the subject is too saturated (reads orange/cardboard) —
regenerate muted. **Only gate-passing candidates go to the founder's eye; only the founder's
pick ships.**

## Where the picks land

- Approved masters → `public/specimens/<slot>.jpg` (e.g. `sw.jpg`, `labs.jpg`, `frontiers.jpg`,
  `research.jpg`; hero bands `*-band.jpg`; Fermi PDP `fermi-main.jpg` + `fermi-a/b/c.jpg`).
  Commit the JPEGs (site assets under `public/` are fine; Playwright imagery is the only thing
  barred from git).
- Wiring (Issac's job once picks exist): specimen plate atop the doors spec-label cells + the
  subpage hero bands + the /labs Fermi detail surface, per the `assets.md` §5 slot table. The
  plate is the photo layer above the existing `SpecRow` — layout already proven by the
  black-apothecary + specimen-propagation rounds.

## If nothing is ready yet

Per site law (no filler, no fabricated evidence): slots stay **type-only** until a curated,
gate-passing plate exists — never a placeholder. A code-generated interim plate exists as a
proof (scratchpad, passes the gate) and can fill slots on request while curation happens, but
the default is honest emptiness over filler.
