# 08 · Textures (global)

**Used in**: `src/app/globals.css` `body::before` (currently uses an inline SVG turbulence). Replace with a real scanned paper for a noticeably richer feel.
**Slot**: site-wide overlay at very low opacity (0.05–0.08) with `mix-blend-mode: multiply`.
**Aspect ratio**: tiles seamlessly. 1024×1024 square.
**Filenames**: `texture-paper-01.webp`, `texture-grain-01.webp`, `texture-inkwash-01.webp`.
**File budget**: ≤ 120 KB each.
**Recommended models**:
- *Paper*: scan a real cream washi or hosho paper if you can — much better than generated. If generating: Flux 1.1 Pro.
- *Grain*: Midjourney for an organic look; or use Photoshop "Add Noise → Gaussian, monochromatic, 8%".
- *Ink wash*: Midjourney v6.1.

---

## Paper texture (primary)

```
A flat, top-down photograph of a sheet of cream-colored Japanese
washi paper, even diffuse light, no shadow, no fold, no edge. The
paper has long visible plant fibers running in random directions,
slight color variation from cream to faintest sand, no print, no
ink, no marks. Photographed straight down at 90 degrees, 100 mm
macro. The texture must tile seamlessly — generate as a square crop
with no directional bias. Color: warm cream #f4ecd8 base.
```

`--ar 1:1 --style raw --stylize 50 --tile --no text, ink marks, fold, shadow, edge, hand`

After download, run through a tile-fixer (e.g.
[ImageMagick mirror tiling](https://imagemagick.org/) or
[Materialize](https://boundingboxsoftware.com/materialize/)) if the
edges still seam.

## Grain overlay (secondary)

```
Pure film grain texture, monochromatic, sized for 35mm Kodak
Portra 400 push-1 grain pattern. Tight even distribution, no
clumping, no clustering, no scratches, no dust spots. Square 1024
seamless tile. Base value 50% grey.
```

Use this with `mix-blend-mode: overlay` at very low opacity (0.04)
for the section that needs the most "filmic" feel — probably the
Weather room.

## Ink-wash decorative blobs

For the Weather section's amber haze, you can replace the CSS
radial-gradients with hand-painted ink washes for a more honest
look:

```
A single sumi-e ink wash on cream paper, abstract organic blob
shape, painted with a soft round brush, varying ink density from
deep warm-black at the center to faint feathered edges. Background
is pure cream paper. The wash should look like a single relaxed
brushstroke that bloomed once. No second stroke, no border, no
text. Square 1024, isolated, transparent background acceptable.
```

Generate three variations — you want different *shapes* of bloom
to keep the page visually varied. Save as `inkwash-01.png`,
`inkwash-02.png`, `inkwash-03.png` with transparency preserved.

---

## Wiring

In `globals.css`, replace the inline SVG noise with the scanned
file:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.06;
  mix-blend-mode: multiply;
  background-image: url("/materials/texture-paper-01.webp");
  background-size: 320px 320px; /* tune to taste */
}
```
