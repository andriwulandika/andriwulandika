// cloudflare-env.d.ts di-generate ulang tiap `wrangler types` dan cuma berisi
// bindings dari wrangler.jsonc — secret ADMIN_PASSWORD sengaja tidak
// didaftarkan di sana (supaya tidak perlu ditulis plaintext di config),
// jadi tipenya ditambahkan lewat declaration merging di sini.
declare global {
  interface CloudflareEnv {
    ADMIN_PASSWORD: string;
  }
}

export {};
