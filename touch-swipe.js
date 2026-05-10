(function () {
  var SWIPE_THRESHOLD = 50;
  var TIME_THRESHOLD = 800;
  var startY = null;
  var startX = null;
  var startTime = null;

  var style = document.createElement('style');
  style.textContent = 'html, body { overscroll-behavior: none; }';
  document.head.appendChild(style);

  function getContainer() {
    return document.querySelector('.fixed.inset-0.bg-black.overflow-hidden');
  }

  document.addEventListener(
    'touchstart',
    function (e) {
      if (e.touches.length !== 1) {
        startY = null;
        return;
      }
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      startTime = Date.now();
    },
    { passive: true }
  );

  document.addEventListener(
    'touchmove',
    function (e) {
      if (startY === null) return;
      if (!getContainer()) return;
      var t = e.touches[0];
      var dy = Math.abs(t.clientY - startY);
      var dx = Math.abs(t.clientX - startX);
      if (dy > dx && dy > 10) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener(
    'touchend',
    function (e) {
      if (startY === null) return;
      var endY = e.changedTouches[0].clientY;
      var endX = e.changedTouches[0].clientX;
      var deltaY = startY - endY;
      var deltaX = endX - startX;
      var elapsed = Date.now() - startTime;
      startY = null;

      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;
      if (elapsed > TIME_THRESHOLD) return;

      var container = getContainer();
      if (!container) return;

      var wheelEvent = new WheelEvent('wheel', {
        deltaY: deltaY,
        deltaMode: 0,
        bubbles: true,
        cancelable: true,
      });
      container.dispatchEvent(wheelEvent);
    },
    { passive: true }
  );
})();
