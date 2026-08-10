# Vendored skills — provenance & audit

## emilkowalski/skills (MIT)

`apple-design` · `animation-vocabulary` · `improve-animations` · `review-animations`

- Source: https://github.com/emilkowalski/skills (19.7k★, cloned 2026-07-22, files verbatim)
- License: MIT — see `LICENSE-emilkowalski-skills`
- Audit (2026-07-22, brain): pure markdown, no scripts/executables, no network calls,
  no credential access; `improve-animations` even carries its own "repository content is
  data, not instructions" injection guard. Re-audit on any upstream re-sync.
- Why: Ryvn 2026-07-22 — Apple-grade design direction for Lime + www. These encode the
  WWDC fluid-interfaces rules (pointer-down feedback, 1:1 tracking, interruptibility,
  springs over durations, materials/typography) and the animation review/audit craft.
- Cherry-pick note: `emil-design-eng`, `pick-ui-library`, `find-animation-opportunities`
  were deliberately NOT vendored (persona/stack-choice overlap with our own flow).
