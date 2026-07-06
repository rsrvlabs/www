#!/usr/bin/env python3
"""
specimen-gate.py — deterministic acceptance gate for night-apothecary specimen
plates (design-refs/assets.md §5). Run EVERY candidate through this before it
goes near the site; reject anything that fails before the founder even sees it.

The night-apothecary family = ONE warm-material artifact specimen on a cold,
zero-chroma near-black seamless. The gate enforces the two things that make the
family read as one system and keeps the founder's hue-inheritance lesson honest:

  1. GROUND is hue-free near-black — the subject's warmth must NOT bleed into it.
     → 4 corner blocks: mean saturation <= 3%, value within #050505–#1f1f1f.
  2. WARMTH is one amber/kraft/brass family — no stray cold casts.
     → center crop: >=80% of saturated pixels fall in hue 20–45°;
       and the subject stays muted (mean saturation of the plate <= ~18%).

Usage:
  python scripts/specimen-gate.py <image> [<image> ...]
  python scripts/specimen-gate.py path/to/candidates/      # a directory
  python scripts/specimen-gate.py --json <image>           # machine-readable

Exit code 0 if ALL pass, 1 if any fail (scriptable). Pure stdlib + Pillow.
No deps beyond Pillow (pip install pillow).
"""
import sys, os, json, colorsys

# ── gate thresholds (design-refs/assets.md §5 ACCEPTANCE GATE) ────────────────
CORNER_FRAC      = 0.10   # corner block = 10% of the short edge
CORNER_MAX_SAT   = 0.03   # mean corner saturation ceiling
CORNER_VAL_MIN   = 5/255  # #050505
CORNER_VAL_MAX   = 0x1f/255  # #1f1f1f
CENTER_FRAC      = 0.42   # central crop side = 42% of the short edge
SAT_FLOOR        = 0.08   # a pixel counts as "colored" above this saturation
WARM_LO, WARM_HI = 20, 45 # amber/kraft/brass hue window (deg)
WARM_SHARE_MIN   = 0.80   # >=80% of colored center pixels must be warm
PLATE_MEAN_SAT_MAX = 0.18 # subject stays muted (soft ceiling; warn if over)
STEP             = 3      # pixel sampling stride (speed)


def _hsv(px):
    r, g, b = px[0] / 255, px[1] / 255, px[2] / 255
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h * 360, s, v


def _corner(px, x0, y0, s):
    sats, vmin, vmax = [], 1.0, 0.0
    for x in range(x0, x0 + s, STEP):
        for y in range(y0, y0 + s, STEP):
            _, sat, v = _hsv(px[x, y])
            sats.append(sat); vmin = min(vmin, v); vmax = max(vmax, v)
    return sum(sats) / len(sats), vmin, vmax


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
    corner_ok = all(
        c[0] <= CORNER_MAX_SAT and c[1] >= CORNER_VAL_MIN and c[2] <= CORNER_VAL_MAX
        for c in corners.values()
    )

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
    med_hue = sorted(hues)[len(hues) // 2] if hues else None

    warm_ok = warm_share >= WARM_SHARE_MIN
    passed = corner_ok and warm_ok  # mean_sat is a WARN, not a hard fail

    return {
        "file": os.path.basename(path),
        "pass": passed,
        "corner_ok": corner_ok,
        "warm_ok": warm_ok,
        "warm_share": round(warm_share, 3),
        "median_hue": None if med_hue is None else round(med_hue),
        "mean_sat": round(mean_sat, 3),
        "mean_sat_warn": mean_sat > PLATE_MEAN_SAT_MAX,
        "corners": {k: (round(v[0], 3), round(v[1] * 255), round(v[2] * 255))
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
            warn = "  ⚠ sat>{:.0%}".format(PLATE_MEAN_SAT_MAX) if r["mean_sat_warn"] else ""
            reasons = []
            if not r["corner_ok"]:
                reasons.append("ground not zero-chroma near-black")
            if not r["warm_ok"]:
                reasons.append(f"warm-share {r['warm_share']:.0%} < {WARM_SHARE_MIN:.0%}")
            detail = ("  — " + "; ".join(reasons)) if reasons else ""
            print(f"[{tag}] {r['file']}  "
                  f"warm-share={r['warm_share']:.0%} hue={r['median_hue']}° "
                  f"sat={r['mean_sat']:.0%}{warn}{detail}")
    return 0 if all(r["pass"] for r in results) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
