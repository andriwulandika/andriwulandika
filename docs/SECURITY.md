# SECURITY

> Otoritatif: `../AGENTS.md` §12. Ini ringkasan + status + gap.

## Postur saat ini (kuat)
### Rahasia
- Secret hanya di Cloudflare (tak pernah di-commit): `GEMINI_API_KEY`, `CLAUDE_API_KEY`,
  `ADMIN_PASSWORD`; binding KV `ACCESS_CODES`. Klien tak pernah melihat kunci (proxy server-side).

### Autentikasi & abuse
- Admin: **perbandingan password constant-time** (`timingSafeEqual`) → tak bocor via timing.
- **Rate-limit**: publik 100/mnt/IP (`/generate`), admin 20/mnt/IP (`/admin/*`), namespace KV
  terpisah, **fail-closed** (tanpa KV → tolak).
- Kode akses acak tanpa karakter ambigu; verifikasi server-side (`hasAccess`).

### Integritas transaksi
- **Kredit dipotong hanya setelah AI sukses** (fail-safe) → tak ada double-charge saat error.
- Validasi/клamp input: prompt 5–5000 char, temperature 0–2, maxTokens 100–8000.

### Header (`_headers`, kedua situs)
HSTS (1thn, includeSubDomains) · X-Content-Type-Options nosniff · X-Frame-Options SAMEORIGIN ·
Referrer-Policy strict-origin-when-cross-origin · Permissions-Policy (geo/mic/cam off).

## Gap & rekomendasi (→ `TODO.md`, `RISK_REGISTER.md`)
| Gap | Prioritas | Rekomendasi |
|---|---|---|
| **Tanpa Content-Security-Policy** | P1 | Rancang CSP; banyak inline style/script → mulai `Content-Security-Policy-Report-Only`, lalu nonce/hash. Hati-hati GA4 & inline. |
| Rate-limit increment non-atomik | P3 | Aman skala kini; bila skala naik, gunakan Durable Objects/atomic counter. |
| Kode akses hanya di localStorage | P2 | Tanpa akun → kode hilang = manual recover. Pertimbangkan akun/email (Future). |
| Admin password tunggal (bus factor) | P2 | Rotasi berkala; pertimbangkan 2FA/allowlist IP untuk `/admin/*`. |
| Tak ada secret scanning otomatis | P2 | Tambah gitleaks/secret-scan di CI (`TODO.md` CI-01). |
| Demo abuse (biaya token) | P3 | Sudah dibatasi rate-limit; pantau biaya; captcha bila perlu. |

## Aturan (wajib)
- Perubahan `functions/` yang menyentuh pembayaran/kredit/admin = **keputusan manusia** + ADR.
- Jangan menonaktifkan verifikasi TLS / unset `HTTPS_PROXY`. Laporkan host terblokir (AGENTS.md §10).
- Validasi semua input baru server-side. Prinsip least-privilege pada binding.

## Insiden
Jika secret bocor: rotasi segera di Cloudflare, revoke key lama di provider, audit log KV/deploy.
Catat di `DECISION_LOG.md`/`PROJECT_MEMORY.md`.
</content>
