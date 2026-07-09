import Link from "next/link";
import type { ReactNode } from "react";
import { PunchSurface } from "@/components/site/punch-card";
import { SpecRow } from "@/components/site/spec-row";
import { NavLinks, WriteLink } from "@/components/site/nav";
import { MobileMenu } from "@/components/site/mobile-menu";

/**
 * Shared kit for the top-level subpages (IA in DESIGN.md — founder's
 * categorization, verbatim). Night grammar: kicker machine layer, serif
 * display, dashed hairlines, grid-paper texture band, punch-card entries.
 */

const CONTACT = "hello@rsrvlabs.com";

export function StatusTag({ children }: { children: ReactNode }) {
  // `self-start` keeps the specimen tag content-width inside the Entry's flex
  // column (a bare flex child would stretch full-width); no-op in block context.
  return (
    <span className="kicker inline-block self-start border border-paper/25 px-2 py-1 text-[0.6rem] text-paper/65">
      {children}
    </span>
  );
}

/** Subpage chrome carries the FULL five-route nav + WRITE → (layout-audit
 *  gap #3 — the references keep full nav everywhere; the old logo-only
 *  header made every subpage a dead-end). `current` lights the section
 *  you're on; the section tag moved below the logo, out of the nav's way. */
export function SubpageHeader({
  index,
  label,
  current,
}: {
  index: string;
  label: string;
  current: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-baseline justify-between px-6 py-6 md:px-10">
      {/* Mobile-only legibility scrim — same treatment as the landing
          wordmark (chrome floats over full-width content on phones). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-8 top-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.145 0 0 / 0.9), oklch(0.145 0 0 / 0))",
        }}
      />
      <div className="flex flex-col">
        <Link href="/" className="font-display text-base tracking-tight text-paper" aria-label="Reserve">
          reserve<span className="text-sun">.</span>
        </Link>
        <span className="kicker mt-2 text-[0.6rem] text-paper/45">
          N° {index} · {label}
        </span>
      </div>
      <NavLinks current={current} />
      <div className="flex items-baseline gap-6">
        <MobileMenu current={current} writeHref={`mailto:${CONTACT}`} />
        <WriteLink href={`mailto:${CONTACT}`} />
      </div>
    </header>
  );
}

/** Mono metadata bar (scrunch grammar): left-hairline items under the H1.
 *  Hairline strength + spacing match the landing's machine rows (hero /
 *  note / weather — border-paper/15, the site's one metadata rhythm). */
export function MetaBar({ items }: { items: string[] }) {
  return (
    <div className="kicker mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 text-paper/50">
      {items.map((item) => (
        <span key={item} className="border-l border-paper/15 pl-4">
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * Movement — an editorial passage between the specimen entries (layout-audit
 * gap #1: subpages ran 1.4–2.1 folds vs the references' 7–11.6; the fix is
 * DEPTH, and for a concept-brand/portfolio site depth = the designer's
 * thinking about the work, not a SaaS fact sheet). Same night grammar: a mono
 * kicker → serif subhead (label register, not the display) → prose at the
 * site's reading measure. Sits in the Subpage `divide-y divide-dashed` flow,
 * so a dashed hairline separates it from neighbouring entries automatically.
 */
export function Movement({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10">
      <span className="kicker text-[0.6rem] tracking-[0.26em] text-paper/45">
        {kicker}
      </span>
      <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15] tracking-[-0.01em] text-paper">
        {title}
      </h2>
      <div className="mt-5 max-w-[60ch] space-y-5 font-sans text-[0.95rem] leading-[1.8] text-paper/70">
        {children}
      </div>
    </section>
  );
}

export type Cta = { line: string; label: string; subject: string };

/** Closing CTA band (layout-audit gap #2: every reference page ends with a
 *  conversion beat; ours dead-ended into the exit link). The landing 06
 *  grammar condensed: one serif line + one mono mailto with a prefilled
 *  subject, behind a dashed-night hairline. Founder copy verbatim per page. */
export function CtaBand({ line, label, subject }: Cta) {
  return (
    <div className="hairline-dashed-night mt-20 pt-10">
      <p className="max-w-[30ch] font-display text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.2] tracking-[-0.01em] text-paper">
        {line}
      </p>
      <a
        href={`mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`}
        className="group mt-8 inline-flex items-baseline gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper"
      >
        <span className="link-underline">{label}</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}

export function Subpage({
  index,
  label,
  current,
  title,
  intro,
  cta,
  children,
}: {
  index: string;
  label: string;
  /** Route of this section for the nav's current-page mark, e.g. "/labs". */
  current: string;
  title: string;
  intro: string;
  cta?: Cta;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-[100svh] w-full overflow-x-clip bg-night">
      {/* Instrument-room texture band behind the title (insforge grammar) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[52svh] grid-paper-night"
      />
      <SubpageHeader index={index} label={label} current={current} />
      <div className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        {/* Label-scale hero (DESIGN.md title register / lelabo §7.7 "26px
            lesson"): the 7.4rem display concept lives ONLY on the landing
            arrival; subpage/product heroes inform, not perform. */}
        <h1 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.015em] text-paper">
          {title}
        </h1>
        <MetaBar items={[`${index} — ${label}`, "Reserve", "EST. MMXXIV"]} />
        <p className="mt-10 max-w-[52ch] font-sans text-[0.95rem] leading-[1.8] text-paper/70">
          {intro}
        </p>
        <div className="hairline-dashed-night mt-14 divide-y divide-dashed divide-paper/15 pt-6">
          {children}
        </div>
        {cta ? <CtaBand {...cta} /> : null}
        <div className="hairline-dashed-night mt-20 pt-8">
          {/* Lowercase mono utility link (lelabo `view more` register) */}
          <Link href="/" className="label-mono link-underline text-paper/60">
            ← back to the studio
          </Link>
        </div>
      </div>
    </main>
  );
}

/**
 * Specimen entry — the subpage inventory item wears the SAME Le Labo label-block
 * anatomy as the landing doors lattice (design-refs/lelabo §4, PATH A §7.1): the
 * PunchSurface reads as one apothecary block —
 *   eyebrow/tag (StatusTag) → TITLE (serif) → support line → SpecRow (solid
 *   `night-line` hairline + honest mono machine facts; `enter →` action row only
 *   when the entry navigates somewhere real).
 * `spec` is a lowercase specimen label (status · register · quantity) derived
 * HONESTLY from this entry's own on-page copy — never a fabricated metric (copy
 * law rule 3 + 5; honesty outranks register). The two hairline grammars stay
 * distinct by ROLE: dashed = the list-flow separator BETWEEN specimens; solid
 * `night-line` = the machine label-rule WITHIN one specimen (matches doors).
 */
export function Entry({
  tag,
  title,
  blurb,
  spec,
  href,
}: {
  tag: string;
  title: string;
  blurb: string;
  spec: string;
  href?: string;
}) {
  return (
    <article className="py-6">
      {/* punch-card corners + surface rise — shared site/punch-card */}
      <PunchSurface className="-mx-5 flex h-full flex-col p-5">
        <StatusTag>{tag}</StatusTag>
        <h2 className="mt-4 font-display text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.15] text-paper">
          {href ? (
            <Link href={href}>
              <span className="link-underline">{title}</span>
            </Link>
          ) : (
            <span className="link-underline">{title}</span>
          )}
        </h2>
        <p className="mt-3 max-w-[58ch] font-sans text-[0.9rem] leading-[1.75] text-paper/70">
          {blurb}
        </p>
        <SpecRow spec={spec} action={href ? "enter →" : undefined} />
      </PunchSurface>
    </article>
  );
}
