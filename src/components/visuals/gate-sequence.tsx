"use client";

// Interactive figure for essay 14. An account's first hour, laid out left to
// right, with the server-side guards pinned to the moment each one actually
// runs — and, underneath, the window in which the thing they all read (the
// account's profile row) exists.
//
// Toggle the account type and the bottom bar moves: for an account that has
// been around, the row exists before any guard fires; for a brand-new one it
// is created during onboarding, which happens AFTER login. The three guards
// that run at login are then reading a row that does not exist yet, and they
// turn red. The second toggle applies the fix we actually shipped — the lock
// tolerates a missing row — and shows that the gap is still there; the guard
// simply no longer assumes it away.
//
// Light Apple grammar (the site's post-07/23 visual language), plain SVG, no
// chart library. Guards are keyboard-reachable: tab to one, Enter or Space to
// read it.

import { useState } from "react";

type MomentId = 0 | 1 | 2 | 3 | 4;

const MOMENTS = [
  "sign-up",
  "first login",
  "onboarding",
  "first session",
  "every day after",
];

// The moment onboarding writes the profile row. Everything left of it is the
// window in which a brand-new account has no row at all.
const PROFILE_CREATED: MomentId = 2;

type Guard = {
  label: string;
  runsAt: MomentId;
  lane: number;
  does: string;
  reads: string;
};

const GUARDS: Guard[] = [
  {
    label: "single-device claim",
    runsAt: 1,
    lane: 0,
    does: "Claims the account for the device in front of it, so two phones racing each other cannot both win.",
    reads:
      "the account's profile row — which also carries whether the account has been deleted, the one thing a login must refuse",
  },
  {
    label: "stale-session discard",
    runsAt: 1,
    lane: 1,
    does: "Throws away a device session that was started and never claimed.",
    reads: "the same profile row, under the same lock",
  },
  {
    label: "push registration",
    runsAt: 1,
    lane: 2,
    does: "Registers this device for notifications.",
    reads: "the same profile row, under the same lock",
  },
  {
    label: "session identity issue",
    runsAt: 3,
    lane: 0,
    does: "Issues the short-lived identifiers a live session needs.",
    reads: "the same profile row, under the same lock",
  },
  {
    label: "activity home read",
    runsAt: 4,
    lane: 1,
    does: "Reads which activities this account is part of.",
    reads: "the same profile row, under the same lock",
  },
];

type Incident = {
  label: string;
  guard: number; // 0..1 — when the code runs
  band: [number, number] | null; // when the world it assumes is true
  bandLabel: string;
  gap: string;
};

const INCIDENTS: Incident[] = [
  {
    label: "The login gate",
    guard: 0.24,
    band: [0.52, 1],
    bandLabel: "the profile row exists",
    gap: "Runs at login. The row it reads is created two screens later.",
  },
  {
    label: "The deletion purge",
    guard: 0.16,
    band: null,
    bandLabel: "a scheduled caller exists",
    gap: "Correct at every moment. Invoked at none — nothing was scheduled to call it.",
  },
  {
    label: "The nightly alarm",
    guard: 0.78,
    band: [0, 0.3],
    bandLabel: "the runner printed the format it parses",
    gap: "Parses another program's output as if it were an API. The output moved.",
  },
  {
    label: "The expiring test",
    guard: 0.76,
    band: [0, 0.44],
    bandLabel: "the activity window is open",
    gap: "Asserts a card that is only on screen while the fixture's window is open. It closed.",
  },
];

const W = 720;
const H = 330;
const M = { top: 24, right: 20, bottom: 82, left: 20 };
const iw = W - M.left - M.right;
const ih = H - M.top - M.bottom;

const AXIS_Y = 132;
const LANE_Y = [14, 54, 94];
const BAR_Y = 168;
const BAR_H = 26;
const GAP_Y = 212;

const GUTTER = 26;
const X = (m: number) => GUTTER + (m / (MOMENTS.length - 1)) * (iw - GUTTER - 34);
const lastMoment = MOMENTS.length - 1;

// The four-incident strip's mini axis. Inset on both sides so a band that runs
// to the end of time still reads as a band rather than as a clipped edge.
const MINI_W = 252;
const MX = (t: number) => 6 + t * (MINI_W - 12);

const INK = "#1d1d1f";
const SOFT = "#86868b";
const BLUE = "#0071e3";
const TINT = "#f5f5f7";
const HAIR = "#d2d2d7";
// The figure needs a fail state the eye finds instantly; Apple's system red on
// white is the only colour added beyond the site's existing four.
const RED = "#d70015";

export default function GateSequence() {
  const [isNew, setIsNew] = useState(true);
  const [tolerant, setTolerant] = useState(false);
  const [selected, setSelected] = useState(0);

  const barStartMoment = isNew ? PROFILE_CREATED : 0;
  const barStart = isNew ? X(PROFILE_CREATED) : 0;

  // A guard is in trouble when it reads a row that has not been written yet.
  const missing = (g: Guard) => isNew && g.runsAt < PROFILE_CREATED;
  const broken = (g: Guard) => missing(g) && !tolerant;

  const g = GUARDS[selected];
  const verdict = !missing(g)
    ? isNew
      ? "This one runs after onboarding, so the row is always there by the time it reads. Same lock, same code, no incident."
      : "The row was written long before this moment. The guard takes its lock, checks for deletion, and passes."
    : tolerant
      ? "There is still no row. The guard now skips that one lock, keeps the rest of the locking order intact, and lets the account through to onboarding — which is the thing that creates the row."
      : "There is no row. Onboarding creates it, and onboarding runs after this. The guard does the correct thing with nothing: it refuses, and the account cannot get in.";

  const ctl = (active: boolean): React.CSSProperties => ({
    fontSize: "0.85rem",
    padding: "0.32rem 0.85rem",
    borderRadius: "999px",
    border: `1px solid ${active ? BLUE : HAIR}`,
    background: active ? BLUE : "#fff",
    color: active ? "#fff" : SOFT,
    cursor: "pointer",
  });

  return (
    <figure style={{ margin: "2.6rem 0" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "0.9rem",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: SOFT, marginRight: "0.2rem" }}>
          Account:
        </span>
        <button type="button" style={ctl(!isNew)} onClick={() => setIsNew(false)}>
          existing
        </button>
        <button type="button" style={ctl(isNew)} onClick={() => setIsNew(true)}>
          brand new
        </button>
        <button
          type="button"
          style={{ ...ctl(tolerant), marginLeft: "auto" }}
          aria-pressed={tolerant}
          onClick={() => setTolerant((t) => !t)}
        >
          {tolerant ? "✓ lock tolerates a missing profile" : "lock tolerates a missing profile"}
        </button>
      </div>

      {/* The timeline's whole argument is left-to-right position, so on a phone
          it scrolls at a readable size rather than shrinking to a smear. On the
          article measure (42rem) the min-width never binds and nothing moves. */}
      <div style={{ overflowX: "auto", paddingBottom: "0.2rem" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label="An account's first hour: server guards pinned to the moment each runs, over the window in which the profile row they read exists"
        style={{ width: "100%", minWidth: "39rem", height: "auto", display: "block" }}
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {/* the moment ticks */}
          {MOMENTS.map((m, i) => (
            <g key={m}>
              <line
                x1={X(i)}
                x2={X(i)}
                y1={0}
                y2={AXIS_Y}
                stroke={HAIR}
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              <circle cx={X(i)} cy={AXIS_Y} r={3} fill={INK} />
              <text
                x={X(i)}
                y={AXIS_Y + 20}
                textAnchor={i === 0 ? "start" : i === lastMoment ? "end" : "middle"}
                fontSize={11.5}
                fill={i === barStartMoment && isNew ? INK : SOFT}
                fontWeight={i === barStartMoment && isNew ? 600 : 400}
              >
                {m}
              </text>
            </g>
          ))}
          <line x1={0} x2={iw} y1={AXIS_Y} y2={AXIS_Y} stroke={HAIR} strokeWidth={1} />

          {/* the guards, pinned to the moment they run */}
          {GUARDS.map((guard, i) => {
            const active = i === selected;
            const bad = broken(guard);
            const skipping = missing(guard) && tolerant;
            const cx = X(guard.runsAt);
            const cy = LANE_Y[guard.lane];
            const leftward = guard.runsAt === lastMoment;
            const stroke = bad ? RED : skipping ? BLUE : INK;
            return (
              <g
                key={guard.label}
                transform={`translate(${cx},${cy})`}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${guard.label}, runs at ${MOMENTS[guard.runsAt]}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
              >
                <title>{`${guard.label} — runs at ${MOMENTS[guard.runsAt]}`}</title>
                {active && (
                  <circle r={14} fill="none" stroke={stroke} strokeWidth={1.5} opacity={0.45} />
                )}
                <circle
                  r={active ? 8 : 6.5}
                  fill={bad ? RED : skipping ? "#fff" : "#fff"}
                  stroke={stroke}
                  strokeWidth={2}
                  strokeDasharray={skipping ? "3 2.5" : undefined}
                />
                <text
                  x={leftward ? -18 : 18}
                  y={4.5}
                  textAnchor={leftward ? "end" : "start"}
                  fontSize={12}
                  fontWeight={active ? 600 : 400}
                  fill={bad ? RED : active ? INK : "#3a3a3c"}
                >
                  {guard.label}
                </text>
                {bad && (
                  <line
                    x1={0}
                    x2={0}
                    y1={10}
                    y2={AXIS_Y - cy}
                    stroke={RED}
                    strokeWidth={1.25}
                    strokeDasharray="3 3"
                  />
                )}
              </g>
            );
          })}

          {/* the window in which the profile row exists */}
          {isNew && (
            <rect
              x={0}
              y={BAR_Y}
              width={barStart}
              height={BAR_H}
              fill="none"
              stroke={broken(GUARDS[0]) ? RED : SOFT}
              strokeWidth={1.25}
              strokeDasharray="4 4"
              rx={7}
            />
          )}
          <rect
            x={barStart}
            y={BAR_Y}
            width={iw - barStart}
            height={BAR_H}
            fill={TINT}
            rx={7}
          />
          <text
            x={barStart + 12}
            y={BAR_Y + 17}
            fontSize={11.5}
            fill={INK}
          >
            profile row exists
          </text>
          {isNew && (
            <text
              x={12}
              y={BAR_Y + 17}
              fontSize={11.5}
              fill={broken(GUARDS[0]) ? RED : SOFT}
            >
              no profile row yet
            </text>
          )}

          {/* the gap between the guard's moment and the world's */}
          {isNew && (
            <g>
              <line
                x1={X(1)}
                x2={X(PROFILE_CREATED)}
                y1={GAP_Y}
                y2={GAP_Y}
                stroke={tolerant ? SOFT : RED}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <line
                x1={X(1)}
                x2={X(1)}
                y1={GAP_Y - 6}
                y2={GAP_Y + 6}
                stroke={tolerant ? SOFT : RED}
                strokeWidth={1.5}
              />
              <line
                x1={X(PROFILE_CREATED)}
                x2={X(PROFILE_CREATED)}
                y1={GAP_Y - 6}
                y2={GAP_Y + 6}
                stroke={tolerant ? SOFT : RED}
                strokeWidth={1.5}
              />
              <text
                x={(X(1) + X(PROFILE_CREATED)) / 2}
                y={GAP_Y + 22}
                textAnchor="middle"
                fontSize={11.5}
                fill={tolerant ? SOFT : RED}
              >
                {tolerant
                  ? "the gap is still here — the guard no longer assumes it away"
                  : "the gap: three guards run here, the row is written there"}
              </text>
            </g>
          )}

          <text x={iw} y={ih + 4} fontSize={11.5} fill={SOFT} textAnchor="end">
            one account&rsquo;s first hour →
          </text>
        </g>
      </svg>
      </div>

      <div
        style={{
          background: TINT,
          borderRadius: "1rem",
          padding: "1.2rem 1.4rem",
          marginTop: "0.8rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.85rem", color: SOFT }}>
          {g.label} · runs at {MOMENTS[g.runsAt]}
        </p>
        <p
          style={{
            margin: "0.4rem 0 0.5rem",
            fontSize: "1.02rem",
            fontWeight: 600,
            color: INK,
          }}
        >
          {g.does}
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", color: "#333336" }}>
          <strong style={{ fontWeight: 600 }}>It reads</strong> {g.reads}.
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.95rem",
            color: broken(g) ? RED : "#333336",
          }}
        >
          {verdict}
        </p>
      </div>

      <div style={{ marginTop: "1.6rem" }}>
        <p
          style={{
            margin: "0 0 0.7rem",
            fontSize: "0.85rem",
            color: SOFT,
          }}
        >
          The same shape, four times in one week
        </p>
        {INCIDENTS.map((inc) => (
          <div
            key={inc.label}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem 1.2rem",
              alignItems: "center",
              padding: "0.7rem 0",
              borderTop: `1px dashed ${HAIR}`,
            }}
          >
            {/* flex-wrap rather than a grid: on a phone the strip stacks, so the
                mini axis keeps a readable width instead of shrinking to a smear */}
            <div style={{ flex: "1 1 15rem", minWidth: "13rem" }}>
              <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: INK }}>
                {inc.label}
              </p>
              <p style={{ margin: "0.15rem 0 0", fontSize: "0.88rem", color: "#333336" }}>
                {inc.gap}
              </p>
            </div>
            <svg
              viewBox={`0 0 ${MINI_W} 36`}
              role="img"
              aria-label={`${inc.label}: the code runs outside the window in which ${inc.bandLabel}`}
              style={{ flex: "1 1 15rem", minWidth: "13rem", height: "auto", display: "block" }}
            >
              {inc.band ? (
                <rect
                  x={MX(inc.band[0])}
                  y={5}
                  width={MX(inc.band[1]) - MX(inc.band[0])}
                  height={14}
                  fill={TINT}
                  rx={4}
                />
              ) : (
                <rect
                  x={MX(0)}
                  y={5}
                  width={MX(1) - MX(0)}
                  height={14}
                  fill="none"
                  stroke={HAIR}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  rx={4}
                />
              )}
              <line x1={MX(0)} x2={MX(1)} y1={12} y2={12} stroke={HAIR} strokeWidth={1} />
              <circle cx={MX(inc.guard)} cy={12} r={5.5} fill={RED} />
              <text x={MX(0)} y={33} fontSize={10.5} fill={SOFT}>
                {inc.band ? inc.bandLabel : `${inc.bandLabel} — never`}
              </text>
            </svg>
          </div>
        ))}
      </div>

      <figcaption style={{ fontSize: "0.9rem", color: SOFT, marginTop: "0.9rem" }}>
        Top: fifteen server functions take the same profile lock; three of them run at login,
        before onboarding has written the row they read. Switch the account type to see the
        window move. Bottom: the week&rsquo;s four failures in one grammar — the red marker is
        when the code runs, the shaded band is when the world it assumes is true. In all four
        they do not overlap.
      </figcaption>
    </figure>
  );
}
