# 07 · OG / share card

**Used in**: `src/app/layout.tsx` `metadata.openGraph.images` (not yet wired — wire when asset exists).
**Slot**: the image that appears when someone shares the URL on iMessage, Slack, X, LinkedIn, WhatsApp, etc.
**Aspect ratio**: 1.91:1 — exact size **1200×630 px**.
**Filename**: `og-share-01.webp` (also export `og-share-01.png` as a safer fallback for older crawlers).
**File budget**: ≤ 250 KB.
**Recommended models**: Midjourney v6.1 for the painterly base; finish typography by hand in Figma / a vector tool. **Do not** ask the model to render the wordmark — generative tools mangle text.

---

## Composition

Two-panel inspired by an old book frontispiece:

- **Left two-thirds**: a tighter crop of the Arrival hero painting
  (cream sky, a single soft cloud, the suggestion of a low sun in
  the upper-right of the panel). Hand-painted Ghibli style, same
  palette as the site.
- **Right one-third**: solid cream paper texture, with the wordmark
  set in **Gambarino** (the site's display face) — `reserve.` —
  centered vertically, in warm ink (#2b2417). Below it, in
  **Supreme** small-caps tracking 0.32em: `A STUDIO BETWEEN SOFTWARE
  AND THE OBJECTS YOU HOLD.` Let it wrap to two lines if needed.
- Hairline ink rule (1px) running vertically between the two
  panels.

## Prompt — for the painted left panel only

```
A vertical painterly fragment in Studio Ghibli background style: a
calm cream-colored morning sky filling the frame, one soft hand-shaped
cloud just left of center, a low pale-gold sun glowing in the
upper-right corner (not bright enough to flare), a thin band of
distant olive-green hills along the very bottom edge. Hand-painted
gouache, visible brushwork, paper grain. Limited palette: paper
#f4ecd8, sun gold #e8b55f, moss #5a7349. The composition is meant
to be *cropped* — leave space; no detail in the upper-left.
```

`--ar 4:5 --style raw --stylize 200 --no text, UI, signage, watermark`

Composite this in Figma/Affinity at 1200×630, with the right-third
typography panel built in vector tools (so it stays crisp at any
crawler resolution).

## Tips

- Test the result in [opengraph.xyz](https://opengraph.xyz) before
  shipping.
- Slack and iMessage will crop slightly differently — keep the
  wordmark away from the outer 5% of any edge.
- If you want a simpler v0: skip the painted half entirely. Pure
  cream paper + Gambarino wordmark + Supreme tagline, dead-center,
  no image. That alone is a strong share card and reads as
  "considered."
