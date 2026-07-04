"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Odometer digits (DESIGN.md motion rules / insforge grammar): each digit is
 * an overflow-hidden slot; the column translates to the target on first view.
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
          transition: "transform 0.9s var(--ease-enter)",
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
  const inView = useInView(ref, { once: true, margin: "-15%" });
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
