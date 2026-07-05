"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ScrollReveal } from "@/components/visuals/scroll-reveal";
import { Odometer } from "@/components/visuals/odometer";

/**
 * 04 · While you sleep — the AI-native proof moment (dark interlude).
 * A real night at Reserve, logged on ONE instrument panel: the night timeline
 * (ploy night-shift cadence — pulsing dots, sun only on the 08:00 beat) and
 * the odometer stats (insforge grammar) share a single collapsed-border
 * lattice (design-refs/insforge — cells share 1px night-lines via grid
 * `gap-px`, 2-step outer frame; same grammar as the 03 · Index doors).
 * The section is fully code-generated: grid-paper texture + a neutral
 * radial glow — no raster imagery (the interim grayscaled haze JPEG was
 * warm-era residue; brutalist reset 2026-07-04). Times are the studio's
 * actual nightly schedule.
 */

const night = [
  { t: "22:00", line: "The repair agent reads the day's bug tickets — and fixes them." },
  { t: "05:00", line: "New York closes. The finance desk starts its read of the day." },
  { t: "07:30", line: "Fermi writes the morning brief. Every number, checked twice." },
  { t: "07:50", line: "The watchdog sweeps the pipeline; anything broken heals itself." },
  { t: "08:00", line: "The brief publishes. The curators are still asleep.", accent: true },
];

const stats = [
  { v: "01", label: "brief, every trading day" },
  { v: "255", label: "tests green before dawn" },
  { v: "00", label: "humans woken" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Weather() {
  const reduce = useReducedMotion();

  // Enter-once (insforge): the panel rises as ONE unit; cell contents stagger
  // in behind it so the lattice never appears half-built (Step 2 grammar).
  const plate: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: EASE,
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };
  const content: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      id="weather"
      className="relative overflow-hidden bg-night text-paper"
    >
      {/* Pure structure, no raster: a neutral radial glow lifts the panel zone… */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 38%, oklch(0.985 0 0 / 0.045), transparent 70%)",
        }}
      />
      {/* …and the grid-paper lattice is the machine behind the weather (DESIGN.md dark grammar) */}
      <div aria-hidden className="grid-paper-night pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[80rem] px-6 py-[18svh] md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="kicker block mb-[7svh] text-paper/45"
        >
          N° 04 · While you sleep
        </motion.span>

        <ScrollReveal
          baseOpacity={0.18}
          blurStrength={5}
          textClassName="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.5] tracking-[-0.01em] text-paper max-w-[30ch]"
        >
          Every studio says AI-native. Ours proves it nightly — the
          company keeps working after the curators stop.
        </ScrollReveal>

        {/* The instrument panel: night log + odometer stats on one lattice */}
        <motion.div
          variants={plate}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
          className="mt-[9svh] flex max-w-[46rem] flex-col gap-px border border-night-line-strong bg-night-line bg-clip-padding"
        >
          {/* The night, as the machine logs it — timestamp rail | vertical
              shared line | log line. Rows share 1px horizontal lattice lines. */}
          <div className="grid grid-cols-[4.75rem_1fr] gap-px">
            {night.map((row, i) => (
              <Fragment key={row.t}>
                <div className="flex items-center justify-end bg-night px-3 py-3">
                  <motion.span variants={content} className="kicker text-paper/50">
                    {row.t}
                  </motion.span>
                </div>
                <div className="bg-night px-4 py-3 md:px-5">
                  <motion.span variants={content} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`night-dot h-[6px] w-[6px] shrink-0 rounded-full ${
                        row.accent ? "bg-sun" : "bg-paper/40"
                      }`}
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <span
                      className={`font-sans text-[0.88rem] leading-[1.55] ${
                        row.accent ? "text-paper" : "text-paper/70"
                      }`}
                    >
                      {row.line}
                    </span>
                  </motion.span>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Odometer stats (insforge grammar) — the panel's readout row */}
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-night px-5 py-6 md:px-6">
                <motion.div variants={content}>
                  <Odometer
                    value={s.v}
                    className="font-display text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none text-paper"
                  />
                  <div className="kicker mt-3 text-paper/45">{s.label}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="kicker hairline-dashed-night mt-[9svh] flex items-center justify-between pt-6 text-paper/40">
          <span className="border-l border-paper/15 pl-4">— a small studio</span>
          <span className="border-l border-paper/15 pl-4">Reserve · 04/06</span>
        </div>
      </div>
    </section>
  );
}
