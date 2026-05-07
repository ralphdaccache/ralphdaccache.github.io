(function () {
  var FADE_MS = 700;

  function snapshotVideo(video) {
    var w = video.videoWidth || video.clientWidth;
    var h = video.videoHeight || video.clientHeight;
    if (!w || !h) return null;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    try {
      canvas.getContext('2d').drawImage(video, 0, 0, w, h);
    } catch (e) {
      return null;
    }
    return canvas;
  }

  function showFadeOverlay(canvas) {
    canvas.style.cssText = [
      'position:fixed',
      'inset:0',
      'width:100vw',
      'height:100vh',
      'object-fit:cover',
      'pointer-events:none',
      'z-index:9999',
      'opacity:1',
      'transition:opacity ' + FADE_MS + 'ms ease',
    ].join(';');
    document.body.appendChild(canvas);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        canvas.style.opacity = '0';
      });
    });
    setTimeout(function () {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }, FADE_MS + 100);
  }

  var attached = new WeakSet();

  function attachToVideo(video) {
    if (attached.has(video)) return;
    attached.add(video);

    var lastSrc = video.currentSrc || video.src;

    var fire = function () {
      var nextSrc = video.currentSrc || video.src;
      if (nextSrc && lastSrc && nextSrc !== lastSrc) {
        var snap = snapshotVideo(video);
        if (snap) showFadeOverlay(snap);
      }
      lastSrc = nextSrc;
    };

    var observer = new MutationObserver(fire);
    observer.observe(video, { attributes: true, attributeFilter: ['src'] });
    video.addEventListener('emptied', fire);
    video.addEventListener('loadstart', fire);
  }

  function scan() {
    var videos = document.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) attachToVideo(videos[i]);
  }

  function init() {
    scan();
    new MutationObserver(scan).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
