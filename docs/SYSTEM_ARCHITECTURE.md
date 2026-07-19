# SYSTEM ARCHITECTURE

## Diagram alur (teks)
```
                 ┌───────────────────────── shared/ (SSOT aset) ────────────────────────┐
                 │ brand/ (logo,favicon,wallpaper)   js/ (analytics,apiService,nav-auth, │
                 │                                        ui-enhance)                     │
                 └───────────────┬───────────────────────────────┬───────────────────────┘
        sync-assets.sh (cp)      │                               │
                 ┌───────────────▼─────────┐         ┌───────────▼──────────────┐
   src/site/ ───11ty──► dist/site ──cp──►  site/     tools/  ◄──cp── dist/tools ◄──11ty─── src/tools/
   (authoring)          (transien)     (di-commit, di-serve)      (transien)      (authoring, _includes/)
                                          │                         │
                          Cloudflare Pages│ (Root=site, no build)   │ Cloudflare Pages (Root=tools, no build)
                                          ▼                         ▼
                              andriwulandika.uk            ai.andriwulandika.uk
                                                                    │
                                              ┌─────────────────────▼──────────────────────┐
                                              │ tools/functions/ (Pages Functions, backend) │
                                              │  generate.js verify.js  admin/*.js          │
                                              │            └──► _lib.js (logika)             │
                                              └───────┬──────────────┬───────────────┬──────┘
                                                      │              │               │
                                              KV ACCESS_CODES   Gemini API      Claude API
                                              (kode,kredit,      (demo)         (berbayar)
                                               ratelimit)
```

## Komponen inti
- **Situs statis** (site/, tools/) — di-serve apa adanya oleh Cloudflare (tanpa build saat deploy).
- **Backend Functions** (tools/functions) — same-origin, dipanggil via path relatif `/generate`,
  `/verify`, `/admin/*`. Logika di `_lib.js`; route = wrapper tipis + tangkap error.
- **KV `ACCESS_CODES`** — key: kode akses (`AW-XXXXXXXX`) → `{credits,name,createdAt[,expiresAt]}`;
  key `ratelimit:<...>` → counter dengan TTL.
- **Klien** (`apiService.js`) — simpan kode & info di localStorage; verify/generate; update kredit.

## Alur permintaan
1. **Generate:** klien POST `/generate` `{prompt,code,temperature,maxTokens}` → rate-limit(IP) →
   sanitasi/clamp → `checkCode` → paid? Claude : Gemini → sukses? potong 1 kredit (jika bukan
   langganan) → balikan `{text,isDemo,credits}`. Gagal → error, **kredit tak dipotong**.
2. **Verify:** POST `/verify` `{code}` → `{valid,credits,unlimited,expiresAt,name}`.
3. **Admin:** POST `/admin/{generate,topup,list,revoke}` `{password,...}` → rate-limit(admin:IP,20) →
   `timingSafeEqual(password)` → operasi KV.

## Model data KV (jangan ubah tanpa keputusan — AGENTS.md §18)
```
"AW-AB12CD34" -> {"credits":10,"name":"Dinas X","createdAt":"...","expiresAt":"...?"}
"ratelimit:<ip>" -> "N"  (TTL 60s)          "ratelimit:admin:<ip>" -> "N" (TTL 60s)
```
- `hasAccess = subActive(expiresAt masa depan) || credits>0`. Langganan lama dihormati (unlimited
  s/d kedaluwarsa, tanpa potong kredit).

## Properti arsitektur
- **Fail-closed** rate-limit (tanpa KV → tolak). **Fail-safe** kredit (potong hanya bila sukses).
- **Stateless** Functions; state hanya di KV. **Multi-provider AI** (anti lock-in).
- **Keterbatasan diketahui:** increment rate-limit non-atomik (race pada beban tinggi) — aman skala
  kini; catat. localStorage-only (tanpa akun) — pemulihan kode manual.

## Aturan evolusi
Perubahan alur pembayaran/kredit/admin atau model data KV = keputusan manusia + ADR
(`DECISION_LOG.md`). Pertahankan pola "logika di `_lib.js`, route tipis".

Terkait: `TECH_STACK.md`, `SECURITY.md`, `DEPLOYMENT.md`, `WEBSITE_ARCHITECTURE.md`.
</content>
