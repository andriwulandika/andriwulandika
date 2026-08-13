/* ============================================================================
   editorial-ui.js — perilaku untuk tampilan gelap-minimalis
   ----------------------------------------------------------------------------
   Mengikuti karakter referensi (monod.framer.website): gerak PELAN dan HALUS,
   bukan mencolok. Tidak ada efek yang menarik perhatian ke dirinya sendiri.

   Setiap blok memeriksa dulu elemennya ada, jadi berkas ini aman dipakai di
   halaman mana pun. Semua gerak menghormati prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  /* ── Menu seluler ───────────────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mnav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Saringan karya ─────────────────────────────────────────────────────── */
  var filts = document.querySelectorAll('.filt');
  var cards = document.querySelectorAll('.card[data-cat]');
  if (filts.length && cards.length) {
    filts.forEach(function (f) {
      f.addEventListener('click', function () {
        filts.forEach(function (x) { x.classList.remove('on'); });
        f.classList.add('on');
        var cat = f.getAttribute('data-filter');
        cards.forEach(function (c) {
          c.classList.toggle('hide', cat !== 'all' && c.getAttribute('data-cat') !== cat);
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

  /* ── Muncul perlahan saat masuk layar ───────────────────────────────────
     Sengaja memakai opacity + geser, BUKAN clip-path: clip-path ikut
     diperhitungkan Chrome saat menentukan perpotongan, sehingga elemen yang
     di-clip sampai nol tinggi tidak pernah dianggap masuk layar. */
  var risers = document.querySelectorAll('.rise');
  if (!canObserve || reduce) {
    risers.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ── Tautan jangkar: gulir halus bawaan peramban ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
