(function () {
  "use strict";

  var DATA = window.TOKO_DATA;
  if (!DATA) return;

  var store = DATA.store;

  /**
   * Nomor WA, hanya digit (dipakai di semua tempat yg butuh nomor bersih).
   */
  function waDigits() {
    return store.whatsappNumber.replace(/[^0-9]/g, "");
  }

  /**
   * Bangun link wa.me dengan pesan yang sudah terisi.
   */
  function waLink(message) {
    return "https://wa.me/" + waDigits() + "?text=" + encodeURIComponent(message);
  }

  function defaultGreeting() {
    return "Halo " + store.name + ", saya mau tanya-tanya produk yang tersedia.";
  }

  function productGreeting(productName) {
    return "Halo, saya mau tanya harga " + productName + " di " + store.name + ".";
  }

  // ---------- WA buttons ----------
  var waButtonIds = ["header-wa-btn", "hero-wa-btn", "lokasi-wa-btn", "fab-wa-btn"];
  waButtonIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = waLink(defaultGreeting());
  });

  // ---------- Nomor telepon tampil (untuk dibaca/disalin manual) ----------
  // Ditulis dalam format internasional "+<digits>" apa adanya — tidak
  // mengasumsikan nomor selalu berawalan kode negara Indonesia "62", supaya
  // tetap benar walau pemilik toko mengisi format lain.
  (function renderPhoneDisplay() {
    var el = document.getElementById("phone-display");
    if (!el) return;
    el.textContent = "WhatsApp: +" + waDigits();
  })();

  // ---------- Lengkapi schema.org JSON-LD dengan telepon & jam operasional ----------
  var DAY_NAME_EN = {
    0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday",
    4: "Thursday", 5: "Friday", 6: "Saturday",
  };

  (function enrichSchema() {
    var script = document.querySelector('script[type="application/ld+json"]');
    if (!script) return;
    try {
      var json = JSON.parse(script.textContent);
      json.telephone = "+" + waDigits();
      json.openingHoursSpecification = Object.keys(store.hours)
        .filter(function (dayIdx) {
          var d = store.hours[dayIdx];
          return d && !d.closed;
        })
        .map(function (dayIdx) {
          var d = store.hours[dayIdx];
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: DAY_NAME_EN[dayIdx],
            opens: d.open,
            closes: d.close,
          };
        });
      script.textContent = JSON.stringify(json);
    } catch (e) {
      /* JSON-LD statis tetap valid tanpa data tambahan jika parsing gagal */
    }
  })();

  // ---------- Maps links ----------
  ["maps-link-tentang", "maps-link-lokasi"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = store.mapsLink;
  });

  // ---------- Maps embed ----------
  (function renderMapsEmbed() {
    var wrap = document.getElementById("maps-embed-wrap");
    if (!wrap) return;

    if (store.mapsEmbedSrc) {
      var iframe = document.createElement("iframe");
      iframe.src = store.mapsEmbedSrc;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.title = "Peta lokasi " + store.name;
      iframe.setAttribute("allowfullscreen", "");
      wrap.appendChild(iframe);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "lokasi__map-placeholder";
      placeholder.innerHTML =
        '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" style="width:2em;height:2em;color:var(--color-primary)"><use href="#icon-pin"></use></svg>' +
        "<p>Peta akan tampil di sini setelah link Google Maps toko ditambahkan.</p>";
      var link = document.createElement("a");
      link.href = store.mapsLink;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "btn btn--outline btn--small";
      link.textContent = "Buka di Google Maps";
      placeholder.appendChild(link);
      wrap.appendChild(placeholder);
    }
  })();

  // ---------- Jam operasional ----------
  (function renderHours() {
    var now = new Date();
    var todayIdx = now.getDay();
    var today = store.hours[todayIdx];

    function toMinutes(hhmm) {
      var parts = hhmm.split(":").map(Number);
      return parts[0] * 60 + parts[1];
    }

    var isOpenNow = false;
    if (today && !today.closed) {
      var nowMinutes = now.getHours() * 60 + now.getMinutes();
      var openMinutes = toMinutes(today.open);
      var closeMinutes = toMinutes(today.close);
      isOpenNow = nowMinutes >= openMinutes && nowMinutes < closeMinutes;
    }

    var statusText =
      (isOpenNow ? "Buka Sekarang" : "Tutup Sekarang") +
      (today && !today.closed ? " · " + today.open + "–" + today.close : "");

    ["status-badge", "status-badge-2"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = statusText;
      el.classList.remove("status-badge--open", "status-badge--closed");
      el.classList.add(isOpenNow ? "status-badge--open" : "status-badge--closed");
    });

    var list = document.getElementById("jam-list");
    if (list) {
      var order = [1, 2, 3, 4, 5, 6, 0];
      var html = order
        .map(function (dayIdx) {
          var d = store.hours[dayIdx];
          if (!d) return "";
          var isToday = dayIdx === todayIdx;
          var hoursText = d.closed ? "Tutup" : d.open + " – " + d.close;
          return (
            "<li" + (isToday ? ' data-today="true"' : "") + ">" +
            "<span>" + escapeHtml(d.label) + (isToday ? " (Hari ini)" : "") + "</span>" +
            "<span>" + escapeHtml(hoursText) + "</span>" +
            "</li>"
          );
        })
        .join("");
      list.innerHTML = html;
    }
  })();

  // ---------- Ikon: fallback ke ikon umum jika key tidak dikenal ----------
  // Daftar ini harus sinkron dengan id <symbol> di sprite SVG pada index.html.
  var KNOWN_ICONS = [
    "beras", "minyak", "gula", "tepung", "bumbu", "minuman", "rokok", "harian",
    "harga", "lengkap", "lokasi", "ramah",
  ];
  var FALLBACK_ICON = "harian";

  function iconMarkup(iconKey) {
    var safeKey = KNOWN_ICONS.indexOf(iconKey) !== -1 ? iconKey : FALLBACK_ICON;
    return '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><use href="#icon-' + safeKey + '"></use></svg>';
  }

  // ---------- Render kategori produk ----------
  (function renderProducts() {
    var grid = document.getElementById("product-grid");
    if (!grid || !Array.isArray(DATA.categories)) return;

    var html = DATA.categories
      .map(function (cat) {
        var mediaHtml = cat.image
          ? '<img src="' + escapeHtml(cat.image) + '" alt="" loading="lazy" width="52" height="52" />'
          : iconMarkup(cat.icon);

        return (
          '<li class="product-card">' +
          '<div class="product-card__icon">' + mediaHtml + "</div>" +
          '<h3 class="product-card__name">' + escapeHtml(cat.name) + "</h3>" +
          '<p class="product-card__desc">' + escapeHtml(cat.desc || "") + "</p>" +
          '<a class="btn btn--outline btn--small" href="' +
          waLink(productGreeting(cat.name)) +
          '" target="_blank" rel="noopener" aria-label="Tanya harga ' +
          escapeHtml(cat.name) +
          ' via WhatsApp">Tanya Harga</a>' +
          "</li>"
        );
      })
      .join("");

    grid.innerHTML = html;
  })();

  // ---------- Render kenapa pilih kami ----------
  (function renderWhyUs() {
    var grid = document.getElementById("whyus-grid");
    if (!grid || !Array.isArray(DATA.whyUs)) return;

    var html = DATA.whyUs
      .map(function (item) {
        return (
          '<li class="whyus-card">' +
          '<div class="whyus-card__icon">' + iconMarkup(item.icon) + "</div>" +
          "<h3>" + escapeHtml(item.title) + "</h3>" +
          "<p>" + escapeHtml(item.desc) + "</p>" +
          "</li>"
        );
      })
      .join("");

    grid.innerHTML = html;
  })();

  // ---------- Footer year ----------
  var yearEl = document.getElementById("tahun");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Util ----------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
