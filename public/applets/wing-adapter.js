/* Khayali wing-adapter — shared chrome for every playspace applet.
 * Self-configures from its own URL: figures out which wing it lives in via
 * /applets/wing-manifest.json, then renders a small corner dock:
 *   ⌂ back to the playspace · 🎲 next door (random sibling) · ☕ support on Ko-fi
 * Also keeps a visited-rooms trail in localStorage under "khayali:visited".
 */
(function () {
  if (document.getElementById('kh-wing-dock')) return;

  var LS_KEY = 'khayali:visited';
  var here = location.pathname;

  function markVisited() {
    try {
      var seen = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      if (seen.indexOf(here) === -1) {
        seen.push(here);
        localStorage.setItem(LS_KEY, JSON.stringify(seen));
      }
      return seen.length;
    } catch (e) { return 0; }
  }

  function render(nextPath, wingLabel, visitedCount) {
    var root = document.createElement('div');
    root.innerHTML =
      '<style>' +
      '#kh-wing-dock{position:fixed;right:14px;bottom:14px;z-index:2147483644;display:flex;gap:8px;align-items:center;' +
      'font-family:ui-monospace,SFMono-Regular,Menlo,monospace;opacity:.55;transition:opacity .25s}' +
      '#kh-wing-dock:hover{opacity:1}' +
      '#kh-wing-dock a{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;' +
      'background:rgba(10,6,20,.82);border:1px solid rgba(236,72,153,.45);color:#f9a8d4;text-decoration:none;font-size:17px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.45);backdrop-filter:blur(6px);transition:transform .15s,border-color .15s}' +
      '#kh-wing-dock a:hover{transform:translateY(-2px);border-color:#f472b6}' +
      '#kh-wing-tip{position:fixed;right:14px;bottom:60px;z-index:2147483644;padding:6px 10px;border-radius:8px;' +
      'background:rgba(10,6,20,.9);border:1px solid rgba(236,72,153,.35);color:#e5e7eb;font:11px ui-monospace,monospace;' +
      'display:none;white-space:nowrap}' +
      '#kh-wing-dock a:hover~#kh-wing-tip,#kh-wing-dock:hover #kh-wing-tip{display:block}' +
      '</style>' +
      '<div id="kh-wing-dock" role="navigation" aria-label="Khayali playspace dock">' +
      '<a href="/playspace" title="Back to the playspace (' + (wingLabel || 'khayali') + ')" aria-label="Back to the playspace">⌂</a>' +
      (nextPath ? '<a href="' + nextPath + '" title="Next door — another room in this wing" aria-label="Next door">🎲</a>' : '') +
      '<a href="https://ko-fi.com/khayali" target="_blank" rel="noopener noreferrer" title="Enjoying this? Keep the light on — Ko-fi" aria-label="Support on Ko-fi">☕</a>' +
      '</div>';
    while (root.firstChild) document.body.appendChild(root.firstChild);
    // Whisper the trail count into the home glyph's title.
    if (visitedCount > 1) {
      var home = document.querySelector('#kh-wing-dock a');
      if (home) home.title = 'Back to the playspace · ' + visitedCount + ' rooms wandered';
    }
  }

  function boot() {
    var visitedCount = markVisited();
    fetch('/applets/wing-manifest.json')
      .then(function (r) { return r.json(); })
      .then(function (manifest) {
        var nextPath = null, wingLabel = null;
        var wings = manifest.wings || {};
        for (var key in wings) {
          var wing = wings[key];
          if (here.indexOf(wing.dir) === 0) {
            wingLabel = wing.label;
            var siblings = wing.apps.filter(function (a) { return a.path !== here; });
            if (siblings.length) nextPath = siblings[Math.floor(Math.random() * siblings.length)].path;
            break;
          }
        }
        render(nextPath, wingLabel, visitedCount);
      })
      .catch(function () { render(null, null, visitedCount); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
