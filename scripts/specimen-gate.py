#!/usr/bin/env python3
"""
specimen-gate.py — deterministic acceptance gate for the specimen plate family
(design-refs/assets.md §5, design-refs/specimen-prompts.md). Run EVERY candidate
through this before it goes near the site; reject family-breakers first.

The family (founder-locked 2026-07-06) = a contemporary/future device DECONSTRUCTED
and laid out flat, Le Labo ingredient-flat-lay style, shot with warm documentary
texture on a DARK warm-lit surface — a warm photographic tile that drops into our
cold night interface (Le Labo's law: warmth in the photo, interface stays cold).

Two things keep the family reading as one system:
  1. DARK, warm-consistent GROUND — the plate sits on night, and the surface must
     not carry a cold cast that would clash with the neutral night UI.
     → 4 corner blocks: mean value <= 42% (dark) AND not cold (no saturated
       blue/green ground; if a corner is saturated its hue must be warm 10–60°).
  2. WARMTH is one amber/kraft/brass/copper family — no stray cold casts.
     → center crop: >=80% of saturated pixels fall in hue 15–50°.

(v2 2026-07-06: retuned from "warm object on a zero-chroma near-BLACK seamless" to
"warm documentary flat-lay on a dark warm surface" after the founder chose the Le
Labo deconstructed-flat-lay execution over the brass-vitrine idea. The old corner
rule demanded sat<=3% near-black corners; a dark walnut surface is warm-brown, so
that rule wrongly failed a correct plate. The principle is unchanged — dark ground,
one warm family, no cold cast — the thresholds now fit the flat-lay.)

Usage:
  python scripts/specimen-gate.py <image> [<image> ...]
  python scripts/specimen-gate.py path/to/candidates/      # a directory
  python scripts/specimen-gate.py --json <image>           # machine-readable

Exit code 0 if ALL pass, 1 if any fail (scriptable). Pillow only.
"""
import sys, os, json, colorsys, statistics

# ── gate thresholds (design-refs/assets.md §5, v2 flat-lay) ───────────────────
CORNER_FRAC     = 0.10   # corner block = 10% of the short edge
GROUND_VAL_MAX  = 0.42   # corners must be a DARK surface (value <= this)
GROUND_COLD_SAT = 0.06   # above this a corner counts as "coloured" ground…
GROUND_WARM_LO  = 10     # …and then its hue must be warm (else it's a cold cast)
GROUND_WARM_HI  = 60
CENTER_FRAC     = 0.60   # central crop side = 60% of the short edge
SAT_FLOOR       = 0.10   # a pixel counts as "coloured" above this saturation
WARM_LO, WARM_HI = 15, 50  # amber/kraft/brass/copper hue window (deg)
WARM_SHARE_MIN  = 0.80   # >=80% of coloured centre pixels must be warm
STEP            = 3      # pixel sampling stride (speed)


def _hsv(px):
    r, g, b = px[0] / 255, px[1] / 255, px[2] / 255
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h * 360, s, v


def _corner(px, x0, y0, s):
    sats, vals, hues = [], [], []
    for x in range(x0, x0 + s, STEP):
        for y in range(y0, y0 + s, STEP):
            h, sat, v = _hsv(px[x, y])
            sats.append(sat); vals.append(v)
            if sat > GROUND_COLD_SAT:
                hues.append(h)
    mean_sat = sum(sats) / len(sats)
    mean_val = sum(vals) / len(vals)
    med_hue = statistics.median(hues) if hues else None
    is_dark = mean_val <= GROUND_VAL_MAX
    is_cold = (mean_sat > GROUND_COLD_SAT and med_hue is not None
               and not (GROUND_WARM_LO <= med_hue <= GROUND_WARM_HI))
    return {"sat": mean_sat, "val": mean_val, "hue": med_hue,
            "dark": is_dark, "cold": is_cold}


def evaluate(path):
    from PIL import Image
    im = Image.open(path).convert("RGB")
    W, H = im.size
    px = im.load()
    short = min(W, H)
    cs = max(24, int(short * CORNER_FRAC))

    corners = {
        "TL": _corner(px, 0, 0, cs),
        "TR": _corner(px, W - cs, 0, cs),
        "BL": _corner(px, 0, H - cs, cs),
        "BR": _corner(px, W - cs, H - cs, cs),
    }
    ground_ok = all(c["dark"] and not c["cold"] for c in corners.values())

    cc = int(short * CENTER_FRAC)
    cx0, cy0 = (W - cc) // 2, (H - cc) // 2
    warm = colored = 0
    hues, allsat = [], []
    for x in range(cx0, cx0 + cc, STEP):
        for y in range(cy0, cy0 + cc, STEP):
            h, s, _ = _hsv(px[x, y])
            allsat.append(s)
            if s > SAT_FLOOR:
                colored += 1
                hues.append(h)
                if WARM_LO <= h <= WARM_HI:
                    warm += 1
    warm_share = (warm / colored) if colored else 0.0
    mean_sat = (sum(allsat) / len(allsat)) if allsat else 0.0
    med_hue = statistics.median(hues) if hues else None
    warm_ok = warm_share >= WARM_SHARE_MIN
    passed = ground_ok and warm_ok

    return {
        "file": os.path.basename(path),
        "pass": passed,
        "ground_ok": ground_ok,
        "warm_ok": warm_ok,
        "warm_share": round(warm_share, 3),
        "median_hue": None if med_hue is None else round(med_hue),
        "mean_sat": round(mean_sat, 3),
        "corners": {k: {"val": round(v["val"] * 255), "sat": round(v["sat"], 3),
                        "dark": v["dark"], "cold": v["cold"]}
                    for k, v in corners.items()},
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
            reasons = []
            if not r["ground_ok"]:
                bad = [k for k, c in r["corners"].items() if not c["dark"] or c["cold"]]
                why = []
                if any(not r["corners"][k]["dark"] for k in bad):
                    why.append("ground not dark")
                if any(r["corners"][k]["cold"] for k in bad):
                    why.append("cold cast in ground")
                reasons.append("/".join(why) + f" ({','.join(bad)})")
            if not r["warm_ok"]:
                reasons.append(f"warm-share {r['warm_share']:.0%} < {WARM_SHARE_MIN:.0%}")
            detail = ("  — " + "; ".join(reasons)) if reasons else ""
            print(f"[{tag}] {r['file']}  "
                  f"warm-share={r['warm_share']:.0%} hue={r['median_hue']}° "
                  f"sat={r['mean_sat']:.0%}{detail}")
    return 0 if all(r["pass"] for r in results) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
