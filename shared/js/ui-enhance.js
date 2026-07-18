/**
 * ui-enhance.js — peningkatan UI ringan untuk seluruh situs:
 *   1. Scroll progress bar (gradient) di atas halaman
 *   2. Tombol "kembali ke atas" yang muncul saat scroll
 *   3. Polesan hover halus untuk kartu (zero-specificity via :where(),
 *      sehingga TIDAK pernah menimpa hover bawaan tiap halaman)
 *
 * Dimuat otomatis oleh analytics.js di semua halaman.
 * - Menghormati prefers-reduced-motion.
 * - Idempoten: tidak menduplikasi elemen pada halaman yang sudah punya
 *   implementasi inline (index.html & jasa.html memakai id scrollProgress/toTop).
 * - Lewati halaman aplikasi/transaksi yang memasang <body data-enhance="off">.
 */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CARDS = '.card,.reg-card,.card-regulasi,.related-card,.tpl-card,.tmpl-doc-card,' +
              '.pkg-card,.doc-type-card,.edu-card,.sidebar-card,.author-card,.stat-card';

  function injectStyles() {
    if (document.getElementById('ui-enhance-style')) return;
    var css =
      '.ui-scroll-progress{position:fixed;top:0;left:0;height:3px;width:0;z-index:1000;' +
        'pointer-events:none;background:linear-gradient(90deg,#0071e3,#7c3aed,#14b8a6);' +
        'transition:width .1s linear}' +
      '.ui-to-top{position:fixed;right:20px;bottom:20px;z-index:998;width:44px;height:44px;' +
        'border-radius:50%;border:none;cursor:pointer;background:var(--accent,#0071e3);color:#fff;' +
        'font-size:1.15rem;line-height:1;display:flex;align-items:center;justify-content:center;' +
        'box-shadow:0 8px 24px rgba(0,0,0,.22);opacity:0;transform:translateY(16px) scale(.9);' +
        'pointer-events:none;transition:opacity .3s ease,transform .4s cubic-bezier(.34,1.56,1,1),filter .2s}' +
      '.ui-to-top.show{opacity:1;transform:none;pointer-events:auto}' +
      '.ui-to-top:hover{transform:translateY(-3px);filter:brightness(1.1)}' +
      ':where(' + CARDS + '){transition:transform .35s cubic-bezier(.34,1.56,1,1),' +
        'box-shadow .35s cubic-bezier(.34,1.56,1,1),border-color .3s ease}' +
      ':where(' + CARDS + '):hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(0,0,0,.12)}' +
      '@media (prefers-reduced-motion: reduce){' +
        '.ui-scroll-progress{transition:none}' +
        '.ui-to-top{transition:opacity .15s ease}' +
        ':where(' + CARDS + '){transition:none}' +
        ':where(' + CARDS + '):hover{transform:none}}';
    var st = document.createElement('style');
    st.id = 'ui-enhance-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function setupChrome() {
    // Jangan duplikasi bila halaman sudah punya implementasi sendiri
    if (document.getElementById('scrollProgress') || document.getElementById('toTop') ||
        document.getElementById('ui-scrollProgress')) return;

    var bar = document.createElement('div');
    bar.className = 'ui-scroll-progress';
    bar.id = 'ui-scrollProgress';
    document.body.appendChild(bar);

    var btn = document.createElement('button');
    btn.className = 'ui-to-top';
    btn.id = 'ui-toTop';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    var ticking = false;
    function update() {
      var h = document.documentElement;
      var sc = h.scrollTop || document.body.scrollTop;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (sc / max) * 100 : 0) + '%';
      if (sc > 600) btn.classList.add('show'); else btn.classList.remove('show');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    update();
  }

  function init() {
    var body = document.body;
    if (!body || body.getAttribute('data-enhance') === 'off') return;
    injectStyles();
    setupChrome();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
