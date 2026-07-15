"use client";

// Clinical readout (visx, monochrome) for essay 06: as the model gets stronger,
// a CEILING harness (process restriction) caps the capability you can actually
// use — the gap to raw is wasted; a FLOOR harness (outcome verification) lets
// usable capability track the model, held only from below by a minimum guarantee.
// Hover a line. The figure IS the argument.

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

const CAP = [0, 0.2, 0.4, 0.6, 0.8, 1];
const RAW = [0, 0.2, 0.4, 0.6, 0.8, 1]; // usable == model, the reference
const CEILING = [0, 0.2, 0.38, 0.45, 0.47, 0.48]; // rises, then the restriction caps it
const FLOOR = [0.18, 0.32, 0.5, 0.66, 0.82, 0.95]; // tracks the model, held from below

const x = scaleLinear({ domain: [0, 1], range: [0, iw] });
const y = scaleLinear({ domain: [0, 1], range: [ih, 0] });

const SERIES = [
  {
    key: "raw",
    label: "Raw model capability",
    data: RAW,
    dash: "2 4",
    width: 1.2,
    note: "What the model could do, unharnessed — the reference line. Every design below is measured by how much of this it lets you actually keep.",
  },
  {
    key: "ceiling",
    label: "Under a ceiling harness",
    data: CEILING,
    dash: undefined,
    width: 1.8,
    note: "A process restriction — 'may only / may not / at most N turns'. It rises with early models, then flattens: once the model is good enough to exceed the limit, the limit binds. The widening gap up to the raw line is capability you paid for and threw away.",
  },
  {
    key: "floor",
    label: "Under a floor harness",
    data: FLOOR,
    dash: undefined,
    width: 2.4,
    note: "An outcome verification — 'the result must pass this check'. Usable capability tracks the model as it grows; the harness only holds you from below, guaranteeing a minimum. A stronger model does more inside the same envelope, no rewrite.",
  },
];

export function FloorVsCeiling() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <figure className="my-14 border border-[oklch(0.985_0_0_/_0.14)] bg-[oklch(0.985_0_0_/_0.015)] px-5 py-7 md:px-8">
      <figcaption className="mb-5 flex items-baseline justify-between">
        <span className="kicker text-paper/55">FIG. — CAPABILITY YOU CAN ACTUALLY USE, UNDER TWO HARNESS DESIGNS</span>
        <span className="kicker hidden text-paper/35 md:inline">USABLE × MODEL CAPABILITY</span>
      </figcaption>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Usable capability under a ceiling harness (caps) vs a floor harness (tracks the model)">
        <Group left={M.left} top={M.top}>
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
                  strokeOpacity={dim ? 0.25 : on ? 1 : s.key === "raw" ? 0.5 : 0.8}
                  strokeWidth={on ? s.width + 0.8 : s.width}
                  strokeDasharray={s.dash}
                  curve={curveMonotoneX}
                  fill="none"
                />
                <circle cx={x(1)} cy={y(s.data[s.data.length - 1])} r={on ? 4 : 3} fill="var(--color-paper)" fillOpacity={dim ? 0.3 : 1} />
                <text
                  x={x(1) - 6}
                  y={y(s.data[s.data.length - 1]) + (s.key === "ceiling" ? 18 : -10)}
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
          <text x={0} y={ih + 26} fontSize={11} fontFamily="ui-monospace, monospace" fill="oklch(0.965 0.012 78 / 0.4)">weaker model</text>
          <text x={iw} y={ih + 26} textAnchor="end" fontSize={11} fontFamily="ui-monospace, monospace" fill="oklch(0.965 0.012 78 / 0.4)">model capability →</text>
        </Group>
      </svg>

      <p className="mt-3 min-h-[4.6em] border-l border-paper/20 pl-4 font-sans text-[0.85rem] leading-relaxed text-paper/60">
        {active === null
          ? "Hover a line. A ceiling caps what a stronger model may attempt; a floor guarantees a minimum and lets the rest track the model."
          : SERIES.find((s) => s.key === active)!.note}
      </p>
    </figure>
  );
}
