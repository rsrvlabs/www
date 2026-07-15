"use client";

// Clinical readout (visx, monochrome) for the "two harnesses" essay: as model
// capability rises, the value of a COMPENSATING harness (crutches for what the
// model can't yet do) decays toward zero, while a DURABLE harness (memory,
// accountability, permission, cadence) compounds. Two curves, crossing. Hover a
// line for what lives on it. The figure IS the argument — no stock imagery.

import { useState } from "react";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Group } from "@visx/group";

const W = 720;
const H = 300;
const M = { top: 16, right: 16, bottom: 40, left: 16 };
const iw = W - M.left - M.right;
const ih = H - M.top - M.bottom;

// value (0–1) of each harness layer across model capability (0–1)
const CAP = [0, 0.2, 0.4, 0.6, 0.8, 1];
const COMPENSATING = [0.92, 0.78, 0.55, 0.34, 0.16, 0.06]; // decays
const DURABLE = [0.28, 0.4, 0.53, 0.66, 0.8, 0.94]; // compounds

const x = scaleLinear({ domain: [0, 1], range: [0, iw] });
const y = scaleLinear({ domain: [0, 1], range: [ih, 0] });

const SERIES = [
  {
    key: "compensating",
    label: "Compensating harness",
    data: COMPENSATING,
    dash: "5 4",
    note: "Crutches for what the model can't yet do: prompt scaffolding, error-correction loops, routing layers, retrieval bolted on to paper over a weak context window. Every piece has an expiration date — the next model deletes it. As capability rises, its value decays toward zero.",
  },
  {
    key: "durable",
    label: "Durable harness",
    data: DURABLE,
    dash: undefined,
    note: "What no model provides for itself, however smart: compounding memory, accountability isolated from the thing it scores, permission gates on money and outside reach, a cadence that runs unattended, institutional knowledge. It doesn't expire — it compounds. This is most of what we built.",
  },
];

export function TwoHarnesses() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <figure className="my-14 border border-[oklch(0.985_0_0_/_0.14)] bg-[oklch(0.985_0_0_/_0.015)] px-5 py-7 md:px-8">
      <figcaption className="mb-5 flex items-baseline justify-between">
        <span className="kicker text-paper/55">FIG. — THE HARNESS THAT EXPIRES vs THE ONE THAT COMPOUNDS</span>
        <span className="kicker hidden text-paper/35 md:inline">VALUE × MODEL CAPABILITY</span>
      </figcaption>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Two curves: a compensating harness decaying and a durable harness compounding as model capability rises">
        <Group left={M.left} top={M.top}>
          {/* horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line key={t} x1={0} x2={iw} y1={y(t)} y2={y(t)} stroke="oklch(0.985 0 0 / 0.06)" strokeWidth={1} strokeDasharray="2 4" />
          ))}
          {SERIES.map((s) => {
            const on = active === s.key;
            const dim = active !== null && !on;
            return (
              <Group key={s.key} onMouseEnter={() => setActive(s.key)} onMouseLeave={() => setActive(null)}>
                <LinePath
                  data={s.data}
                  x={(_, i) => x(CAP[i])}
                  y={(d) => y(d)}
                  stroke="var(--color-paper)"
                  strokeOpacity={dim ? 0.28 : on ? 1 : 0.75}
                  strokeWidth={on ? 2.4 : 1.6}
                  strokeDasharray={s.dash}
                  curve={curveMonotoneX}
                  fill="none"
                />
                {/* endpoint dot + label */}
                <circle cx={x(1)} cy={y(s.data[s.data.length - 1])} r={on ? 4 : 3} fill="var(--color-paper)" fillOpacity={dim ? 0.3 : 1} />
                <text
                  x={x(1) - 6}
                  y={y(s.data[s.data.length - 1]) + (s.key === "durable" ? -12 : 18)}
                  textAnchor="end"
                  fontSize={12}
                  fontFamily="ui-sans-serif, system-ui"
                  fill="oklch(0.965 0.012 78)"
                  fillOpacity={dim ? 0.3 : 0.85}
                >
                  {s.label}
                </text>
              </Group>
            );
          })}
          {/* x-axis caption */}
          <text x={0} y={ih + 26} fontSize={11} fontFamily="ui-monospace, monospace" fill="oklch(0.965 0.012 78 / 0.4)">weaker model</text>
          <text x={iw} y={ih + 26} textAnchor="end" fontSize={11} fontFamily="ui-monospace, monospace" fill="oklch(0.965 0.012 78 / 0.4)">model capability →</text>
        </Group>
      </svg>

      <p className="mt-3 min-h-[4.6em] border-l border-paper/20 pl-4 font-sans text-[0.85rem] leading-relaxed text-paper/60">
        {active === null
          ? "Hover a line. One harness is a crutch the next model deletes; the other is the company's institutional layer, and it only gets more valuable."
          : SERIES.find((s) => s.key === active)!.note}
      </p>
    </figure>
  );
}
