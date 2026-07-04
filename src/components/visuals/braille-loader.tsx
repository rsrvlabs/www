"use client";

import { useEffect, useState } from "react";

/**
 * U+2800 Braille "machine thinking" tiles (ploy grammar): three mono tiles
 * cycling dot-matrix frames — a 1KB signal that the machine is warming up.
 * Deterministic frame walk (no randomness); reduced-motion shows a static
 * full cell.
 */

// Braille dot bits walk a descending "rain" order per column.
const RAIN: number[] = [0x01, 0x08, 0x02, 0x10, 0x04, 0x20, 0x40, 0x80];

function frame(step: number, phase: number): string {
  // Two falling dots per tile, offset by phase — reads as gentle rain.
  const a = RAIN[(step + phase) % RAIN.length];
  const b = RAIN[(step + phase + 3) % RAIN.length];
  return String.fromCharCode(0x2800 + (a | b));
}

export function BrailleLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Reduced-motion users keep the frozen first frame — no interval starts.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 64), 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span aria-hidden className="font-mono text-[1rem] tracking-[0.5em] text-paper/45">
      {frame(step, 0)}
      {frame(step, 2)}
      {frame(step, 5)}
    </span>
  );
}
