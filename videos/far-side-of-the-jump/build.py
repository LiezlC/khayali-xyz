"""Assemble scene sources in src/scenes/ into HyperFrames sub-compositions + index.html.

Each scene source has three parts separated by <!--css-->, <!--html-->, <!--js--> markers.
Tokens: @@ -> per-instance id prefix, {{KEY}} -> per-instance variable.
Run: python build.py
"""
import json, pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "compositions"
DURATION = 275.544

LABELS_A = [["FLOOD", "warned early"], ["PHOTO", "read aloud"], ["STORY", "kept"], ["SEA", "made visible"],
            ["FOREST", "listening"], ["PROTEIN", "opened up"], ["PLASTIC", "eaten"]]
LABELS_B = [["LANGUAGE", "speakers"], ["LESSON", "a start"], ["NEW WORKER", "assist"], ["RIVER", "forecast"],
            ["VOICE", "to text"], ["SEA", "watched"], ["ENZYME", "new route"]]
LABELS_C = [["FLOOD", "warned in time"], ["PHOTO", "described aloud"], ["STORY", "kept"], ["SEA", "visible"],
            ["FOREST", "listening"], ["LANGUAGE", "speakers"], ["YOU", "what next?"]]

# (composition id, source, start, duration, vars)
SCENES = [
    ("intro",    "intro",   0.0,    30.47, {}),
    ("verse1",   "verse1",  30.47,  23.03, {}),
    ("count-a",  "count",   53.5,   3.62,  {"SHIFT": "0"}),
    ("chorus-a", "chorus",  57.12,  20.41, {"LABELS": LABELS_A, "TAIL": "bloom", "SEED": "42", "FILTER": "none", "TAILTEXT": ""}),
    ("break1",   "break1",  77.53,  27.47, {}),
    ("verse2",   "verse2",  105.0,  15.5,  {}),
    ("count-b",  "count",   120.5,  3.62,  {"SHIFT": "1"}),
    ("chorus-b", "chorus",  124.12, 20.41, {"LABELS": LABELS_B, "TAIL": "bloom", "SEED": "7", "FILTER": "saturate(1.08)", "TAILTEXT": ""}),
    ("break2",   "break2",  144.53, 24.17, {}),
    ("bridge",   "bridge",  168.7,  22.5,  {}),
    ("build",    "build",   191.2,  6.22,  {}),
    ("chorus-c", "chorus",  197.42, 20.41, {"LABELS": LABELS_C, "TAIL": "bloom", "SEED": "99", "FILTER": "saturate(1.18) brightness(1.04)", "TAILTEXT": "Look where you wanna land… <i>HUP!</i>"}),
    ("finale",   "finale",  217.83, round(DURATION - 217.83, 3), {}),
]

AUDIO = json.loads((ROOT / "audiomap.json").read_text(encoding="utf-8"))


def timing_tokens(start, dur):
    end = start + dur
    loc = lambda xs: [round(x - start, 3) for x in xs if start <= x < end]
    onsets = [e["t"] for e in AUDIO["events"] if e.get("energy", 0) >= 0.12]
    return {"BEATS": loc(AUDIO["grid"]["beats_sec"]), "DOWNBEATS": loc(AUDIO["grid"]["downbeats_sec"]), "ONSETS": loc(onsets),
            "START": str(start)}


lib = (SRC / "lib.js").read_text(encoding="utf-8")
shared = (SRC / "shared.css").read_text(encoding="utf-8")


def parts(text):
    css = text.split("<!--css-->")[1].split("<!--html-->")[0]
    html = text.split("<!--html-->")[1].split("<!--js-->")[0]
    js = text.split("<!--js-->")[1]
    return css, html, js


def fill(s, cid, vars_):
    s = s.replace("@@", cid + "-")
    for k, v in vars_.items():
        s = s.replace("{{" + k + "}}", v if isinstance(v, str) else json.dumps(v, ensure_ascii=False))
    return s


SCENES = [x for x in SCENES if (SRC / "scenes" / f"{x[1]}.html").exists()]
OUT.mkdir(exist_ok=True)
for cid, src, start, dur, vars_ in SCENES:
    css, html, js = parts((SRC / "scenes" / f"{src}.html").read_text(encoding="utf-8"))
    allv = {**timing_tokens(start, dur), **vars_}
    css, html, js = (fill(x, cid, allv) for x in (css, html, js))
    doc = f"""<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>{cid}</title></head>
  <body>
    <template>
      <style>
{shared}
{css}
      </style>
      <div id="root" data-composition-id="{cid}" data-width="1920" data-height="1080" data-duration="{dur}">
{html}
      </div>
      <script>
        (function () {{
{lib}
          const tl = gsap.timeline({{ paused: true }});
          const D = {dur};
{js}
          window.__timelines["{cid}"] = tl;
        }})();
      </script>
    </template>
  </body>
</html>
"""
    (OUT / f"{cid}.html").write_text(doc, encoding="utf-8")

mounts = "\n".join(
    f'      <div id="slot-{cid}" data-composition-id="{cid}" data-composition-src="compositions/{cid}.html" '
    f'data-start="{start}" data-duration="{dur}" data-track-index="{i % 2}" data-width="1920" data-height="1080"></div>'
    for i, (cid, src, start, dur, vars_) in enumerate(SCENES))

index = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Far Side of the Jump</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ width: 1920px; height: 1080px; overflow: hidden; background: #fcfbf8; }}
      #main-root {{ position: relative; width: 100%; height: 100%; overflow: hidden; }}
      #grain {{ position: absolute; inset: -20px; opacity: 0.10; mix-blend-mode: multiply; pointer-events: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }}
    </style>
  </head>
  <body>
    <div id="main-root" data-composition-id="main" data-start="0" data-duration="{DURATION}" data-width="1920" data-height="1080">
      <audio id="bgm" src="assets/bgm.mp3" data-start="0" data-duration="{DURATION}" data-track-index="11" data-volume="1"></audio>
{mounts}
      <div id="grain" class="clip" data-start="0" data-duration="{DURATION}" data-track-index="5"></div>
    </div>
    <script>
      const tl = gsap.timeline({{ paused: true }});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""
(ROOT / "index.html").write_text(index, encoding="utf-8")
print("built", len(SCENES), "scenes")
