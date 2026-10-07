import type { TOpenSubtitlesSession } from "@src/models/types";
import { opensubtitlesLogin } from "./opensubtitles";
import type { TSourceAuth } from "./types";

// The OpenSubtitles account, kept by the background in chrome.storage.local (not synced). Pages get the username only:
// the password, kept to renew the 24-hour token, and the token never leave the background.

const SESSION_KEY = "opensubtitlesSession";
export const TOKEN_LIFETIME_MS = 23 * 60 * 60 * 1000;
const RENEW_BEFORE_MS = 10 * 60 * 1000;

export async function readSession(): Promise<TOpenSubtitlesSession | null> {
  const items = await chrome.storage.local.get(SESSION_KEY);
  const session = items[SESSION_KEY];
  return session && typeof session === "object" ? (session as TOpenSubtitlesSession) : null;
}

export async function signIn(username: string, password: string) {
  const login = await opensubtitlesLogin(username, password);
  const session: TOpenSubtitlesSession = {
    username,
    password,
    token: login.token,
    baseUrl: login.baseUrl,
    expiresAt: Date.now() + TOKEN_LIFETIME_MS,
  };
  await chrome.storage.local.set({ [SESSION_KEY]: session });
  return { username, allowed: login.allowed };
}

export const signOut = () => chrome.storage.local.remove(SESSION_KEY);

// The token for a request, renewed with the stored password when it's about to expire or `renew` says it was refused.
// Nothing without an account, or when renewing fails: downloads then count against the IP address.
export async function sessionAuth({ renew = false } = {}): Promise<TSourceAuth> {
  let session = await readSession();
  if (!session) return {};
  if (renew || session.expiresAt - Date.now() < RENEW_BEFORE_MS) {
    try {
      const login = await opensubtitlesLogin(session.username, session.password);
      session = { ...session, token: login.token, baseUrl: login.baseUrl, expiresAt: Date.now() + TOKEN_LIFETIME_MS };
      await chrome.storage.local.set({ [SESSION_KEY]: session });
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  return { opensubtitlesToken: session.token, opensubtitlesBaseUrl: session.baseUrl };
}
