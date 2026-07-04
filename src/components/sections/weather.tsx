"use client";

import { ScrollReveal } from "@/components/visuals/scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Weather() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const emberY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const emberScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={ref}
      id="weather"
      className="relative overflow-hidden bg-night text-paper"
    >
      {/* Grid-paper lattice: the machine behind the weather (DESIGN.md dark grammar) */}
      <div aria-hidden className="grid-paper-night pointer-events-none absolute inset-0" />

      {/* Real painted ember haze */}
      <motion.div
        style={{ y: emberY, scale: emberScale }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/materials/weather-ambient.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70 mix-blend-screen"
        />
      </motion.div>

      {/* Let the top and bottom fade into the night so section edges don't show seams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[25%]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.22 0.03 60) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%]"
        style={{
          background:
            "linear-gradient(to top, oklch(0.22 0.03 60) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-[24svh] md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="kicker block mb-[10svh] text-paper/45"
        >
          04 · Why now
        </motion.span>

        <ScrollReveal
          baseOpacity={0.18}
          blurStrength={5}
          textClassName="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.55] tracking-[-0.01em] text-paper max-w-[28ch]"
        >
          Phones made meeting people online effortless — and meeting
          people in real life worse. Cheap radios and on-device AI
          finally make physical presence a signal software can use.
          The next social graph gets built from real encounters.
          We’re building it.
        </ScrollReveal>

        <div className="kicker hairline-dashed-night mt-[14svh] flex items-center justify-between pt-6 text-paper/40">
          <span className="border-l border-paper/15 pl-4">— a small studio</span>
          <span className="border-l border-paper/15 pl-4">Reserve · 04/06</span>
        </div>
      </div>
    </section>
  );
}
