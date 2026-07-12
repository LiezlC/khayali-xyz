(function () {
  const c = window.KHAYALI_GAME_HELP;
  if (!c || document.getElementById('kh-game-help')) return;
  const esc = (value) => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const steps = (c.steps || []).map(step => `<li>${esc(step)}</li>`).join('');
  const root = document.createElement('div');
  root.innerHTML = `<style>
    #kh-game-help{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(3,8,16,.84);backdrop-filter:blur(7px);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    #kh-game-card{box-sizing:border-box;width:min(94vw,640px);max-height:90vh;overflow:auto;padding:28px 32px;border:2px solid #b68553;border-radius:18px;background:#f8f0dc;color:#2e2118;box-shadow:0 24px 80px rgba(0,0,0,.6)}
    #kh-game-card *{box-sizing:border-box}#kh-game-card h1{margin:6px 0 8px;font:700 clamp(24px,4vw,34px)/1.15 Georgia,serif;color:#243d35}#kh-game-card .kh-tag{margin:0 0 22px;font:italic 20px/1.4 Georgia,serif;color:#674d38}
    #kh-game-card section{margin:15px 0}#kh-game-card h2{margin:0 0 7px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d46f32}#kh-game-card p,#kh-game-card li{font:17px/1.5 Georgia,serif}#kh-game-card ul{margin:0;padding-left:25px}#kh-game-card li{margin:5px 0}
    #kh-game-kicker{font-size:11px;letter-spacing:.22em;color:#4e7d3a;font-weight:800;text-transform:uppercase}#kh-game-play{width:100%;margin-top:14px;padding:14px;border:2px solid #294f2f;border-radius:12px;background:#4e7d3a;color:white;font:800 16px ui-monospace,monospace;cursor:pointer}#kh-game-play:hover{background:#65994e}
    #kh-game-help-open{position:fixed;left:16px;bottom:16px;z-index:2147483645;width:44px;height:44px;border:2px solid #f8f0dc;border-radius:50%;background:#4e7d3a;color:#fff;font-size:18px;cursor:pointer;box-shadow:0 5px 18px rgba(0,0,0,.45)}
    @media(max-width:520px){#kh-game-card{padding:22px 20px}#kh-game-card p,#kh-game-card li{font-size:15px}}
  </style><div id="kh-game-help"><div id="kh-game-card" role="dialog" aria-modal="true" aria-labelledby="kh-game-title"><div id="kh-game-kicker">✦ Khayali Playspace</div><h1 id="kh-game-title">${esc(c.emoji || '✦')} ${esc(c.title)}</h1><p class="kh-tag">${esc(c.tagline)}</p><section><h2>🎯 Objective</h2><p>${esc(c.objective)}</p></section><section><h2>🎮 How to play</h2><ul>${steps}</ul></section><section><h2>🕹 Controls</h2><p>${esc(c.controls)}</p></section><button id="kh-game-play">▶ Play</button></div></div><button id="kh-game-help-open" aria-label="Show game instructions" title="How to play">?</button>`;
  while (root.firstChild) document.body.appendChild(root.firstChild);
  const overlay = document.getElementById('kh-game-help');
  const hide = () => { overlay.style.display = 'none'; };
  document.getElementById('kh-game-play').addEventListener('click', hide);
  document.getElementById('kh-game-help-open').addEventListener('click', () => { overlay.style.display = 'flex'; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
})();
