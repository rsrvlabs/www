#!/usr/bin/env python3
"""
specimen-gate.py — LIGHT guardrail for the specimen plate family
(design-refs/assets.md §5, design-refs/specimen-prompts.md).

The family (founder-locked 2026-07-06) = contemporary/future devices DECONSTRUCTED
and shot in Le Labo's warm analog craft-documentary mood — light leaks, distressed
surfaces, a tattooed artisan's hand at work, film grain, imperfect focus. The family
coheres by ATMOSPHERE, not by a fixed table/light, so surfaces and composition vary
on purpose (walnut / aged linen / surgical steel tray / petri dish / mid-transport).

Because variety is the point, this is a GUARDRAIL, not a straitjacket. Curation is
the founder's eye. The gate hard-fails only the one thing that truly clashes with our
warm-on-cold-night system — a **dominant cold cast** — and merely WARNS on a bright
overall tone. Everything else PASSES, with warmth/tonality reported for the eye.

(v3 2026-07-06: loosened from the v2 "dark warm-consistent ground + warm-share ≥80%"
rule after the founder rejected mechanical uniformity — steel trays, petri dishes,
light leaks and over-exposure are now wanted, and the old rule would fail them.)

Usage:
  python scripts/specimen-gate.py <image> [<image> ...]
  python scripts/specimen-gate.py path/to/candidates/      # a directory
  python scripts/specimen-gate.py --json <image>           # machine-readable

Exit code 0 unless a HARD fail (dominant cold cast). Pillow only.
"""
import sys, os, json, colorsys, statistics

# ── thresholds (v3 guardrail) ─────────────────────────────────────────────────
SAT_FLOOR      = 0.10   # a pixel counts as "coloured" above this saturation
WARM_LO, WARM_HI = 12, 55  # amber/kraft/brass/copper/gold hue window (deg)
COLD_FAIL_COLORED = 0.12   # if >this fraction of the frame is coloured…
COLD_FAIL_WARM    = 0.35   # …and warm-share is below this → dominant cold cast (FAIL)
BRIGHT_WARN_VAL   = 0.60   # mean value above this → WARN (may not sit on night)
STEP           = 4       # pixel sampling stride (speed)


def _hsv(px):
    r, g, b = px[0] / 255, px[1] / 255, px[2] / 255
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h * 360, s, v


def evaluate(path):
    from PIL import Image
    im = Image.open(path).convert("RGB")
    W, H = im.size
    px = im.load()

    n = warm = colored = 0
    vals, hues = [], []
    for x in range(0, W, STEP):
        for y in range(0, H, STEP):
            h, s, v = _hsv(px[x, y])
            n += 1
            vals.append(v)
            if s > SAT_FLOOR:
                colored += 1
                hues.append(h)
                if WARM_LO <= h <= WARM_HI:
                    warm += 1
    colored_frac = colored / n if n else 0.0
    warm_share = warm / colored if colored else 1.0
    mean_val = sum(vals) / len(vals) if vals else 0.0
    med_hue = statistics.median(hues) if hues else None

    cold_cast = colored_frac > COLD_FAIL_COLORED and warm_share < COLD_FAIL_WARM
    bright = mean_val > BRIGHT_WARN_VAL
    passed = not cold_cast  # only a dominant cold cast hard-fails

    return {
        "file": os.path.basename(path),
        "pass": passed,
        "cold_cast": cold_cast,
        "bright_warn": bright,
        "warm_share": round(warm_share, 3),
        "colored_frac": round(colored_frac, 3),
        "median_hue": None if med_hue is None else round(med_hue),
        "mean_val": round(mean_val, 3),
        "size": [W, H],
    }


def _iter_paths(args):
    exts = (".png", ".jpg", ".jpeg", ".webp")
    for a in args:
        if os.path.isdir(a):
            for f in sorted(os.listdir(a)):
                if f.lower().endswith(exts):
                    yield os.path.join(a, f)
        else:
            yield a


def main(argv):
    as_json = "--json" in argv
    paths = list(_iter_paths([a for a in argv if not a.startswith("--")]))
    if not paths:
        print(__doc__)
        return 2
    results = [evaluate(p) for p in paths]
    if as_json:
        print(json.dumps(results, indent=2))
    else:
        for r in results:
            tag = "PASS" if r["pass"] else "FAIL"
            notes = []
            if r["cold_cast"]:
                notes.append(f"dominant COLD cast (warm-share {r['warm_share']:.0%})")
            if r["bright_warn"]:
                notes.append(f"⚠ bright (mean {r['mean_val']:.0%} — may not sit on night)")
            detail = ("  — " + "; ".join(notes)) if notes else ""
            print(f"[{tag}] {r['file']}  "
                  f"warm-share={r['warm_share']:.0%} hue={r['median_hue']}° "
                  f"tone={r['mean_val']:.0%}{detail}")
    return 0 if all(r["pass"] for r in results) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
