"""Align Parakeet word timings (asr.json) to the canonical lyric sheet (lyrics.txt) -> assets/lines.json.

asr.json: list of VAD segments {start, end, text, tokens, ts} with token timestamps relative to the segment.
Run: python align.py <asr.json>
"""
import json, re, sys, difflib, pathlib

ROOT = pathlib.Path(__file__).parent
asr = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))

# 1. ASR words with absolute times (a token starting with a space opens a new word)
heard = []
for seg in asr:
    toks, ts = seg["tokens"] or [], seg["ts"] or []
    for k, (tok, t) in enumerate(zip(toks, ts)):
        t = round(seg["start"] + t, 3)
        if k == 0 or tok.startswith(" ") or tok.startswith("▁"):
            heard.append({"w": tok.strip(" ▁"), "t": t, "end": t + 0.08})
        else:
            heard[-1]["w"] += tok
            heard[-1]["end"] = t + 0.08


def norm(w):
    w = w.lower().replace("’", "'")
    w = re.sub(r"[^a-z0-9']", "", w)
    return {"si": "si", "ai": "ai", "ess": "s", "eye": "i"}.get(w, w)


# 2. canonical words, one entry per screen line (ad-lib in [] kept as its own word run)
lines, section = [], None
for raw in (ROOT / "lyrics.txt").read_text(encoding="utf-8").splitlines():
    if raw.startswith("## "):
        section = raw[3:].strip(); continue
    if not raw.strip() or raw.startswith("#"):
        continue
    spk, text = raw.split("|", 1)
    pin = re.search(r"\s+@([\d.,]+)\s*$", text)
    if pin:
        text = text[:pin.start()]
    m = re.match(r"(.*?)\s*\[(.*)\]\s*$", text)
    main, ad = (m.group(1), m.group(2)) if m else (text, None)
    lines.append({"section": section, "speaker": spk, "text": main, "ad": ad,
                  "pin": [float(x) for x in pin.group(1).split(",")] if pin else None,
                  "words": [{"w": w} for w in main.split()], "adwords": [{"w": w} for w in (ad or "").split()]})

canon = []  # (line index, which list, word index, normalized)
for i, L in enumerate(lines):
    for k, w in enumerate(L["words"]):
        for piece in re.split(r"[.\-]", w["w"]) if re.fullmatch(r"([A-Za-z]\.)+[!,.]*", w["w"]) else [w["w"]]:
            n = norm(piece)
            if n:
                canon.append((i, "words", k, n))
    for k, w in enumerate(L["adwords"]):
        n = norm(w["w"])
        if n:
            canon.append((i, "adwords", k, n))

# 3. sequence-match normalized streams
A = [c[3] for c in canon]
B = [norm(h["w"]) for h in heard]
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
times = [None] * len(canon)
for a, b, n in sm.get_matching_blocks():
    for j in range(n):
        times[a + j] = (heard[b + j]["t"], heard[b + j]["end"])
matched = sum(1 for t in times if t)

# 4. interpolate unmatched words between matched neighbours
known = [i for i, t in enumerate(times) if t]
for i in range(len(times)):
    if times[i]:
        continue
    prev = max((k for k in known if k < i), default=None)
    nxt = min((k for k in known if k > i), default=None)
    if prev is None:
        t = times[nxt][0] - 0.3 * (nxt - i)
    elif nxt is None:
        t = times[prev][1] + 0.3 * (i - prev)
    else:
        f = (i - prev) / (nxt - prev)
        t = times[prev][1] + f * (times[nxt][0] - times[prev][1])
    times[i] = (round(t, 3), round(t + 0.2, 3))

for (li, lst, k, _), t in zip(canon, times):
    w = lines[li][lst][k]
    if "t" not in w:  # first piece of a split word ("S.I.") wins the start
        w["t"] = t[0]
    w["end"] = t[1]

# 4b. pinned lines: re-spread words from the pin, ending before the next line starts
for i, L in enumerate(lines):
    if L["pin"] is None:
        continue
    nxt = next((M["pin"][0] for M in lines[i + 1:] if M["pin"] is not None), None)
    p0 = L["pin"][0]
    span = min(0.3 * len(L["words"]), (nxt - p0 - 0.1) if nxt else 9)
    for k, w in enumerate(L["words"]):
        w["t"] = L["pin"][k] if k < len(L["pin"]) else p0 + span * k / max(1, len(L["words"]))
        w["end"] = w["t"] + 0.25

# 5. line spans; fill any word that had no letters (e.g. "...") from its neighbour
out = []
for i, L in enumerate(lines):
    ws = [w for w in L["words"] + L["adwords"] if "t" in w]
    for lst in ("words", "adwords"):
        for k, w in enumerate(L[lst]):
            if "t" not in w:
                w["t"] = w["end"] = ws[0]["t"] if ws else 0
    start = min(w["t"] for w in L["words"])
    end = max(w["end"] for w in L["words"] + L["adwords"])
    out.append({"i": i, "section": L["section"], "speaker": L["speaker"], "text": L["text"], "ad": L["ad"],
                "start": round(start, 3), "end": round(end, 3),
                "words": [{"w": w["w"], "t": round(w["t"], 3)} for w in L["words"]],
                "adwords": [{"w": w["w"], "t": round(w["t"], 3)} for w in L["adwords"]]})

(ROOT / "assets" / "lines.json").write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
(ROOT / "assets" / "transcript.json").write_text(json.dumps([{"text": h["w"], "start": h["t"], "end": round(h["end"], 3)} for h in heard], indent=1), encoding="utf-8")
print(f"{matched}/{len(canon)} canonical words matched to {len(heard)} heard words")
for L in out:
    print(f"{L['start']:7.2f}-{L['end']:7.2f} {L['section']:<9} {L['speaker']:<5} {L['text']}" + (f"  [{L['ad']}]" if L["ad"] else ""))
