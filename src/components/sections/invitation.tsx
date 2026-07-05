"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EMAIL = "hello@rsrvlabs.com";

/**
 * 06 · An invitation — the farewell beat, now pure structure (the last
 * warm-era section: the sunset JPEG + cream fade + terracotta wash were
 * pre-reset residue and carried a heavy warm cast; asset law says interim
 * treatment is typographic, design-refs/assets.md §5 rule 10). Grammar is
 * the Step 3 instrument-room close: neutral radial glow + grid-paper
 * lattice, and a scrunch machine footer — mono metadata columns behind
 * left hairlines, dashed-night separators only (design-refs/scrunch.md).
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Invitation() {
  const [revealed, setRevealed] = useState(false);
  // Personalization line (design-refs/lelabo — the `For:` field: luxury as
  // your name typed onto the label, not gold foil). The value feeds the
  // mailto subject; empty stays the plain default subject.
  const [forValue, setForValue] = useState("");
  const subject = forValue.trim()
    ? `Hello Reserve — ${forValue.trim()}`
    : "Hello Reserve";

  return (
    <section
      id="invitation"
      className="relative overflow-hidden bg-night pb-[10svh] pt-[24svh]"
    >
      {/* Pure structure, no raster: a neutral glow lifts the invitation zone,
          weighted toward the voice (restrained asymmetry, founder debt #3)… */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 32% 30%, oklch(0.985 0 0 / 0.05), transparent 70%)",
        }}
      />
      {/* …and the grid-paper lattice is the machine behind the farewell
          (DESIGN.md dark-section grammar, same as 04 · While you sleep) */}
      <div aria-hidden className="grid-paper-night pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[80rem] px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="kicker block text-paper/45"
        >
          N° 06 · An invitation
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mt-10 font-display text-[clamp(3rem,9vw,7.4rem)] leading-[0.95] tracking-[-0.02em] text-paper"
        >
          Write to us.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 max-w-[52ch] font-display text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.55] text-paper/85"
        >
          Early access. An embedded team. The notes.
          One email — we answer everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
          className="mt-16"
        >
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
            onMouseEnter={() => setRevealed(true)}
            onFocus={() => setRevealed(true)}
            className="group inline-flex items-baseline gap-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] text-paper underline-offset-[0.3em] hover:text-sun"
          >
            <span className="border-b border-paper group-hover:border-sun">
              {revealed ? EMAIL : "open the envelope"}
            </span>
            <span aria-hidden className="text-base">→</span>
          </a>

          {/* Personalization line (design-refs/lelabo `For:` grammar): one
              mono typewriter field, hairline-bottom — the single intimate
              gesture, rendered as information. No form; the value only
              personalizes the subject of the envelope above. */}
          <div className="label-mono mt-10 flex max-w-[26rem] items-baseline gap-3 text-paper/55">
            <label htmlFor="invitation-for" className="shrink-0">
              for:
            </label>
            <input
              id="invitation-for"
              type="text"
              value={forValue}
              onChange={(e) => setForValue(e.target.value)}
              maxLength={46}
              autoComplete="off"
              spellCheck={false}
              placeholder="a name, a frontier, a question"
              className="label-mono w-full border-0 border-b border-paper/25 bg-transparent pb-1.5 normal-case text-paper outline-none transition-colors duration-200 placeholder:text-paper/30 focus:border-paper/60"
            />
          </div>
        </motion.div>

        {/* Machine footer — scrunch metadata grammar: mono columns behind
            left hairlines; separators are dashed-night only (no solid rules) */}
        <div className="kicker hairline-dashed-night mt-[14svh] grid grid-cols-12 gap-6 pt-10 text-paper/55">
          <div className="col-span-12 md:col-span-4">
            <div className="font-display text-base normal-case tracking-tight text-paper">
              reserve<span className="text-sun">.</span>
            </div>
            <div className="mt-3 max-w-[28ch] font-sans text-xs normal-case leading-[1.7] tracking-normal text-paper/50">
              A studio run with one machine.
            </div>
          </div>
          <div className="col-span-6 border-l border-paper/15 pl-4 md:col-span-4">
            <div className="mb-3 text-paper/40">Cities</div>
            <div className="space-y-2 text-[0.62rem] tracking-[0.18em] text-paper/70">
              <div>London · New York · Abu Dhabi</div>
              <div>Bangkok · Singapore · Hong Kong</div>
              <div>Taipei · Tokyo</div>
            </div>
          </div>
          <div className="col-span-6 border-l border-paper/15 pl-4 md:col-span-4">
            <div className="mb-3 text-paper/40">Index</div>
            <div className="flex flex-col items-start gap-2 text-[0.62rem] tracking-[0.18em]">
              <a href="#doors" className="link-underline text-paper/70 hover:text-paper">
                Index
              </a>
              <a href="#weather" className="link-underline text-paper/70 hover:text-paper">
                While you sleep
              </a>
              <a href="#places" className="link-underline text-paper/70 hover:text-paper">
                Places
              </a>
            </div>
          </div>
          <div className="hairline-dashed-night col-span-12 mt-12 flex items-baseline justify-between pt-6 text-paper/40">
            <span>© MMXXIV — Reserve</span>
            <span>Built quietly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
