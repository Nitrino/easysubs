/**
 * A minimal `chrome.*` for running the extension inside a regular page: storage lives in localStorage and
 * runtime messages go straight to the background message listeners, which run in the same page.
 *
 * Imported first by main.ts: the extension models read chrome.storage while their modules evaluate.
 */

export type BackgroundMode = "live" | "mock";

export type MessageLogEntry = {
  id: number;
  request: { type?: string } & Record<string, unknown>;
  response?: unknown;
  durationMs?: number;
};

type MessageListener = (
  message: unknown,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => boolean | void;

const STORAGE_PREFIX = "easysubs-playground:";

// The offline mock unless ?background=live asks for the real background script
export const backgroundMode: BackgroundMode =
  new URLSearchParams(location.search).get("background") === "live" ? "live" : "mock";

const messageListeners: MessageListener[] = [];
const messageLog: MessageLogEntry[] = [];
let lastMessageId = 0;

// Loaded on the first message, after the content models have registered their storage reads
let backgroundLoaded: Promise<unknown> | null = null;
const loadBackground = () => {
  backgroundLoaded ??= backgroundMode === "mock" ? import("./mockBackground") : loadLiveBackground();
  return backgroundLoaded;
};

async function loadLiveBackground() {
  routeCrossOriginFetchThroughProxy();
  return import("@pages/background/index");
}

// The background script reaches translation services cross-origin thanks to host_permissions. Inside a page that
// would fail on CORS, so requests go through the dev server proxy (see playground/vite.config.ts).
function routeCrossOriginFetchThroughProxy() {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(input instanceof Request ? input.url : input, location.href);
    if (url.origin === location.origin) return nativeFetch(input, init);
    const proxyUrl = `/__proxy?url=${encodeURIComponent(url.href)}`;
    return nativeFetch(input instanceof Request ? new Request(proxyUrl, input) : proxyUrl, init);
  };
}

// Messages are serialized between extension contexts, so the page must not share objects with the "background"
const serialize = <T>(value: T): T => (value === undefined ? value : JSON.parse(JSON.stringify(value)));

function sendMessage(message: MessageLogEntry["request"], callback?: (response: unknown) => void) {
  const entry: MessageLogEntry = { id: ++lastMessageId, request: serialize(message) };
  const startedAt = performance.now();
  messageLog.push(entry);
  window.dispatchEvent(new CustomEvent("easysubs:message", { detail: entry }));

  const response = loadBackground().then(
    () =>
      new Promise<unknown>((resolve) => {
        const sender = { id: chrome.runtime.id, url: location.href };
        for (const listener of messageListeners) listener(serialize(entry.request), sender, resolve);
      }),
  );

  return response.then((value) => {
    entry.response = serialize(value);
    entry.durationMs = Math.round(performance.now() - startedAt);
    window.dispatchEvent(new CustomEvent("easysubs:message", { detail: entry }));
    callback?.(entry.response);
    return entry.response;
  });
}

type StorageKeys = string | string[] | Record<string, unknown> | null | undefined;
type StorageItems = Record<string, unknown>;

const storedKeys = () =>
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .map((key) => key.slice(STORAGE_PREFIX.length));

// chrome.storage answers asynchronously; keep that so rehydration order matches the real extension
const respond = <T>(value: T, callback?: (value: T) => void) =>
  new Promise<T>((resolve) =>
    setTimeout(() => {
      callback?.(value);
      resolve(value);
    }),
  );

const storageLocal = {
  get(keys?: StorageKeys, callback?: (items: StorageItems) => void) {
    const defaults = keys && typeof keys === "object" && !Array.isArray(keys) ? keys : {};
    const names =
      keys == null
        ? storedKeys()
        : typeof keys === "string"
          ? [keys]
          : Array.isArray(keys)
            ? keys
            : Object.keys(defaults);
    const items: StorageItems = { ...defaults };
    for (const name of names) {
      const value = localStorage.getItem(STORAGE_PREFIX + name);
      if (value !== null) items[name] = JSON.parse(value);
    }
    return respond(items, callback);
  },
  set(items: StorageItems, callback?: () => void) {
    for (const [name, value] of Object.entries(items)) {
      localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(value));
    }
    return respond(undefined, callback);
  },
  remove(keys: string | string[], callback?: () => void) {
    for (const name of typeof keys === "string" ? [keys] : keys) localStorage.removeItem(STORAGE_PREFIX + name);
    return respond(undefined, callback);
  },
  clear(callback?: () => void) {
    for (const name of storedKeys()) localStorage.removeItem(STORAGE_PREFIX + name);
    return respond(undefined, callback);
  },
};

const noopEvent = { addListener() {}, removeListener() {}, hasListener: () => false };

const chromeShim = {
  runtime: {
    id: "easysubs-playground",
    lastError: undefined,
    getURL: (path: string) => new URL(path, location.origin).href,
    sendMessage,
    onMessage: {
      addListener: (listener: MessageListener) => messageListeners.push(listener),
      removeListener: (listener: MessageListener) => messageListeners.splice(messageListeners.indexOf(listener), 1),
      hasListener: (listener: MessageListener) => messageListeners.includes(listener),
    },
    onInstalled: noopEvent,
    OnInstalledReason: { INSTALL: "install", UPDATE: "update" },
  },
  storage: { local: storageLocal },
  tabs: {
    create: ({ url }: { url: string }) => window.open(url, "_blank"),
  },
};

globalThis.chrome = chromeShim as unknown as typeof chrome;

// A handle for the playground UI and the e2e tests
window.easysubsPlayground = {
  backgroundMode,
  messages: messageLog,
  mockAnswers: {},
  clearStorage: () => storageLocal.clear(),
};

declare global {
  interface Window {
    easysubsPlayground: {
      backgroundMode: BackgroundMode;
      messages: MessageLogEntry[];
      // Answers of the offline mock background replaced by tests, see playground/src/mockBackground.ts
      mockAnswers: Record<string, unknown>;
      clearStorage: () => Promise<void>;
    };
  }
}
