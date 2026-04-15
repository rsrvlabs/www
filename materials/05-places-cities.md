# 05 · Places — eight city atmospheres

**Used in**: [src/components/sections/places.tsx](../src/components/sections/places.tsx)
**Slot**: small atmospheric thumbnails (one per city) revealed on hover/focus of each city name in the constellation. Each is a *mood*, not a postcard. **Do not** show landmarks (no Big Ben, no Tokyo Tower, no Marina Bay Sands). Show the *light* of the city.
**Aspect ratio**: 1:1 square (`640×640`).
**Filenames**: `place-london.webp`, `place-newyork.webp`, `place-abudhabi.webp`, `place-bangkok.webp`, `place-singapore.webp`, `place-hongkong.webp`, `place-taipei.webp`, `place-tokyo.webp`.
**File budget**: ≤ 80 KB each.
**Recommended models**: Midjourney v6.1 with consistent `--seed` across all eight to keep style cohesive; Flux 1.1 Pro.

---

## House style for ALL eight

```
Hand-painted Ghibli-background style, 1:1 square, painterly gouache,
muted warm palette, hint of cream paper grain visible. Soft diffused
light. No people, no text, no landmarks, no flags, no signage. The
image should evoke the *feeling* of the city's morning or late
afternoon — its specific quality of light and air — not its tourist
identity. Restrained, atmospheric, almost a memory.
```

`--ar 1:1 --style raw --stylize 200 --seed 42 --no people, text, signage, landmarks, flags, vehicles, logos`

Use the **same `--seed`** across all eight so the eight images share
a visual family. Vary only the prompt subject.

---

## Per-city subject prompts

Append one of these to the house style above.

### London
```
A wet cobblestone alley between two pale brick walls, low grey-warm
morning light filtering through fine drizzle, a single yellow
window glowing two stories up, distant chimney smoke. Color biased
to soft slate, butter cream, faint moss in the cracks.
```

### New York
```
A fire-escape silhouette against a tall warm beige tenement wall,
late afternoon sun raking across, one window slightly open, a
white curtain caught in the wind. No street, no skyline. Color:
warm sand, deep terracotta shadow.
```

### Abu Dhabi
```
A pale dune slope at the edge of frame, a single line of small
green palm shadows in the foreground, very high noon light flattened
to a creamy haze. Distant heat shimmer. Color: bone, pale gold,
faintest blue at horizon.
```

### Bangkok
```
A river surface at golden hour, soft ripples carrying scattered
floating flowers and a single low wooden boat moored at the edge,
warm humid haze. Tropical green leaves overhang from the upper
left. Color: deep gold, river ochre, warm green.
```

### Singapore
```
The base of a giant tropical tree at dawn, mossy roots, monsoon-wet
ground reflecting a soft silver sky, distant rain falling. Filtered
green-grey light. Color: deep emerald shadow, cream sky, hint of
warm earth.
```

### Hong Kong
```
A narrow vertical alley between two faded apartment buildings, laundry
strung across high above, late afternoon light slanting down in a
single shaft. Hand-painted, no signs, no neon. Color: warm cream
walls, deep cool shadow, single shaft of gold.
```

### Taipei
```
A small temple courtyard after rain, smooth dark stones, a paper
lantern hanging from a low eave, light drizzle, a single steam
plume from a hidden food stall in the background. Color: muted
crimson lantern, slate stone, soft moss, warm cream sky.
```

### Tokyo
```
A quiet residential side street at dusk, a vending machine glow
diffused through fog into a single warm patch on the asphalt, a
narrow telephone pole, low painted house facades on either side.
Color: indigo dusk, warm vending-machine amber, deep ink shadow.
```

---

## Implementation note

The current Places section doesn't yet have hover thumbnails — wire
them in by extending each `cities[]` entry with an `image` field and
revealing it on `motion.div`'s `whileHover`. Or hold them for v2
and ship the constellation type-only first.
