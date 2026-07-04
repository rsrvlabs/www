# Design references — the three source sites

Teardowns of the founder-chosen reference sites (2026-07-04, extracted from **fetched
production HTML/CSS/JS**, not from memory). These feed the 大改造 (full redesign): steal
techniques, not pixels. Our own law lives in `../DESIGN.md`; these files are the evidence base.

| File | Site | What we take from it |
|---|---|---|
| `insforge.md` | insforge.dev | dark component grammar: lattices, grid-paper, odometer, enter-once choreography, hover system |
| `ploy.md` | ploy.ai | component play: punch-card, Braille tiles, char effects, tilt, house easings, ink-pair accents |
| `scrunch.md` | scrunch.com/blog | editorial system: font-role trichotomy, warm paper/ink, dashed hairlines, blog layout |

Rule of use: when implementing, cite which ref + which technique in the commit message.
Re-fetch the live sites before trusting exact values long-term — they ship updates.
