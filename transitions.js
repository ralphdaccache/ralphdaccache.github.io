(function () {
  var FADE_MS = 700;
  var lastSnapshot = null;
  var lastVideoRef = null;

  function snapshotVideo(video) {
    if (!video) return null;
    var w = video.videoWidth || 0;
    var h = video.videoHeight || 0;
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

  function captureCurrent() {
    var video = document.querySelector('video');
    var snap = snapshotVideo(video);
    if (snap) lastSnapshot = snap;
  }

  function showOverlay(snapshot, newVideo) {
    var parent = (newVideo && newVideo.parentElement) || document.body;
    var inContainer = parent !== document.body;

    snapshot.style.cssText = [
      'position:' + (inContainer ? 'absolute' : 'fixed'),
      'inset:0',
      'width:100%',
      'height:100%',
      'object-fit:cover',
      'pointer-events:none',
      'z-index:' + (inContainer ? 5 : 9999),
      'opacity:1',
      'transition:opacity ' + FADE_MS + 'ms cubic-bezier(0.4, 0, 0.2, 1)',
    ].join(';');

    if (inContainer && newVideo.nextSibling) {
      parent.insertBefore(snapshot, newVideo.nextSibling);
    } else {
      parent.appendChild(snapshot);
    }

    var faded = false;
    function startFade() {
      if (faded) return;
      faded = true;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          snapshot.style.opacity = '0';
        });
      });
      setTimeout(function () {
        if (snapshot.parentNode) snapshot.parentNode.removeChild(snapshot);
      }, FADE_MS + 100);
    }

    if (newVideo && (newVideo.readyState < 3 || newVideo.paused)) {
      var fired = false;
      var handler = function () {
        if (fired) return;
        fired = true;
        newVideo.removeEventListener('playing', handler);
        newVideo.removeEventListener('canplay', handler);
        setTimeout(startFade, 40);
      };
      newVideo.addEventListener('playing', handler);
      newVideo.addEventListener('canplay', handler);
      setTimeout(handler, 2000);
    } else {
      requestAnimationFrame(startFade);
    }
  }

  function checkVideoChanged() {
    var video = document.querySelector('video');
    if (!video) return;
    if (video !== lastVideoRef) {
      if (lastVideoRef && lastSnapshot) {
        showOverlay(lastSnapshot, video);
        lastSnapshot = null;
      }
      lastVideoRef = video;
    }
  }

  function init() {
    setTimeout(captureCurrent, 500);
    setInterval(captureCurrent, 800);

    ['wheel', 'touchstart', 'click', 'keydown'].forEach(function (ev) {
      window.addEventListener(ev, captureCurrent, {
        capture: true,
        passive: true,
      });
    });

    new MutationObserver(checkVideoChanged).observe(document.body, {
      childList: true,
      subtree: true,
    });
    setInterval(checkVideoChanged, 200);
    checkVideoChanged();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
