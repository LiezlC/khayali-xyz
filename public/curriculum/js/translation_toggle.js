/**
 * AEIS Global Translation Toggle
 * Swaps "Sci-Fi/Philosophical" terminology for "Forensic/Financial" equivalents.
 */

(function () {
    const DICT = {
        "Liability Sponge": "Weak Control Environment",
        "Daemon Health": "Supplier Trust Index",
        "The Bolvangar Procedure": "Contractual Severance",
        "Protocol Droid": "Professional Tone Normalization",
        "Evidence Ladder": "Data Lineage / Provenance",
        "Hallucination": "Data Integrity Failure",
        "Visible Soul Problem": "Auditability Trap",
        "Clarke Cycle": "Epistemic Opacity Cycle",
        "Jedi Council Problem": "Oversight Drift",
        "Daemon": "Supplier Relationship",
        "Intercision": "Service Termination",
        "Asimov Constraint": "Pre-Action Safety Control",
        "The Asimov Constraint": "The Pre-Action Safety Control",
        "Asimov": "Constitutional",
        "Clarke's Law": "Opacity Risk Standard",
        "Clarke": "Explainability",
        "The Lucas Cycle": "Historical Data Integrity",
        "Lucas Cycle": "Data Integrity Cycle",
        "Lucas": "Audit Trail",
        "The Pullman Cycle": "Human Oversight Framework",
        "Pullman Cycle": "Oversight Framework",
        "Pullman": "Operator Sovereignty",
        "The Kubrick Cycle": "Strategic Alignment Model",
        "Kubrick Cycle": "Alignment Model",
        "Kubrick": "Strategic Alignment",
        "Grand Opus": "Master Governance Framework",
        "Seil": "Persistence",
        "The Seil Protocol": "The Persistence Protocol",
        "Bolvangar": "Severance",
        "Visible Soul": "Auditability",
        "Settling": "Stagnation",
        "Irreversibility": "Permanent Harm",
        "Interlude": "Methodology Pause",
        // New additions for comprehensive coverage
        "21 AIs": "Multi-Model Convergence Analysis",
        "Liability Diode": "Downward Accountability Gradient",
        "Moral Crumple Zone": "Middle Management Blame Absorption",
        "Velocity Mismatch": "Review Speed Deficit",
        "Stop Work Authority": "Override Protocol",
        "Calvin Convention": "Log Integrity Standard",
        "High Fidelity": "Verification Fidelity",
        "The Fire Drill": "Velocity Stress Test",
        "Vendor Interrogation": "Vendor Due Diligence",
        "Greenwashing Firewall": "Claim Validation Control",
        "Shadow AI": "Unauthorized AI Usage"
    };

    // Reverse dictionary for toggling back
    const REVERSE_DICT = {};
    for (const [key, value] of Object.entries(DICT)) {
        REVERSE_DICT[value] = key;
    }

    const STATE_KEY = 'aeis_translation_mode';
    const MODE_SCIFI = 'scifi';
    const MODE_CFO = 'cfo';

    function getMode() {
        return localStorage.getItem(STATE_KEY) || MODE_SCIFI;
    }

    function setMode(mode) {
        localStorage.setItem(STATE_KEY, mode);
        applyTranslation(mode);
        updateButtonLabel(mode);
    }

    function toggleMode() {
        const current = getMode();
        const next = current === MODE_SCIFI ? MODE_CFO : MODE_SCIFI;
        setMode(next);
    }

    // Safe text replacement using TreeWalker
    function replaceText(node, fromDict, toDict) {
        if (node.nodeType === 3) { // Text node
            let text = node.nodeValue;
            let replaced = false;

            // This is a naive replacement, but sufficient for this specific vocabulary list
            // We need to be careful about not replacing parts of words if possible, 
            // but these terms are mostly multi-word phrases or distinct enough.

            // We iterate through the dictionary we are moving TO's keys (which are the FROM terms)
            // Wait, if we are in SciFi and want CFO, we look for SciFi terms.
            // So if target is CFO, we search for keys in DICT.

            const targetMap = fromDict; // keys are what we look for, values are what we replace with

            for (const [term, replacement] of Object.entries(targetMap)) {
                // Regex for case-insensitive match, global
                const regex = new RegExp(escapeRegExp(term), 'gi');
                if (regex.test(text)) {
                    text = text.replace(regex, replacement);
                    replaced = true;
                }
            }

            if (replaced) {
                node.nodeValue = text;
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            // Recurse
            for (let i = 0; i < node.childNodes.length; i++) {
                replaceText(node.childNodes[i], fromDict, toDict);
            }
        }
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function applyTranslation(mode) {
        // We always reload the page to ensure clean state? 
        // Or we can try to dynamic replace. Dynamic replacing back and forth is hard if terms overlap.
        // Simplest strategy for a static page demo: 
        // 1. If mode changed, we might need to reload or re-render. 
        // But for this "instant swap" requirement, let's try to just run the replacer.
        // Issue: "Weak Control Environment" might contain words used elsewhere? No, it's specific.

        // Better Strategy: On load, if CFO mode, replace SciFi -> CFO.
        // If user toggles CFO -> SciFi, replace CFO -> SciFi.

        const body = document.body;

        if (mode === MODE_CFO) {
            // Replace SciFi with CFO
            replaceText(body, DICT);
        } else {
            // Replace CFO with SciFi
            replaceText(body, REVERSE_DICT);
        }
    }

    function createToggleButton() {
        const btn = document.createElement('button');
        btn.id = 'aeis-translation-toggle';
        btn.className = 'fixed top-24 right-6 z-50 px-4 py-2 rounded shadow-lg font-bold text-xs uppercase tracking-wider transition-all';
        btn.onclick = toggleMode;
        document.body.appendChild(btn);
        updateButtonLabel(getMode());
    }

    function updateButtonLabel(mode) {
        const btn = document.getElementById('aeis-translation-toggle');
        if (btn) {
            if (mode === MODE_CFO) {
                btn.innerHTML = `
                    <div style="font-size: 0.65rem; opacity: 0.75; margin-bottom: 0.25rem; font-weight: 600;">CORPORATE MODE</div>
                    <div>Switch to Philosophical</div>
                `;
                btn.style.backgroundColor = '#0f172a'; // Slate 900
                btn.style.color = '#fff';
                btn.style.border = '2px solid #334155';
            } else {
                btn.innerHTML = `
                    <div style="font-size: 0.65rem; opacity: 0.75; margin-bottom: 0.25rem; font-weight: 600;">PHILOSOPHICAL MODE</div>
                    <div>Switch to Corporate</div>
                `;
                btn.style.backgroundColor = '#fff';
                btn.style.color = '#0f172a';
                btn.style.border = '2px solid #cbd5e1';
            }
        }
    }

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
        createToggleButton();
        const mode = getMode();
        // If we are in CFO mode, we apply it. 
        // Note: The HTML source is Sci-Fi by default.
        if (mode === MODE_CFO) {
            applyTranslation(MODE_CFO);
        }
    });

})();
