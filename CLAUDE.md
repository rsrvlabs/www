@AGENTS.md

# Reserve landing page (`rsrvlabs/www`)

Next.js 16 (App Router) · React 19 · Tailwind 4 (`@theme` tokens in `src/app/globals.css`) ·
GSAP + framer-motion + lenis (smooth scroll) · deck.gl + maplibre (cities globe).
Package manager: **pnpm**.

## Layout

- `src/app/` — pages; `globals.css` holds the **design tokens** (single source of truth).
- `src/components/sections/` — the six landing sections (arrival → note → practices → weather →
  places → invitation), assembled in `app/page.tsx` behind `ArrivalVeil` (cream prefetch gate).
- `src/components/visuals/` — city-map (deck.gl), scroll-reveal, decrypt-text, odometer. `ui/` — shadcn-style primitives.
- `materials/*.md` — per-section **content briefs** (the written spec each section implements).
- `DESIGN.md` — the design system spec (aesthetic direction, tokens, motion rules). **Read before
  any visual change.**
- `design-refs/` — teardowns of the founder-chosen reference sites (insforge / ploy / scrunch)
  with exact tokens, component recipes, and motion specs. The evidence base for the redesign —
  cite the ref + technique in commits that implement from them.

## Commands

- `pnpm dev` · `pnpm build` · `pnpm lint`
- `pnpm test:e2e` — Playwright smoke suite (`e2e/`). Boots its own dev server on **port 3947** —
  deliberately NOT :3000, which is often occupied by another project's dev server on dev machines
  (observed: testing silently ran against the wrong site). Keep e2e specs resilient: assert
  structure/console health, not map-tile pixels.

## Session boot (what a fresh Claude session here needs)

- **Skills:** gstack is installed globally (`~/.claude/skills/gstack`) — `/qa`, `/design-review`,
  `/review`, `/ship`, `/browse` all apply to this repo. Repo-local: **`/design-iterate`** (the
  verified one-round design loop — use it for any visual change). The company brain's skills
  (tickets, wiki) are NOT here by design — see ADR-0012 in the brain repo: this repo carries a
  harness, the brain carries memory/governance.
- **MCPs: none required.** Playwright runs via CLI (`pnpm test:e2e`), browsing via gstack's
  browse daemon. Notion/Discord are the brain session's business, not this repo's.
- **Permissions:** `.claude/settings.json` pre-allows the dev loop (pnpm/playwright/git
  read-ops) to keep prompts low.
- **First commands:** `pnpm install` → `pnpm test:e2e` (verifies the whole chain incl. the
  dedicated e2e port). Then read `DESIGN.md` + `design-refs/` before touching visuals.

## Working conventions (mirrors the ai-native-reserve harness)

- **Commits:** atomic + frequent; **no `Co-Authored-By` lines**; push after commit. Stage with
  `git add -- <paths>`, never `-A`. Pull (rebase) before pushing.
- **Design workflow:** read `DESIGN.md` → change tokens only in `globals.css @theme` (+ sync
  DESIGN.md) → `pnpm lint && pnpm build && pnpm test:e2e` → capture screens for visual review:
  `SHOTS_DIR=/tmp/shots npx playwright test e2e/screens.spec.ts --project=desktop`
- **Machine-layer grammar in code:** section labels/metadata use the `.kicker` class (+ `N° NN ·`
  collection index, adopted 2026-07-05; plate counters like `Reserve · 02/06` stay bare); dividers
  use `.hairline-dashed(-night)`; link hovers use `.link-underline`; easings come
  from `--ease-enter/--ease-ui/--ease-pop` — components must not invent their own.

## Hard rules

- **Playwright-generated imagery never enters git** (founder rule 2026-07-04): reports, traces,
  failure screenshots, visual snapshots — all gitignored. (If visual-regression snapshots are ever
  needed, store them outside the repo.) Site assets under `public/` are fine to commit; the current
  `public/materials/*.jpg` set is slated for a design refresh (see the design-revamp ticket).
- **Design changes follow `DESIGN.md`** — don't invent ad-hoc colors/typography; extend the tokens.
- Chinese content OK; code/comments/docs in English.
