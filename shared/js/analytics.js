/**
 * analytics.js — Google Analytics 4 (gtag.js) dengan persetujuan (consent).
 *
 * Sejalan dengan semangat UU PDP No. 27/2022: analitik hanya dimuat SETELAH
 * pengunjung menyetujui. Pilihan disimpan di localStorage:
 *   aw_analytics_consent = 'granted' | 'denied'
 * - granted  -> GA4 dimuat.
 * - denied   -> GA4 tidak dimuat.
 * - (kosong) -> tampilkan banner kecil; GA4 belum dimuat sampai pengunjung memilih.
 */
(function () {
  var GA_ID = 'G-MHKQETVZ2R';
  var STORAGE_KEY = 'aw_analytics_consent';

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* abaikan */ }
  }

  function loadGA() {
    if (window.__awGaLoaded) return;
    window.__awGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function removeBanner(banner) {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
  }

  function showBanner() {
    if (!document.body) return;

    var banner = document.createElement('div');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Persetujuan analitik');
    var b = banner.style;
    b.position = 'fixed'; b.left = '16px'; b.right = '16px'; b.bottom = '16px';
    b.zIndex = '2147483000'; b.maxWidth = '520px'; b.margin = '0 auto';
    b.background = '#1d1d1f'; b.color = '#f5f5f7';
    b.borderRadius = '14px'; b.padding = '16px 18px';
    b.boxShadow = '0 12px 32px rgba(0,0,0,0.28)';
    b.fontFamily = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif";
    b.fontSize = '13px'; b.lineHeight = '1.55';
    b.display = 'flex'; b.flexWrap = 'wrap'; b.alignItems = 'center'; b.gap = '12px';

    var text = document.createElement('div');
    text.style.flex = '1 1 240px';
    text.style.minWidth = '200px';
    text.innerHTML = 'Situs ini memakai cookie analitik (Google Analytics) untuk memahami penggunaan dan memperbaiki layanan. ' +
      '<a href="kebijakan-privasi.html" style="color:#7cc0ff;text-decoration:underline;">Kebijakan Privasi</a>.';

    var actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    actions.style.flexShrink = '0';

    function makeBtn(label, primary) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      var s = btn.style;
      s.cursor = 'pointer'; s.border = '0'; s.borderRadius = '980px';
      s.padding = '8px 16px'; s.fontSize = '13px'; s.fontWeight = '600';
      s.fontFamily = 'inherit';
      if (primary) { s.background = '#0071e3'; s.color = '#fff'; }
      else { s.background = 'rgba(255,255,255,0.14)'; s.color = '#f5f5f7'; }
      return btn;
    }

    var accept = makeBtn('Terima', true);
    var decline = makeBtn('Tolak', false);

    accept.addEventListener('click', function () {
      saveConsent('granted');
      removeBanner(banner);
      loadGA();
    });
    decline.addEventListener('click', function () {
      saveConsent('denied');
      removeBanner(banner);
    });

    actions.appendChild(decline);
    actions.appendChild(accept);
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  var consent = readConsent();
  if (consent === 'granted') {
    loadGA();
  } else if (consent === 'denied') {
    // Tidak memuat apa pun.
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
