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

### Mood, NOT mechanical uniformity (founder correction, 2026-07-06)

The family coheres by **atmosphere**, never by "same table, same light" — that reads sterile and
kills Le Labo's soul (founder: 太單調, 完全不符合那個香水品牌的性格). Le Labo's own photography is
**analog, distressed (做舊), light-leaked, human**: warm film grain, **an artisan's hand — often
tattooed — caught mid-motion placing a part**, imperfect focus, a corner over-exposed, a moment
in-between (even a little blur is fine), sometimes an insect crossing the frame. Vary everything
except the mood:
- **Surfaces** (rotate, don't repeat): dark walnut · aged distressed linen · a surgical steel
  tray · a petri dish / lab capsule · mid-transport (being carried/arranged) · a film-still of a
  memory-keeper's archive.
- **The device is still deconstructed** and its parts laid out — but by a HAND, in progress, not a
  rigid perfect grid; a caught moment beats a clinical knoll.
- **Light**: warm leaks / flares welcome; expired-film palette; shallow, imperfect focus.
The through-line is warmth + craft + patina + a lived-in human atmosphere — the plate is still the
WARM element that drops into our COLD night interface, just alive instead of embalmed.

## Register (read first — the honesty boundary)

These are **brand plates**, the scrunch commissioned-cover register — NOT evidence. Admissible
*only* as clearly-artistic mood photography, never a capture of something real (no screenshots,
briefs, numbers, client work — real-only, rules 4/5/10 in `assets.md`). Three lines:
- **Generic, unbranded devices only** — never a literal AirPod/branded gadget (no Apple etc.),
  never a mark or logo. The device is an *archetype*, so it reads as a studied specimen, not a
  Reserve product and not a borrowed brand.
- **Hands OK, faces not.** An anonymous artisan's hand (tattoos welcome) is atmosphere/craft, not
  identity — allowed and encouraged. **No faces** (faces are real-only, rule 4).
- **It must read as craft/documentary mood, never a clean product render.** A slick product mockup
  or marketing hero shot is rejected even if the gate passes — a human call the sampler can't make.

> **Gate note (v3 — loosened for mood/variety, 2026-07-06):** since the family now varies surface
> and atmosphere by design (steel trays, petri dishes, light leaks, over-exposure), the gate is a
> **light guardrail, not a straitjacket** — it hard-fails only the one thing that truly clashes with
> our warm-on-night system: a **dominant cold cast** (lots of colour, mostly cold-hued). It WARNS on
> a bright overall tone (may not sit on night) but does not fail it, and it reports warmth/tonality
> for the founder's eye. **Curation is the founder's** — the gate just flags the incompatible.

## The style constants — paste into EVERY prompt

> grainy analog film photograph, shot on expired 35mm, warm light leaks streaking across the frame
> — a single unbranded contemporary electronic device partly DISASSEMBLED into its components, laid
> out by hand as if being catalogued, often with **a tattooed artisan's hand caught mid-motion**
> placing a part. Surface varies per shot (dark walnut / aged distressed linen / a surgical steel
> tray / a petri dish / mid-transport), the ground deep and shadowed at the edges. Warm imperfect
> light, soft shallow focus (some parts sharp, some blurred), a caught in-between moment, one corner
> slightly over-exposed. Warm patina, tactile, lived-in, atmospheric — the exact craft-documentary
> mood of Le Labo's own ingredient photography, a human hand at work. The warm materials + light
> carry the colour; pale/silver parts stay cool. no faces, no brand logos, no text, no UI, no
> screens, no neon.

Midjourney tail (append): `--ar 1:1 --style raw --no faces, brand logos, text, letters, UI, screens, neon, plastic product render --v 6`
For other models: NEGATIVES (`no faces / brand logos / text / UI / screens / neon / slick product
render`) in the negative-prompt field. **Note: hands are NOW ALLOWED** (removed from negatives) —
warm light leaks / over-exposure / blur / grain are wanted, not banned. Vary the surface & the hand
gesture across the family; do NOT repeat the same setup twice.

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
