"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NavLinks, WriteLink } from "@/components/site/nav";

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
      {/* Shared five-route nav (site/nav.tsx) — no `current`: you're at the frame. */}
      <NavLinks />
      <WriteLink href="#invitation" />
    </motion.header>
  );
}
