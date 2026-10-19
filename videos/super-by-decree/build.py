"""Assemble scene sources in src/scenes/ into HyperFrames sub-compositions + index.html.

Each scene source has three parts separated by <!--css-->, <!--html-->, <!--js--> markers.
Tokens: @@ -> per-instance id prefix, {{KEY}} -> per-instance variable.
Scene boundaries come from assets/lines.json (first line of each lyric section, snapped back to a downbeat).
The lyric layer (src/scenes/lyrics.html) runs the full length on top of every scene.
Run: python build.py
"""
import json, pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "compositions"
AUDIO = json.loads((ROOT / "audiomap.json").read_text(encoding="utf-8"))
LINES = json.loads((ROOT / "assets" / "lines.json").read_text(encoding="utf-8"))
DI = json.loads((ROOT / "assets" / "cut" / "di.json").read_text(encoding="utf-8"))
BOXES = json.loads((ROOT / "assets" / "cut" / "boxes.json").read_text(encoding="utf-8"))
DURATION = round(AUDIO["audio"]["duration_sec"], 3)
DOWN = AUDIO["grid"]["downbeats_sec"]
BEAT = round(60 / AUDIO["tempo"]["bpm"], 4)

# visual scenes, in order: (composition id, source, lyric section that opens it, vars)
PLAN = [
    ("intro",     "intro",     None,        {}),
    ("verse1",    "verse1",    "verse1",    {}),
    ("pre1",      "pre1",      "pre1",      {}),
    ("chorus-a",  "chorus",    "chorus-a",  {"PLATE": "bg-bureau", "SEED": "11", "COSTUME": "crown", "TAG": "birthday"}),
    ("verse2",    "verse2",    "verse2",    {}),
    ("pre2",      "pre2",      "pre2",      {}),
    ("chorus-b",  "chorus",    "chorus-b",  {"PLATE": "bg-press", "SEED": "23", "COSTUME": "crown", "TAG": ""}),
    ("bridge",    "bridge",    "bridge",    {}),
    ("verse3",    "verse3",    "verse3",    {}),
    ("breakdown", "breakdown", "breakdown", {}),
    ("finale",    "chorus",    "finale",    {"PLATE": "bg-revival", "SEED": "47", "COSTUME": "plain", "TAG": "end"}),
]
# manual nudges (track seconds) if a computed boundary lands badly
OVERRIDE = {"pre1": 72.33, "chorus-a": 86.657, "verse2": 110.155, "chorus-b": 161.95}


def section_start(name):
    t = min(L["start"] for L in LINES if L["section"] == name)
    if name in OVERRIDE:
        return OVERRIDE[name]
    cands = [d for d in DOWN if d <= t - 0.12]
    return round(cands[-1] if cands else t, 3)


starts = [0.0] + [section_start(sec) for _, _, sec, _ in PLAN[1:]]
SCENES = []
for i, (cid, src, sec, vars_) in enumerate(PLAN):
    end = starts[i + 1] if i + 1 < len(PLAN) else DURATION
    SCENES.append((cid, src, starts[i], round(end - starts[i], 3), vars_))


def timing_tokens(start, dur):
    end = start + dur
    loc = lambda xs: [round(x - start, 3) for x in xs if start <= x < end]
    onsets = [e["t"] for e in AUDIO["events"] if e.get("energy", 0) >= 0.12]
    kicks = [e["t"] for e in AUDIO["events"] if e.get("drum") == "kick" and e.get("energy", 0) >= 0.3]
    lines = [{**L, "start": round(L["start"] - start, 3), "end": round(L["end"] - start, 3),
              "words": [{"w": w["w"], "t": round(w["t"] - start, 3)} for w in L["words"]],
              "adwords": [{"w": w["w"], "t": round(w["t"] - start, 3)} for w in L["adwords"]]}
             for L in LINES if start - 1 <= L["start"] < end]
    return {"BEATS": loc(AUDIO["grid"]["beats_sec"]), "DOWNBEATS": loc(DOWN), "ONSETS": loc(onsets), "KICKS": loc(kicks),
            "LINES": lines, "START": str(start), "BEAT": str(BEAT), "DI": DI, "BOXES": BOXES}


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


def write_comp(cid, src, start, dur, vars_):
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
          window.__timelines = window.__timelines || {{}};
          window.__timelines["{cid}"] = tl;
        }})();
      </script>
    </template>
  </body>
</html>
"""
    (OUT / f"{cid}.html").write_text(doc, encoding="utf-8")


OUT.mkdir(exist_ok=True)
built = [s for s in SCENES if (SRC / "scenes" / f"{s[1]}.html").exists()]
for s in built:
    write_comp(*s)
has_lyrics = (SRC / "scenes" / "lyrics.html").exists()
if has_lyrics:
    write_comp("lyrics", "lyrics", 0.0, DURATION, {})

mounts = "\n".join(
    f'      <div id="slot-{cid}" data-composition-id="{cid}" data-composition-src="compositions/{cid}.html" '
    f'data-start="{start}" data-duration="{dur}" data-track-index="{i % 2}" data-width="1920" data-height="1080"></div>'
    for i, (cid, src, start, dur, vars_) in enumerate(built))
if has_lyrics:
    mounts += (f'\n      <div id="slot-lyrics" data-composition-id="lyrics" data-composition-src="compositions/lyrics.html" '
               f'data-start="0" data-duration="{DURATION}" data-track-index="4" data-width="1920" data-height="1080"></div>')

index = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Super By Decree</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ width: 1920px; height: 1080px; overflow: hidden; background: #0b0705; }}
      #main-root {{ position: relative; width: 100%; height: 100%; overflow: hidden; }}
      #grain {{ position: absolute; inset: -20px; opacity: 0.08; mix-blend-mode: multiply; pointer-events: none;
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
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""
(ROOT / "index.html").write_text(index, encoding="utf-8")
print("built", len(built), "scenes" + (" + lyrics" if has_lyrics else ""))
for cid, src, start, dur, _ in SCENES:
    print(f"  {cid:<10} {start:8.3f}  +{dur:7.3f}")
