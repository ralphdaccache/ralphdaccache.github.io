(function () {
  function stripBy() {
    var ps = document.querySelectorAll('p.font-light.transition-all');
    for (var i = 0; i < ps.length; i++) {
      var node = ps[i].firstChild;
      if (
        node &&
        node.nodeType === 3 &&
        node.textContent.indexOf('BY ') === 0
      ) {
        node.textContent = node.textContent.slice(3);
      }
    }
  }

  function init() {
    stripBy();
    new MutationObserver(stripBy).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
