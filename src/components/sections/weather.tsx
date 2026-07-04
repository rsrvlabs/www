"use client";

import { ScrollReveal } from "@/components/visuals/scroll-reveal";
import { Odometer } from "@/components/visuals/odometer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/**
 * 04 · While you sleep — the AI-native proof moment (dark interlude).
 * A real night at Reserve, told as a machine timeline (ploy night-shift
 * grammar) with odometer stats (insforge grammar). Times are the studio's
 * actual nightly schedule.
 */

const night = [
  { t: "22:00", line: "The repair agent reads the day's bug tickets — and fixes them." },
  { t: "05:00", line: "New York closes. The finance desk starts its read of the day." },
  { t: "07:30", line: "Fermi writes the morning brief. Every number, checked twice." },
  { t: "07:50", line: "The watchdog sweeps the pipeline; anything broken heals itself." },
  { t: "08:00", line: "The brief publishes. The founders are still asleep.", accent: true },
];

const stats = [
  { v: "01", label: "brief, every trading day" },
  { v: "255", label: "tests green before dawn" },
  { v: "00", label: "humans woken" },
];

const enter = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

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
          className="object-cover opacity-50 mix-blend-screen"
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

      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-[20svh] md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="kicker block mb-[8svh] text-paper/45"
        >
          04 · While you sleep
        </motion.span>

        <ScrollReveal
          baseOpacity={0.18}
          blurStrength={5}
          textClassName="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.5] tracking-[-0.01em] text-paper max-w-[30ch]"
        >
          Every studio says AI-native. Ours proves it nightly — the
          company keeps working after the founders stop.
        </ScrollReveal>

        {/* The night, as the machine logs it */}
        <div className="mt-[10svh] max-w-[46rem]">
          {night.map((row, i) => (
            <motion.div
              key={row.t}
              {...enter}
              transition={{ ...enter.transition, delay: 0.12 * i }}
              className={`flex items-baseline gap-5 py-4 ${i > 0 ? "hairline-dashed-night" : ""}`}
            >
              <span className="kicker w-[3.6rem] shrink-0 text-paper/50">{row.t}</span>
              <span
                aria-hidden
                className={`night-dot mt-[0.15em] h-[7px] w-[7px] shrink-0 self-center rounded-full ${
                  row.accent ? "bg-sun" : "bg-paper/40"
                }`}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <span
                className={`font-sans text-[0.92rem] leading-[1.7] ${
                  row.accent ? "text-paper" : "text-paper/75"
                }`}
              >
                {row.line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Odometer stats (insforge grammar) */}
        <motion.div
          {...enter}
          transition={{ ...enter.transition, delay: 0.2 }}
          className="mt-[8svh] grid max-w-[46rem] grid-cols-1 gap-8 md:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <Odometer
                value={s.v}
                className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-none text-paper"
              />
              <div className="kicker mt-3 text-paper/45">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="kicker hairline-dashed-night mt-[10svh] flex items-center justify-between pt-6 text-paper/40">
          <span className="border-l border-paper/15 pl-4">— a small studio</span>
          <span className="border-l border-paper/15 pl-4">Reserve · 04/06</span>
        </div>
      </div>
    </section>
  );
}
