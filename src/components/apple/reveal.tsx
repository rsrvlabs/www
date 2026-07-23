"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./apple.module.css";

/** Scroll-entrance wrapper. One gesture per section: the section rises 14px and
 *  fades in once, then never moves again — the page should settle, not perform.
 *
 *  Reduced motion is handled in CSS rather than here, so the markup is identical
 *  either way and the composition a reduced-motion visitor sees is the final one,
 *  not a stripped-down variant. */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at mount (the hero): reveal on the next frame so the
    // transition still runs instead of being skipped as an initial style.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={shown ? `${s.reveal} ${s.revealIn}` : s.reveal}>
      {children}
    </div>
  );
}
