(function () {
  var ICON_MUTED =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  var ICON_UNMUTED =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

  var userMuted = true;
  var button;

  function syncVideos() {
    var videos = document.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].muted !== userMuted) videos[i].muted = userMuted;
    }
  }

  function createButton() {
    button = document.createElement('button');
    button.id = 'unmute-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Toggle sound');
    button.innerHTML = ICON_MUTED;
    button.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:24px',
      'z-index:99999',
      'width:48px',
      'height:48px',
      'border-radius:9999px',
      'border:1px solid rgba(255,255,255,0.25)',
      'background:rgba(0,0,0,0.5)',
      'color:#fff',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:0',
      'backdrop-filter:blur(8px)',
      '-webkit-backdrop-filter:blur(8px)',
      'transition:background 0.2s, transform 0.15s',
      'font-family:inherit',
    ].join(';');

    button.addEventListener('mouseenter', function () {
      button.style.background = 'rgba(0,0,0,0.75)';
    });
    button.addEventListener('mouseleave', function () {
      button.style.background = 'rgba(0,0,0,0.5)';
    });
    button.addEventListener('click', function () {
      userMuted = !userMuted;
      button.innerHTML = userMuted ? ICON_MUTED : ICON_UNMUTED;
      syncVideos();
    });

    document.body.appendChild(button);
  }

  function init() {
    createButton();
    var observer = new MutationObserver(syncVideos);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['muted'],
    });
    setInterval(syncVideos, 500);
    syncVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
