"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_ITEMS } from "@/components/site/nav";

/**
 * Mobile nav — the small-screen counterpart of the five-route mono nav.
 * `NavLinks` hides below md, which left phones with no way to move between
 * sections (every subpage was a dead-end). A mono MENU control opens a
 * full-screen night overlay: the route index as a specimen list — serif
 * titles with machine `N°` tags, dashed list-flow separators between rows
 * (DESIGN.md separator discipline) — and the WRITE → action behind a
 * dashed hairline at the bottom. Desktop chrome is untouched (`md:hidden`
 * on both the trigger and the overlay).
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Route list for the overlay: home first, then the five sections.
 *  `index` mirrors each page's own machine tag (landing `N° 01`,
 *  subpage headers `N° F/L/R/Q/E`). */
const ROUTES = [{ href: "/", label: "Studio", index: "01" }, ...NAV_ITEMS];

export function MobileMenu({
  current,
  writeHref,
}: {
  /** Route of the current section (marks `aria-current`), if any. */
  current?: string;
  /** Where WRITE → points on this surface (mailto on subpages, #invitation on the landing). */
  writeHref: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // While open: lock body scroll, close on Escape, close if the viewport
  // grows past md (the overlay is md:hidden but the lock must release too),
  // and move focus onto the close control.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper md:hidden"
      >
        Menu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-night md:hidden"
          >
            {/* The machine's ruled paper behind the index (dark-section grammar) */}
            <div
              aria-hidden
              className="grid-paper-night pointer-events-none absolute inset-0 opacity-60"
            />

            <div className="relative flex items-center justify-between px-6 py-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-display text-base tracking-tight text-paper"
                aria-label="Reserve"
              >
                reserve<span className="text-sun">.</span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper"
              >
                Close
              </button>
            </div>

            <nav
              aria-label="Site"
              className="relative flex flex-1 flex-col justify-center px-6"
            >
              <div className="divide-y divide-dashed divide-paper/15">
                {ROUTES.map((r, i) => {
                  const isCurrent = r.href === current;
                  return (
                    <motion.div
                      key={r.href}
                      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.05 + i * 0.05,
                        ease: EASE,
                      }}
                    >
                      <Link
                        href={r.href}
                        onClick={() => setOpen(false)}
                        aria-current={isCurrent ? "page" : undefined}
                        className="flex items-baseline justify-between gap-6 py-5"
                      >
                        <span
                          className={`font-display text-[1.6rem] leading-[1.1] tracking-[-0.01em] ${
                            isCurrent ? "text-paper" : "text-paper/75"
                          }`}
                        >
                          {r.label}
                        </span>
                        <span className="kicker text-[0.6rem] text-paper/40">
                          N° {r.index}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hairline-dashed-night relative mx-6 pb-10 pt-6"
            >
              <a
                href={writeHref}
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper"
              >
                <span className="link-underline">Write</span>
                {/* Still arrow (lelabo hover census: nothing travels) */}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
