/* =========================================================
   OMNI-ADAPTER — shared protocol runtime for OmniCanvas applets
   Loaded by every bundled applet. Each applet then calls
   OmniAdapter.register({...bindings}) from an inline script
   that has access to its own top-level variables.

   Shell -> applet messages:
     omni-mouse    {action, clientX, clientY}
     omni-color    {color}            hex or null (null = native colors)
     omni-settings {size, viscosity}  both 1..100, 50 = neutral
     omni-speed    {speed}            0.1..3, 1 = neutral
     omni-symmetry {level}            0=off 1=2-fold 2=4-fold 3=8-fold
     omni-pause / omni-resume
     omni-scatter
     omni-effect   {effect:'randomize'}
     omni-set      {id, value}        native control change
     omni-action   {id}               native action button
     omni-capture  {zIndex}

   Applet -> shell messages:
     omni-hello          {name, controls:[...]}
     omni-capture-result {zIndex, dataUrl}
   ========================================================= */

(function () {
    'use strict';

    const IS_EMBEDDED = window.self !== window.top;

    // Live parameter store. Applet drawing code reads this directly.
    const OMNI = {
        embedded: IS_EMBEDDED,
        size: 50,
        viscosity: 50,
        speed: 1,
        color: null,       // null = use applet's native colors
        symmetry: 0,       // 0,1,2,3 -> 1,2,4,8 symmetry points
        paused: false,

        // Derived multipliers (0.02..2, 1 = neutral)
        get sizeFactor() { return this.size / 50; },
        get viscFactor() { return this.viscosity / 50; },

        /* Symmetry helper: all mirrored copies of a point for the
           current symmetry level, within a w x h canvas. */
        symPoints(x, y, w, h) {
            const pts = [[x, y]];
            if (this.symmetry >= 1) pts.push([w - x, y]);
            if (this.symmetry >= 2) pts.push([x, h - y], [w - x, h - y]);
            if (this.symmetry >= 3) {
                // Diagonal reflections via normalized coordinate swap
                const nx = x / w, ny = y / h;
                pts.push(
                    [ny * w, nx * h], [w - ny * w, nx * h],
                    [ny * w, h - nx * h], [w - ny * w, h - nx * h]
                );
            }
            return pts;
        },

        /* Symmetry helper for line segments: returns aligned pairs so
           each mirrored segment connects the SAME transform of both
           endpoints (no criss-cross webbing). */
        symSegments(x0, y0, x1, y1, w, h) {
            const a = this.symPoints(x0, y0, w, h);
            const b = this.symPoints(x1, y1, w, h);
            return a.map((p, i) => [p[0], p[1], b[i][0], b[i][1]]);
        }
    };
    window.OMNI = OMNI;

    const OmniAdapter = {
        config: null,

        /* Proper hex -> HSL hue (0..360). */
        hexToHue(hex) {
            const n = parseInt(String(hex).replace('#', ''), 16);
            const r = ((n >> 16) & 255) / 255,
                  g = ((n >> 8) & 255) / 255,
                  b = (n & 255) / 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            if (max === min) return 0;
            const d = max - min;
            let hue;
            if (max === r) hue = ((g - b) / d) % 6;
            else if (max === g) hue = (b - r) / d + 2;
            else hue = (r - g) / d + 4;
            return Math.round(((hue * 60) + 360) % 360);
        },

        register(config) {
            this.config = config || {};
            if (IS_EMBEDDED) {
                whenReady(() => {
                    hideNativeUI(this.config);
                    sayHello(this.config);
                });
            }
        }
    };
    window.OmniAdapter = OmniAdapter;

    function whenReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function hideNativeUI(cfg) {
        document.body.classList.add('omni-transparent');
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        (cfg.hideSelectors || []).forEach(sel => {
            document.querySelectorAll(sel).forEach(el => { el.style.display = 'none'; });
        });
    }

    function sayHello(cfg) {
        try {
            window.parent.postMessage({
                type: 'omni-hello',
                name: cfg.name || document.title,
                controls: cfg.controls || []
            }, '*');
        } catch (e) {}
    }

    // --- Synthetic input dispatch (mouse + touch) ---
    function dispatchInput(cfg, d) {
        const target = (cfg.eventTarget && cfg.eventTarget()) ||
            document.querySelector('canvas') || document.body;
        const ev = new MouseEvent(d.action, {
            view: window, bubbles: true, cancelable: true,
            clientX: d.clientX, clientY: d.clientY
        });
        target.dispatchEvent(ev);
        try {
            const touchMap = { mousedown: 'touchstart', mousemove: 'touchmove', mouseup: 'touchend' };
            const touchType = touchMap[d.action];
            if (touchType) {
                const touch = new Touch({
                    identifier: 1, target,
                    clientX: d.clientX, clientY: d.clientY,
                    radiusX: 2.5, radiusY: 2.5, rotationAngle: 0, force: 0.5
                });
                target.dispatchEvent(new TouchEvent(touchType, {
                    cancelable: true, bubbles: true,
                    touches: touchType === 'touchend' ? [] : [touch],
                    targetTouches: touchType === 'touchend' ? [] : [touch],
                    changedTouches: [touch]
                }));
            }
        } catch (e) {}
    }

    // --- Capture ---
    function doCapture(cfg, d) {
        const reply = dataUrl => {
            try {
                window.parent.postMessage({
                    type: 'omni-capture-result', zIndex: d.zIndex, dataUrl
                }, '*');
            } catch (e) {}
        };
        try {
            if (cfg.capture) {
                Promise.resolve(cfg.capture()).then(reply).catch(() => reply(blankPng()));
            } else {
                const c = document.querySelector('canvas');
                reply(c ? c.toDataURL('image/png') : blankPng());
            }
        } catch (e) { reply(blankPng()); }
    }

    function blankPng() {
        const c = document.createElement('canvas');
        c.width = c.height = 1;
        return c.toDataURL('image/png');
    }

    // --- Message router ---
    window.addEventListener('message', (event) => {
        const d = event.data;
        if (!d || !d.type) return;
        const cfg = OmniAdapter.config || {};
        try {
            switch (d.type) {
                case 'omni-mouse':
                    if (!OMNI.paused) dispatchInput(cfg, d);
                    break;
                case 'omni-color':
                    OMNI.color = d.color;
                    if (cfg.onColor) cfg.onColor(d.color);
                    break;
                case 'omni-settings':
                    OMNI.size = d.size;
                    OMNI.viscosity = d.viscosity;
                    if (cfg.onSettings) cfg.onSettings(d.size, d.viscosity);
                    break;
                case 'omni-speed':
                    OMNI.speed = d.speed;
                    if (cfg.onSpeed) cfg.onSpeed(d.speed);
                    break;
                case 'omni-symmetry':
                    OMNI.symmetry = d.level || 0;
                    break;
                case 'omni-pause':
                    OMNI.paused = true;
                    if (cfg.onPause) cfg.onPause();
                    break;
                case 'omni-resume':
                    OMNI.paused = false;
                    if (cfg.onResume) cfg.onResume();
                    break;
                case 'omni-scatter':
                    if (cfg.scatter) cfg.scatter();
                    break;
                case 'omni-effect':
                    if (d.effect === 'randomize' && cfg.randomize) cfg.randomize();
                    break;
                case 'omni-set':
                    if (cfg.setControl) cfg.setControl(d.id, d.value);
                    break;
                case 'omni-action':
                    if (cfg.setControl) cfg.setControl(d.id, null);
                    break;
                case 'omni-capture':
                    doCapture(cfg, d);
                    break;
            }
        } catch (e) {
            // Never let a single applet error break the message loop
            console.warn('[omni-adapter]', d.type, e);
        }
    });
})();
