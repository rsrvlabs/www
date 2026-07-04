"use client";

import { motion } from "framer-motion";

/**
 * 02 · What we do — the studio's statement of intent. The machine layer
 * wears the scrunch metadata grammar (design-refs/scrunch.md — mono items
 * with a left hairline, stacked as a rail, same 2-step dimming as the
 * weather footer); the serif voice sits one empty column off the rail
 * (md:col-start-5) — one restrained asymmetric beat of air between the
 * machine and the voice (the anti-AI-symmetric lesson, kept small).
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Note() {
  return (
    <section className="relative bg-night py-[18svh]">
      <div className="mx-auto w-full max-w-[68rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="col-span-12 flex flex-col gap-3 md:col-span-3"
          >
            <span className="kicker border-l border-paper/15 pl-4 text-paper/45">
              02 · What we do
            </span>
            <span className="kicker border-l border-paper/15 pl-4 text-[0.6rem] tracking-[0.26em] text-paper/30">
              Reserve · 02/06
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="col-span-12 max-w-[62ch] font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.45] text-paper md:col-span-8 md:col-start-5"
          >
            We build our own products, and we take on a small number of
            embedded AI engineering engagements that pay for them. No
            outside money. The company itself runs on an AI-native
            operating system we built — one shared brain, agents with
            jobs, humans making the calls.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
