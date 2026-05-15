(function () {
  var path = window.location.pathname.replace(/\/index\.html$/, '/');
  if (path === '') path = '/';

  var config = null;
  if (path === '/') {
    config = {
      label: 'IMDb',
      href: 'https://www.imdb.com/name/nm17435196/?ref_=ext_shr_lnk',
      inner:
        '<span style="font-weight:700;font-size:11px;letter-spacing:0.01em;">IMDb</span>',
    };
  } else if (path === '/music/' || path === '/music') {
    config = {
      label: 'SoundCloud',
      href: 'https://on.soundcloud.com/7kVpP14D4ObJAhz7Qz',
      inner:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' +
        '</svg>',
    };
  }

  if (!config) return;

  function build() {
    if (document.getElementById('social-link-pill')) return;
    var a = document.createElement('a');
    a.id = 'social-link-pill';
    a.href = config.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', config.label);
    a.style.cssText = [
      'position:fixed',
      'top:84px',
      'right:24px',
      'z-index:99999',
      'width:48px',
      'height:48px',
      'border-radius:9999px',
      'border:1px solid rgba(255,255,255,0.25)',
      'background:rgba(0,0,0,0.5)',
      'backdrop-filter:blur(10px) saturate(160%)',
      '-webkit-backdrop-filter:blur(10px) saturate(160%)',
      'color:#fff',
      'cursor:pointer',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'padding:0',
      'text-decoration:none',
      'font-family:inherit',
      'transition:background 200ms ease, transform 150ms ease',
    ].join(';');
    a.innerHTML = config.inner;
    a.addEventListener('mouseenter', function () {
      a.style.background = 'rgba(0,0,0,0.75)';
    });
    a.addEventListener('mouseleave', function () {
      a.style.background = 'rgba(0,0,0,0.5)';
    });
    a.addEventListener('mousedown', function () {
      a.style.transform = 'scale(0.96)';
    });
    a.addEventListener('mouseup', function () {
      a.style.transform = 'scale(1)';
    });
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
