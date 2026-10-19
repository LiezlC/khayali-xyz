"""Normalize the three D.I. cutouts (assets/cut/raw/di-*.png) so their CRT glass coincides, on a 1672x1100 canvas.
Writes assets/cut/di-*.png and assets/cut/di.json {box, screen} in plate px. Run: python tools-normalize-di.py"""
import json, pathlib
import numpy as np
from PIL import Image
from scipy import ndimage
ROOT = pathlib.Path(__file__).parent / "assets" / "cut"

def screen_box(a):
    r, g, b, al = [a[..., i].astype(int) for i in range(4)]
    m = (al > 200) & (g > r + 6) & (g >= b) & (r + g + b < 330)
    m = ndimage.binary_opening(m, iterations=2)
    lab, n = ndimage.label(m)
    sizes = ndimage.sum(m, lab, range(1, n + 1))
    k = int(np.argmax(sizes)) + 1
    ys, xs = np.where(lab == k)
    # trim outliers: use 1st/99th percentiles
    return [np.percentile(xs, 0.5), np.percentile(ys, 0.5), np.percentile(xs, 99.5), np.percentile(ys, 99.5)]

src = {v: np.array(Image.open(ROOT / "raw" / f"di-{v}.png").convert("RGBA")) for v in ("plain", "hat", "crown")}
boxes = {v: screen_box(a) for v, a in src.items()}
for v, b in boxes.items(): print(v, [round(x) for x in b], "w/h", round(b[2]-b[0]), round(b[3]-b[1]))
# target: screen centred at x=836, glass top at y=300, width 380 (so a hat/crown fits above and the case below)
TW, TCX, TTOP = 380.0, 836.0, 300.0
CW, CH = 1672, 1100
alpha_all = np.zeros((CH, CW), bool)
for v, a in src.items():
    b = boxes[v]; s = TW / (b[2] - b[0])
    im = Image.fromarray(a).resize((round(a.shape[1] * s), round(a.shape[0] * s)), Image.LANCZOS)
    ox = round(TCX - (b[0] + b[2]) / 2 * s); oy = round(TTOP - b[1] * s)
    can = Image.new("RGBA", (CW, CH), (0, 0, 0, 0)); can.alpha_composite(im, (ox, oy)) if ox >= 0 and oy >= 0 else can.paste(im, (ox, oy), im)
    can.save(ROOT / f"di-{v}.png", optimize=True)
    al = np.array(can)[..., 3] > 20; alpha_all |= al
    print(v, "scale", round(s, 3), "offset", ox, oy)
# shared box = plain cutout's alpha box (the body); screen = mean normalized glass
pl = np.array(Image.open(ROOT / "di-plain.png"))[..., 3] > 20
ys, xs = np.where(pl)
nb = [screen_box(np.array(Image.open(ROOT / f"di-{v}.png"))) for v in src]
scr = [float(np.mean([b[i] for b in nb])) for i in range(4)]
json.dump({"box": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())], "screen": [round(x, 1) for x in scr], "size": [CW, CH]}, open(ROOT / "di.json", "w"))
print(json.load(open(ROOT / "di.json")))
