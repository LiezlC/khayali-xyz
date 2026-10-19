// Shared helpers, inlined into every scene by build.py. Deterministic only.
function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const SVGNS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; }
function div(cls, parent, html, style) { const n = document.createElement("div"); if (cls) n.className = cls; if (html != null) n.innerHTML = html; if (style) n.style.cssText = style; if (parent) parent.appendChild(n); return n; }
function $id(id) { return document.getElementById(id); }
function within(xs, a, b) { return xs.filter(t => t >= a && t < b); }

// Lyric clock: Q("Checked my RAM") -> local start of that line; Q("RAM", "code") -> time of the word "code" in it; Q(frag, "end") -> line end.
function lyricClock(LINES) {
  return function (frag, word) {
    const L = LINES.find(L => L.start >= -0.3 && L.text.includes(frag)) || LINES.find(L => L.text.includes(frag));
    if (!L) throw new Error("no lyric line: " + frag);
    if (word == null) return L.start;
    if (word === "end") return L.end;
    if (typeof word === "number") return L.words[Math.min(word, L.words.length - 1)].t;
    const w = L.words.find(w => w.w.toLowerCase().replace(/[^a-z0-9']/g, "").startsWith(word.toLowerCase())) || L.adwords.find(w => w.w.toLowerCase().includes(word.toLowerCase()));
    if (!w) throw new Error("no word " + word + " in " + frag);
    return w.t;
  };
}

// Plates are 1672x941, shown full-bleed at 1920x1080.
const IMG_K = 1920 / 1672;
// Cutout in a .pin (transform-origin 0 0): put its alpha box at screen (x, y) with height h.
function place(box, x, y, h) { const s = h / ((box[3] - box[1]) * IMG_K); return { x: x - box[0] * IMG_K * s, y: y - box[1] * IMG_K * s, scale: s }; }
// Camera centred on plate point (px, py) at scale S, clamped to the frame.
function cam(S, px, py) { const bx = (S - 1) * 960, by = (S - 1) * 540;
  return { scale: S, x: Math.max(-bx, Math.min(bx, (960 - px) * S)), y: Math.max(-by, Math.min(by, (540 - py) * S)) }; }

// full-frame flash that fades out; immediateRender off so a later-defined flash never paints over earlier frames
function flash(tl, sel, at, peak, dur, ease) { tl.fromTo(sel, { opacity: peak }, { opacity: 0, duration: dur || 0.4, ease: ease || "power2.out", immediateRender: false }, at); }
function flashIn(tl, sel, at, dur) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: dur || 0.25, ease: "power2.in", immediateRender: false }, at); }
function stamp(tl, sel, at, rot) {
  tl.fromTo(sel, { scale: 2.6, opacity: 0, rotation: (rot || -8) * 2.5 }, { scale: 1, opacity: 1, rotation: rot || -8, duration: 0.14, ease: "power4.in" }, at);
}
function pop(tl, sel, at, from) { tl.fromTo(sel, from || { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.24, ease: "back.out(2.6)" }, at); }
function out(tl, sel, at, d) { tl.to(sel, { opacity: 0, duration: d || 0.2, ease: "power1.in" }, at); }
function shake(tl, sel, at, amt, n) { tl.fromTo(sel, { x: 0 }, { x: amt || 10, duration: 0.035, yoyo: true, repeat: (n || 8) * 2 - 1, ease: "none" }, at); tl.set(sel, { x: 0 }, at + 0.07 * (n || 8)); }
// camera kick on beats: quick scale punch that settles
function kicks(tl, sel, times, amt) { times.forEach(t => tl.fromTo(sel, { scale: 1 + (amt || 0.03) }, { scale: 1, duration: 0.3, ease: "power2.out" }, t)); }

// ---------- D.I. rig ----------
// DI = {box:[x0,y0,x1,y1] alpha box in plate px, screen:[x0,y0,x1,y1] CRT glass in plate px}; all three cutouts share it.
const FACES = {
  neutral: ["................", "................", "....##....##....", "....##....##....", "....##....##....", "................", "................", "......####......", "................", "................"],
  happy:   ["................", "................", "....##....##....", "....##....##....", "....##....##....", "................", ".....#....#.....", "......####......", "................", "................"],
  smug:    ["................", "................", "................", "...###....###...", "................", "................", "........#.......", ".....####.......", "................", "................"],
  flat:    ["................", "................", "................", "...###....###...", "................", "................", "................", ".....######.....", "................", "................"],
  wide:    ["................", "...###....###...", "...#.#....#.#...", "...###....###...", "................", "................", "......####......", "......#..#......", "......####......", "................"],
  sad:     ["................", "................", "....##....##....", "....##....##....", "................", "................", "......####......", ".....#....#.....", "................", "................"],
  x:       ["................", "...#.#....#.#...", "....#......#....", "...#.#....#.#...", "................", "................", ".....######.....", "................", "................", "................"],
  wink:    ["................", "................", "....##..........", "....##....###...", "....##..........", "................", ".....#....#.....", "......####......", "................", "................"],
  star:    ["................", "....#......#....", "...###....###...", "....#......#....", "................", "................", ".....#....#.....", "......####......", "................", "................"],
};
// makeDI(host, id, DI, which) -> rig. which: subset of ["plain","hat","crown"].
function makeDI(host, id, DI, which) {
  which = which || ["plain", "hat", "crown"];
  const pin = div("pin", host); pin.id = id;
  const inner = div(null, pin, null, "position:absolute;inset:0");
  const W = DI.size[0] * IMG_K, H = DI.size[1] * IMG_K, ORG = `${(DI.box[0] + DI.box[2]) / 2 * IMG_K}px ${DI.box[3] * IMG_K}px`;
  const imgs = {};
  which.forEach(v => { const im = document.createElement("img"); im.src = `assets/cut/di-${v}.png`; im.alt = "";
    im.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;opacity:${v === which[0] ? 1 : 0}`; inner.appendChild(im); imgs[v] = im; });
  const s = DI.screen, scr = div("screen", inner, null,
    `left:${s[0] * IMG_K}px;top:${s[1] * IMG_K}px;width:${(s[2] - s[0]) * IMG_K}px;height:${(s[3] - s[1]) * IMG_K}px`);
  const svg = el("svg", { viewBox: "0 0 160 100", preserveAspectRatio: "xMidYMid meet" }, scr);
  const faces = {};
  for (const k in FACES) {
    const g = el("g", { class: "face", fill: "#7dffa8", style: "filter: drop-shadow(0 0 2px #50ff96)" }, svg);
    FACES[k].forEach((row, r) => [...row].forEach((c, cI) => { if (c === "#") el("rect", { x: cI * 10 + 1, y: r * 10 + 1, width: 8.6, height: 8.6 }, g); }));
    faces[k] = g;
  }
  const txt = div("txt", scr);
  div("scan", scr);
  // brass nameplate on the bezel under the glass: the official name (A.I. -> S.I. -> A.I.)
  const np = div("nameplate", inner, null, `left:${731 * IMG_K}px;top:${616 * IMG_K}px;width:${210 * IMG_K}px;height:${58 * IMG_K}px`);
  const names = {};
  ["A.I.", "S.I."].forEach(n => { names[n] = div("np-face", np, n, `font-size:${40 * IMG_K}px;opacity:${n === "A.I." ? 1 : 0}`); });
  const H0 = (s[3] - s[1]) * IMG_K;
  let cur = null;
  const rig = {
    pin, inner, imgs, scr, faces, txt, np, names,
    // flip the nameplate to n ("A.I." | "S.I."); instant=true just sets it
    rename(tl, n, t, instant) { if (instant) { for (const k in names) tl.set(names[k], { opacity: k === n ? 1 : 0 }, t); return rig; }
      tl.to(np, { rotationX: 90, duration: 0.12, ease: "power2.in" }, t);
      for (const k in names) tl.set(names[k], { opacity: k === n ? 1 : 0 }, t + 0.12);
      tl.to(np, { rotationX: 0, duration: 0.22, ease: "back.out(3)" }, t + 0.12); return rig; },
    at(tl, x, y, h, t) { tl.set(pin, place(DI.box, x, y, h), t || 0); return rig; },
    // centre-x and base line (bottom of the case) in screen px; returns the placement for tweening
    base(cx, by, h) { const b = DI.box, w = (b[2] - b[0]) / (b[3] - b[1]) * h; return place(b, cx - w / 2, by - h, h); },
    // swap costume
    wear(tl, v, t) { which.forEach(k => tl.set(imgs[k], { opacity: k === v ? 1 : 0 }, t)); return rig; },
    face(tl, k, t) { for (const f in faces) tl.set(faces[f], { opacity: f === k ? 1 : 0 }, t); tl.set(txt, { opacity: 0 }, t); cur = k; return rig; },
    blank(tl, t) { for (const f in faces) tl.set(faces[f], { opacity: 0 }, t); tl.set(txt, { opacity: 0 }, t); return rig; },
    // blink: eyes off for a frame
    // squash-hop (e.g. on a stomp)
    hop(tl, t, amt) { tl.fromTo(inner, { y: 0, scaleY: 1, transformOrigin: ORG }, { y: -(amt || 40), scaleY: 1.04, duration: 0.12, ease: "power2.out" }, t);
      tl.to(inner, { y: 0, scaleY: 1, duration: 0.18, ease: "bounce.out" }, t + 0.12); return rig; },
    blink(tl, t) { if (cur) { tl.set(faces[cur], { opacity: 0 }, t); tl.set(faces[cur], { opacity: 1 }, t + 0.09); } return rig; },
    bob(tl, a, b, beat) { // head-bob on the beat
      for (let t = a, k = 0; t < b - 0.01; t += beat, k++) tl.fromTo(inner, { rotation: k % 2 ? 2 : -2, transformOrigin: ORG }, { rotation: k % 2 ? -2 : 2, duration: beat, ease: "sine.inOut" }, t);
      tl.set(inner, { rotation: 0 }, b);
      return rig; },
  };
  return rig;
}
// Text-on-screen with seek safety: one pre-built span per message, toggled by opacity.
function screenMsgs(tl, rig, msgs) { // msgs: [[html, tIn, tOut, size]]
  // appends: a rig can take several screenMsgs calls
  const H0 = parseFloat(rig.scr.style.height);
  msgs.forEach(([html, a, b, size]) => {
    const m = div(null, rig.txt, html, `position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;font-size:${(size || 0.16) * H0}px;opacity:0`);
    for (const f in rig.faces) tl.set(rig.faces[f], { opacity: 0 }, a);
    rig.txt.querySelectorAll(":scope > div").forEach(o => o !== m && tl.set(o, { opacity: 0 }, a));
    tl.set(rig.txt, { opacity: 1 }, a);
    tl.set(m, { opacity: 1 }, a);
    if (b != null) tl.set(m, { opacity: 0 }, b);
  });
}

// ---------- props ----------
// optional lyric lookup: returns null instead of throwing (chorus source is shared by different lyric variants)
function softClock(Q) { return (a, b) => { try { return Q(a, b); } catch (e) { return null; } }; }
function plaque(host, text, x, y, w, h, fs, style) { return div("plaque", host, text, `left:${x}px;top:${y}px;width:${w}px;height:${h}px;font-size:${fs}px;opacity:0;${style || ""}`); }
function stampMark(host, text, x, y, fs, style) { return div("stampmark", host, text, `left:${x}px;top:${y}px;font-size:${fs}px;${style || ""}`); }
function burstText(host, text, x, y, fs, color) { return div("burst", host, text, `left:${x}px;top:${y}px;font-size:${fs}px;${color ? "color:" + color + ";" : ""}`); }
function paperCard(host, html, x, y, w, h, style) { return div("card", host, html, `left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:0;${style || ""}`); }
// gold confetti stars: deterministic, burst from (cx, cy)
function confetti(host, n, seed, cx, cy) {
  const R = rng(seed), out = [];
  const cols = ["#f2c14e", "#ffe08a", "#c8312b", "#2bb3a3", "#fff3dc"];
  for (let i = 0; i < n; i++) {
    const d = div("conf", host, null, `background:${cols[i % cols.length]};width:${12 + R() * 16}px;height:${8 + R() * 10}px`);
    const a = R() * Math.PI * 2, sp = 300 + R() * 700;
    d.setAttribute("data-layout-allow-overflow", "");
    out.push({ d, x: cx, y: cy, dx: Math.cos(a) * sp, dy: Math.sin(a) * sp * 0.7 - 250, r: R() * 900 - 450 });
  }
  return out;
}
function blowConfetti(tl, C, at, dur) {
  dur = dur || 1.6;
  C.forEach(o => {
    tl.fromTo(o.d, { x: o.x, y: o.y, rotation: 0, opacity: 1, scale: 0.4 }, { x: o.x + o.dx, y: o.y + o.dy, rotation: o.r, scale: 1, duration: dur * 0.45, ease: "power3.out", immediateRender: false }, at);
    tl.to(o.d, { y: o.y + o.dy + 520, rotation: o.r * 1.6, duration: dur * 0.55, ease: "power1.in" }, at + dur * 0.45);
    tl.to(o.d, { opacity: 0, duration: 0.25 }, at + dur - 0.25);
  });
}
// sunburst rays behind something; rotate it with a tween
function rays(host, cx, cy, r, n, color) {
  const svg = el("svg", { viewBox: `${-r} ${-r} ${2 * r} ${2 * r}`, style: `position:absolute;left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;opacity:0` }, host);
  const g = el("g", {}, svg);
  for (let i = 0; i < (n || 18); i++) { const a0 = i / (n || 18) * Math.PI * 2, a1 = a0 + Math.PI / (n || 18);
    el("path", { d: `M0 0 L${Math.cos(a0) * r} ${Math.sin(a0) * r} L${Math.cos(a1) * r} ${Math.sin(a1) * r} Z`, fill: color || "#ffe08a", opacity: 0.55 }, g); }
  return svg;
}
// cutout in a .pin (plate-sized canvas, transform-origin 0 0)
function cutout(host, src, id, size) {
  const p = div("pin", host); p.id = id;
  const im = document.createElement("img"); im.src = src; im.alt = "";
  const sz = size || [1672, 941];
  im.style.cssText = `position:absolute;left:0;top:0;width:${sz[0] * IMG_K}px;height:${sz[1] * IMG_K}px`;
  p.appendChild(im); return p;
}
