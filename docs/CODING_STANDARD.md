# CODING STANDARD

> **Otoritatif: `../AGENTS.md` §5, §9, §13.** Dokumen ini ringkasan + penekanan. Jika berbeda,
> AGENTS.md menang.

## Bahasa & gaya
- Vanilla HTML5 + CSS + JS **browser-native**. Output ke pengguna tidak berubah oleh tooling.
- **JavaScript: ES Modules** (`import`/`export`), jalan langsung tanpa transpile.
- **Bahasa Indonesia** untuk komentar & teks UI. Ikuti gaya berkas sekitar (penamaan, idiom,
  kepadatan komentar).
- Path aset **relatif** & konsisten (`assets/...`). Hindari campur absolut/relatif tanpa alasan
  (lihat inkonsistensi `analytics.js` relatif vs `ui-enhance.js` absolut di homepage — rapikan).

## Halaman
- Halaman ber-include (klaster nav/footer) → edit di `src/tools/*` atau `_includes/*`, **bukan**
  output `tools/*` (akan tertimpa `build:pages`).
- Jaga keseimbangan tag; title/description/canonical unik; heading terstruktur.

## Backend (Functions)
- Pola tetap: **logika di `_lib.js`, route = wrapper tipis** (parse body → try → handler → catch).
- Validasi & sanitasi input server-side (panjang, clamp). Fail-closed rate-limit, fail-safe kredit.
- Jangan menaruh secret di klien/komentar/commit.

## Dependency
- **Nol dependency runtime.** Menambah paket/framework/bundler = keputusan manusia (AGENTS.md §11,§18).

## Commit (Conventional Commits)
`type(scope): deskripsi (Bahasa Indonesia)` · type: `feat|fix|refactor|chore|perf|docs` ·
scope: `site|tools|ui|brand|anim|template|docs|...`. Satu commit = satu perubahan logis.

## Verifikasi minimal sebelum commit (pengganti lint/test formal)
1. `node --check` untuk JS/config 11ty yang diubah.
2. Cek keseimbangan tag HTML halaman yang diubah + tak ada broken link/asset baru.
3. Bila `src/` diubah: `npm run build` &/atau `build:pages`, lalu **diff `dist/` vs output** =
   bukti tak ada regresi. Working tree bersih dari build-output liar sebelum commit.

## Refactor (AGENTS.md §9)
Mekanis, no visual change, bertahap per batch, dedup via `shared/` (bukan copy manual), ekstrak
hanya yang identik. Jangan perluas scope tanpa persetujuan.
</content>
