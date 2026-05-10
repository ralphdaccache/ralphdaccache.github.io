(function () {
  var V_THRESHOLD = 50;
  var H_THRESHOLD = 60;
  var TIME_THRESHOLD = 800;
  var DEBOUNCE_MS = 700;
  var startY = null;
  var startX = null;
  var startTime = null;
  var lastSwipe = 0;

  var NAV_PAGES = ['/', '/music/', '/photography/'];

  var style = document.createElement('style');
  style.textContent = 'html, body { overscroll-behavior: none; }';
  document.head.appendChild(style);

  function getProjectItems() {
    return document.querySelectorAll(
      'div.transition-all.duration-500.cursor-pointer'
    );
  }

  function getActiveIndex(items) {
    for (var i = 0; i < items.length; i++) {
      if ((items[i].className || '').indexOf('opacity-100') !== -1) return i;
    }
    return -1;
  }

  function isOnFilmography() {
    return !!document.querySelector('.fixed.inset-0.bg-black.overflow-hidden');
  }

  function getCurrentNavIndex() {
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    if (path === '') path = '/';
    for (var i = 0; i < NAV_PAGES.length; i++) {
      if (path === NAV_PAGES[i] || path === NAV_PAGES[i].replace(/\/$/, '')) {
        return i;
      }
    }
    return -1;
  }

  function navigateHorizontal(direction) {
    var idx = getCurrentNavIndex();
    if (idx < 0) return false;
    var target = idx + direction;
    if (target < 0 || target >= NAV_PAGES.length) return false;
    window.location.href = NAV_PAGES[target];
    return true;
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
      var t = e.touches[0];
      var dy = Math.abs(t.clientY - startY);
      var dx = Math.abs(t.clientX - startX);
      if (dy > 10 || dx > 10) {
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

      if (elapsed > TIME_THRESHOLD) return;
      if (Date.now() - lastSwipe < DEBOUNCE_MS) return;

      var absY = Math.abs(deltaY);
      var absX = Math.abs(deltaX);

      if (absX > absY && absX > H_THRESHOLD) {
        lastSwipe = Date.now();
        navigateHorizontal(deltaX > 0 ? -1 : 1);
        return;
      }

      if (absY > absX && absY > V_THRESHOLD) {
        if (!isOnFilmography()) return;
        var items = getProjectItems();
        if (!items.length) return;
        var activeIdx = getActiveIndex(items);
        if (activeIdx < 0) return;

        var targetIdx;
        if (deltaY > 0 && activeIdx < items.length - 1) {
          targetIdx = activeIdx + 1;
        } else if (deltaY < 0 && activeIdx > 0) {
          targetIdx = activeIdx - 1;
        } else {
          return;
        }

        lastSwipe = Date.now();
        items[targetIdx].click();
      }
    },
    { passive: true }
  );
})();
