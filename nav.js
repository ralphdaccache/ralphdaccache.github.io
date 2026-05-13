(function () {
  var LINKS = [
    { label: 'Filmography', href: '/' },
    { label: 'Music', href: '/music/' },
    { label: 'Photography', href: '/photography/' },
    { label: 'About', href: '/about/' },
  ];
  var LOGO_TEXT = 'rd';
  var MOBILE_BP = 768;

  if (!document.getElementById('jbm-font-link')) {
    var fontLink = document.createElement('link');
    fontLink.id = 'jbm-font-link';
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap';
    document.head.appendChild(fontLink);
  }

  function isActive(link) {
    if (link.href === '#') return false;
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    if (link.href === '/') return path === '/' || path === '';
    return path === link.href || path === link.href.replace(/\/$/, '');
  }

  var pillBase = [
    'position:fixed',
    'top:24px',
    'z-index:10000',
    'background:rgba(0,0,0,0.42)',
    'backdrop-filter:blur(14px) saturate(160%)',
    '-webkit-backdrop-filter:blur(14px) saturate(160%)',
    'border:1px solid rgba(255,255,255,0.14)',
    'border-radius:9999px',
    'color:#fff',
    'font-family:inherit',
    'box-shadow:0 10px 40px rgba(0,0,0,0.25)',
    'pointer-events:auto',
    'opacity:0',
    'transform:translateY(-8px)',
    'transition:opacity 600ms ease, transform 600ms ease',
  ].join(';');

  var ICON_HAMBURGER =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/></svg>';
  var ICON_CLOSE =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

  function buildLogoPill() {
    var pill = document.createElement('a');
    pill.href = '/';
    pill.id = 'nav-logo-pill';
    pill.style.cssText = [
      'position:fixed',
      'top:24px',
      'left:24px',
      'z-index:10000',
      'width:48px',
      'height:48px',
      'border-radius:9px',
      'background:#ece6d8',
      'color:#0a0a0a',
      "font-family:'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      'font-weight:700',
      'font-size:26px',
      'letter-spacing:-0.03em',
      'text-decoration:none',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'box-shadow:0 8px 28px rgba(0,0,0,0.28)',
      'pointer-events:auto',
      'opacity:0',
      'transform:translateY(-8px)',
      'transition:opacity 600ms ease, transform 600ms ease, box-shadow 200ms ease',
    ].join(';');
    pill.textContent = LOGO_TEXT;
    pill.addEventListener('mouseenter', function () {
      pill.style.boxShadow = '0 12px 36px rgba(0,0,0,0.36)';
    });
    pill.addEventListener('mouseleave', function () {
      pill.style.boxShadow = '0 8px 28px rgba(0,0,0,0.28)';
    });
    return pill;
  }

  function buildLinksPill() {
    var pill = document.createElement('nav');
    pill.id = 'nav-links-pill';
    pill.style.cssText =
      pillBase +
      ';right:24px;padding:6px 8px;display:inline-flex;align-items:center;gap:2px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;';

    LINKS.forEach(function (link) {
      var active = isActive(link);
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.style.cssText = [
        'padding:8px 14px',
        'border-radius:9999px',
        'color:rgba(255,255,255,' + (active ? '1' : '0.7') + ')',
        'background:' + (active ? 'rgba(255,255,255,0.14)' : 'transparent'),
        'text-decoration:none',
        'transition:background 200ms ease, color 200ms ease',
        'white-space:nowrap',
        'font-weight:' + (active ? '500' : '400'),
      ].join(';');
      a.addEventListener('mouseenter', function () {
        a.style.color = '#fff';
        a.style.background = active
          ? 'rgba(255,255,255,0.2)'
          : 'rgba(255,255,255,0.08)';
      });
      a.addEventListener('mouseleave', function () {
        a.style.color = 'rgba(255,255,255,' + (active ? '1' : '0.7') + ')';
        a.style.background = active ? 'rgba(255,255,255,0.14)' : 'transparent';
      });
      if (link.href === '#') {
        a.addEventListener('click', function (e) {
          e.preventDefault();
        });
      }
      pill.appendChild(a);
    });

    return pill;
  }

  function buildHamburgerPill() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Open menu');
    btn.style.cssText =
      pillBase +
      ';right:24px;padding:0;width:48px;height:48px;display:none;align-items:center;justify-content:center;cursor:pointer;';
    btn.innerHTML = ICON_HAMBURGER;
    return btn;
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9998',
      'background:rgba(0,0,0,0.55)',
      'backdrop-filter:blur(22px) saturate(160%)',
      '-webkit-backdrop-filter:blur(22px) saturate(160%)',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'gap:28px',
      'opacity:0',
      'pointer-events:none',
      'transition:opacity 280ms ease',
    ].join(';');

    LINKS.forEach(function (link) {
      var active = isActive(link);
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.style.cssText = [
        'color:#fff',
        'text-decoration:none',
        'font-size:22px',
        'letter-spacing:0.14em',
        'text-transform:uppercase',
        'font-weight:' + (active ? '500' : '300'),
        'opacity:' + (active ? '1' : '0.65'),
        'transition:opacity 200ms ease',
      ].join(';');
      a.addEventListener('mouseenter', function () {
        a.style.opacity = '1';
      });
      a.addEventListener('mouseleave', function () {
        a.style.opacity = active ? '1' : '0.65';
      });
      if (link.href === '#') {
        a.addEventListener('click', function (e) {
          e.preventDefault();
        });
      }
      overlay.appendChild(a);
    });
    return overlay;
  }

  function reveal(el) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  function init() {
    var logo = buildLogoPill();
    var links = buildLinksPill();
    var hamburger = buildHamburgerPill();
    var overlay = buildOverlay();

    document.body.appendChild(overlay);
    document.body.appendChild(logo);
    document.body.appendChild(links);
    document.body.appendChild(hamburger);

    reveal(logo);
    reveal(links);
    reveal(hamburger);

    var menuOpen = false;
    function setMenu(open) {
      menuOpen = open;
      overlay.style.opacity = open ? '1' : '0';
      overlay.style.pointerEvents = open ? 'auto' : 'none';
      hamburger.innerHTML = open ? ICON_CLOSE : ICON_HAMBURGER;
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    hamburger.addEventListener('click', function () {
      setMenu(!menuOpen);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) setMenu(false);
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setMenu(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) setMenu(false);
    });

    function applyResponsive() {
      if (window.innerWidth < MOBILE_BP) {
        links.style.display = 'none';
        hamburger.style.display = 'flex';
      } else {
        links.style.display = 'inline-flex';
        hamburger.style.display = 'none';
        if (menuOpen) setMenu(false);
      }
    }
    window.addEventListener('resize', applyResponsive);
    applyResponsive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
