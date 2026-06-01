/**
 * Cloudflare Worker — CORS Proxy untuk Anthropic API
 * Deploy di: https://dash.cloudflare.com/workers
 *
 * Cara deploy:
 * 1. Buka https://dash.cloudflare.com/ → Workers & Pages → Create Worker
 * 2. Hapus semua kode default, paste kode ini
 * 3. Klik Deploy
 * 4. Salin URL worker (contoh: https://sirenja-proxy.namakamu.workers.dev)
 * 5. Update konstanta PROXY_URL di sirenja.html dan sirkpd.html
 */

export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key, anthropic-version',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET: konfirmasi Worker aktif (buka di browser untuk verifikasi URL)
    if (request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'ok',
        service: 'SiRENJA / SiRKPD — Anthropic CORS Proxy',
        usage: 'Kirim POST request dengan header x-api-key ke URL ini',
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: { message: 'Gunakan metode POST' } }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    try {
      const apiKey = request.headers.get('x-api-key');
      if (!apiKey) {
        return new Response(JSON.stringify({ error: { message: 'API key required' } }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const body = await request.text();

      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': request.headers.get('anthropic-version') || '2023-06-01',
        },
        body,
      });

      const responseText = await upstream.text();

      return new Response(responseText, {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: { message: err.message } }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
