"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NavLinks, WriteLink } from "@/components/site/nav";
import { MobileMenu } from "@/components/site/mobile-menu";

export function Wordmark() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10"
    >
      {/* Mobile-only legibility scrim: on phones the content column runs the
          full viewport width, so the floating chrome sits directly on text /
          the globe when scrolled. Night fading to transparent — mirrors
          --color-night, same inline-oklch pattern as the places vignette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-8 top-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.145 0 0 / 0.9), oklch(0.145 0 0 / 0))",
        }}
      />
      <Link
        href="/"
        className="font-display text-base tracking-tight text-paper"
        aria-label="Reserve"
      >
        reserve<span className="text-sun">.</span>
      </Link>
      {/* Shared five-route nav (site/nav.tsx) — no `current`: you're at the frame. */}
      <NavLinks />
      <div className="flex items-center gap-6">
        <MobileMenu writeHref="#invitation" />
        <WriteLink href="#invitation" />
      </div>
    </motion.header>
  );
}
