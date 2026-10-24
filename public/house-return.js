// The Atlas opens a few standalone instruments outside the Next.js shell.
// Show their return route only when the visitor arrived through the house.
(() => {
  if (new URLSearchParams(location.search).get('from') !== 'atlas') return;
  const link = document.createElement('a');
  link.href = '/wander';
  link.textContent = 'Back to the house';
  link.setAttribute('aria-label', 'Back to the Khayali Atlas');
  link.style.cssText = 'position:fixed;right:16px;bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483646;min-height:44px;display:flex;align-items:center;padding:10px 18px;background:#050d17ed;color:#9ce4d7;border:1px solid #79b9ab88;font:13px/1.4 system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 22px #0008;';
  document.body.appendChild(link);
})();
