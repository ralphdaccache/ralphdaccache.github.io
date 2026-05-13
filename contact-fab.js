(function () {
  var style = document.createElement('style');
  style.textContent =
    '.fixed.inset-0.bg-black.overflow-hidden .absolute.bottom-8.left-8.right-8 {' +
    'display: none !important;' +
    '}';
  document.head.appendChild(style);

  function build() {
    if (document.getElementById('contact-fab')) return;
    var a = document.createElement('a');
    a.id = 'contact-fab';
    a.href = 'mailto:ralphdaccache.film@gmail.com';
    a.textContent = 'Contact';
    a.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'left:24px',
      'z-index:99999',
      'padding:12px 20px',
      'border-radius:9999px',
      'border:1px solid rgba(255,255,255,0.25)',
      'background:rgba(0,0,0,0.5)',
      'backdrop-filter:blur(10px) saturate(160%)',
      '-webkit-backdrop-filter:blur(10px) saturate(160%)',
      'color:#fff',
      'text-decoration:none',
      'font-family:inherit',
      'font-size:12px',
      'font-weight:500',
      'letter-spacing:0.1em',
      'text-transform:uppercase',
      'transition:background 200ms ease, transform 150ms ease',
      'pointer-events:auto',
    ].join(';');
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
