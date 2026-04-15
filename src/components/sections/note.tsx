"use client";

import { motion } from "framer-motion";

export function Note() {
  return (
    <section className="relative bg-paper py-[18svh]">
      <div className="mx-auto w-full max-w-[68rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="col-span-12 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-ink/45 md:col-span-3"
          >
            A note
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="col-span-12 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.45] text-ink md:col-span-9 max-w-[62ch]"
          >
            Reserve is a small studio working between invisible software
            and the objects you hold. We exist for companies that have
            outgrown being impressed by technology.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
