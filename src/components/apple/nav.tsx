"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./apple.module.css";

const ITEMS = [
  { href: "/limere", label: "Limere" },
  { href: "/labs", label: "Labs" },
  { href: "/frontiers", label: "Frontiers" },
  { href: "/research", label: "Research" },
];

/** apple.com's chrome: a 44px translucent bar, tiny type, nothing else —
 *  except the one thing it must answer, which is where you currently are.
 *  Derived from the pathname so a new page can never forget to mark itself.
 *
 *  Below 620px the five items stopped fitting the bar and read as a cramped
 *  row (Ryvn 2026-08-02), so the links collapse behind a button. apple.com
 *  does the same at the same kind of width. The sheet is the same surface as
 *  the bar, its rows are full-width tap targets, and it closes when one is
 *  taken, on Escape, and on a tap outside. The links are hidden with CSS rather than
 *  unmounted, so the markup a crawler sees is identical at every width. */
export function AppleNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Escape closes it, and the page underneath must not scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav className={s.nav}>
        <Link href="/" className={s.navBrand}>
          Reserve
        </Link>

        <span className={s.navLinks}>
          {ITEMS.map(({ href, label }) => {
            const active = isActive(href);
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
        </span>

        <button
          type="button"
          className={s.navToggle}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? `${s.navBar} ${s.navBarTop}` : s.navBar} />
          <span className={open ? `${s.navBar} ${s.navBarBottom}` : s.navBar} />
        </button>
      </nav>

      {open && (
        <>
          <button
            type="button"
            className={s.navScrim}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div id="site-menu" className={s.navSheet}>
            {ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? `${s.navSheetLink} ${s.navSheetActive}` : s.navSheetLink}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
