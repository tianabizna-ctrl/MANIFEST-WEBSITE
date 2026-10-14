(function () {
  var nav = document.querySelector('.main-nav');
  if (!nav) return;

  // "More" control at the right end of the row
  var wrap = document.createElement('div');
  wrap.className = 'more-wrap';
  wrap.hidden = true;
  wrap.innerHTML =
    '<button type="button" class="more-btn" aria-expanded="false">More <span class="chev" aria-hidden="true"></span></button>' +
    '<div class="more-menu"></div>';
  nav.appendChild(wrap);
  var btn = wrap.querySelector('.more-btn');
  var menu = wrap.querySelector('.more-menu');
  var items = Array.prototype.slice.call(nav.querySelectorAll(':scope > a, :scope > .nav-group'));

  function setOpen(open) {
    wrap.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Put every item back in the row, in its original order
  function restore() {
    items.forEach(function (a) { nav.insertBefore(a, wrap); });
    wrap.hidden = true;
    setOpen(false);
  }

  function layout() {
    restore();
    if (window.matchMedia('(max-width: 900px)').matches) return; // mobile uses the menu button
    var gap = parseFloat(getComputedStyle(nav).columnGap) || 0;
    var limit = nav.clientWidth;

    var total = 0;
    items.forEach(function (a, i) { total += a.offsetWidth + (i ? gap : 0); });
    if (total <= limit) return; // everything fits on one line

    wrap.hidden = false;
    var moreW = wrap.offsetWidth;
    var used = 0, keep = 0;
    for (var i = 0; i < items.length; i++) {
      var w = items[i].offsetWidth + (i ? gap : 0);
      if (used + w + gap + moreW > limit) break;
      used += w;
      keep++;
    }
    items.slice(keep).forEach(function (a) { menu.appendChild(a); });
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(layout, 120);
  });
  window.addEventListener('load', layout);
  layout();
})();
