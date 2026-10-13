(() => {
  const host = document.getElementById('utopai-support');
  let loading = false;
  function update() {
    const studio = location.hash === '#studio';
    host.hidden = studio;
    if (studio || loading) return;
    loading = true;
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.onload = () => {
      window.kofiWidgetOverlay.draw('khayali', {
        type: 'floating-chat',
        'floating-chat.cssId': 'utopai-kofi',
        'floating-chat.donateButton.text': 'Support UtopAI',
        'floating-chat.donateButton.background-color': '#00bfa5',
        'floating-chat.donateButton.text-color': '#fff'
      }, 'utopai-support');
    };
    document.body.appendChild(script);
  }
  window.addEventListener('hashchange', update);
  update();
})();
