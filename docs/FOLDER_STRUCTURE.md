# FOLDER STRUCTURE

> Sinkron dengan `../AGENTS.md` §4. Bila berbeda, AGENTS.md menang — laporkan agar diselaraskan.

```
/
├── package.json / package-lock.json   # scripts: build, build:pages ; devDeps: 11ty, sharp
├── AGENTS.md                           # konstitusi engineering (otoritatif teknis)
├── docs/                               # ⟵ knowledge base ini (SSOT strategi/produk)
├── .eleventy.site.js / .eleventy.tools.js / eleventy.factory.js   # config 11ty (authoring)
├── scripts/
│   ├── sync-assets.sh                  # shared/ → site/assets & tools/assets (+ ikon root)
│   └── build-pages.sh                  # 11ty src/ → dist/ → salin ke site/ & tools/
├── shared/                             # SSOT ASET (brand + js) — jangan edit salinannya
│   ├── brand/                          # logo/favicon/wallpaper (SVG+PNG multi-varian)
│   └── js/                             # analytics, apiService, nav-auth, ui-enhance
├── src/                                # SSOT HALAMAN (authoring 11ty)
│   ├── site/                           # sumber andriwulandika.uk
│   └── tools/                          # sumber ai.andriwulandika.uk
│       ├── _includes/                  # nav/footer include (dipakai 12 halaman)
│       ├── assets/{css,data/nomenklatur,templates,js,brand}/
│       └── functions/                  # sumber backend (mirror ke tools/functions)
├── dist/                               # OUTPUT TRANSIEN 11ty (gitignored)
├── site/                               # ⟶ andriwulandika.uk (di-commit & di-serve, no build)
│   ├── *.html, _headers, _redirects, robots.txt, sitemap.xml, favicon.*, og-image*.png
│   └── assets/{brand,js,share}/        # brand & js diisi sync-assets.sh
└── tools/                              # ⟶ ai.andriwulandika.uk (di-commit & di-serve, no build)
    ├── *.html, _headers, _redirects, robots.txt, sitemap.xml
    ├── functions/{_lib.js, generate.js, verify.js, admin/*.js}
    └── assets/{brand,js,css,data/nomenklatur,templates}/
```

## Aturan sumber-kebenaran (kritis)
- Aset bersama → edit **`shared/`**, jalankan `npm run build`.
- Halaman → edit **`src/site|tools/`** (khususnya yang pakai `{% include %}`), jalankan
  `npm run build:pages`. Jangan edit `site/`/`tools/` output langsung untuk halaman ber-include.
- Backend → repo punya `src/tools/functions/` **dan** `tools/functions/`; keduanya harus sinkron
  (yang di-serve = `tools/functions/`). ⚠️ potensi drift — verifikasi keduanya identik saat edit.
- `dist/` transien, **jangan commit** (gitignored). Bersihkan build-output liar sebelum commit.

## Catatan technical-debt struktur
Dual-source (`src/` + output di-commit) & dual backend (`src/tools/functions` + `tools/functions`)
menaikkan risiko drift; ideal dijaga CI diff (`TODO.md` CI-01, `AUDIT_REPORT.md` #20).
</content>
