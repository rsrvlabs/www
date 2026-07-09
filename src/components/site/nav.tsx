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
  // `index` = each page's own machine tag letter (SubpageHeader `N° F · …`);
  // the mobile menu overlay renders it next to the route title.
  { href: "/sw", label: "Flagship", index: "F" },
  { href: "/labs", label: "Labs", index: "L" },
  { href: "/frontiers", label: "Frontiers", index: "R" },
  { href: "/research", label: "Research", index: "Q" },
  { href: "/effects", label: "Effects", index: "E" },
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
      {/* Still arrow (lelabo hover census: underline only, nothing travels) */}
      <span aria-hidden>→</span>
    </a>
  );
}
