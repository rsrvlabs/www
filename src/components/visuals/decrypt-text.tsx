"use client";

import { useEffect, useState } from "react";

/**
 * Decrypt/scramble entrance for machine-layer (mono) strings — React-Bits-style
 * concept, hand-rolled (no deps). Characters cycle through a small mono charset
 * and resolve left-to-right to the real text over ~1.2s, on the house enter-ease
 * feel. `prefers-reduced-motion` renders the final text immediately.
 *
 * The arrival veil occludes first paint — a run started at mount would finish
 * unseen behind it. When the veil is in the DOM, the run waits for its
 * `reserve:veil-lifted` dispatch instead.
 */

const CHARSET = "▪▫░▒·01";
const DURATION_MS = 1200;
const TICK_MS = 40;
// House --ease-enter feel (cubic-bezier(.22,1,.36,1) ≈ strong ease-out).
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function DecryptText({ text, className }: { text: string; className?: string }) {
  // SSR / pre-start / reduced-motion all show the real text.
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const start = () => {
      const t0 = performance.now();
      interval = window.setInterval(() => {
        const t = Math.min((performance.now() - t0) / DURATION_MS, 1);
        const resolved = Math.round(text.length * easeOut(t));
        setDisplay(
          text.slice(0, resolved) +
            Array.from(text.slice(resolved), (ch) =>
              ch === " " ? " " : CHARSET[Math.floor(Math.random() * CHARSET.length)],
            ).join(""),
        );
        if (t >= 1) window.clearInterval(interval);
      }, TICK_MS);
    };
    if (document.querySelector("[data-arrival-veil]")) {
      window.addEventListener("reserve:veil-lifted", start, { once: true });
    } else {
      start();
    }
    return () => {
      window.removeEventListener("reserve:veil-lifted", start);
      window.clearInterval(interval);
    };
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
