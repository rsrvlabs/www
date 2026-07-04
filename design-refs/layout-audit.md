# Layout audit — our pages vs the reference layout SYSTEMS

**Scope:** structure only — first-viewport composition, column/grid systems, section rhythm,
information density, nav patterns, footer anatomy, page-length vs content count. NOT tokens,
motion, or copy (those live in the per-site teardowns + DESIGN.md). Audit only; no layout
changes ride along with this file.

**Method (2026-07-05):** headless Chromium (playwright 1.59, 1440×900, DPR 1). Ours from the
dev server on :3947 (all 7 routes), references live (insforge.dev, ploy.ai, scrunch.com/blog +
`/blog/ai-search-q2-2026/`). Each page: full autoscroll (mount lazy content + enter-once
states) → DOM census of visible elements (headings/paragraphs/links/buttons/media ≥24px,
section boxes, computed max-widths, nav/footer anatomy) → full-page + first-viewport
screenshots. Reference fold-1s re-captured on a fresh load (their scroll restoration poisoned
the first pass). Raw JSON + shots in the session scratchpad — never in git (playwright-imagery
rule). Re-run before trusting exact px long-term; ref sites ship weekly.

---

## 1 · Measured summary (1440×900, one fold = 900px)

| Page | Height (px) | Folds | Links | Media ≥24px | Headings | Text chars/fold | Links/fold |
|---|---|---|---|---|---|---|---|
| **ours /** | 5,796 | 6.4 | 16 | 3 | 4 | 404 | 2.5 |
| **ours /sw** | 1,491 | 1.7 | 2 | 0 | 4 | ~500 | 1.2 |
| **ours /labs** | 1,487 | 1.7 | 2 | 0 | 4 | ~450 | 1.2 |
| **ours /frontiers** | 1,640 | 1.8 | 2 | 0 | 5 | ~470 | 1.1 |
| **ours /research** | 1,638 | 1.8 | 4 | 0 | 5 | 467 | 2.2 |
| **ours /research/ai-native-company** | 1,877 | 2.1 | 2 | 0 | 1 | 1,089 | 1.0 |
| **ours /effects** | 1,261 | 1.4 | 2 | 0 | 3 | ~560 | 1.4 |
| insforge.dev | 6,302 | 7.0 | 60 | 233 inst. | 22 | 851 | 8.6 |
| ploy.ai | 9,865 | 11.0 | 77 | 58 (6 video) | 15 | 727 | 7.0 |
| scrunch.com/blog | 6,683 | 7.4 | 76 | 31 | 12 | 498 | 10.3 |
| scrunch post (Q2 digest) | 10,450 | 11.6 | 75 | 14 | 29 | 894 | 6.5 |

Two numbers carry most of this audit: **our subpages are 1.4–2.1 folds against the references'
7–11.6**, and the landing runs at **roughly half the per-fold information density** of the
*calmest* reference (404 chars + 2.5 links/fold vs 498–894 + 6.5–10.3).

## 2 · The systems, dimension by dimension

### First-viewport composition (what occupies fold 1)

- **insforge:** 52px sticky nav (with GitHub ★12.0k *in the chrome*, at 0px) → YC badge →
  48px H1 (accent span) → subhead → mascot → **two CTA buttons** → the 11-logo "works with"
  marquee *inside fold 1*. A complete pitch + third-party proof + action before any scroll.
- **ploy:** floating pill nav (2 CTAs) → **full-bleed brand film at 96px** (real office, real
  people) → 144px condensed H1 over it → subhead → 2 CTAs → floating "$27M seed" news card.
- **scrunch blog index:** announcement banner → 88px nav (2 CTAs) → left **taxonomy rail**
  (Blog/Search/Product/Data Studies/Takes/…) → featured 2:1 cover + 40px serif title. 28 links
  in fold 1 — the index is a working surface.
- **scrunch post:** banner + nav → left-hairline mono metadata rail (category/byline/date) →
  54px serif H1 → 2:1 hero cover peeking. Body starts fold 2.
- **Ours (landing):** 72px fixed nav (5 mono links + WRITE →) → kicker → 118px serif
  two-line H1 (single gold accent) over silk → one 52ch paragraph → machine row (EST. MMXXIV ·
  BOOTSTRAPPED · TAIPEI) → SCROLL. **Zero buttons, zero third-party proof, zero artifact**
  (silk is texture, not evidence). First in-flow action is the flagship ENTER → at ~1,900px
  (fold 2.1); the only conversion point is one mailto at ~4,900px (fold 5.4).
- **Ours (subpages):** nav shrinks to logo + section tag — fold 1 is H1 + metadata bar + one
  paragraph. No action, no artifact, no route elsewhere.

### Column / grid systems

- insforge: one 1280px container; 640px for narrow text; the 12-cell collapsed lattice is the
  page's centerpiece grid. Symmetric, engineered.
- ploy: 1152px container; card grids at 384/312px; text cols 540px; display type breaks the
  container full-width. Rhythm comes from alternating full-bleed color bands.
- scrunch post: the **wide→narrow funnel** — 1440 chrome → 1140 H1 → 1496 hero → **850px body**
  (54 elements at exactly 850) → 1488 related grid.
- Ours: landing 1408px (88rem) container, note voice offset to `col-start-5` (the one
  sanctioned asymmetric beat); doors as a collapsed lattice (insforge grammar ✓); paragraph
  measure ~664px. Subpages 1088px (68rem) with a two-col entry grid (mono tag rail ~256px +
  content). Research post: 1088 title / **850px body ✓** — the scrunch funnel widths hold.
- **Verdict:** our column systems are sound and already reference-derived. The gaps are not
  grids — they're what sits *in* the cells (see §4).

### Section rhythm (px per "idea")

- Ours (landing beats): hero 900 → note 602 → doors 1,065 → weather 1,208 → places 900 →
  invitation+footer 1,121. Section padding 16–24svh. **~1 idea per ~900–1,200px.**
- insforge: hero 690 → transform 725 → services 951 → safety 721 → changelog 425 → community
  857 → FAQ 961 → final-CTA 723 → footer 197. Same *section heights* as ours — but each
  section carries **4–12 content units** (12 service cells, 8 testimonials, 8 FAQs, 4 dated
  changelog cards, 11 logos, 4 odometers). Similar air; ~7× the payload.
- ploy: ~10 bands in 11 folds, every band anchored by a moving/evidentiary asset (film, logo
  wall, sim-UI stat cards, screenshot, faces, 3D motif). Payload again, not different spacing.
- **Verdict:** our whitespace rhythm is *not* the outlier — our per-section payload is.

### Information density per viewport-height

Ours 404 chars/fold, 2.5 links/fold, 0.5 media/fold (landing) vs references 498–894 chars,
6.5–10.3 links, 1.2–33 media. Even scrunch's *editorial* pages — the quietest reference —
carry 1.2–4.2 assets and ~500–900 chars per fold. Our only page matching a reference density
is the research post body (1,089 chars/fold vs scrunch's 894 — the 850px/19px system works);
it's just 5× shorter.

### Nav patterns

| | sticky? | height | items | proof in chrome | CTA in chrome | subpages |
|---|---|---|---|---|---|---|
| insforge | sticky, solid bg + border | 52px | 8 + socials | GitHub ★12.0k | Sign Up (filled) | full nav everywhere |
| ploy | fixed floating pill | 48px | 5 dropdowns | — | Log in + Start Free | full nav everywhere |
| scrunch | fixed, 88px + announcement banner | 88px | mega-menu w/ preview cards | — | Trial + Book a demo | full nav everywhere |
| **ours** | fixed, transparent (no bg/scrim) | 72px | 5 links | — | WRITE → (text link) | **all links dropped** — logo + section tag only |

### Footer anatomy

- insforge: compact 197px, 12 links, **"All systems operational"** status dot (live proof in
  the footer). ploy: 1,421px mega-footer, 59 links, contact CTA, giant wordmark. scrunch:
  717px, 24 links, plans-CTA card, wordmark block.
- Ours (landing): brand line + Cities + Index columns, 4 links, © row — a signature, not a
  sitemap (fine for a studio, see §5). Ours (subpages): **no footer** — a single
  "← back to the studio" exit link.

### Page-length vs content count

Same length ≠ same mass: our landing (5,796px) and insforge (6,302px) are near-identical in
length; insforge fits ~45 content units in it, we fit ~8. Ploy and the scrunch post earn their
~10,000px with 50–105 paragraphs and 14–58 assets. **Nobody ships a 1.5-fold page** — our five
subpages all do.

## 3 · Per-page gaps (ours vs closest reference pattern)

| Our page | Closest ref pattern | Biggest structural gaps |
|---|---|---|
| `/` landing | insforge one-pager | No fold-1 proof or CTA button; beats 04/05 carry one unit each where the pattern anchors every ~900px with a multi-unit artifact; 16 links total vs 60 |
| `/sw` (flagship!) | ploy product page | 1.7 folds; zero artifact (no POC screen); **no action at all** — a flagship page you cannot act on; no nav out except back-link |
| `/labs` | insforge services lattice | 3 punch-card rows, no evidence (Fermi is LIVE daily — no brief screenshot, no numbers, no dates); no per-product status→proof pairing |
| `/frontiers` | ploy solutions band | Same placard shape; forward-deployed = humans, but zero faces/logos/deliverable fragments |
| `/research` | scrunch blog index | No cover system — list identity is typography only; no taxonomy rail; 4 links vs 76; fine at 3 notes, breaks at 10 |
| `/research/ai-native-company` | scrunch post | Funnel widths match ✓; missing the post *tail* — related-covers grid, share/next affordance; 1 heading vs 29 (no in-body H2 skeleton for long posts yet) |
| `/effects` | insforge community section | Honest-by-design (no fabricated quotes — law ✓), but no layout slot reserved for the effects format (before/after, dated systems-in-production ledger) |

## 4 · Ranked highest-impact layout gaps

1. **Subpage depth: 1.4–2.1 folds vs 7–11.6 everywhere else.** *They:* every page is a full
   argument — multiple proof sections. *We:* five identical one-fold placards (H1 + paragraph
   + 2–4 rows + exit link). *Fix:* per assets.md §5 beat map — /labs gains a real Fermi brief
   screenshot-in-frame + dated scored-board numbers; /sw gains a POC phone-screen peek +
   waitlist; 2–3 beats per page, reusing the landing's lattice/panel grammars. **Effort: M–L**
2. **No persistent CTA + no closing band.** *They:* 1–2 CTAs live in the chrome on every page,
   and every page ends with a conversion section before the footer (insforge's 723px final-CTA,
   scrunch's See-plans card, ploy's form). *We:* one mailto at fold 5.4 of the landing; /sw has
   literally no action. *Fix:* WRITE → survives on subpage chrome; shared closing-invitation
   band (landing 06 grammar, condensed) on all five subpages. **Effort: S**
   — **DONE 2026-07-05:** shared `CtaBand` (site/subpage kit) closes all five subpages + the
   essay tail (founder copy, prefilled-subject mailtos); WRITE → now in subpage chrome via
   gap 3's nav.
3. **Subpage nav strips all routes.** *They:* full nav everywhere. *We:* logo + section tag;
   moving between /labs and /frontiers requires the landing. *Fix:* carry the landing's 5-link
   mono nav onto subpages, active section marked (kicker grammar already fits). **Effort: S**
   — **DONE 2026-07-05:** subpage headers carry the landing's five-link mono nav + WRITE →
   (shared `site/nav.tsx`), current section at full voice + `aria-current`, section tag
   moved below the logo.
4. **Fold-1 evidence absent on the landing.** *They:* third-party or deterministic proof at
   0–677px (YC badge + GitHub stars in chrome; $27M news card; live logo wall). *We:* machine
   row is self-described, not evidence. *Fix:* assets.md beat 01 — live odometer counters from
   real ops stats (briefs published, tickets, commits) under the hero machine row; it's the
   already-sanctioned insforge pattern. **Effort: M**
5. **Doors lattice cells are under-filled.** *They (insforge cells):* vignette artifact + text
   + capability chips per cell. *We:* mono tag + title + one-liner. *Fix:* one honest artifact
   thumb per door when assets.md §5 lands (Fermi brief crop, POC screen, redacted deliverable);
   until then a mono status/stat line (LIVE · 08:00 DAILY already exists on /labs — surface it
   in the landing cells). **Effort: S–M**
6. **Research index has no cover system.** *They:* 100% of scrunch list units carry a 2:1
   cover — the cover IS the item identity (featured 1,010×505 → rows 280×140). *We:*
   typographic rows. *Fix:* the planned honest cover series (globe/silk/braille/lattice renders
   at 3:2, assets.md §5) applied featured-first; typographic rows stay legitimate until real
   covers exist (no filler — law). **Effort: M**
7. **Beats 04/05 (weather, places): 900–1,208px sections carrying a single unit.** *They:*
   every ~900px band is anchored by a multi-unit evidentiary artifact. *We:* one panel + 3
   stats; one globe + four words. *Fix:* weather panel absorbs the real overnight evidence
   (Fermi brief in Discord chrome + real git-log lines — assets.md beat 04, both exist today);
   places postcards go real-or-typographic per the standing ticket (globe refactor-or-remove is
   founder debt #4 — don't invest further until decided). **Effort: M**
8. **Post tail is an exit, not a loop.** *They:* scrunch ends every post with author card →
   3-cover related grid → plans CTA; index carousel + "More articles" keep 76 links live. *We:*
   author footer ✓ then "← ALL RESEARCH". *Fix:* next/related notes row (typographic until
   covers exist) + the shared closing band from gap 2. **Effort: S**
9. **Long-post skeleton unproven.** *They:* the Q2 digest is 10,450px with 29 headings — an
   H2/H3 rhythm every ~2 paragraphs holds the 850px column for 11 folds. *We:* essay 01 is one
   H1 + 6 paragraphs (fine at this length); the blueprint has no measured in-body H2 scale/
   spacing yet — the next long essay will improvise. *Fix:* spec H2/H3 sizes + spacing into the
   blog blueprint (DESIGN.md) from scrunch's computed values before essay 02. **Effort: S**
10. **Transparent fixed nav has no scrolled state.** *They:* solid bg + border (insforge),
    pill surface (ploy), banner+bg (scrunch) — chrome stays legible over any section. *We:*
    no background/scrim at any scroll position `[observed in code: fixed, no bg class]` —
    mono links sit directly on whatever scrolls under them (globe labels, lattice lines).
    *Fix:* add a scrolled state (night scrim or hairline) per the dark-section grammar.
    **Effort: S**

## 5 · Where our divergence is FINE (brand ≠ clone)

- **The zero-noise hero.** No CTA button, no badge wall, 118px serif over silk — this is the
  French-minimal statement, and it out-types all three references. Gap 4 asks for *one* row of
  deterministic proof, not insforge's fold-1 marquee.
- **One-idea-per-beat landing.** The six-beat story is the founder's meta-frame; the fix is
  payload *inside* beats (evidence assets), never grid-ifying the hero/note into a SaaS wall.
- **Small signature footer.** A 2-person bootstrapped studio shipping ploy's 59-link
  mega-footer would be cosplay. Landing footer stays a signature; only the *subpage dead-end*
  (gaps 2–3) needs fixing.
- **No announcement banner / mega-menu.** Nothing to announce, 6 routes — chrome minimalism is
  correct here.
- **850px/19px serif body + drop cap + pull quote** already match the scrunch blueprint — the
  post gap is tail + skeleton (gaps 8–9), not the column system.
- **Night ground vs ploy's light bands** — palette is settled law (DESIGN.md); ploy contributes
  component play only.
- **/effects staying thin until real client words exist** — the no-fabricated-evidence law
  outranks density. Reserve the layout slot; don't fill it.
- **Landing page *length* is right** (5.8k px ≈ insforge's 6.3k). Nothing here says "make
  pages longer" — it says make the same pixels carry evidence.
