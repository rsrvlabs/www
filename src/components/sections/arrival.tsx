"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Silk } from "@/components/visuals/silk";
import { DecryptText } from "@/components/visuals/decrypt-text";

export function Arrival() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
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
      {/* Code-generated dark silk (design-refs: ours; replaces the pastoral
          raster — the last non-黑鏡 element). Neutral graphite waves — dark
          fabric, not bronze (brutalist reset 2026-07-04). */}
      <motion.div
        style={{ y: skyY, scale: skyScale }}
        className="absolute inset-0 opacity-70"
      >
        <Silk
          color="#2e2e2e"
          speed={reducedMotion ? 0 : 2.2}
          scale={1.1}
          noiseIntensity={1.2}
          rotation={0.1}
        />
      </motion.div>

      {/* Bottom fade into the night ground so the silk hands off cleanly into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.145 0 0 / 0.6) 60%, oklch(0.145 0 0) 100%)",
        }}
      />

      {/* Soft dark veil on the upper half so the headline sits in calm air */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.145 0 0 / 0.55) 0%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[88rem] px-6 md:px-10"
      >
        {/* Kicker: smaller + wider-tracked than base .kicker for scale-contrast
            against the enlarged display (insforge type grammar); decrypt entrance
            runs once the veil lifts. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="kicker mb-10 text-[0.62rem] tracking-[0.3em] text-paper/55"
        >
          <DecryptText text="N° 01 · AI-native studio" />
        </motion.p>

        {/* Display: big-but-light (insforge computed: wt400, tight leading) —
            Gambarino stays; single gold accent span on the thesis word.
            Cap is 7.4rem, NOT the ~8rem first proposed: measured 2026-07-04,
            line 1 needs 11.01px width per font-px, so >120px wraps inside the
            1328px content column (8rem = 128px provably wrapped). */}
        <h1 className="font-display font-normal text-paper leading-[1.02] tracking-[-0.03em] text-[clamp(2.5rem,7.5vw,7.4rem)]">
          <Line text="We build AI-native products." accentWord="AI-native" baseDelay={0.55} />
          <br />
          <span className="text-paper/70 italic font-display">
            <Line text="The company itself is one." baseDelay={1.45} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.4 }}
          className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          {/* Concept-brand register (founder ruling 2026-07-05): identity,
              not a fact sheet — no headcount, no funding badges. */}
          <p className="max-w-[44ch] font-sans text-[0.95rem] leading-[1.75] text-paper/70">
            Reserve is a studio run with one machine. We ship a
            dating app with a physical signature, a finance desk
            that publishes itself, and beauty tech in the making —
            all on an operating system we built, where agents hold
            jobs.
          </p>
          {/* Machine row: scrunch metadata-bar grammar (left-hairline item),
              smaller mono than base .kicker. Founder ruling 2026-07-05: no
              self-describing keywords on the page (references show EVIDENCE;
              self-description lives in footers) — only the founding date
              stays until the fold-1 evidence odometer lands (audit gap #4). */}
          <div className="flex shrink-0 items-baseline gap-4">
            <span className="kicker border-l border-paper/15 pl-4 text-[0.6rem] tracking-[0.26em] text-paper/45">
              EST. MMXXIV
            </span>
          </div>
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

function Line({
  text,
  baseDelay,
  accentWord,
}: {
  text: string;
  baseDelay: number;
  accentWord?: string;
}) {
  const words = text.split(" ");
  // Precompute each word's char offset so delays stay sequential across words.
  const offsets = words.reduce<number[]>(
    (acc, word, i) => [...acc, (acc[i] ?? 0) + word.length + 1],
    [0],
  );
  return (
    <>
      {words.map((word, w) => (
        <span
          key={`w-${w}`}
          // Single accent span per headline (insforge signature) — sun gold.
          className={`inline-block whitespace-nowrap${word === accentWord ? " text-sun" : ""}`}
        >
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
