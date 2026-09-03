"use client";

// Interactive figure for essay 13. Five broken instruments from one week,
// plotted on the only two axes that turned out to matter: which direction the
// error pointed (alarm vs comfort), and how long it survived before anyone
// caught it. The direction column is mixed. The survival column is not — and
// that, not the direction, is the finding.
//
// The horizontal axis is ORDINAL, not measured. Three named stops, no implied
// durations: we have the receipts for when each one was caught, not for how
// many hours it had been wrong. Select a dot to read the instrument's anatomy.
// Light Apple grammar (the site's post-07/23 visual language), plain SVG.

import { useState } from "react";

type Direction = "alarm" | "comfort";

type Instrument = {
  label: string;
  reported: string;
  actual: string;
  direction: Direction;
  stop: 0 | 1 | 2;
  caught: string;
  fix: string;
};

// Ordinal stops on the survival axis, left (caught fast) to right (survived).
const STOPS = [
  "caught in the same cycle",
  "caught by a later sweep",
  "survived until we went looking",
];

const INSTRUMENTS: Instrument[] = [
  {
    label: "Commit count",
    reported: "No commits yesterday.",
    actual: "Fifty-one commits yesterday.",
    direction: "alarm",
    stop: 0,
    caught: "Self-corrected inside the same cycle that made the claim.",
    fix: "Fetch before you count. A clone is a cache, and a cache is a claim about the past.",
  },
  {
    label: "Board sweep — feature check",
    reported: "Four shipped features are missing.",
    actual: "All four were built and merged.",
    direction: "alarm",
    stop: 0,
    caught: "Re-verified inside the same audit, because four missing features is alarming.",
    fix: "One search pattern can never prove absence. Absence needs a second method, not a second run.",
  },
  {
    label: "Board sweep — open work",
    reported: "Thirty-three tickets still open.",
    actual: "Fifteen of the thirty-three were already built.",
    direction: "alarm",
    stop: 1,
    caught: "Only when an audit went looking. Nobody had been reading the board for a verdict.",
    fix: "Check the board against the code, not against itself.",
  },
  {
    label: "Deadline radar",
    reported: "Deadline read straight off the page's own structured data.",
    actual:
      "The field was a wall-clock timestamp wearing a deadline's name — sixty-five seconds later it had moved.",
    direction: "comfort",
    stop: 2,
    caught: "Only on a second read. The first read had happened to agree with the real deadline.",
    fix: "Read it twice. One agreeing read is a coincidence; two reads is a test.",
  },
  {
    label: "Nightly database patrol",
    reported: "Thirteen checks, all passed.",
    actual: "Seven of twenty checks had failed.",
    direction: "comfort",
    stop: 2,
    caught: "Only when someone read past the summary line to the log underneath it.",
    fix: "Print the denominator, and print the whole error. A count of passes is not a result.",
  },
];

const W = 720;
const H = 290;
const M = { top: 30, right: 24, bottom: 66, left: 24 };
const iw = W - M.left - M.right;
const ih = H - M.top - M.bottom;

// Left gutter holds the two lane labels, so dots never start under them.
const GUTTER = 108;
const LANE_Y: Record<Direction, number> = { alarm: 40, comfort: 140 };
const TWIN_DY = 20;
const X = (stop: number) => GUTTER + (stop / (STOPS.length - 1)) * (iw - GUTTER - 40);
// Labels on the rightmost stop read leftward, or they run off the viewBox.
const lastStop = STOPS.length - 1;

const INK = "#1d1d1f";
const SOFT = "#86868b";
const BLUE = "#0071e3";
const TINT = "#f5f5f7";

export default function ErrorSurvival() {
  const [selected, setSelected] = useState(4);
  const it = INSTRUMENTS[selected];

  return (
    <figure style={{ margin: "2.6rem 0" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Five broken instruments plotted by the direction the error pointed and how long it survived before being caught"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {/* the comfort lane gets the tint: it is the half of the chart the essay is about */}
          <rect x={0} y={96} width={iw} height={ih - 96} fill={TINT} rx={10} />

          {STOPS.map((s, i) => (
            <g key={s}>
              <line
                x1={X(i)}
                x2={X(i)}
                y1={0}
                y2={ih}
                stroke="#d2d2d7"
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              <text
                x={X(i)}
                y={ih + 24}
                textAnchor={i === 0 ? "start" : i === lastStop ? "end" : "middle"}
                fontSize={11.5}
                fill={SOFT}
              >
                {s}
              </text>
            </g>
          ))}

          <text x={0} y={LANE_Y.alarm - TWIN_DY + 4.5} fontSize={11.5} fill={SOFT}>
            toward alarm
          </text>
          <text x={0} y={LANE_Y.comfort - TWIN_DY + 4.5} fontSize={11.5} fill={SOFT}>
            toward comfort
          </text>

          {INSTRUMENTS.map((ins, i) => {
            const active = i === selected;
            const cx = X(ins.stop);
            // two dots can share a cell; nudge them apart rather than overlap
            const twin = INSTRUMENTS.filter((o) => o.stop === ins.stop && o.direction === ins.direction);
            const offset = twin.length > 1 ? (twin.indexOf(ins) - (twin.length - 1) / 2) * (TWIN_DY * 2) : 0;
            const cy = LANE_Y[ins.direction] + offset;
            const leftward = ins.stop === lastStop;
            return (
              <g
                key={ins.label}
                transform={`translate(${cx},${cy})`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(i)}
              >
                {active && <circle r={15} fill="none" stroke={BLUE} strokeWidth={1.5} opacity={0.5} />}
                <circle
                  r={active ? 8.5 : 6.5}
                  fill={ins.direction === "comfort" ? BLUE : "#fff"}
                  stroke={ins.direction === "comfort" ? BLUE : INK}
                  strokeWidth={2}
                />
                <text
                  x={leftward ? -20 : 20}
                  y={4.5}
                  textAnchor={leftward ? "end" : "start"}
                  fontSize={12}
                  fontWeight={active ? 600 : 400}
                  fill={active ? INK : "#3a3a3c"}
                >
                  {ins.label}
                </text>
              </g>
            );
          })}

          <text x={iw} y={ih + 46} fontSize={11.5} fill={SOFT} textAnchor="end">
            how long it lived →
          </text>
        </g>
      </svg>

      <div
        style={{
          background: TINT,
          borderRadius: "1rem",
          padding: "1.2rem 1.4rem",
          marginTop: "0.8rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.85rem", color: SOFT }}>
          {it.label} · error pointed toward {it.direction === "comfort" ? "comfort" : "alarm"}
        </p>
        <p style={{ margin: "0.4rem 0 0.15rem", fontSize: "1.02rem", fontWeight: 600, color: INK }}>
          Reported: {it.reported}
        </p>
        <p style={{ margin: "0 0 0.6rem", fontSize: "1.02rem", fontWeight: 600, color: BLUE }}>
          Actually: {it.actual}
        </p>
        <p style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", color: "#333336" }}>
          <strong style={{ fontWeight: 600 }}>How it was caught.</strong> {it.caught}
        </p>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#333336" }}>
          <strong style={{ fontWeight: 600 }}>The mechanical fix.</strong> {it.fix}
        </p>
      </div>
      <figcaption style={{ fontSize: "0.9rem", color: SOFT, marginTop: "0.7rem" }}>
        Five broken instruments from one week. The direction column is mixed — three of the five
        pointed toward alarm, not comfort. The survival column is not mixed, and that is the whole
        finding. Select a dot to read the instrument. The horizontal axis is ordinal: we have
        receipts for when each error was caught, not for how many hours it had been wrong.
      </figcaption>
    </figure>
  );
}
