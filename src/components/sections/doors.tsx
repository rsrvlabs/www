"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * 03 · Index — the five doors (founder's categorization, verbatim).
 * The landing is the company's most-meta frame; depth lives behind these.
 * Paper grammar: dashed hairlines only, serif titles, mono machine tags.
 */

const flagship = {
  href: "/sw",
  tag: "F · Flagship",
  title: "The one in the crowd, found again.",
  line: "A dating app with a physical signature — you only match with people you've actually crossed paths with.",
};

const doors = [
  {
    href: "/labs",
    tag: "L · Labs",
    title: "The lab ships while you sleep.",
    line: "Finance runs itself daily; beauty tech is taking shape.",
  },
  {
    href: "/frontiers",
    tag: "R · Frontiers",
    title: "We deploy into your team, and ship.",
    line: "Forward-deployed AI engineering — travel, sports vision, health, legal.",
  },
  {
    href: "/research",
    tag: "Q · Research",
    title: "Two founders. One brain.",
    line: "Field notes from running an AI-native company.",
  },
  {
    href: "/effects",
    tag: "E · Effects",
    title: "What changes when we arrive.",
    line: "Systems in production, and the words of the teams that keep us.",
  },
];

const enter = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

export function Doors() {
  return (
    <section id="doors" className="relative bg-night-deep py-[16svh]">
      <div className="mx-auto w-full max-w-[88rem] px-6 md:px-10">
        <motion.h2 {...enter} className="kicker mb-[10svh] text-paper/45">
          03 · Index
        </motion.h2>

        {/* Flagship door — full-width */}
        <motion.div {...enter}>
          <Link href={flagship.href} className="group block">
            <span className="kicker text-paper/50">{flagship.tag}</span>
            <span className="mt-4 block font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.05] tracking-[-0.015em] text-paper">
              <span className="link-underline">{flagship.title}</span>
            </span>
            <span className="mt-5 block max-w-[58ch] font-sans text-[0.95rem] leading-[1.75] text-paper/70">
              {flagship.line}
            </span>
            <span
              aria-hidden
              className="kicker mt-6 inline-block text-paper/45 transition-transform duration-200 group-hover:translate-x-1"
            >
              enter →
            </span>
          </Link>
        </motion.div>

        {/* The other four — dashed-gutter grid */}
        <div className="hairline-dashed mt-[8svh] grid grid-cols-1 gap-x-10 pt-[6svh] md:grid-cols-2">
          {doors.map((d, i) => (
            <motion.div
              {...enter}
              transition={{ ...enter.transition, delay: 0.08 * i }}
              key={d.href}
              className={i >= 2 ? "hairline-dashed mt-10 pt-10 md:mt-12 md:pt-12" : "mb-2 md:mb-0"}
            >
              <Link href={d.href} className="group block">
                <span className="kicker text-paper/50">{d.tag}</span>
                <span className="mt-3 block font-display text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.15] text-paper">
                  <span className="link-underline">{d.title}</span>
                </span>
                <span className="mt-3 block max-w-[48ch] font-sans text-[0.88rem] leading-[1.7] text-paper/70">
                  {d.line}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
