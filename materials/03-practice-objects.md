# 03 · Practice 02 — Objects (smart ring)

**Used in**: [src/components/sections/practices.tsx](../src/components/sections/practices.tsx) (the *Objects* row)
**Slot**: a real product photograph — the only photographic moment on the page. The shift from painterly to photographic is itself the gesture: "We make actual things." Sits opposite the giant `02` numeral.
**Aspect ratio**: 4:5 portrait (`1024×1280`) primary; also generate a 1:1 backup.
**Filename**: `practice-objects-ring-01.webp`.
**File budget**: ≤ 220 KB.
**Recommended models**: Midjourney v6.1 `--style raw`, Flux 1.1 Pro, Imagen 3 (best for product realism).

---

## Concept

A still-life photograph of the smart ring on a hand-thrown ceramic
dish, on a sunlit linen surface. Treat it like an Aman amenity card,
not a tech product shot. The ring should look *worn*, not *boxed*.

## Prompt — primary

```
Editorial still-life product photograph, 4:5 portrait, in the style
of Teenage Engineering meets Aman Resorts: a single titanium smart
ring with a brushed warm-grey finish, sitting on a small unglazed
ceramic saucer in soft cream. The saucer rests on raw natural linen
with a single fold catching morning light from the upper-left at
about 30 degrees. A few specks of dust visible — lived-in. Shallow
depth of field, focus on the ring's outer band, dish slightly soft.
35mm equivalent, f/4. Light is warm late-morning daylight through
sheer linen — directional but diffuse, never harsh. Highlights on
the ring are pale gold, not blown out. Background falls to a deep
warm shadow in the lower-right corner. Color palette: cream paper
#f4ecd8, soft warm grey, raw linen, a faint moss-green shadow
undertone. Composition: ring placed at lower-left third, negative
space upper-right (text or numerals will sit there). Quiet,
considered, expensive without showing it.
```

`--ar 4:5 --style raw --stylize 150 --no UI, screens, glow, neon, charging dock, packaging, multiple rings, hands, model, branding, logo, watermark`

## Prompt — alternates

- **B / on a hand at rest**: "Same ring worn on the index finger of
  a hand resting on a stone garden bench, late afternoon, soft side
  light, only the lower half of the hand visible. Ghibli atmosphere
  rather than fashion-photo." (Skip if you don't have permission for
  recognizable hands.)

- **C / two rings, two cups**: "Two rings on a small wooden tray
  beside two empty matcha cups, suggesting a quiet conversation
  between two people. Same warm-light treatment. No people."

## If your ring product has a real geometry

Replace `titanium / brushed warm-grey` with the actual material and
finish notes (e.g., "matte sandblasted titanium, 8mm width, with a
single thin moss-green inlay"). Generative tools won't get the
exact product right — these images are *placeholders* until your
real product photography exists. Mark replacements clearly in
filename: `practice-objects-ring-PLACEHOLDER-01.webp`.
