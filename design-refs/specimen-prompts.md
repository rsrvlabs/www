# Night-apothecary specimen prompts — founder-curated generation

Finalized, paste-ready image-generation prompts for the **specimen plate family**
(`design-refs/assets.md` §5). The founder generates candidates in his own image model,
`scripts/specimen-gate.py` mechanically rejects any that break the family, and the founder
curates one per slot from the passers. Model-agnostic wording + Midjourney flag hints.

## The thesis (founder, 2026-07-06): **future archaeology** — today's devices, seen from the future as relics

The point is **未來感 (a sense of the future), reached by retrospection**: stand the viewer in a
future that looks back on *our* present, where an everyday device of the early 21st century (an
AirPod, an earbud) has become a **precious, catalogued specimen** — excavated, preserved, and
displayed with the reverence a museum gives an ancient artifact. NOT Victorian/steampunk-past
(that reads backward); the mood is a **future archive**. The uncanny is the mismatch — a mundane
today-gadget treated as a treasure — which makes the mind jump to the future where it *is* rare.
This is the *Black Mirror* register (our own objects observed) crossed with Le Labo's apothecary
treatment.

Two things make it read right AND pass the gate:
- The device must be **recognisably a device of today** (clear present-day silhouette), so the
  viewer clocks "that's our stuff, as a relic."
- The warmth = **the patina of elapsed time** on the preserved object + a **warm amber-glass
  vitrine / brass specimen mount** under **warm archival light** — timeless, not ornate. The
  aging *is* the future-signal and the colour budget at once; the device itself stays cool and
  near-neutral, faintly warmed by age.

## Register (read first — the honesty boundary)

These are **brand plates**, the scrunch commissioned-cover register — NOT evidence. Admissible
*only* as a clearly-artistic specimen family, never a capture of something real (no screenshots,
faces, briefs, numbers, client work — real-only, rules 4/5/10 in `assets.md`). Two hard lines:
- **Generic, unbranded devices only** — never a literal AirPod/branded gadget (no Apple etc.),
  never a mark or logo (already in the negatives). The device is an *archetype* ("a wireless
  earbud", "a bare module"), so it reads as a studied specimen, not a Reserve product and not a
  borrowed brand.
- **It must read as a specimen/museum mount, never a clean product render.** A candidate that
  looks like a slick product mockup is rejected even if it passes the colour gate — that's a
  human call the sampler can't make.

## The style constants — paste into EVERY prompt

> archival studio photograph of a single **recognisable present-day electronic device (an
> unbranded wireless earbud), displayed as a precious future-archaeology specimen** — as it would
> be catalogued centuries from now: excavated, preserved, mounted on a brass specimen pin inside a
> warm amber-glass vitrine, the faint patina of elapsed time on it, a blank engraved brass label
> plate beneath. Dead-centre, front-on at eye level, filling ~60% of the frame height. Background:
> a uniform seamless sweep of cold near-black charcoal, completely hue-free (neutral grey-black,
> no blue, no brown). One soft directional key light from the upper-left with a gentle falloff to
> the lower-right; a soft natural contact shadow directly under the object; no hard drop shadow,
> no rim light, no glow, no reflective floor. Material palette is a single muted warm family —
> aged brass, amber glass, warm patina, unbleached linen — desaturated and matte, the colour
> living in the vitrine/mount and the object's age (never a bright or orange cast); the device
> stays cool near-white, only faintly warmed by time. Calm, still, reverent, museum/archival.
> Medium-format, 100mm, f8, even warm archival light.

Midjourney tail (append): `--style raw --ar 1:1 --no text, letters, logos, labels, brand marks, screens, UI, people, hands, faces, neon, glow, bright colors --v 6`
For other models: put the NEGATIVES (`no text / letters / logos / brand marks / screens / UI /
people / faces / neon / glow / bright colors`) in the negative-prompt field.

## The subjects — one device-as-antique-specimen per slot (candidates; founder may swap)

Each subject slots into the style constants above. The through-line is the **laboratory
examination** — brass/glass apparatus studying a generic modern device. None is a fake Reserve
product; each is an unbranded archetype under study.

| Slot | Door / surface | Subject line to insert | Ratio / master |
|---|---|---|---|
| Doors cell — FLAGSHIP (SW) | biosignal wearable | **a single generic wireless earbud (unbranded, matte pale), clamped upright in a patinated brass stand, fine copper electrode wires attached to it as if its pulse is being measured** | 1:1, 1200² |
| Doors cell — LABS (Fermi) | the desk that ships nightly | **a bare rectangular circuit module under an aged glass bell jar, a brass magnifier loupe resting beside it** | 1:1, 1200² |
| Doors cell — FRONTIERS | forward-deployed field work | **a small matte sensor puck wired to a brass measuring instrument on a stand** | 1:1, 1200² |
| Doors cell — RESEARCH | the writing | **a small data drive / silicon chip laid on the stage of a brass microscope under aged glass** | 1:1, 1200² |
| Doors cell — EFFECTS | outcomes *(type-only until real words exist — generate only if the founder wants a plate)* | **three thin identical device cards laid in a lined brass specimen tray** | 1:1, 1200² |
| Arrival / meta | the machine as specimen | **a single small unbranded module standing inside a tall aged-glass bell jar on a brass base** | 1:1, 1200² |
| Subpage hero band — /sw | — | **the earbud, the brass stand and coiled copper electrodes laid out in a quiet examination row** | 3.8:1, 2000×528 |
| Subpage hero band — /labs | — | **the bell-jar module, the loupe and a brass tool tray in a lab-bench row** | 3.8:1, 2000×528 |
| Subpage hero band — /frontiers | — | **two matte sensor pucks wired to brass field instruments, laid parallel** | 3.8:1, 2000×528 |
| Research covers | scrunch cover system | **a device on a brass microscope stage, three-quarter view** (one system; generate 3–4, keep consistent) | 3:2, 3000×2000 |
| /labs Fermi PDP — main | product surface | **the bell-jar module, front-on** | 1:1, 1200² |
| /labs Fermi PDP — thumbs ×3 | detail triptych | **(a) the brass clamp detail · (b) the electrode-wire junction · (c) the engraved blank brass label** — same setup, three macro views | 1:1, 600² each |

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
