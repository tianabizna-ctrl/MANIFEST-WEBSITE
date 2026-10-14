(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);
  var img = box.querySelector('img');

  function close() { box.classList.remove('open'); }

  box.addEventListener('click', function (e) {
    if (e.target !== img) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  document.querySelectorAll('a[data-lb]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      box.classList.add('open');
    });
  });
})();

/* Open a location block when its header pill (or any #loc-… link) is used */
(function () {
  function openFromHash() {
    var id = window.location.hash.slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
    }
  }
  window.addEventListener('hashchange', openFromHash);
  document.addEventListener('DOMContentLoaded', openFromHash);
})();
