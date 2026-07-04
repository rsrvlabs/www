"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Odometer digits (DESIGN.md motion rules / insforge grammar): each digit is
 * an overflow-hidden 0.62em × 1.1em slot; the column translates to the target
 * on first view — `transform .4s cubic-bezier(.22,1,.36,1)` per insforge's
 * COMPUTED values (design-refs/insforge.md; --ease-enter IS that bezier).
 * Non-digits render as-is. Reduced-motion users see the final value instantly
 * (global media query zeroes transitions).
 */

function Digit({ d, play, delay }: { d: number; play: boolean; delay: number }) {
  return (
    <span className="inline-block h-[1.1em] w-[0.62em] overflow-hidden align-bottom">
      <span
        className="block will-change-transform"
        style={{
          transform: play ? `translateY(-${d * 1.1}em)` : "translateY(0em)",
          transition: "transform 0.4s var(--ease-enter)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1.1em] leading-[1.1em] text-center">
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Margin is VERTICAL-only: a bare "-15%" insets all four sides, and the
  // horizontal inset (15% of viewport width) meant a stat near the left edge
  // never intersected — its digits never played (caught 2026-07-04: "01"
  // rendered as "00"). Trigger on vertical entry alone.
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit key={i} d={Number(ch)} play={inView} delay={i * 90} />
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}
