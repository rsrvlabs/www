import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared skeleton for the top-level subpages (IA in DESIGN.md — founder's
 * categorization, verbatim). Paper grammar: kicker header, serif display,
 * dashed hairlines, mono status tags.
 */

export function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="kicker inline-block border border-ink/20 px-2 py-1 text-[0.6rem] text-ink/60">
      {children}
    </span>
  );
}

export function SubpageHeader({ index, label }: { index: string; label: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-multiply md:px-10">
      <Link href="/" className="font-display text-base tracking-tight text-ink" aria-label="Reserve">
        reserve<span className="text-sun">.</span>
      </Link>
      <span className="kicker text-ink/55">
        {index} · {label}
      </span>
    </header>
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
    <main className="relative min-h-[100svh] w-full bg-paper">
      <SubpageHeader index={index} label={label} />
      <div className="mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
          {title}
        </h1>
        <p className="mt-8 max-w-[52ch] font-sans text-[0.95rem] leading-[1.8] text-ink-soft">
          {intro}
        </p>
        <div className="hairline-dashed mt-14 pt-12">{children}</div>
        <div className="hairline-dashed mt-20 pt-8">
          <Link href="/" className="kicker link-underline text-ink/60">
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
}: {
  tag: string;
  title: string;
  blurb: string;
}) {
  return (
    <article className="grid grid-cols-12 items-baseline gap-4 py-8 [&+&]:hairline-dashed">
      <div className="col-span-12 md:col-span-3">
        <StatusTag>{tag}</StatusTag>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15] text-ink">
          {title}
        </h2>
        <p className="mt-3 max-w-[58ch] font-sans text-[0.9rem] leading-[1.75] text-ink-soft">
          {blurb}
        </p>
      </div>
    </article>
  );
}
