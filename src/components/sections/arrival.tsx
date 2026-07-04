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
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-paper pb-[14svh]"
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
          className="object-cover"
        />
      </motion.div>

      {/* Bottom fade into cream paper so the hills handoff cleanly into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.965 0.012 78 / 0.55) 60%, oklch(0.965 0.012 78) 100%)",
        }}
      />

      {/* Soft warm glow on the upper-left so headline sits in calm air */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.965 0.012 78 / 0.32) 0%, transparent 100%)",
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
          className="kicker mb-10 text-ink/55"
        >
          01 · Reserve — a studio
        </motion.p>

        <h1 className="font-display font-normal text-ink leading-[0.95] tracking-[-0.02em] text-[clamp(3.25rem,11vw,11.5rem)]">
          {"We keep a seat".split("").map((ch, i) => (
            <Char key={`a-${i}`} ch={ch} delay={0.55 + i * 0.045} />
          ))}
          <br />
          <span className="text-ink-soft italic font-display">
            {"for what comes next.".split("").map((ch, i) => (
              <Char key={`b-${i}`} ch={ch} delay={1.25 + i * 0.04} />
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.4 }}
          className="mt-12 flex items-end justify-between gap-6"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-ink/45">
            EST. MMXXIV
          </span>
          <span className="hidden font-sans text-xs tracking-[0.3em] text-ink/45 md:inline">
            A studio · eight rooms
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
        <span className="kicker text-[0.62rem] tracking-[0.34em] text-ink/55">
          scroll
        </span>
      </motion.div>
    </section>
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
