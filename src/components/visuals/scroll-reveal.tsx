"use client";

import React, { useEffect, useRef, useMemo, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  baseOpacity?: number;
  blurStrength?: number;
  enableBlur?: boolean;
  containerClassName?: string;
  textClassName?: string;
}

export function ScrollReveal({
  children,
  baseOpacity = 0.12,
  blurStrength = 4,
  enableBlur = true,
  containerClassName = "",
  textClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const split = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((w, i) =>
      w.match(/^\s+$/) ? (
        w
      ) : (
        <span key={i} className="word inline-block">
          {w}
        </span>
      ),
    );
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const words = el.querySelectorAll<HTMLElement>(".word");
    const triggers: ScrollTrigger[] = [];

    triggers.push(
      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: "opacity, filter" },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=15%",
            end: "bottom center",
            scrub: true,
          },
        },
      ).scrollTrigger as ScrollTrigger,
    );

    if (enableBlur) {
      triggers.push(
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            filter: "blur(0px)",
            ease: "none",
            stagger: 0.04,
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=15%",
              end: "bottom center",
              scrub: true,
            },
          },
        ).scrollTrigger as ScrollTrigger,
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, [baseOpacity, blurStrength, enableBlur]);

  return (
    <div ref={ref} className={containerClassName}>
      <p className={textClassName}>{split}</p>
    </div>
  );
}
