// ============================
// OMNI-CANVAS: MAIN CONTROLLER
// ============================

// --- DOM References ---
const interactionPane = document.getElementById('interaction-pane');
const artboard = document.getElementById('artboard');
const btnClear = document.getElementById('btn-clear');
const btnSave = document.getElementById('btn-save');
const btnFullscreen = document.getElementById('btn-fullscreen');
const modalBackdrop = document.getElementById('modal-backdrop');
const btnCloseModal = document.getElementById('btn-close-modal');
const analysisLoader = document.getElementById('analysis-loader');
const analysisResult = document.getElementById('analysis-result');
const analysisText = document.getElementById('analysis-text');

// --- Global State ---
let metrics = { strokes: 0, mouseDistance: 0, lastX: 0, lastY: 0, startTime: Date.now(), clicks: 0, dominantColors: [] };
let kaleidoscopeLevel = 0;      // 0=off, 1=2-fold, 2=4-fold, 3=8-fold
let mirrored = false;
let inverted = false;
let bloomValue = 0;
let paintTarget = 'all';
let globalColor = null;         // null = each layer uses native colors
const layerManifests = {};      // layerId -> controls manifest from omni-hello

// ============================
// 1. MESSAGING PRIMITIVES
// ============================

function post(iframe, message) {
    try { iframe.contentWindow.postMessage(message, '*'); } catch (e) {}
}

function allLayers() {
    return [...document.querySelectorAll('.art-layer')];
}

function activeLayers() {
    return [...document.querySelectorAll('.art-layer.active')];
}

// Layers that receive paint strokes / scatter, per the Paint Target selector
function targetLayers() {
    if (paintTarget === 'all') return activeLayers();
    const el = document.getElementById(paintTarget);
    return (el && el.classList.contains('active')) ? [el] : [];
}

function broadcastToTargets(message) {
    targetLayers().forEach(f => post(f, message));
}

function broadcastToAllLayers(message) {
    allLayers().forEach(f => post(f, message));
}

// Push the full current state to one iframe (used when a layer says hello,
// e.g. on first load or after Reset reloads the iframes)
function sendSnapshot(iframe) {
    post(iframe, { type: 'omni-settings',
        size: parseInt(document.getElementById('global-size').value),
        viscosity: parseInt(document.getElementById('global-visc').value) });
    post(iframe, { type: 'omni-speed',
        speed: parseInt(document.getElementById('global-speed').value) / 100 });
    post(iframe, { type: 'omni-symmetry', level: kaleidoscopeLevel });
    if (globalColor) post(iframe, { type: 'omni-color', color: globalColor });
    if (!iframe.classList.contains('active')) post(iframe, { type: 'omni-pause' });
}

// ============================
// 2. LAYER MANAGEMENT
// ============================

// Visibility toggles (+ pause hidden layers so they stop burning CPU)
document.querySelectorAll('.layer-row input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
        const iframe = document.getElementById(e.target.getAttribute('data-target'));
        if (e.target.checked) {
            iframe.classList.add('active');
            post(iframe, { type: 'omni-resume' });
        } else {
            iframe.classList.remove('active');
            post(iframe, { type: 'omni-pause' });
        }
    });
});

// Opacity sliders
document.querySelectorAll('.layer-opacity').forEach(slider => {
    slider.addEventListener('input', (e) => {
        const iframe = document.getElementById(e.target.getAttribute('data-target'));
        iframe.style.opacity = e.target.value / 100;
    });
});

// Blend mode selects
document.querySelectorAll('.layer-blend').forEach(select => {
    const iframe = document.getElementById(select.getAttribute('data-target'));
    if (iframe) iframe.style.mixBlendMode = select.value;
    select.addEventListener('change', (e) => {
        const target = document.getElementById(e.target.getAttribute('data-target'));
        target.style.mixBlendMode = e.target.value;
    });
});

// ============================
// 3. NATIVE LAYER CONTROLS (omni-hello manifests)
// ============================

window.addEventListener('message', (e) => {
    if (!e.data || e.data.type !== 'omni-hello') return;
    const iframe = allLayers().find(f => f.contentWindow === e.source);
    if (!iframe) return;
    layerManifests[iframe.id] = e.data.controls || [];
    renderNativeControls(iframe.id, layerManifests[iframe.id]);
    sendSnapshot(iframe);
});

function renderNativeControls(layerId, controls) {
    const panel = document.querySelector(`.layer-native[data-panel="${layerId}"]`);
    if (!panel) return;
    panel.innerHTML = '';
    if (!controls.length) {
        panel.innerHTML = '<p class="native-waiting">This layer has no extra controls.</p>';
        return;
    }
    const iframe = document.getElementById(layerId);

    controls.forEach(ctrl => {
        const row = document.createElement('div');
        row.className = 'native-row';

        if (ctrl.type === 'action') {
            const btn = document.createElement('button');
            btn.className = 'native-action';
            btn.textContent = ctrl.label;
            btn.addEventListener('click', () => post(iframe, { type: 'omni-action', id: ctrl.id }));
            row.appendChild(btn);
        } else {
            const label = document.createElement('label');
            label.textContent = ctrl.label;
            row.appendChild(label);

            if (ctrl.type === 'slider') {
                const input = document.createElement('input');
                input.type = 'range';
                input.min = ctrl.min ?? 0;
                input.max = ctrl.max ?? 100;
                input.step = ctrl.step ?? 1;
                input.value = ctrl.value ?? input.min;
                input.addEventListener('input', () =>
                    post(iframe, { type: 'omni-set', id: ctrl.id, value: parseFloat(input.value) }));
                row.appendChild(input);
            }
            else if (ctrl.type === 'select') {
                const sel = document.createElement('select');
                (ctrl.options || []).forEach(opt => {
                    const o = document.createElement('option');
                    o.value = opt.value;
                    o.textContent = opt.label;
                    if (opt.value === ctrl.value) o.selected = true;
                    sel.appendChild(o);
                });
                sel.addEventListener('change', () =>
                    post(iframe, { type: 'omni-set', id: ctrl.id, value: sel.value }));
                row.appendChild(sel);
            }
            else if (ctrl.type === 'buttons') {
                const group = document.createElement('div');
                group.className = 'native-buttons';
                (ctrl.options || []).forEach(opt => {
                    const b = document.createElement('button');
                    b.textContent = opt.label;
                    if (opt.value === ctrl.value) b.classList.add('active');
                    b.addEventListener('click', () => {
                        group.querySelectorAll('button').forEach(x => x.classList.remove('active'));
                        b.classList.add('active');
                        post(iframe, { type: 'omni-set', id: ctrl.id, value: opt.value });
                    });
                    group.appendChild(b);
                });
                row.appendChild(group);
            }
            else if (ctrl.type === 'toggle') {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = !!ctrl.value;
                input.addEventListener('change', () =>
                    post(iframe, { type: 'omni-set', id: ctrl.id, value: input.checked }));
                row.appendChild(input);
            }
        }
        panel.appendChild(row);
    });
}

// Expand / collapse the per-layer control panels
document.querySelectorAll('.layer-expand').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-target');
        const panel = document.querySelector(`.layer-native[data-panel="${id}"]`);
        const open = !panel.classList.contains('hidden');
        panel.classList.toggle('hidden', open);
        btn.textContent = open ? '▸' : '▾';
        btn.classList.toggle('open', !open);
    });
});

// ============================
// 4. EVENT BROADCASTING (painting)
// ============================

function broadcastEvent(e, actionType) {
    const rect = interactionPane.getBoundingClientRect();
    let x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (mirrored) x = rect.width - x;   // keep strokes under the cursor when flipped

    // Track metrics
    if (actionType === 'mousemove' && e.buttons > 0) {
        if (metrics.lastX > 0) {
            metrics.mouseDistance += Math.hypot(x - metrics.lastX, y - metrics.lastY);
        }
    } else if (actionType === 'mousedown') {
        metrics.strokes++;
    } else if (actionType === 'click') {
        metrics.clicks++;
    }
    metrics.lastX = x;
    metrics.lastY = y;

    broadcastToTargets({ type: 'omni-mouse', action: actionType, clientX: x, clientY: y });
}

// Mouse Events
interactionPane.addEventListener('mousedown', e => broadcastEvent(e, 'mousedown'));
interactionPane.addEventListener('mousemove', e => broadcastEvent(e, 'mousemove'));
interactionPane.addEventListener('mouseup', e => broadcastEvent(e, 'mouseup'));
interactionPane.addEventListener('mouseleave', e => broadcastEvent(e, 'mouseup'));
interactionPane.addEventListener('click', e => broadcastEvent(e, 'click'));
interactionPane.addEventListener('dblclick', e => broadcastEvent(e, 'dblclick'));

// Touch Events
interactionPane.addEventListener('touchstart', e => { e.preventDefault(); broadcastEvent(e.touches[0], 'mousedown'); }, {passive: false});
interactionPane.addEventListener('touchmove', e => { e.preventDefault(); broadcastEvent(e.touches[0], 'mousemove'); }, {passive: false});
interactionPane.addEventListener('touchend', e => { broadcastEvent(e.changedTouches[0] || {clientX:0,clientY:0}, 'mouseup'); });

// ============================
// 5. GLOBAL CONTROLS
// ============================

// Paint Target
document.getElementById('paint-target').addEventListener('change', (e) => {
    paintTarget = e.target.value;
});

// Color
document.getElementById('global-color').addEventListener('input', (e) => {
    globalColor = e.target.value;
    metrics.dominantColors.push(globalColor);
    broadcastToAllLayers({ type: 'omni-color', color: globalColor });
});

// Back to native per-layer colors
document.getElementById('btn-color-native').addEventListener('click', () => {
    globalColor = null;
    broadcastToAllLayers({ type: 'omni-color', color: null });
});

// Thickness & Viscosity (50 = 100% = each applet's natural look)
function broadcastSettings() {
    const size = parseInt(document.getElementById('global-size').value);
    const visc = parseInt(document.getElementById('global-visc').value);
    document.getElementById('val-size').textContent = (size * 2) + '%';
    document.getElementById('val-visc').textContent = (visc * 2) + '%';
    broadcastToAllLayers({ type: 'omni-settings', size, viscosity: visc });
}
document.getElementById('global-size').addEventListener('input', broadcastSettings);
document.getElementById('global-visc').addEventListener('input', broadcastSettings);

// Time Warp
document.getElementById('global-speed').addEventListener('input', (e) => {
    const speed = e.target.value / 100;
    document.getElementById('val-speed').textContent = speed.toFixed(1) + 'x';
    broadcastToAllLayers({ type: 'omni-speed', speed });
});

// Bloom / Glow (composed with invert via applyArtboardFilter)
document.getElementById('global-bloom').addEventListener('input', (e) => {
    bloomValue = parseInt(e.target.value);
    document.getElementById('val-bloom').textContent = bloomValue + '%';
    applyArtboardFilter();
});

function applyArtboardFilter() {
    const filters = [];
    if (bloomValue > 0) {
        filters.push(`blur(${bloomValue * 0.08}px)`);
        filters.push(`brightness(${1 + bloomValue * 0.008})`);
    }
    if (inverted) filters.push('invert(1)');
    artboard.style.filter = filters.join(' ');
}

// ============================
// 6. EFFECTS ENGINE
// ============================

// Scatter — paint burst on targeted layers
document.getElementById('btn-scatter').addEventListener('click', () => {
    broadcastToTargets({ type: 'omni-scatter' });
    artboard.classList.add('glitching');
    setTimeout(() => artboard.classList.remove('glitching'), 500);
});

// Mirror — flips the artboard; broadcastEvent compensates coordinates
document.getElementById('btn-mirror').addEventListener('click', (e) => {
    mirrored = !mirrored;
    artboard.style.transform = mirrored
        ? 'translate(-50%, -50%) scaleX(-1)'
        : 'translate(-50%, -50%)';
    e.target.classList.toggle('active', mirrored);
});

// Kaleidoscope — REAL input symmetry: layers mirror every stroke 2/4/8-fold
document.getElementById('btn-kaleidoscope').addEventListener('click', (e) => {
    kaleidoscopeLevel = (kaleidoscopeLevel + 1) % 4;
    broadcastToAllLayers({ type: 'omni-symmetry', level: kaleidoscopeLevel });
    e.target.classList.toggle('active', kaleidoscopeLevel > 0);
    e.target.textContent = kaleidoscopeLevel === 0 ? '🔮 Kaleidoscope'
        : `🔮 K×${[0,2,4,8][kaleidoscopeLevel]}`;
});

// Glitch — brief per-layer hue/offset distortion
document.getElementById('btn-glitch').addEventListener('click', () => {
    const hue = Math.random() * 360;
    const layers = activeLayers();
    layers.forEach((l, i) => {
        l.style.filter = `hue-rotate(${hue + i * 45}deg) saturate(${1 + Math.random() * 2})`;
        l.style.transform = `translate(${Math.random()*6-3}px, ${Math.random()*6-3}px)`;
    });
    artboard.classList.add('glitching');
    setTimeout(() => {
        layers.forEach(l => { l.style.filter = ''; l.style.transform = ''; });
        artboard.classList.remove('glitching');
    }, 600);
});

// Invert
document.getElementById('btn-invert').addEventListener('click', (e) => {
    inverted = !inverted;
    applyArtboardFilter();
    e.target.classList.toggle('active', inverted);
});

// Randomize — new palettes everywhere
document.getElementById('btn-randomize').addEventListener('click', () => {
    broadcastToAllLayers({ type: 'omni-effect', effect: 'randomize' });
});

// Fullscreen
btnFullscreen.addEventListener('click', () => {
    document.body.classList.toggle('fullscreen');
});

// ============================
// 7. PRESETS (Compositions)
// ============================

const PRESET_KEY = 'omnicanvas-presets';

function loadPresets() {
    try { return JSON.parse(localStorage.getItem(PRESET_KEY)) || {}; }
    catch (e) { return {}; }
}

function refreshPresetList() {
    const presets = loadPresets();
    const sel = document.getElementById('preset-list');
    sel.innerHTML = '<option value="">— saved compositions —</option>';
    Object.keys(presets).forEach(name => {
        const o = document.createElement('option');
        o.value = name;
        o.textContent = name;
        sel.appendChild(o);
    });
}

function capturePreset() {
    const layers = {};
    document.querySelectorAll('.layer-row').forEach(row => {
        const id = row.getAttribute('data-layer');
        layers[id] = {
            on: row.querySelector('input[type="checkbox"]').checked,
            opacity: row.querySelector('.layer-opacity').value,
            blend: row.querySelector('.layer-blend').value
        };
    });
    return {
        layers,
        size: document.getElementById('global-size').value,
        visc: document.getElementById('global-visc').value,
        speed: document.getElementById('global-speed').value,
        bloom: document.getElementById('global-bloom').value,
        color: globalColor,
        symmetry: kaleidoscopeLevel,
        target: paintTarget
    };
}

function setInput(el, value, eventName) {
    el.value = value;
    el.dispatchEvent(new Event(eventName, { bubbles: true }));
}

function applyPreset(p) {
    Object.entries(p.layers || {}).forEach(([id, st]) => {
        const row = document.querySelector(`.layer-row[data-layer="${id}"]`);
        if (!row) return;
        const cb = row.querySelector('input[type="checkbox"]');
        if (cb.checked !== st.on) { cb.checked = st.on; cb.dispatchEvent(new Event('change')); }
        setInput(row.querySelector('.layer-opacity'), st.opacity, 'input');
        setInput(row.querySelector('.layer-blend'), st.blend, 'change');
    });
    setInput(document.getElementById('global-size'), p.size ?? 50, 'input');
    setInput(document.getElementById('global-visc'), p.visc ?? 50, 'input');
    setInput(document.getElementById('global-speed'), p.speed ?? 100, 'input');
    setInput(document.getElementById('global-bloom'), p.bloom ?? 0, 'input');
    setInput(document.getElementById('paint-target'), p.target || 'all', 'change');

    if (p.color) {
        setInput(document.getElementById('global-color'), p.color, 'input');
    } else {
        globalColor = null;
        broadcastToAllLayers({ type: 'omni-color', color: null });
    }

    kaleidoscopeLevel = p.symmetry || 0;
    broadcastToAllLayers({ type: 'omni-symmetry', level: kaleidoscopeLevel });
    const kBtn = document.getElementById('btn-kaleidoscope');
    kBtn.classList.toggle('active', kaleidoscopeLevel > 0);
    kBtn.textContent = kaleidoscopeLevel === 0 ? '🔮 Kaleidoscope' : `🔮 K×${[0,2,4,8][kaleidoscopeLevel]}`;
}

document.getElementById('btn-save-preset').addEventListener('click', () => {
    const name = prompt('Name this composition:');
    if (!name) return;
    const presets = loadPresets();
    presets[name] = capturePreset();
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
    refreshPresetList();
    document.getElementById('preset-list').value = name;
});

document.getElementById('btn-delete-preset').addEventListener('click', () => {
    const sel = document.getElementById('preset-list');
    if (!sel.value) return;
    const presets = loadPresets();
    delete presets[sel.value];
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
    refreshPresetList();
});

document.getElementById('preset-list').addEventListener('change', (e) => {
    if (!e.target.value) return;
    const presets = loadPresets();
    if (presets[e.target.value]) applyPreset(presets[e.target.value]);
});

// Shuffle Composition — random layer subset + blends + fresh palettes
document.getElementById('btn-shuffle').addEventListener('click', () => {
    const blends = ['normal', 'multiply', 'screen', 'overlay', 'difference', 'color-dodge', 'exclusion', 'luminosity'];
    const rows = [...document.querySelectorAll('.layer-row')];
    const count = 3 + Math.floor(Math.random() * 3);   // 3-5 layers on
    const onSet = new Set(
        rows.map(r => r.getAttribute('data-layer')).sort(() => Math.random() - 0.5).slice(0, count)
    );
    rows.forEach(row => {
        const id = row.getAttribute('data-layer');
        const cb = row.querySelector('input[type="checkbox"]');
        const on = onSet.has(id);
        if (cb.checked !== on) { cb.checked = on; cb.dispatchEvent(new Event('change')); }
        setInput(row.querySelector('.layer-opacity'), 70 + Math.floor(Math.random() * 31), 'input');
        setInput(row.querySelector('.layer-blend'), blends[Math.floor(Math.random() * blends.length)], 'change');
    });
    broadcastToAllLayers({ type: 'omni-effect', effect: 'randomize' });
    artboard.classList.add('glitching');
    setTimeout(() => artboard.classList.remove('glitching'), 500);
});

refreshPresetList();

// ============================
// 8. CLEAR & SAVE
// ============================

btnClear.addEventListener('click', () => {
    allLayers().forEach(iframe => { iframe.src = iframe.src; });
    // Layers re-announce via omni-hello after reload; sendSnapshot restores state
    metrics = { strokes: 0, mouseDistance: 0, lastX: 0, lastY: 0, startTime: Date.now(), clicks: 0, dominantColors: [] };
});

// --- Save via capture protocol (with timeout so one slow layer can't hang it) ---

function captureActiveLayers(timeoutMs = 8000) {
    const frames = activeLayers();
    return new Promise((resolve) => {
        const captures = [];
        if (!frames.length) { resolve(captures); return; }
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            window.removeEventListener('message', handler);
            resolve(captures);
        };
        const handler = (e) => {
            if (e.data && e.data.type === 'omni-capture-result') {
                const frame = frames[e.data.zIndex];
                captures.push({ zIndex: e.data.zIndex, dataUrl: e.data.dataUrl, layerId: frame ? frame.id : '' });
                if (captures.length >= frames.length) finish();
            }
        };
        window.addEventListener('message', handler);
        frames.forEach((iframe, i) => post(iframe, { type: 'omni-capture', zIndex: i }));
        setTimeout(finish, timeoutMs);
    });
}

function compositeCaptures(captures, applyLayerStyles) {
    return new Promise((resolve) => {
        captures.sort((a, b) => a.zIndex - b.zIndex);
        const canvas = document.createElement('canvas');
        canvas.width = artboard.offsetWidth;
        canvas.height = artboard.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const blendMap = {
            'normal': 'source-over', 'multiply': 'multiply', 'screen': 'screen',
            'overlay': 'overlay', 'difference': 'difference',
            'color-dodge': 'color-dodge', 'exclusion': 'exclusion', 'luminosity': 'luminosity'
        };

        const drawNext = (index) => {
            if (index >= captures.length) { resolve(canvas); return; }
            const img = new Image();
            img.onload = () => {
                if (applyLayerStyles) {
                    const blendSelect = document.querySelector(`.layer-blend[data-target="${captures[index].layerId}"]`);
                    ctx.globalCompositeOperation = blendMap[blendSelect ? blendSelect.value : 'normal'] || 'source-over';
                    const opacitySlider = document.querySelector(`.layer-opacity[data-target="${captures[index].layerId}"]`);
                    ctx.globalAlpha = opacitySlider ? opacitySlider.value / 100 : 1;
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = 'source-over';
                drawNext(index + 1);
            };
            img.onerror = () => drawNext(index + 1);
            img.src = captures[index].dataUrl;
        };
        drawNext(0);
    });
}

// Apply the artboard-level treatments (bloom, invert, mirror) so the saved
// PNG matches what's on screen
function applyGlobalTreatments(canvas) {
    if (!inverted && bloomValue === 0 && !mirrored) return canvas;
    const out = document.createElement('canvas');
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext('2d');
    const filters = [];
    if (bloomValue > 0) {
        filters.push(`blur(${bloomValue * 0.08}px)`);
        filters.push(`brightness(${1 + bloomValue * 0.008})`);
    }
    if (inverted) filters.push('invert(1)');
    if (filters.length) ctx.filter = filters.join(' ');
    if (mirrored) { ctx.translate(out.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(canvas, 0, 0);
    return out;
}

btnSave.addEventListener('click', async () => {
    if (!activeLayers().length) {
        alert('Enable at least one layer to save.');
        return;
    }
    btnSave.textContent = 'Rendering...';
    btnSave.disabled = true;
    try {
        const captures = await captureActiveLayers();
        if (captures.length) {
            const composite = await compositeCaptures(captures, true);
            const finalCanvas = applyGlobalTreatments(composite);
            const link = document.createElement('a');
            link.download = `omni-canvas-${Date.now()}.png`;
            link.href = finalCanvas.toDataURL('image/png');
            link.click();
        } else {
            alert('No layers responded to capture — try again.');
        }
    } finally {
        btnSave.innerHTML = '💾 Save Artwork';
        btnSave.disabled = false;
    }
});

// ============================
// 9. ORACLE READINGS SYSTEM
// ============================

// --- Free Readings (Algorithmic) ---

const ORACLE_TEMPLATES = {
    psycho: {
        title: 'Psychoanalytical Interpretation',
        icon: '🧠',
        generate: (m) => {
            const active = activeLayers();
            const layerNames = active.map(l => l.id.replace('layer-',''));
            const chaosVal = (m.mouseDistance / 1000) + m.strokes;
            let chaosStr = chaosVal > 50 ? "Extreme" : chaosVal > 20 ? "High" : chaosVal > 10 ? "Moderate" : "Low";

            const templates = [
                () => layerNames.includes('entropy') && layerNames.includes('neon')
                    ? `A classic "Schism" pattern. You weave the connective tissue of Neon Neural Flow through the decaying blocks of the Entropy Cube. This mirrors a conscious attempt to find meaning within a deteriorating system in your waking life. The ${chaosStr.toLowerCase()} entropy suggests ${chaosVal > 20 ? 'urgency in this search' : 'a tentative, exploratory approach'}.`
                    : null,
                () => layerNames.includes('noir')
                    ? `The Noir layer reveals an architectural subconscious — you build structures even in abstraction. ${m.strokes > 20 ? 'The frantic layering suggests you are constructing walls faster than doors.' : 'The sparse placement suggests you prefer to inhabit negative space, a hallmark of the contemplative introvert.'}`
                    : null,
                () => layerNames.includes('chromatic')
                    ? `The Chromatic Dialogue layer is telling. Two silhouettes, facing each other across the void you paint between them. ${m.clicks > 10 ? 'Your aggressive splattering between them suggests unresolved communication — words replaced by color.' : 'Your gentle dripping suggests patience, a willingness to let dialogue emerge organically.'}`
                    : null,
                () => layerNames.includes('trippy')
                    ? `Activating the Neural Art layer reveals a desire to see the unseen — to find patterns in chaos. The psychedelic waveforms act as a Rorschach for your relationship with ${chaosVal > 30 ? 'overstimulation' : 'controlled exploration'}.`
                    : null,
                () => active.length >= 5
                    ? `Full-spectrum integration: ${active.length} simultaneous complexes. The simultaneous activation suggests a mind comfortable holding contradictions — order and chaos, structure and flow, noise and silence coexisting without resolution. This is either profound integration or magnificent avoidance.`
                    : null,
                () => m.strokes > 30
                    ? `High gestural frequency (${m.strokes} gestures). The staccato rhythm of your interaction betrays anxious energy. You are not painting — you are discharging psychological static. The canvas acts as a grounding rod for overstimulated neural pathways.`
                    : null,
                () => `A restrained approach. You leave much void untouched. This negative space speaks louder than the strokes themselves, indicating contemplation, or perhaps a hesitance to leave a permanent mark on your environment.`
            ];

            const result = templates.find(t => t() !== null)?.() || templates[templates.length-1]();
            return { text: result, metrics: { gestures: m.strokes, complexes: active.length, entropy: chaosStr } };
        }
    },

    fortune: {
        title: 'The Oracle Speaks',
        icon: '🔮',
        generate: (m) => {
            const hour = new Date().getHours();
            const layerCount = activeLayers().length;
            const seed = (m.strokes * 7 + m.clicks * 13 + layerCount * 31 + hour) % 100;

            const cards = ['The Tower', 'The Star', 'The Moon', 'The Fool', 'The Empress',
                'Wheel of Fortune', 'The Hermit', 'Strength', 'Temperance', 'The World'];
            const card = cards[seed % cards.length];

            const elements = ['Fire', 'Water', 'Earth', 'Air', 'Aether'];
            const element = elements[layerCount % elements.length];

            const auraColors = ['Indigo (Third Eye Activation)', 'Gold (Creative Manifestation)',
                'Violet (Transformation)', 'Emerald (Heart Resonance)', 'Crimson (Primal Force)',
                'Silver (Lunar Intuition)', 'Copper (Earthly Grounding)'];
            const aura = auraColors[(m.strokes + m.clicks) % auraColors.length];

            const fortunes = [
                `The card drawn is <strong>${card}</strong>, aligned with the element of <strong>${element}</strong>. Your aura burns <strong>${aura}</strong>. The strokes you have laid carry the signature of someone at a crossroads — but the crossroads has more than four paths, and the map you need is the one you're painting right now.`,
                `<strong>${card}</strong> rises from your canvas, wreathed in <strong>${element}</strong>. Your ${m.strokes} gestures form a sigil the ancients would recognize. The universe whispers: what you seek is not ahead of you — it is beneath the layers you've already painted. Dig gently.`,
                `The spirits read <strong>${card}</strong> in the ${layerCount} layers of your creation. Element: <strong>${element}</strong>. Aura: <strong>${aura}</strong>. A threshold approaches in the next lunar cycle. The colors you chose unconsciously mirror the palette of this threshold. Walk through it.`,
                `Your canvas channels <strong>${card}</strong>. With ${m.strokes} sacred gestures upon ${layerCount} planes of existence, you weave ${element}al energy. The Oracle sees a pattern: you create to communicate what speech cannot carry. The right person will understand this painting without explanation.`
            ];

            return { text: fortunes[seed % fortunes.length], metrics: { card, element, aura: aura.split(' (')[0] } };
        }
    },

    critic: {
        title: 'Gallery Review',
        icon: '🎩',
        generate: (m) => {
            const layerCount = activeLayers().length;
            const chaosVal = (m.mouseDistance / 1000) + m.strokes;
            const duration = Math.round((Date.now() - m.startTime) / 1000);

            const artists = ['Rothko', 'Pollock', 'Kandinsky', 'Basquiat', 'Klein', 'Hirst', 'Koons', 'Kusama', 'Richter', 'Twombly'];
            const artist = artists[(m.strokes + layerCount) % artists.length];

            const movements = ['Neo-Expressionist', 'Post-Digital Primitivist', 'Quantum Maximalist',
                'Cyber-Baroque', 'Deconstructed Sublime', 'Algorithmic Impressionist'];
            const movement = movements[(m.clicks + layerCount) % movements.length];

            const prices = ['$12,400', '$47,000', '$125,000', '$2.3M', '$890,000', 'Priceless (museum acquisition pending)'];
            const price = prices[Math.min(Math.floor(chaosVal / 10), prices.length - 1)];

            const reviews = [
                `*adjusts monocle* One detects unmistakable ${movement} influences, reminiscent of late-period ${artist}, yet filtered through a distinctly digital sensibility. The ${layerCount}-layer composition demonstrates ${chaosVal > 30 ? 'a bold, almost reckless disregard for negative space — refreshing' : 'admirable restraint — the confidence to let the void participate'}. Created in ${duration} seconds, which is ${duration < 30 ? 'suspiciously fast — genius or charlatan?' : 'a measured, considered timeframe'}. Estimated auction value: <strong>${price}</strong>.`,
                `Hmm, yes. *sips champagne* What we have here is clearly ${movement}, though I suspect the artist would bristle at categorization. The interplay between ${layerCount} simultaneous media channels creates a tension that ${artist} could only dream of — they never had access to this many layers of pretension simultaneously. The ${m.strokes} gestural interventions suggest ${m.strokes > 20 ? 'horror vacui — an almost pathological need to fill space' : 'wabi-sabi — a mature acceptance of imperfection'}. I'll take it for my private collection. <strong>${price}</strong>.`,
            ];

            return { text: reviews[(m.strokes + m.clicks) % reviews.length], metrics: { movement: movement.split(' ')[0], reference: artist, value: price } };
        }
    },

    astro: {
        title: 'Cosmic Art Chart',
        icon: '⭐',
        generate: (m) => {
            const now = new Date();
            const signs = ['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍',
                'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'];
            const sunSign = signs[now.getMonth()];
            const risingSign = signs[(m.strokes + now.getHours()) % 12];
            const moonSign = signs[(m.clicks + now.getMinutes()) % 12];

            const layerCount = activeLayers().length;
            const planets = ['Mercury (Communication)', 'Venus (Aesthetics)', 'Mars (Drive)',
                'Jupiter (Expansion)', 'Saturn (Structure)', 'Neptune (Imagination)', 'Pluto (Transformation)'];
            const dominant = planets[layerCount % planets.length];

            const readings = [
                `<strong>Sun:</strong> ${sunSign} | <strong>Rising:</strong> ${risingSign} | <strong>Moon:</strong> ${moonSign}<br><br>Your art chart reveals <strong>${dominant}</strong> as your dominant planetary influence today. The ${risingSign.split(' ')[0]} rising manifests in your ${m.strokes > 15 ? 'aggressive, confident strokes — fire and forward motion' : 'contemplative approach — earth energy, grounding'}. With the Moon in ${moonSign.split(' ')[0]}, your emotional canvas craves ${layerCount > 4 ? 'complexity — you process feelings through layered abstraction' : 'simplicity — each layer must earn its place'}. The stars recommend: add more ${layerCount < 5 ? 'layers' : 'negative space'} to achieve cosmic balance.`,
                `The celestial canvas mirrors yours: <strong>${sunSign}</strong> sun illuminates your creative core, while <strong>${risingSign}</strong> rising determines how the world receives this work. <strong>${moonSign}</strong> moon whispers to your inner artist. <br><br>Dominant planet: <strong>${dominant}</strong>. This means your art today is ${dominant.includes('Venus') ? 'driven by pure aesthetic pleasure' : dominant.includes('Mars') ? 'fueled by primal creative force' : dominant.includes('Neptune') ? 'channeling the collective unconscious' : 'building structures in the astral plane'}. The ${m.strokes} gestures you've made align with the ${m.strokes % 2 === 0 ? 'feminine' : 'masculine'} principle. Balance approaches.`
            ];

            return { text: readings[(m.strokes + now.getSeconds()) % readings.length], metrics: { sun: sunSign.split(' ')[0], rising: risingSign.split(' ')[0], planet: dominant.split(' ')[0] } };
        }
    }
};

// Oracle Button Handlers
document.querySelectorAll('.btn-oracle[data-oracle]').forEach(btn => {
    btn.addEventListener('click', () => {
        const oracleType = btn.getAttribute('data-oracle');
        const oracle = ORACLE_TEMPLATES[oracleType];

        // Premium oracles
        if (['vision', 'story', 'appraisal'].includes(oracleType)) {
            handlePremiumOracle(oracleType);
            return;
        }

        if (!oracle) return;

        // Show modal
        modalBackdrop.classList.remove('hidden');
        analysisLoader.classList.remove('hidden');
        analysisResult.classList.add('hidden');

        // Generate after dramatic pause
        setTimeout(() => {
            const result = oracle.generate(metrics);

            document.querySelector('#psycho-modal h2').innerHTML = `${oracle.icon} ${oracle.title}`;
            analysisText.innerHTML = result.text + '<br><br><em>(Unlock AI-powered vision analysis with an API key for deeper readings...)</em>';

            // Update metric displays (and restore them if a premium reading hid them)
            document.querySelector('.metrics').style.display = '';
            const metricKeys = Object.keys(result.metrics);
            const metricEls = document.querySelectorAll('.metric');
            metricEls.forEach((el, i) => {
                if (metricKeys[i]) {
                    el.querySelector('span').textContent = result.metrics[metricKeys[i]];
                    el.querySelector('label').textContent = metricKeys[i].charAt(0).toUpperCase() + metricKeys[i].slice(1);
                }
            });

            analysisLoader.classList.add('hidden');
            analysisResult.classList.remove('hidden');
        }, 2000);
    });
});

btnCloseModal.addEventListener('click', () => modalBackdrop.classList.add('hidden'));

// --- Premium Readings (API-Powered) ---

document.getElementById('btn-save-key')?.addEventListener('click', () => {
    const key = document.getElementById('api-key').value;
    const provider = document.getElementById('api-provider').value;
    if (key) {
        localStorage.setItem('omni-api-key', key);
        localStorage.setItem('omni-api-provider', provider);
        document.getElementById('premium-oracles').classList.remove('hidden');
        document.getElementById('btn-save-key').textContent = '✓ Saved';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem('omni-api-key');
    if (savedKey) {
        document.getElementById('api-key').value = savedKey;
        document.getElementById('api-provider').value = localStorage.getItem('omni-api-provider') || 'anthropic';
        document.getElementById('premium-oracles').classList.remove('hidden');
    }
});

async function handlePremiumOracle(type) {
    const apiKey = localStorage.getItem('omni-api-key');
    const provider = localStorage.getItem('omni-api-provider') || 'anthropic';

    if (!apiKey) {
        alert('Please add your API key in the Oracle Readings section first.');
        return;
    }

    modalBackdrop.classList.remove('hidden');
    analysisLoader.classList.remove('hidden');
    analysisResult.classList.add('hidden');
    document.querySelector('#psycho-modal h2').textContent = '👁️ Consulting the AI Oracle...';

    // Reuse the same composited capture as Save (blends + opacity + treatments)
    const captures = await captureActiveLayers();
    if (!captures.length) {
        analysisText.innerHTML = 'No layers responded to capture — enable at least one layer and try again.';
        analysisLoader.classList.add('hidden');
        analysisResult.classList.remove('hidden');
        return;
    }
    const composite = applyGlobalTreatments(await compositeCaptures(captures, true));
    const imageDataUrl = composite.toDataURL('image/jpeg', 0.8);
    const base64 = imageDataUrl.split(',')[1];

    const prompts = {
        vision: "You are a mystical art oracle. Analyze this digital artwork in vivid, evocative language. Describe what you see, what it might mean psychologically, and what hidden symbols or patterns you detect. Be dramatic and insightful. 2-3 paragraphs.",
        story: "You are a literary artist. Look at this digital artwork and write a short, evocative piece of creative writing (poem, flash fiction, or prose poem) inspired by it. 150-250 words. Make it beautiful.",
        appraisal: "You are a tongue-in-cheek art auction house appraiser. Examine this digital artwork and provide a comedic but detailed appraisal including: the art movement it belongs to (make one up if needed), comparable artists, provenance (invent an amusing backstory), and an estimated auction value with justification. Be witty and specific about what you see."
    };

    try {
        let responseText;

        if (provider === 'anthropic') {
            const resp = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-opus-4-8',
                    max_tokens: 1024,
                    messages: [{
                        role: 'user',
                        content: [
                            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64 } },
                            { type: 'text', text: prompts[type] }
                        ]
                    }]
                })
            });
            const data = await resp.json();
            responseText = data.content?.[0]?.text || data.error?.message || 'The oracle is silent...';
        } else {
            const resp = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    max_tokens: 1024,
                    messages: [{
                        role: 'user',
                        content: [
                            { type: 'image_url', image_url: { url: imageDataUrl } },
                            { type: 'text', text: prompts[type] }
                        ]
                    }]
                })
            });
            const data = await resp.json();
            responseText = data.choices?.[0]?.message?.content || data.error?.message || 'The oracle is silent...';
        }

        const titles = { vision: '👁️ Deep Vision Oracle', story: '📜 Story Weaver', appraisal: '💰 Collector\'s Appraisal' };
        document.querySelector('#psycho-modal h2').textContent = titles[type];
        analysisText.innerHTML = responseText.replace(/\n/g, '<br>');

        // Metrics aren't relevant for premium readings
        document.querySelector('.metrics').style.display = 'none';
        analysisLoader.classList.add('hidden');
        analysisResult.classList.remove('hidden');

    } catch (err) {
        analysisText.innerHTML = `Oracle error: ${err.message}. Check your API key and try again.`;
        analysisLoader.classList.add('hidden');
        analysisResult.classList.remove('hidden');
    }
}

// ============================
// 10. KEYBOARD SHORTCUTS
// ============================

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    switch(e.key.toLowerCase()) {
        case 's': if (!e.ctrlKey) document.getElementById('btn-scatter').click(); break;
        case 'm': document.getElementById('btn-mirror').click(); break;
        case 'k': document.getElementById('btn-kaleidoscope').click(); break;
        case 'g': document.getElementById('btn-glitch').click(); break;
        case 'i': document.getElementById('btn-invert').click(); break;
        case 'r': document.getElementById('btn-randomize').click(); break;
        case 'f': document.getElementById('btn-fullscreen').click(); break;
        case 'escape': document.body.classList.remove('fullscreen'); break;
        case '1': case '2': case '3': case '4': case '5': case '6': case '7':
            const idx = parseInt(e.key) - 1;
            const cbs = document.querySelectorAll('.layer-row input[type="checkbox"]');
            if (cbs[idx]) { cbs[idx].checked = !cbs[idx].checked; cbs[idx].dispatchEvent(new Event('change')); }
            break;
    }
});
