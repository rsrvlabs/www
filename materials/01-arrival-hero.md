# 01 · Arrival hero

**Used in**: [src/components/sections/arrival.tsx](../src/components/sections/arrival.tsx)
**Replaces / overlays**: the Silk WebGL shader currently behind the headline. You can keep Silk as a fallback and layer this on top at low opacity, or replace entirely.
**Slot**: full-bleed background of the first viewport.
**Aspect ratio**: 16:9 still (`1920×1080` minimum) **or** 12-second seamless loop in 16:9.
**Filename**: `arrival-sky-01.webp` and/or `arrival-sky-01.mp4`.
**File budget**: still ≤ 350 KB (webp q70). Loop ≤ 4 MB (h.264 CRF 26, mute, no audio).
**Recommended models**:
- *Still*: Midjourney v6.1 `--style raw --ar 16:9 --stylize 250`, or Flux 1.1 Pro
- *Loop*: Runway Gen-3 Alpha (image-to-video from the still), Veo 2, or Sora

---

## Prompt — still

```
A wide painterly landscape in the style of a Studio Ghibli background
painting by Kazuo Oga: rolling soft hills in the lower third — moss
green deepening to a quieter olive — meeting a vast warm cream sky.
Three or four hand-shaped cumulus clouds, slightly off-center, edges
fluffed with morning light. A single low sun sits about 70 percent
across the frame, just above the horizon, glowing pale gold (#e8b55f),
not bright enough to flare. Distant layered hills fade to a powdered
sage in the haze. The whole scene is rendered in flat painterly
brushwork — visible strokes, slight paper grain, no airbrush
gradients, no photorealism. Color palette: cream #f4ecd8 sky, sun
gold #e8b55f, moss #5a7349, deep ink-green hills, faint terracotta
glow near the horizon. Composition leaves the upper-left quadrant
intentionally calm and uncluttered (text will sit there). The mood
is the first breath of a quiet morning — patient, warm, faintly
melancholy. Hand-painted gouache feel. Subtle visible canvas weave.
```

`--ar 16:9 --style raw --stylize 250 --no UI, screens, neon, fisheye, lens flare, holograms, robots, glowing particles, watermark`

---

## Prompt — 12-second loop (image-to-video)

Use the still above as the seed image, then animate with this prompt:

```
Very slow ambient motion. The clouds drift gently to the right at a
nearly imperceptible pace, a single far cloud crosses once. Soft
warm light pulses very slightly as if the sun is breathing. Heat
shimmer along the horizon line, almost invisible. No camera move.
No zoom. No pan. Loops seamlessly back to the first frame. 12
seconds, 24 fps. Painterly, hand-drawn aesthetic preserved — no
photoreal smoothing.
```

**Negatives**: parallax camera move, dolly, zoom, lens flare, particles, sparkles, lightning, weather change, time-of-day change.

---

## Variants worth trying

- **A**: Same composition but at *blue hour* — keep warm undertone, add muted indigo upper sky. Use only if the dusk sister to invitation feels too repetitive.
- **B**: Replace hills with a calm sea (Sugimoto reference). Same sky, same sun. Useful if hills feel too literal-Ghibli.
- **C**: Tighten crop to just the sky and horizon — no hills at all. Most restrained option.

Generate three variants minimum and pick after viewing in the actual page (the Silk shader behind matters).
