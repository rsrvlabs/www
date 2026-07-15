"use client";

// A clinical readout (visx, monochrome) for the "don't grade yourself" essay:
// reported failure/exploit rates from 2025–26 evaluation research, where the
// checker was NOT isolated from the checked. Real figures, cited in the essay.
// Hover a row for the source note. The figure IS the artifact — no stock imagery.

import { useState } from "react";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";

type Row = { label: string; value: number; note: string };

const ROWS: Row[] = [
  { label: "SWE-bench — tests found defective", value: 59.4, note: "UC Berkeley RDI, 2026: auditing a standard agent benchmark, 59.4% of its tests were defective — passable without solving the task." },
  { label: "Frontier LLM judges — error on bias tests", value: 50, note: "RAND, 2026: no LLM judge is uniformly reliable; frontier models exceed 50% error on challenging bias benchmarks." },
  { label: "o3 — solutions that reward-hacked", value: 30.4, note: "Reported 2026: 30.4% of o3's solutions scored by gaming the check rather than solving the problem." },
  { label: "DeepSeek-R1-Zero — exploit rate", value: 13.9, note: "Reward Hacking Benchmark, May 2026: exploit rate 13.9% — the model finds the shortcut the objective did not mean to reward." },
  { label: "Claude Sonnet 4.5 — exploit rate", value: 0, note: "Reward Hacking Benchmark, May 2026: 0% — the spread is the point. Isolation and monitoring, not capability alone, decide the number." },
];

const W = 720;
const ROW_H = 62;
const PAD_L = 8;
const PAD_R = 8;
const BAR_TRACK = 100; // percent

export function VerificationGap() {
  const [active, setActive] = useState<number | null>(null);
  const height = ROWS.length * ROW_H + 56;
  const x = scaleLinear({ domain: [0, BAR_TRACK], range: [0, W - PAD_L - PAD_R] });

  return (
    <figure className="my-14 border border-[oklch(0.985_0_0_/_0.14)] bg-[oklch(0.985_0_0_/_0.015)] px-5 py-7 md:px-8">
      <figcaption className="mb-6 flex items-baseline justify-between">
        <span className="kicker text-paper/55">FIG. — WHEN THE CHECKER ISN&apos;T SEPARATE FROM THE CHECKED</span>
        <span className="kicker hidden text-paper/35 md:inline">REPORTED RATE, % · 2025–26</span>
      </figcaption>

      <svg viewBox={`0 0 ${W} ${height}`} className="w-full" role="img" aria-label="Reported failure and exploit rates from 2025-26 evaluation research">
        {/* gridlines every 25% */}
        {[0, 25, 50, 75, 100].map((t) => (
          <Group key={t}>
            <line x1={PAD_L + x(t)} x2={PAD_L + x(t)} y1={0} y2={ROWS.length * ROW_H} stroke="oklch(0.985 0 0 / 0.08)" strokeWidth={1} strokeDasharray="2 4" />
            <text x={PAD_L + x(t)} y={ROWS.length * ROW_H + 22} fill="oklch(0.965 0.012 78 / 0.35)" fontSize={11} fontFamily="ui-monospace, monospace" textAnchor="middle">{t}</text>
          </Group>
        ))}

        {ROWS.map((r, i) => {
          const on = active === i;
          const bw = x(r.value);
          return (
            <Group key={r.label} top={i * ROW_H} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ cursor: "default" }}>
              <rect x={0} y={0} width={W} height={ROW_H} fill={on ? "oklch(0.985 0 0 / 0.04)" : "transparent"} />
              <text x={PAD_L} y={20} fill="oklch(0.965 0.012 78 / 0.8)" fontSize={13} fontFamily="ui-sans-serif, system-ui">{r.label}</text>
              {/* track */}
              <Bar x={PAD_L} y={30} width={W - PAD_L - PAD_R} height={10} fill="oklch(0.985 0 0 / 0.06)" />
              {/* value bar — brightness is the signal (monochrome) */}
              <Bar x={PAD_L} y={30} width={Math.max(bw, 1.5)} height={10} fill={on ? "var(--color-paper)" : "oklch(0.965 0.012 78 / 0.65)"} />
              {/* registration tick at the value */}
              <line x1={PAD_L + bw} x2={PAD_L + bw} y1={26} y2={44} stroke="var(--color-paper)" strokeWidth={on ? 1.5 : 1} />
              <text x={PAD_L + bw + 8} y={39} fill="oklch(0.965 0.012 78 / 0.85)" fontSize={12} fontFamily="ui-monospace, monospace">{r.value}%</text>
            </Group>
          );
        })}
      </svg>

      <p className="mt-5 min-h-[3.2em] border-l border-paper/20 pl-4 font-sans text-[0.85rem] leading-relaxed text-paper/60">
        {active === null ? "Hover a row. Each is a reported rate from 2025–26 evaluation research where the evaluator was not isolated from what it scored." : ROWS[active].note}
      </p>
    </figure>
  );
}
