"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const EMAIL = "hello@reserve.ai";

export function Invitation() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const duskY = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);
  const duskScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <section
      ref={ref}
      id="invitation"
      className="relative overflow-hidden bg-paper pb-[10svh] pt-[24svh]"
    >
      {/* Hand-painted dusk, anchored to the lower half */}
      <motion.div
        style={{ y: duskY, scale: duskScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[30%]"
      >
        <Image
          src="/materials/invitation-dusk.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cream fade at top so headline sits in open paper air */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.965 0.012 78) 0%, oklch(0.965 0.012 78 / 0.85) 55%, transparent 100%)",
        }}
      />
      {/* Terracotta warmth at the very bottom to push the section into night */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background:
            "linear-gradient(to top, oklch(0.34 0.05 38 / 0.55) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[80rem] px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="block font-sans text-[0.7rem] uppercase tracking-[0.32em] text-ink/55"
        >
          An invitation
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.02em] text-ink"
        >
          Write to us.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 max-w-[52ch] font-display text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.55] text-ink/85"
        >
          Tell us what you are quietly working toward. We answer
          everything, slowly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-16"
        >
          <a
            href={`mailto:${EMAIL}`}
            onMouseEnter={() => setRevealed(true)}
            onFocus={() => setRevealed(true)}
            className="group inline-flex items-baseline gap-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] text-ink underline-offset-[0.3em] hover:text-dusk"
          >
            <span className="border-b border-ink group-hover:border-dusk">
              {revealed ? EMAIL : "open the envelope"}
            </span>
            <span aria-hidden className="text-base transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-[18svh] grid grid-cols-12 gap-6 border-t border-ink/15 pt-10 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-ink/55">
          <div className="col-span-12 md:col-span-4">
            <div className="font-display text-base normal-case tracking-tight text-ink">
              reserve<span className="text-dusk">.</span>
            </div>
            <div className="mt-2 normal-case tracking-normal text-ink/55 font-sans text-xs">
              A studio between software and the objects you hold.
            </div>
          </div>
          <div className="col-span-6 md:col-span-4">
            <div className="text-ink/40 mb-3">Rooms</div>
            <div className="space-y-1 normal-case tracking-normal font-display text-ink text-sm">
              <div>London · New York · Abu Dhabi</div>
              <div>Bangkok · Singapore · Hong Kong</div>
              <div>Taipei · Tokyo</div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right">
            <div className="text-ink/40 mb-3">Index</div>
            <div className="space-y-1 normal-case tracking-normal text-sm">
              <a href="#practices" className="block text-ink hover:text-dusk">
                Two practices
              </a>
              <a href="#weather" className="block text-ink hover:text-dusk">
                Weather
              </a>
              <a href="#places" className="block text-ink hover:text-dusk">
                Places
              </a>
            </div>
          </div>
          <div className="col-span-12 mt-12 flex items-baseline justify-between border-t border-ink/10 pt-6 text-ink/40">
            <span>© MMXXIV — Reserve</span>
            <span>Built quietly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
