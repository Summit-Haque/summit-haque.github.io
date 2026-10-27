(function () {
  var root = document.documentElement;

  /* ---------- Theme: follows the system, with a manual override ---------- */
  var toggle = document.querySelector('.theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return systemDark.matches ? 'dark' : 'light';
  }

  function updateToggleLabel() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var label = 'Switch to ' + next + ' theme';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  }

  if (toggle) {
    updateToggleLabel();
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      // If the choice matches the system, drop the override so the site keeps following it.
      var matchesSystem = (next === 'dark') === systemDark.matches;
      if (matchesSystem) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', next);
      try {
        if (matchesSystem) localStorage.removeItem('theme');
        else localStorage.setItem('theme', next);
      } catch (e) {}
      updateToggleLabel();
    });
    if (systemDark.addEventListener) systemDark.addEventListener('change', updateToggleLabel);
  }

  /* ---------- Publication filters ---------- */
  var pubs = Array.prototype.slice.call(document.querySelectorAll('.pub'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filter'));

  filters.forEach(function (btn) {
    var type = btn.getAttribute('data-filter');
    var n = type === 'all' ? pubs.length : pubs.filter(function (p) { return p.dataset.type === type; }).length;
    var count = btn.querySelector('.count');
    if (count) count.textContent = n;

    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      pubs.forEach(function (p) { p.hidden = !(type === 'all' || p.dataset.type === type); });
    });
  });

  /* ---------- Top bar: border + wordmark after scrolling past the name ---------- */
  var bar = document.querySelector('.topbar');
  var name = document.querySelector('.name');
  if (bar && name && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { rootMargin: '-60px 0px 0px 0px' }).observe(name);
  }

  /* ---------- Highlight the section in view ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var targets = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var active = null;
      for (var i = 0; i < targets.length; i++) {
        if (visible[targets[i].id]) { active = targets[i].id; break; }
      }
      navLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
