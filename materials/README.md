# materials/

Source-of-truth prompts for every image, video, and texture asset the
landing page expects. Generate the assets in your tool of choice
(Midjourney v6.1, Flux 1.1 Pro, Imagen 3, Sora, Runway Gen-3, Veo 2),
download to `public/materials/<filename>`, then wire them into the
section noted at the top of each prompt file.

## House style — apply to *every* prompt

> Studio Ghibli atmospheric warmth crossed with the restraint of an
> Aman brochure and the quiet technicality of a Teenage Engineering
> product page. Hand-painted feel, never CGI gloss. Cream paper,
> moss, dusk amber, soft sun gold. Light is morning or late
> afternoon — never noon, never night-blue. Grain, not noise. Air,
> not haze. **Do not** show screens, UI, neon, holograms, robots,
> code, brain icons, or any explicit "AI" cliché. Technology is
> implicit; never depicted.

### Negative prompt (paste into every generation)

```
no UI, no screens, no holograms, no neon, no purple-blue gradient,
no cyberpunk, no chrome, no glass morphism, no robot, no brain icon,
no glowing particles, no lens flare, no HDR, no oversaturation,
no plastic skin, no 3D render look, no AI faces, no text overlays,
no watermark, no logo, no bokeh balls, no fisheye
```

### Style references to cite

- Studio Ghibli backgrounds — Kazuo Oga, Nizo Yamamoto
- Hayao Miyazaki concept paintings (*The Wind Rises*, *Porco Rosso*)
- Aman Resorts photography (Yotaka, Tokyo)
- Teenage Engineering product photography
- Apichatpong Weerasethakul cinematography (warm dusk, slow)
- Wim Wenders' *Perfect Days* color grade
- Hiroshi Sugimoto seascapes (for horizon work)

### Palette tokens (for any tool that accepts hex)

| Role | Hex | Description |
|---|---|---|
| paper | `#f4ecd8` | warm cream background |
| paper-soft | `#ebd9b3` | sand |
| ink | `#2b2417` | warm dark |
| moss | `#5a7349` | quiet green |
| sun | `#e8b55f` | morning gold |
| dusk | `#a55c33` | terracotta |
| night | `#2a2014` | warm dark for shadow rooms |

### File naming convention

`<section>-<slot>-<variant>.<ext>`

Examples:
`arrival-sky-01.webp`, `practice-objects-ring-01.webp`,
`weather-loop-01.mp4`.

Save final assets in `public/materials/`.

---

## Index of prompt files

| # | File | Asset | Section |
|---|---|---|---|
| 01 | [01-arrival-hero.md](./01-arrival-hero.md) | Hero still or 12-sec ambient loop | Arrival |
| 02 | [02-practice-integration.md](./02-practice-integration.md) | Single still, abstract metaphor | Practices · 01 |
| 03 | [03-practice-objects.md](./03-practice-objects.md) | Smart-ring mood photograph | Practices · 02 |
| 04 | [04-weather-ambient.md](./04-weather-ambient.md) | Looping video, warm dark | Weather |
| 05 | [05-places-cities.md](./05-places-cities.md) | 8 atmospheric thumbnails | Places |
| 06 | [06-invitation-dusk.md](./06-invitation-dusk.md) | Sunset still or 8-sec loop | Invitation |
| 07 | [07-og-share-card.md](./07-og-share-card.md) | 1200×630 OG image | Metadata |
| 08 | [08-textures.md](./08-textures.md) | Paper, ink-wash, grain | Global |

---

## How to wire an asset back into the page

After saving e.g. `public/materials/arrival-sky-01.webp`:

```tsx
import Image from "next/image";
<Image
  src="/materials/arrival-sky-01.webp"
  alt=""           // decorative — leave empty
  fill
  priority
  className="object-cover opacity-90 mix-blend-multiply"
/>
```

For a video loop:

```tsx
<video
  src="/materials/weather-loop-01.mp4"
  autoPlay muted loop playsInline
  className="absolute inset-0 h-full w-full object-cover"
/>
```
