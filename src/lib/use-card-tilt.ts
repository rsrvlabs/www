"use client";

import { useRef, useCallback } from "react";

/**
 * Subtle card tilt on cursor (ploy grammar, restrained for French minimal):
 * rotateX/Y from cursor position, shadowless, resets on leave.
 * Bails entirely under prefers-reduced-motion.
 */
export function useCardTilt(maxX = 4, maxY = 6) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-py * maxX).toFixed(2)}deg) rotateY(${(px * maxY).toFixed(2)}deg)`;
      el.style.transition = "transform 0.15s var(--ease-ui)";
    },
    [maxX, maxY],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.4s var(--ease-enter)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
