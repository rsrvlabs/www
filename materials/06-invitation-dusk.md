# 06 · Invitation — dusk

**Used in**: [src/components/sections/invitation.tsx](../src/components/sections/invitation.tsx)
**Slot**: behind the "Write to us." headline. Currently a CSS gradient. Replace or layer at low opacity.
**Aspect ratio**: 21:9 panoramic still (`2560×1080`) — the section is wide and the image must hold up at full-bleed widescreen — **or** an 8-second seamless loop.
**Filename**: `invitation-dusk-01.webp` / `invitation-dusk-01.mp4`.
**File budget**: still ≤ 400 KB. Loop ≤ 3 MB.
**Recommended models**: Midjourney v6.1, Flux 1.1 Pro for still; Sora / Veo 2 for the loop.

---

## Concept

The page closes at sunset. Not a melodramatic sun-into-the-sea
sunset — a gentle one. The horizon should sit low so the sky has
room. This is the visual companion to "Write to us."

## Prompt — still

```
A wide painterly twilight landscape in the style of a Studio Ghibli
end-of-day sky: vast horizon at the lower 30 percent, layered
warm-cream-to-terracotta sky stretching across the upper two-thirds,
fading to a faint dusty pink overhead. The sun has just dropped
below the horizon line — a soft remaining glow on the right side
where it set. A single thin contrail or whisp of high cirrus catches
the last gold light. Below the horizon: a calm field of very dark
warm green hills silhouetted soft, no detail. The whole image is
hand-painted gouache, visible brushstrokes, paper grain, no
photoreal smoothing. Color palette: cream paper #f4ecd8 (high sky),
sun gold #e8b55f, terracotta #a55c33 near the horizon, deep ink
green #1a1f15 hills, faint dusty rose overhead. Composition leaves
the center-left clear (giant headline will sit there). Mood:
patient, satisfied, the small held breath before saying goodbye.
```

`--ar 21:9 --style raw --stylize 230 --no UI, neon, lens flare, glowing particles, planes, birds in V-formation, romantic clichés, sun-as-fireball`

## Prompt — 8-second loop (image-to-video)

```
Almost-still ambient motion. The cirrus whisp drifts slowly to the
right and dissipates. The horizon glow on the right pulses very
faintly — one slow breath across the whole loop. Hills below stay
completely still. No camera move. No zoom. No color shift. 8
seconds, 24 fps, seamless.
```

---

## Variants

- **B / overhead crop**: zoom into just the upper sky, no hills
  visible. More abstract, more Aman.
- **C / lake mirror**: replace hills with calm water mirroring the
  sky. Adds a second horizon. Risk: too symmetrical / Instagrammy.
  Try once, ditch if it looks like a smartphone wallpaper.

Pick the version that disappears most into the page — this is the
*last* thing the visitor sees, and the headline must dominate. The
image is wallpaper, not statement.
