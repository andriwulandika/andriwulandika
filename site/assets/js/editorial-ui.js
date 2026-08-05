/* ============================================================================
   editorial-ui.js — perilaku sistem desain "BERKAS"
   ----------------------------------------------------------------------------
   Prinsip gerak: MEKANIS, bukan mengambang. Referensinya mesin cetak & plotter,
   bukan animasi "fade-up + scale" yang dipakai semua template.

     · garis ditarik dari kiri (scaleX)
     · teks tersingkap lewat mask (clip-path), seperti huruf sedang di-set
     · skema hero digambar stroke demi stroke seperti plotter
     · angka berjalan naik seperti pencacah mekanis

   Setiap blok memeriksa dulu elemennya ada, jadi berkas ini aman dipakai di
   halaman mana pun. Semua gerak menghormati prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  /* ── Navigasi seluler ───────────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var mobnav = document.getElementById('mobnav');
  if (burger && mobnav) {
    burger.addEventListener('click', function () {
      var open = mobnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobnav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Ticker: gandakan isi supaya putarannya mulus ───────────────────────── */
  var track = document.getElementById('ticker');
  if (track) track.innerHTML = track.innerHTML + track.innerHTML;

  /* ── Saringan portofolio ────────────────────────────────────────────────── */
  var filts = document.querySelectorAll('.filt');
  var plates = document.querySelectorAll('.plate');
  if (filts.length && plates.length) {
    filts.forEach(function (f) {
      f.addEventListener('click', function () {
        filts.forEach(function (x) { x.classList.remove('on'); });
        f.classList.add('on');
        var cat = f.getAttribute('data-filter');
        plates.forEach(function (p) {
          p.classList.toggle('hide', cat !== 'all' && p.getAttribute('data-cat') !== cat);
        });
      });
    });
  }

  /* ── FAQ ────────────────────────────────────────────────────────────────── */
  var faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqs.forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Pencacah mekanis: angka berjalan naik ──────────────────────────────── */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = prefix + target + suffix; return; }
    var started = null, dur = 1100;
    function tick(now) {
      if (started === null) started = now;
      var p = Math.min((now - started) / dur, 1);
      // easing keluar — cepat di awal, mengunci di akhir seperti pencacah
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── Pengungkap saat masuk layar ────────────────────────────────────────── */
  /* Elemen .rv dibungkus isinya supaya bisa digeser di balik overflow:hidden.
     Ini menggantikan clip-path, yang membuat elemen tak pernah terdeteksi
     masuk layar oleh IntersectionObserver. */
  if (!reduce) {
    document.querySelectorAll('.rv').forEach(function (el) {
      if (el.firstElementChild && el.firstElementChild.classList.contains('rv-i')) return;
      var inner = document.createElement('span');
      inner.className = 'rv-i';
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
    });
  }

  var revealSel = '.rv, .rl, .up, .mark, [data-count]';
  var items = document.querySelectorAll(revealSel);

  function activate(el) {
    if (el.hasAttribute('data-count')) { runCounter(el); return; }
    if (el.classList.contains('mark')) { el.classList.add('drawn'); return; }
    el.classList.add('in');
  }

  if (!canObserve || reduce) {
    items.forEach(activate);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        activate(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ── Skema hero: siapkan panjang stroke supaya bisa "digambar" ───────────
     Kelas .plot baru dipasang setelah panjang tiap stroke berhasil dihitung.
     Kalau langkah ini gagal, skema tetap tampil utuh sebagai gambar diam. */
  var schematic = document.querySelector('.schematic');
  if (schematic && !reduce) {
    var strokes = schematic.querySelectorAll('.draw');
    var measured = strokes.length > 0;
    strokes.forEach(function (path) {
      var len = 0;
      try { len = path.getTotalLength(); } catch (e) { measured = false; }
      if (!len) { measured = false; return; }
      path.style.setProperty('--len', Math.ceil(len));
    });
    if (measured) schematic.classList.add('plot');
  }

  /* ── Nyalakan hero setelah tata letak siap ──────────────────────────────── */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('ready'); });
    });
  }

  /* ── Punggung dokumen: penanda posisi + nama bagian berjalan ────────────── */
  var spine = document.querySelector('.spine');
  if (spine && canObserve) {
    var tick = spine.querySelector('.spine-tick');
    var label = spine.querySelector('.spine-label');
    var marked = Array.prototype.slice.call(document.querySelectorAll('[data-spine]'));

    if (tick) {
      var ticking = false;
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var max = document.documentElement.scrollHeight - window.innerHeight;
          var p = max > 0 ? Math.min(window.pageYOffset / max, 1) : 0;
          tick.style.top = (p * 100).toFixed(2) + '%';
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (label && marked.length) {
      var spineIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) label.textContent = en.target.getAttribute('data-spine');
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      marked.forEach(function (el) { spineIO.observe(el); });
    }
  }

  /* ── Tautan jangkar: gulir halus bawaan peramban ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
