/**
 * AI-ESG Integrated Strategist — Progress Tracker
 * Self-contained IIFE: renders a fixed bottom bar showing learner progression.
 * Reads completion state from localStorage keys set by assessment_engine.js.
 * Auto-initializes on DOMContentLoaded — no explicit call needed from HTML pages.
 */
(function () {
    'use strict';

    /* ───────────────────────────── MODULE REGISTRY ───────────────────────────── */

    var MODULES = [
        { id: 'L0',      label: 'L0',      title: 'Constitutional Foundations',   file: 'AI-ESG_Level0_Constitutional_Foundations.html' },
        { id: 'L0_5',    label: 'L0.5',    title: 'Framing the Relationship',     file: 'AI-ESG_Level0.5_Framing_the_Relationship.html' },
        { id: 'L1',      label: 'L1',      title: 'Epistemic Failures',           file: 'AI-ESG_Level1_Epistemic_Failures.html' },
        { id: 'L2',      label: 'L2',      title: 'Architecture of Compliance',   file: 'AI-ESG_Level2_Architecture_Compliance.html' },
        { id: 'L3',      label: 'L3',      title: 'Lucas Cycle',                  file: 'AI-ESG_Level3_Lucas_Cycle.html' },
        { id: 'L4',      label: 'L4',      title: 'Pullman Cycle',                file: 'AI-ESG_Level4_Pullman_Cycle.html' },
        { id: 'L5',      label: 'L5',      title: 'Kubrick Cycle',                file: 'AI-ESG_Level5_Kubrick_Cycle.html' },
        { id: 'L6',      label: 'L6',      title: 'Forensic Domains',             file: 'AI-ESG_Level6_Forensic_Domains.html' },
        { id: 'H8P',     label: 'H\u221eP', title: 'Continuous Governance',        file: 'AI-ESG_Module_H8P_Continuous_Governance.html' },
        { id: 'Capstone', label: 'Cap',     title: 'Capstone: Audit Defense',      file: 'AI-ESG_Capstone_Audit_Defense.html' }
    ];

    var STORAGE_KEY = 'aeis_progress';
    var COLLAPSED_KEY = 'aeis_tracker_collapsed';

    /* ───────────────────────────── CSS INJECTION ─────────────────────────────── */

    function injectStyles() {
        if (document.getElementById('aeis-tracker-styles')) return;
        var style = document.createElement('style');
        style.id = 'aeis-tracker-styles';
        style.textContent = [
            /* bar */
            '#aeis-progress-bar{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0f172a;border-top:2px solid #334155;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:0;transition:transform .3s ease;font-family:Inter,system-ui,sans-serif}',
            '#aeis-progress-bar.collapsed{transform:translateY(100%)}',
            '#aeis-progress-bar.collapsed .aeis-toggle-btn{transform:translateY(-100%);border-radius:6px 6px 0 0;bottom:0;position:absolute}',

            /* toggle */
            '.aeis-toggle-btn{position:absolute;right:12px;top:-28px;background:#0f172a;color:#94a3b8;border:2px solid #334155;border-bottom:none;border-radius:6px 6px 0 0;padding:2px 10px;font-size:12px;cursor:pointer;line-height:1.5}',
            '.aeis-toggle-btn:hover{color:#e2e8f0}',

            /* node wrapper */
            '.aeis-node-wrap{display:flex;align-items:center;flex-shrink:0}',

            /* connector */
            '.aeis-connector{width:16px;height:2px;background:#334155;flex-shrink:0}',
            '.aeis-connector.done{background:#22c55e}',

            /* node */
            '.aeis-node{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:default;position:relative;border:2px solid #334155;background:#1e293b;color:#64748b;transition:all .2s ease;flex-shrink:0}',
            '.aeis-node.completed{background:#22c55e;border-color:#16a34a;color:#fff;cursor:pointer}',
            '.aeis-node.current{border-color:#3b82f6;color:#93c5fd;box-shadow:0 0 0 3px rgba(59,130,246,.35);cursor:pointer;animation:aeis-pulse 2s infinite}',
            '.aeis-node.locked{opacity:.5}',

            /* checkmark */
            '.aeis-node.completed::after{content:"\\2713";font-size:13px;line-height:1}',
            '.aeis-node.completed span{display:none}',

            /* label */
            '.aeis-label{position:absolute;bottom:-16px;font-size:8px;color:#94a3b8;white-space:nowrap;text-align:center;pointer-events:none}',

            /* tooltip */
            '.aeis-node[title]{position:relative}',

            /* pulse animation */
            '@keyframes aeis-pulse{0%,100%{box-shadow:0 0 0 3px rgba(59,130,246,.35)}50%{box-shadow:0 0 0 6px rgba(59,130,246,.15)}}',

            /* body padding */
            'body.aeis-has-tracker{padding-bottom:52px}',

            /* print */
            '@media print{#aeis-progress-bar,.aeis-toggle-btn{display:none!important}body.aeis-has-tracker{padding-bottom:0!important}}',

            /* mobile */
            '@media(max-width:640px){.aeis-label{display:none}.aeis-node{width:20px;height:20px;font-size:7px}.aeis-connector{width:8px}#aeis-progress-bar{padding:6px 8px}}'
        ].join('\n');
        document.head.appendChild(style);
    }

    /* ───────────────────────────── STATE ─────────────────────────────────────── */

    function getCompletionMap() {
        var map = {};
        MODULES.forEach(function (m) {
            var raw = localStorage.getItem('aeis_assessment_' + m.id);
            if (raw) {
                try {
                    var data = JSON.parse(raw);
                    map[m.id] = data.completed === true;
                } catch (e) {
                    map[m.id] = false;
                }
            } else {
                map[m.id] = false;
            }
        });
        return map;
    }

    function detectCurrentModule() {
        var path = window.location.pathname || '';
        var href = window.location.href || '';
        var search = path || href;
        for (var i = 0; i < MODULES.length; i++) {
            if (search.indexOf(MODULES[i].file) !== -1) {
                return MODULES[i].id;
            }
        }
        // Also check for Syllabus Overview (not in MODULES but shows tracker)
        if (search.indexOf('Syllabus_Overview') !== -1) return '__syllabus';
        return null;
    }

    function resolveHref(moduleFile) {
        // Determine whether this page uses ../js/ or js/ path to figure out relative location
        var scripts = document.querySelectorAll('script[src]');
        var usesParentPath = false;
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].getAttribute('src').indexOf('../js/') === 0) {
                usesParentPath = true;
                break;
            }
        }
        // Files in AI-ESG/htmls/ subfolder need to go up one level to reach sibling htmls
        // Files in root need to go into AI-ESG/htmls/ or stay at root level
        // The 8 root-level files use js/ — the 3 subfolder files use ../js/
        // Root files link to: AI-ESG/htmls/<file> for subfolder files OR <file> for root files
        // Subfolder files link to: ../<file> for root files OR <file> for sibling subfolder files

        var subfolderFiles = [
            'AI-ESG_Level0.5_Framing_the_Relationship.html',
            'AI-ESG_Module_H8P_Continuous_Governance.html',
            'AI-ESG_Syllabus_Overview.html'
        ];
        var targetInSubfolder = subfolderFiles.indexOf(moduleFile) !== -1;

        if (usesParentPath) {
            // Current page is in subfolder (AI-ESG/htmls/)
            if (targetInSubfolder) {
                return moduleFile; // same folder
            } else {
                return '../../' + moduleFile; // go up to root
            }
        } else {
            // Current page is at root level
            if (targetInSubfolder) {
                return 'AI-ESG/htmls/' + moduleFile; // go into subfolder
            } else {
                return moduleFile; // same folder
            }
        }
    }

    /* ───────────────────────────── RENDER ────────────────────────────────────── */

    function render() {
        var existing = document.getElementById('aeis-progress-bar');
        if (existing) existing.remove();

        var completionMap = getCompletionMap();
        var currentId = detectCurrentModule();
        var collapsed = localStorage.getItem(COLLAPSED_KEY) === '1';

        var bar = document.createElement('div');
        bar.id = 'aeis-progress-bar';
        bar.setAttribute('role', 'navigation');
        bar.setAttribute('aria-label', 'Course progress');
        if (collapsed) bar.classList.add('collapsed');

        // Toggle button
        var toggle = document.createElement('button');
        toggle.className = 'aeis-toggle-btn';
        toggle.textContent = collapsed ? '\u25B2 Progress' : '\u25BC';
        toggle.title = collapsed ? 'Show progress tracker' : 'Hide progress tracker';
        toggle.addEventListener('click', function () {
            var isCollapsed = bar.classList.toggle('collapsed');
            localStorage.setItem(COLLAPSED_KEY, isCollapsed ? '1' : '0');
            toggle.textContent = isCollapsed ? '\u25B2 Progress' : '\u25BC';
            toggle.title = isCollapsed ? 'Show progress tracker' : 'Hide progress tracker';
        });
        bar.appendChild(toggle);

        // Determine first incomplete module (the "current frontier")
        var frontierIdx = MODULES.length; // default: all complete
        for (var f = 0; f < MODULES.length; f++) {
            if (!completionMap[MODULES[f].id]) {
                frontierIdx = f;
                break;
            }
        }

        MODULES.forEach(function (mod, idx) {
            // Connector before each node (except first)
            if (idx > 0) {
                var conn = document.createElement('div');
                conn.className = 'aeis-connector';
                if (idx <= frontierIdx && completionMap[MODULES[idx - 1].id]) {
                    conn.classList.add('done');
                }
                bar.appendChild(conn);
            }

            var wrap = document.createElement('div');
            wrap.className = 'aeis-node-wrap';

            var node = document.createElement('div');
            node.className = 'aeis-node';
            node.title = mod.title;

            var span = document.createElement('span');
            span.textContent = mod.label;
            node.appendChild(span);

            var isCompleted = completionMap[mod.id];
            var isCurrent = (mod.id === currentId);
            var isAccessible = (idx <= frontierIdx);

            if (isCompleted) {
                node.classList.add('completed');
            } else if (isCurrent || idx === frontierIdx) {
                node.classList.add('current');
            } else if (!isAccessible) {
                node.classList.add('locked');
            }

            // Make completed and current/frontier nodes clickable
            if ((isCompleted || isCurrent || idx === frontierIdx) && !isCurrent) {
                node.style.cursor = 'pointer';
                node.addEventListener('click', (function (file) {
                    return function () {
                        window.location.href = resolveHref(file);
                    };
                })(mod.file));
            }

            // Label
            var label = document.createElement('div');
            label.className = 'aeis-label';
            label.textContent = mod.label;

            node.appendChild(label);
            wrap.appendChild(node);
            bar.appendChild(wrap);
        });

        document.body.appendChild(bar);
        document.body.classList.add('aeis-has-tracker');
    }

    /* ───────────────────────────── INIT ──────────────────────────────────────── */

    function init() {
        injectStyles();
        render();

        // Re-render when a module is completed
        window.addEventListener('aeis-module-completed', function () {
            render();
        });

        // Also listen for storage changes (cross-tab sync)
        window.addEventListener('storage', function (e) {
            if (e.key && e.key.indexOf('aeis_assessment_') === 0) {
                render();
            }
        });
    }

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API (mostly for debugging)
    window.AEISProgress = {
        getCompletionMap: getCompletionMap,
        render: render
    };

})();
