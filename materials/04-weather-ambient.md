# 04 · Weather — ambient loop

**Used in**: [src/components/sections/weather.tsx](../src/components/sections/weather.tsx)
**Slot**: behind the manifesto text. Currently uses two static radial-gradient hazes. This loop replaces or enhances them. Will sit at low opacity (~0.35) under the text.
**Aspect ratio**: 16:9 looping video, 16-20 seconds, seamless.
**Filename**: `weather-loop-01.mp4` (also export `.webm` for Safari fallback).
**File budget**: ≤ 3.5 MB h.264 CRF 28, no audio.
**Recommended models**: Sora, Veo 2, Runway Gen-3 Alpha (image-to-video from a generated still).

---

## Concept

A warm-dark room of weather. Slow ember light, drifting motes,
nothing recognizable. The visitor reads the manifesto over what
feels like firelight on a wall.

## Prompt — image-to-video seed (still first)

```
A painterly abstract: a deep warm-dark field — chocolate brown, ink
black tinted toward warm — with a single large soft amber haze
glowing in the lower-left, and a smaller terracotta haze in the
upper-right. No recognizable shapes. Looks like firelight on a
plastered wall, or the inside of a paper lantern, or the surface of
black tea catching light. Subtle vertical brushstrokes suggest air
movement. Heavy paper grain. No text, no UI, no people, no
landscape. Color palette: warm dark #2a2014, ember amber, faint
terracotta. Mood: dusk-after-rain, the room before someone speaks.
```

`--ar 16:9 --style raw --stylize 220 --no neon, glow nodes, particles, sparks, lens flare, hexagons, geometric shapes`

## Prompt — animation (apply to the still)

```
Extremely slow ambient motion, 18 seconds, seamless loop. The amber
haze breathes very slightly — expands and contracts with a 7-second
period, like a candle being watched from across a room. The
terracotta haze drifts slowly diagonally upward and dissolves at the
top edge, replaced by a new identical haze entering from below in a
seamless loop. No camera move. No zoom. No flicker. No sparks. No
particles. The brushstroke texture stays still. Only the light
moves. 24 fps.
```

**Negatives**: parallax, dolly, zoom, sparks, particles, flicker,
strobe, lightning, weather event, time-of-day change, color shift to
blue or purple, faces appearing in haze.

## Tips

- Render at 24 fps (not 30 or 60) — film cadence matches the brand
  voice better than smooth web video.
- Mute permanently. Browser autoplay only works muted; the video
  must function without sound forever.
- If the loop seam is visible, ask the model for a 4-second
  cross-fade at both ends, or use ffmpeg `tblend` to soften the
  cut: `ffmpeg -i in.mp4 -vf "fade=t=in:st=0:d=1,fade=t=out:st=17:d=1" out.mp4`.
