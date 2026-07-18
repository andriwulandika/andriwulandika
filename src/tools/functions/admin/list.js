import { json, readBody, handleAdminList } from '../_lib.js';

export async function onRequestPost(context) {
  const body = await readBody(context.request);
  if (!body) return json({ error: 'JSON tidak valid' }, 400);
  try {
    const clientIp = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    return await handleAdminList(body, context.env, clientIp);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
