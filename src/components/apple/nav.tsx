"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./apple.module.css";

const ITEMS = [
  { href: "/lime", label: "Lime" },
  { href: "/labs", label: "Labs" },
  { href: "/frontiers", label: "Frontiers" },
  { href: "/research", label: "Research" },
];

/** apple.com's chrome: a 44px translucent bar, tiny type, nothing else —
 *  except the one thing it must answer, which is where you currently are.
 *  Derived from the pathname so a new page can never forget to mark itself. */
export function AppleNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className={s.nav}>
      <Link href="/" className={s.navBrand}>
        Reserve
      </Link>
      {ITEMS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={active ? s.navActive : undefined}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
