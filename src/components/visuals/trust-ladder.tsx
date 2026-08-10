"use client";

// Interactive figure for essay 07: the trust ladder. Each rung is one real
// autonomy grant — a numbered, revocable decision record that opened one
// narrow surface, wrapped in its own guardrails. Select a rung to read the
// grant's anatomy; toggle "revoke" to see that every grant carries its undo.
// Light Apple grammar (the site's post-07/23 visual language), plain SVG.

import { useState } from "react";

type Rung = {
  label: string;
  grant: string;
  scope: string;
  guardrails: string[];
  y: number; // autonomy level after this grant, 0..1
};

const RUNGS: Rung[] = [
  {
    label: "Open tickets",
    grant: "The agent may open and update tickets on the team board on its own.",
    scope: "One write surface — the ticket board. Everything else stays read-only.",
    guardrails: ["Tickets only — no other writes", "Every ticket logged with provenance"],
    y: 0.18,
  },
  {
    label: "Publish one artifact",
    grant:
      "It may auto-publish a single daily brief to a single internal channel.",
    scope: "One artifact, one channel, once a day.",
    guardrails: [
      "Enabled-flag off by default",
      "Kill-switch file",
      "Once-per-day idempotency",
      "No @mentions",
      "Manual posts for days before headless flipped on",
    ],
    y: 0.38,
  },
  {
    label: "Answer when addressed",
    grant: "It may reply to mentions — in one channel.",
    scope: "Conversational, but only when spoken to, and only in one place.",
    guardrails: ["Responds to mentions only", "Single-channel scope"],
    y: 0.55,
  },
  {
    label: "Converse as a full agent",
    grant:
      "Full-agent mode inside one founder's direct messages — with two permission tiers keyed to who is talking.",
    scope: "One person's DM. Tier depends on verified sender identity.",
    guardrails: [
      "Two permission tiers by sender",
      "An identity conflict was caught and reconciled before the grant went live",
    ],
    y: 0.74,
  },
  {
    label: "Speak on a schedule",
    grant:
      "The scheduled heartbeat may post digests to internal channels — unprompted, with nobody watching.",
    scope: "Internal channels only; at most one digest a day plus urgent alerts.",
    guardrails: [
      "Internal allowlist only",
      "Volume-bounded, every post logged",
      "Mute file silences it instantly",
    ],
    y: 0.9,
  },
];

const W = 720;
const H = 300;
const M = { top: 24, right: 20, bottom: 44, left: 20 };
const iw = W - M.left - M.right;
const ih = H - M.top - M.bottom;

const X = (i: number) => (i / (RUNGS.length - 1)) * (iw - 60) + 30;
const Y = (v: number) => ih - v * ih;

export default function TrustLadder() {
  const [selected, setSelected] = useState(1);
  const [revoked, setRevoked] = useState<boolean[]>(RUNGS.map(() => false));

  // Autonomy only counts grants still in force: a revoked rung drops the
  // line back to the previous live level — the "revocable" half of the story.
  const level = (i: number) => {
    for (let j = i; j >= 0; j--) if (!revoked[j]) return RUNGS[j].y;
    return 0.06;
  };

  const steps: string[] = [];
  let prev = Y(0.06);
  RUNGS.forEach((_, i) => {
    const x = X(i);
    const y = Y(level(i));
    steps.push(`${i === 0 ? "M" : "L"} ${x - 14} ${prev} L ${x} ${y}`);
    prev = y;
    if (i === RUNGS.length - 1) steps.push(`L ${iw} ${y}`);
  });

  const r = RUNGS[selected];

  return (
    <figure style={{ margin: "2.6rem 0" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Trust ladder: five autonomy grants, each a revocable decision record"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {/* still-gated band above the ladder */}
          <rect x={0} y={0} width={iw} height={Y(0.97)} fill="#f5f5f7" rx={8} />
          <text x={iw / 2} y={Y(0.97) - 8} textAnchor="middle" fontSize={11.5} fill="#86868b">
            still gated: anything external, anything spending money, deleting sources
          </text>

          <path d={steps.join(" ")} fill="none" stroke="#0071e3" strokeWidth={2.25} />

          {RUNGS.map((rung, i) => {
            const active = i === selected;
            const dead = revoked[i];
            return (
              <g
                key={rung.label}
                transform={`translate(${X(i)},${Y(level(i))})`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(i)}
              >
                <circle
                  r={active ? 9 : 6.5}
                  fill={dead ? "#fff" : active ? "#0071e3" : "#1d1d1f"}
                  stroke={dead ? "#86868b" : active ? "#0071e3" : "#1d1d1f"}
                  strokeWidth={2}
                  strokeDasharray={dead ? "2 2" : undefined}
                />
                <text
                  y={dead ? -16 : 26}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={active ? 600 : 400}
                  fill={dead ? "#86868b" : "#1d1d1f"}
                  style={{ textDecoration: dead ? "line-through" : "none" }}
                >
                  {rung.label}
                </text>
              </g>
            );
          })}

          <text x={0} y={ih + 32} fontSize={11.5} fill="#86868b">
            time → each step is one numbered decision record
          </text>
          <text x={iw} y={ih + 32} fontSize={11.5} fill="#86868b" textAnchor="end">
            ↑ autonomous outward reach
          </text>
        </g>
      </svg>

      <div
        style={{
          background: "#f5f5f7",
          borderRadius: "1rem",
          padding: "1.2rem 1.4rem",
          marginTop: "0.8rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#86868b" }}>
          Grant {selected + 1} of {RUNGS.length}
          {revoked[selected] ? " · revoked" : ""}
        </p>
        <p style={{ margin: "0.35rem 0 0.5rem", fontSize: "1.02rem", fontWeight: 600, color: "#1d1d1f" }}>
          {r.grant}
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "#333336" }}>{r.scope}</p>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.92rem", color: "#333336", lineHeight: 1.55 }}>
          {r.guardrails.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <button
          onClick={() =>
            setRevoked((v) => v.map((x, i) => (i === selected ? !x : x)))
          }
          style={{
            marginTop: "0.85rem",
            fontSize: "0.9rem",
            color: revoked[selected] ? "#0071e3" : "#86868b",
            background: "none",
            border: "1px solid currentColor",
            borderRadius: "999px",
            padding: "0.3rem 0.9rem",
            cursor: "pointer",
          }}
        >
          {revoked[selected] ? "restore this grant" : "revoke this grant"}
        </button>
      </div>
      <figcaption style={{ fontSize: "0.9rem", color: "#86868b", marginTop: "0.7rem" }}>
        Five real grants, in order. Select a rung to read the grant&rsquo;s anatomy;
        revoke one and the ladder steps back down — every grant carries its own undo.
      </figcaption>
    </figure>
  );
}
