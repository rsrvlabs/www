import Link from "next/link";

/**
 * The site's five-route mono nav — ONE source for the landing wordmark and
 * every subpage header (layout-audit gap #3: the references carry full nav
 * everywhere; ours stripped subpages to logo + section tag, so moving
 * between /labs and /frontiers required the landing). Kicker grammar,
 * house hover underline. `current` marks the section you're on: full
 * paper voice + `aria-current`, siblings stay dimmed — highlight by
 * contrast, no extra chrome.
 */

export const NAV_ITEMS = [
  { href: "/sw", label: "Flagship" },
  { href: "/labs", label: "Labs" },
  { href: "/frontiers", label: "Frontiers" },
  { href: "/research", label: "Research" },
  { href: "/effects", label: "Effects" },
] as const;

export function NavLinks({ current }: { current?: string }) {
  return (
    <nav className="hidden items-baseline gap-7 font-mono text-[0.62rem] uppercase tracking-[0.18em] md:flex">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={href === current ? "page" : undefined}
          className={
            href === current
              ? "text-paper"
              : "link-underline text-paper/60 transition-colors duration-200 hover:text-paper"
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

/** The chrome's WRITE → action — same face everywhere; the landing points it
 *  at #invitation, subpages at the mailbox. */
export function WriteLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper"
    >
      <span className="link-underline">Write</span>
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
