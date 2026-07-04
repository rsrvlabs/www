import Link from "next/link";
import type { ReactNode } from "react";
import { PunchSurface } from "@/components/site/punch-card";

/**
 * Shared kit for the top-level subpages (IA in DESIGN.md — founder's
 * categorization, verbatim). Night grammar: kicker machine layer, serif
 * display, dashed hairlines, grid-paper texture band, punch-card entries.
 */

export function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="kicker inline-block border border-paper/25 px-2 py-1 text-[0.6rem] text-paper/65">
      {children}
    </span>
  );
}

export function SubpageHeader({ index, label }: { index: string; label: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10">
      <Link href="/" className="font-display text-base tracking-tight text-paper" aria-label="Reserve">
        reserve<span className="text-sun">.</span>
      </Link>
      <span className="kicker text-paper/55">
        {index} · {label}
      </span>
    </header>
  );
}

/** Mono metadata bar (scrunch grammar): left-hairline items under the H1. */
export function MetaBar({ items }: { items: string[] }) {
  return (
    <div className="kicker mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-paper/50">
      {items.map((item) => (
        <span key={item} className="border-l border-paper/25 pl-4">
          {item}
        </span>
      ))}
    </div>
  );
}

export function Subpage({
  index,
  label,
  title,
  intro,
  children,
}: {
  index: string;
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-[100svh] w-full overflow-x-clip bg-night">
      {/* Instrument-room texture band behind the title (insforge grammar) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[52svh] grid-paper-night"
      />
      <SubpageHeader index={index} label={label} />
      <div className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-paper">
          {title}
        </h1>
        <MetaBar items={[`${index} — ${label}`, "Reserve", "EST. MMXXIV"]} />
        <p className="mt-10 max-w-[52ch] font-sans text-[0.95rem] leading-[1.8] text-paper/70">
          {intro}
        </p>
        <div className="hairline-dashed mt-14 divide-y divide-dashed divide-paper/15 pt-6">
          {children}
        </div>
        <div className="hairline-dashed mt-20 pt-8">
          <Link href="/" className="kicker link-underline text-paper/60">
            ← back to the studio
          </Link>
        </div>
      </div>
    </main>
  );
}

export function Entry({
  tag,
  title,
  blurb,
  href,
}: {
  tag: string;
  title: string;
  blurb: string;
  href?: string;
}) {
  return (
    <article className="py-4">
      {/* punch-card corners + tilt + surface rise — shared site/punch-card */}
      <PunchSurface className="-mx-5 grid grid-cols-12 items-baseline gap-4 p-5">
        <div className="col-span-12 md:col-span-3">
          <StatusTag>{tag}</StatusTag>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15] text-paper">
            {href ? (
              <Link href={href}>
                <span className="link-underline">{title}</span>
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="mt-3 max-w-[58ch] font-sans text-[0.9rem] leading-[1.75] text-paper/70">
            {blurb}
          </p>
        </div>
      </PunchSurface>
    </article>
  );
}
