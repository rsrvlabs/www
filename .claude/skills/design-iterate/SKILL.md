---
name: design-iterate
description: Run one design-iteration round on the Reserve landing site — implement from DESIGN.md + design-refs, verify (lint/build/e2e), capture Playwright screens for review, commit without co-author, push. Use for any visual/copy/section change ("改 hero", "優化 doors", "上 ink-pair tokens").
---

# Design iterate — one round, verified, reviewable

The proven working loop for this repo (established 2026-07-04 during the night-first redesign).
One round = one coherent change, fully verified, with screens the founder can judge.

## Steps

1. **Read the law + evidence first:** `DESIGN.md` (our rules + founder rulings — night-first,
   machine layer, house easings, no-scroll-jack) and the relevant `design-refs/*.md` ledger
   ("already adopted / not yet"). Never design from memory of the reference sites.
2. **Implement ONE coherent slice.** Tokens change only in `globals.css @theme` (+ sync
   DESIGN.md). Components use `.kicker` / `.hairline-dashed(-night)` / `.link-underline` /
   `--ease-*` — never invent ad-hoc colors or easings. `prefers-reduced-motion` on every
   animation. React-compiler rules: no ref access or setState-in-effect during render;
   destructure hook returns.
3. **Verify (all three, every round):** `pnpm lint` (0 errors) → `pnpm build` (clean) →
   `pnpm test:e2e` (green; dev server auto-boots on **port 3947** — never assume :3000).
4. **Capture screens:** `SHOTS_DIR=/tmp/shots npx playwright test e2e/screens.spec.ts
   e2e/screens-pages.spec.ts --project=desktop` — LOOK at the images before claiming success
   (the veil occludes; hover states are captured on the doors beat).
5. **Commit + push:** atomic, descriptive, **no Co-Authored-By**; when implementing from a
   reference, cite `design-refs/<site> — <technique>` in the message. `git add -- <paths>`,
   never `-A`. Playwright imagery never enters git.
6. **Review offer:** present the screens + what changed + the judgment calls made; iterate on
   feedback one round at a time.

## Gotchas (hard-won)

- Char-split headlines break mid-word — wrap words in `whitespace-nowrap` spans.
- Playwright "h1 visible" passes BEHIND the arrival veil — wait for the ARRIVING label to hide.
- Port 3000 is often another project's dev server — e2e is pinned to 3947 for that reason.
