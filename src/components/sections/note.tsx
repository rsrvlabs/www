"use client";

import { motion } from "framer-motion";

export function Note() {
  return (
    <section className="relative bg-night py-[18svh]">
      <div className="mx-auto w-full max-w-[68rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="kicker col-span-12 text-paper/45 md:col-span-3"
          >
            02 · What we do
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="col-span-12 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.45] text-paper md:col-span-9 max-w-[62ch]"
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
