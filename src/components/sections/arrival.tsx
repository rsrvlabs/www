"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Arrival() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-night pb-[14svh]"
    >
      {/* Hand-painted Ghibli sky — the hero */}
      <motion.div
        style={{ y: skyY, scale: skyScale }}
        className="absolute inset-0"
      >
        <Image
          src="/materials/arrival-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>

      {/* Bottom fade into cream paper so the hills handoff cleanly into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.22 0.03 60 / 0.6) 60%, oklch(0.22 0.03 60) 100%)",
        }}
      />

      {/* Soft warm glow on the upper-left so headline sits in calm air */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.22 0.03 60 / 0.55) 0%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[88rem] px-6 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="kicker mb-10 text-paper/55"
        >
          01 · AI-native studio
        </motion.p>

        <h1 className="font-display font-normal text-paper leading-[0.95] tracking-[-0.02em] text-[clamp(3rem,9.5vw,9.5rem)]">
          <Line text="We build software" baseDelay={0.55} />
          <br />
          <span className="text-paper/70 italic font-display">
            <Line text="for the physical world." baseDelay={1.25} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.4 }}
          className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[44ch] font-sans text-[0.95rem] leading-[1.75] text-paper/70">
            Reserve is a two-person, bootstrapped studio. We ship
            consumer products that turn real-world presence into
            software — starting with a social app that only matches
            people who have actually crossed paths.
          </p>
          <span className="kicker shrink-0 text-paper/45">
            EST. MMXXIV · Bootstrapped · Taipei
          </span>
        </motion.div>
      </motion.div>

      {/* Quiet scroll cue — no bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 2.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="kicker text-[0.62rem] tracking-[0.34em] text-paper/55">
          scroll
        </span>
      </motion.div>
    </section>
  );
}

function Line({ text, baseDelay }: { text: string; baseDelay: number }) {
  const words = text.split(" ");
  // Precompute each word's char offset so delays stay sequential across words.
  const offsets = words.reduce<number[]>(
    (acc, word, i) => [...acc, (acc[i] ?? 0) + word.length + 1],
    [0],
  );
  return (
    <>
      {words.map((word, w) => (
        <span key={`w-${w}`} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <Char key={i} ch={ch} delay={baseDelay + (offsets[w] + i) * 0.04} />
          ))}
          {w < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </>
  );
}

function Char({ ch, delay }: { ch: string; delay: number }) {
  if (ch === " ") return <span>&nbsp;</span>;
  return (
    <motion.span
      initial={{ y: "0.6em", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.19, 1, 0.22, 1] }}
      className="inline-block"
    >
      {ch}
    </motion.span>
  );
}
