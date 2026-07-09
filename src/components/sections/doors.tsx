"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { PunchDot } from "@/components/site/punch-card";

/**
 * 03 · Index — the five doors (founder's categorization, verbatim) as ONE
 * engineered lattice (design-refs/insforge — collapsed-border grid: square
 * cells sharing 1px lines, not floating cards). Technique: CSS grid `gap-px`
 * over a night-line ground — the container color IS the shared border, so
 * there are no doubled edges to de-dupe; the outer frame is the stronger
 * structural line (2-step borders, DESIGN.md), with `bg-clip-padding` so the
 * gap color doesn't compound under the frame. Hover keeps the punch-card
 * craft (corner dots → sun, surface rise to night-soft, title underline)
 * but DROPS the ploy tilt: a rotating cell shears its shared borders and
 * breaks the lattice read. Entrance: the plate rises once as a single unit;
 * cell contents stagger in behind it (insforge enter-once) so the grid
 * never appears half-built. Cells wear the lelabo label-block anatomy
 * (design-refs/lelabo — specimen grammar): tag → title → vision line →
 * hairline → mono SPEC ROW (honest machine facts, lowercase label voice).
 */

type Door = {
  href: string;
  tag: string;
  title: string;
  line: string;
  /** Mono spec row (design-refs/lelabo card anatomy): honest machine facts
   *  only, lowercase label voice — every string derived from on-site copy
   *  or DESIGN.md facts (statuses from the IA table; counts from the pages).
   *  The care label never persuades (copy law rule 3). */
  spec: string;
};

const flagship: Door = {
  href: "/sw",
  tag: "F · Flagship",
  title: "The one in the crowd, found again.",
  line: "A dating app with a physical signature — you only match with people you've actually crossed paths with.",
  // /sw specimen tags + blurbs: bluetooth signature · wearable, no phone · heart-rate.
  spec: "signature / bluetooth · wearable / no phone · biosignal / heart-rate",
};

const doors: Door[] = [
  {
    href: "/labs",
    tag: "L · Labs",
    title: "The lab ships while you sleep.",
    line: "Finance runs itself daily; beauty tech is taking shape.",
    // /labs tags + DESIGN.md IA statuses (Reserve Finance: desk LIVE + advisor EXPERIMENTAL · Glow EXPLORING).
    spec: "desk / live 08:00 daily · advisor / experimental · beauty / exploring",
  },
  {
    href: "/frontiers",
    tag: "R · Frontiers",
    title: "We deploy into your team, and ship.",
    line: "Forward-deployed AI engineering — travel, sports vision, health, legal.",
    // /effects intro: "Four frontiers run Reserve-built AI today".
    spec: "four frontiers / in production",
  },
  {
    href: "/research",
    tag: "Q · Research",
    // Mirrors the /research H1 (concept voice, founder ruling 2026-07-05).
    title: "One studio. One brain.",
    line: "Field notes from running an AI-native company.",
    // /research index: essay 01 PUBLISHED, 02–03 IN PROGRESS.
    spec: "series 01 / 1 published · 2 in progress",
  },
  {
    href: "/effects",
    tag: "E · Effects",
    title: "What changes when we arrive.",
    line: "Systems in production, and the words of the teams that keep us.",
    // /effects intro + SHIPPED entry.
    spec: "systems / in production",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Punch-card corner identity — the interactive-cell marker in the lattice. */
function CellDots() {
  return (
    <>
      <PunchDot pos="left-1.5 top-1.5" />
      <PunchDot pos="right-1.5 top-1.5" />
      <PunchDot pos="bottom-1.5 left-1.5" />
      <PunchDot pos="bottom-1.5 right-1.5" />
    </>
  );
}

function DoorCell({ door, variants }: { door: Door; variants: Variants }) {
  return (
    <div className="bg-night">
      <Link
        href={door.href}
        className="group relative flex h-full flex-col px-6 py-8 transition-colors duration-300 hover:bg-night-soft md:p-10"
      >
        <CellDots />
        <motion.span variants={variants} className="flex h-full flex-col">
          <span className="kicker text-paper/50">{door.tag}</span>
          <span className="mt-3 block font-display text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.15] text-paper">
            <span className="link-underline">{door.title}</span>
          </span>
          <span className="mt-3 block max-w-[48ch] font-sans text-[0.88rem] leading-[1.7] text-paper/70">
            {door.line}
          </span>
          {/* Spec row (design-refs/lelabo card anatomy): hairline, then the
              cell's machine facts in the lowercase label voice — pinned to
              the cell floor so the rows align across the inventory. */}
          <span className="label-mono mt-auto block pt-8">
            <span className="block border-t border-night-line pt-4 text-paper/45">
              {door.spec}
            </span>
          </span>
        </motion.span>
      </Link>
    </div>
  );
}

export function Doors() {
  const reduce = useReducedMotion();

  const plate: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: EASE,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };
  const content: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section id="doors" className="relative bg-night-deep py-[16svh]">
      <div className="mx-auto w-full max-w-[88rem] px-6 md:px-10">
        <motion.div
          variants={plate}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
          className="grid grid-cols-1 gap-px border border-night-line-strong bg-night-line bg-clip-padding md:grid-cols-2"
        >
          {/* Legend strip — the section's machine plate lives IN the lattice */}
          <div className="bg-night md:col-span-2">
            <motion.div
              variants={content}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4 md:px-10"
            >
              <h2 className="kicker text-paper/45">N° 03 · Index</h2>
              <span className="kicker text-paper/45">five doors · 03/06</span>
            </motion.div>
          </div>

          {/* Flagship door — spans the full row */}
          <div className="bg-night md:col-span-2">
            <Link
              href={flagship.href}
              className="group relative flex h-full flex-col px-6 py-10 transition-colors duration-300 hover:bg-night-soft md:p-10"
            >
              <CellDots />
              <motion.span variants={content} className="block">
                <span className="kicker text-paper/50">{flagship.tag}</span>
                <span className="mt-4 block font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.05] tracking-[-0.015em] text-paper">
                  <span className="link-underline">{flagship.title}</span>
                </span>
                <span className="mt-5 block max-w-[58ch] font-sans text-[0.95rem] leading-[1.75] text-paper/70">
                  {flagship.line}
                </span>
                {/* Spec row + action row (design-refs/lelabo card anatomy):
                    hairline → machine facts left, lowercase utility link
                    right. Hover is STILL — no arrow travel (lelabo motion
                    census: the only hover response is the underline). */}
                <span className="label-mono mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-night-line pt-4">
                  <span className="text-paper/45">{flagship.spec}</span>
                  <span aria-hidden className="text-paper/45">
                    enter →
                  </span>
                </span>
              </motion.span>
            </Link>
          </div>

          {/* The other four doors — 2×2 shared-border cells */}
          {doors.map((d) => (
            <DoorCell key={d.href} door={d} variants={content} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
