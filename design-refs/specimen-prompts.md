# Night-apothecary specimen prompts — founder-curated generation

Finalized, paste-ready image-generation prompts for the **specimen plate family**
(`design-refs/assets.md` §5). The founder generates candidates in his own image model,
`scripts/specimen-gate.py` mechanically rejects any that break the family, and the founder
curates one per slot from the passers. Model-agnostic wording + Midjourney flag hints.

## Register (read first — this is the honesty boundary)

These are **brand plates**, the scrunch commissioned-cover register — NOT evidence. They are
admissible *only* as a clearly-artistic specimen family, never framed as a capture of something
real (no screenshots, faces, briefs, numbers, client work — those stay real-only, rules 4/5/10
in `assets.md`). Every plate is ONE warm-material physical artifact on a cold near-black
seamless. **Subjects are things that could plausibly sit on our shelf — never a fake product.**
Every generation is curated by the founder before it ships.

## The style constants — paste into EVERY prompt

> studio product photograph of a single object, dead-centre, front-on at eye level, filling
> ~60% of the frame height. Background: a uniform seamless sweep of cold near-black charcoal,
> completely hue-free (neutral grey-black, no blue, no brown). One soft directional key light
> from the upper-left with a gentle falloff to the lower-right; a soft natural contact shadow
> directly under the object; no hard drop shadow, no rim light, no glow, no reflective floor.
> Material palette is a single muted warm family — aged kraft paper, unbleached linen, raw
> brass, amber — desaturated and matte, the colour living only in the material (never a bright
> or orange cast). Calm, still, archival. Shot on a medium-format camera, 100mm, f8, even
> museum lighting.

Midjourney tail (append): `--style raw --ar 1:1 --no text, letters, logos, labels, screens, UI, people, hands, faces, neon, glow, bright colors --v 6`
For other models: put the NEGATIVES (`no text / letters / logos / labels / screens / UI /
people / faces / neon / glow / bright colors`) in the negative-prompt field.

## The subjects — one artifact per slot (recommended; founder may swap)

Each subject slots into the style constants above. None is a fake product; each is a physical
artifact that *evokes* its door without depicting a screen or a mockup.

| Slot | Door / surface | Subject line to insert | Ratio / master |
|---|---|---|---|
| Doors cell — FLAGSHIP (SW) | a physical signature | **a single wax seal pressed on a folded kraft card, the seal blank (no emblem), beside a plain brass signet** | 1:1, 1200² |
| Doors cell — LABS (Fermi) | the desk that ships nightly | **a slim kraft-bound dossier, closed, a few dated loose leaves squared beneath it** | 1:1, 1200² |
| Doors cell — FRONTIERS | forward-deployed field work | **a small machined brass field instrument (a dividers/caliper form), laid flat** | 1:1, 1200² |
| Doors cell — RESEARCH | the writing | **a thread-bound kraft research volume, closed, spine toward camera-left** | 1:1, 1200² |
| Doors cell — EFFECTS | outcomes *(type-only until real words exist — generate only if the founder wants a plate)* | **a small bundle of folded letters tied with a single linen thread** | 1:1, 1200² |
| Subpage hero band — /labs | — | **the kraft dossier lying flat, three or four dated leaves fanned to its right, top-down-ish** | 3.8:1, 2000×528 |
| Subpage hero band — /sw | — | **the wax seal, the brass signet and a folded card laid in a quiet row** | 3.8:1, 2000×528 |
| Subpage hero band — /frontiers | — | **two brass field instruments laid parallel with a folded field note** | 3.8:1, 2000×528 |
| Research covers | scrunch cover system | **a thread-bound kraft research volume, three-quarter view** (one system; generate 3–4, keep the set consistent) | 3:2, 3000×2000 |
| /labs Fermi PDP — main | product surface | **the kraft dossier, closed, front-on** | 1:1, 1200² |
| /labs Fermi PDP — thumbs ×3 | detail triptych | **(a) the spine/binding detail · (b) the page-block fore-edge · (c) the wax-seal closure** — same object, three macro views | 1:1, 600² each |

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
