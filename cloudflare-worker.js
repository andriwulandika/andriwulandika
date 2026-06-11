/**
 * Cloudflare Worker — Backend untuk SiRENJA / SiRKPD / SiPerda / SiGenDok
 * Menyimpan Anthropic API Key milik admin secara aman, mengatur akses
 * berlangganan via kode akses, dan membatasi kuota pengguna gratis.
 *
 * ── SETUP (sekali saja) ──
 * 1. Install wrangler: npm install -g wrangler
 * 2. Login: wrangler login
 * 3. Buat KV namespace: wrangler kv namespace create ACCESS_CODES
 *    → salin "id" yang muncul, isi ke wrangler.jsonc pada kv_namespaces
 * 4. Set secret API key Anthropic:
 *      wrangler secret put ANTHROPIC_API_KEY
 *    (paste API key Anda saat diminta)
 * 5. Set password admin:
 *      wrangler secret put ADMIN_PASSWORD
 *    (buat password untuk halaman admin.html)
 * 6. Deploy: wrangler deploy
 *
 * ── ENDPOINTS ──
 * GET  /            → status check
 * POST /verify      → { code } → cek validitas kode akses
 * POST /chat        → { code? , trialId? , messages, system } → proxy ke Claude
 * POST /admin/generate → header x-admin-password, { customerName, days } → buat kode baru
 * POST /admin/list     → header x-admin-password → daftar kode aktif
 * POST /admin/revoke   → header x-admin-password, { code } → cabut kode
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
  'Access-Control-Max-Age': '86400',
};

const TRIAL_DAILY_LIMIT = 3;
const MODEL = 'claude-3-5-sonnet-20241022';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // tanpa karakter ambigu
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let out = 'AW';
  for (let i = 0; i < 8; i++) {
    if (i % 4 === 0) out += '-';
    out += chars[bytes[i] % chars.length];
  }
  return out;
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

async function handleVerify(request, env) {
  const body = await request.json().catch(() => ({}));
  const code = (body.code || '').trim().toUpperCase();
  if (!code) return json({ valid: false, error: 'Kode kosong' });

  const raw = await env.ACCESS_CODES.get('code:' + code);
  if (!raw) return json({ valid: false, error: 'Kode tidak ditemukan' });

  const data = JSON.parse(raw);
  if (new Date(data.expiresAt) < new Date()) {
    return json({ valid: false, expired: true, error: 'Kode sudah kedaluwarsa' });
  }
  return json({ valid: true, customerName: data.customerName, expiresAt: data.expiresAt });
}

async function handleChat(request, env) {
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: { message: 'Server belum dikonfigurasi: ANTHROPIC_API_KEY belum diset.' } }, 500);
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.messages)) {
    return json({ error: { message: 'Permintaan tidak valid: messages wajib diisi.' } }, 400);
  }

  const code = (body.code || '').trim().toUpperCase();

  if (code) {
    const raw = await env.ACCESS_CODES.get('code:' + code);
    if (!raw) return json({ error: { message: 'Kode akses tidak valid.' } }, 401);
    const data = JSON.parse(raw);
    if (new Date(data.expiresAt) < new Date()) {
      return json({ error: { message: 'Kode akses sudah kedaluwarsa. Silakan perpanjang langganan.' } }, 401);
    }
  } else {
    // Mode gratis: batasi via trialId (browser) dan IP
    const date = todayUTC();
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const trialId = (body.trialId || 'unknown').slice(0, 64);

    const idKey = `trial:id:${trialId}:${date}`;
    const ipKey = `trial:ip:${ip}:${date}`;

    const [idCountRaw, ipCountRaw] = await Promise.all([
      env.ACCESS_CODES.get(idKey),
      env.ACCESS_CODES.get(ipKey),
    ]);
    const idCount = parseInt(idCountRaw || '0', 10);
    const ipCount = parseInt(ipCountRaw || '0', 10);

    if (idCount >= TRIAL_DAILY_LIMIT || ipCount >= TRIAL_DAILY_LIMIT) {
      return json({
        error: { message: `Batas ${TRIAL_DAILY_LIMIT} pertanyaan gratis hari ini sudah tercapai. Berlangganan untuk akses tanpa batas.` },
        trialLimitReached: true,
      }, 429);
    }

    await Promise.all([
      env.ACCESS_CODES.put(idKey, String(idCount + 1), { expirationTtl: 90000 }),
      env.ACCESS_CODES.put(ipKey, String(ipCount + 1), { expirationTtl: 90000 }),
    ]);
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: body.max_tokens || 1500,
      system: body.system || '',
      messages: body.messages,
    }),
  });

  const responseText = await upstream.text();
  return new Response(responseText, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function checkAdmin(request, env) {
  const pw = request.headers.get('x-admin-password') || '';
  return env.ADMIN_PASSWORD && pw === env.ADMIN_PASSWORD;
}

async function handleAdminGenerate(request, env) {
  if (!checkAdmin(request, env)) return json({ error: { message: 'Password admin salah.' } }, 401);

  const body = await request.json().catch(() => ({}));
  const days = parseInt(body.days, 10) || 30;
  const customerName = (body.customerName || '').trim();

  const code = generateCode();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + days * 86400 * 1000).toISOString();

  await env.ACCESS_CODES.put(
    'code:' + code,
    JSON.stringify({ customerName, createdAt, expiresAt }),
    { expirationTtl: days * 86400 }
  );

  return json({ code, customerName, createdAt, expiresAt });
}

async function handleAdminList(request, env) {
  if (!checkAdmin(request, env)) return json({ error: { message: 'Password admin salah.' } }, 401);

  const list = await env.ACCESS_CODES.list({ prefix: 'code:' });
  const items = [];
  for (const key of list.keys) {
    const raw = await env.ACCESS_CODES.get(key.name);
    if (!raw) continue;
    const data = JSON.parse(raw);
    items.push({ code: key.name.replace('code:', ''), ...data });
  }
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return json({ items });
}

async function handleAdminRevoke(request, env) {
  if (!checkAdmin(request, env)) return json({ error: { message: 'Password admin salah.' } }, 401);

  const body = await request.json().catch(() => ({}));
  const code = (body.code || '').trim().toUpperCase();
  if (!code) return json({ error: { message: 'Kode wajib diisi.' } }, 400);

  await env.ACCESS_CODES.delete('code:' + code);
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === 'GET' && url.pathname === '/') {
      return json({ status: 'ok', service: 'SiPerda Suite — Backend Proxy' });
    }

    try {
      if (request.method === 'POST' && url.pathname === '/verify') return await handleVerify(request, env);
      if (request.method === 'POST' && url.pathname === '/chat') return await handleChat(request, env);
      if (request.method === 'POST' && url.pathname === '/admin/generate') return await handleAdminGenerate(request, env);
      if (request.method === 'POST' && url.pathname === '/admin/list') return await handleAdminList(request, env);
      if (request.method === 'POST' && url.pathname === '/admin/revoke') return await handleAdminRevoke(request, env);

      return json({ error: { message: 'Endpoint tidak ditemukan.' } }, 404);
    } catch (err) {
      return json({ error: { message: err.message || 'Terjadi kesalahan server.' } }, 500);
    }
  },
};
