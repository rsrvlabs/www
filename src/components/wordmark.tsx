"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Wordmark() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10"
    >
      <Link
        href="/"
        className="font-display text-base tracking-tight text-paper"
        aria-label="Reserve"
      >
        reserve<span className="text-sun">.</span>
      </Link>
      <nav className="hidden items-center gap-7 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper/60 md:flex">
        <Link href="/sw" className="link-underline transition-colors duration-200 hover:text-paper">Flagship</Link>
        <Link href="/labs" className="link-underline transition-colors duration-200 hover:text-paper">Labs</Link>
        <Link href="/frontiers" className="link-underline transition-colors duration-200 hover:text-paper">Frontiers</Link>
        <Link href="/research" className="link-underline transition-colors duration-200 hover:text-paper">Research</Link>
        <Link href="/effects" className="link-underline transition-colors duration-200 hover:text-paper">Effects</Link>
      </nav>
      <a
        href="#invitation"
        className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/70 transition-colors duration-200 hover:text-paper"
      >
        <span className="link-underline">Write</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </a>
    </motion.header>
  );
}
