import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 hari

async function sha256Hex(input: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function getAdminPassword() {
  const { env } = await getCloudflareContext({ async: true });
  return env.ADMIN_PASSWORD;
}

export async function verifyAdminPassword(password: string) {
  const expected = await getAdminPassword();
  return Boolean(expected) && password === expected;
}

export async function createAdminSession() {
  const token = await sha256Hex(await getAdminPassword());
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const password = await getAdminPassword();
  if (!password) return false;

  const cookie = (await cookies()).get(SESSION_COOKIE);
  if (!cookie) return false;

  return cookie.value === (await sha256Hex(password));
}
