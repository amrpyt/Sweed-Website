(function () {
  function ensureCutouts() {
    document.querySelectorAll('.nav-menu').forEach(function (menu) {
      if (!menu.querySelector(':scope > .nav-cutout')) {
        var cutout = document.createElement('span');
        cutout.className = 'nav-cutout';
        cutout.setAttribute('aria-hidden', 'true');
        menu.insertBefore(cutout, menu.firstChild);
      }
    });
  }

  function markActiveLink() {
    var current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href && href === current) {
        link.classList.add('active');
      }
    });
  }

  function syncMenuState() {
    var button = document.querySelector('.hamburger');
    var menu = document.querySelector('.nav-menu');
    if (!button || !menu) return;

    var isOpen = menu.classList.contains('active');
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    document.documentElement.classList.toggle('mobile-menu-open', isOpen);
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureCutouts();
    markActiveLink();
    syncMenuState();

    var button = document.querySelector('.hamburger');
    var menu = document.querySelector('.nav-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');

    if (button) {
      button.addEventListener('click', function () {
        setTimeout(syncMenuState, 0);
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        setTimeout(syncMenuState, 0);
      });
    }

    document.querySelectorAll('.nav-menu a').forEach(function (link) {
      link.addEventListener('click', function () {
        setTimeout(syncMenuState, 0);
      });
    });

    if (menu && window.MutationObserver) {
      new MutationObserver(syncMenuState).observe(menu, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  });
})();
