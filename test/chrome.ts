/**
 * `chrome.*` for unit tests: storage lives in memory and runtime messages go to the onMessage listeners registered
 * in the same test file, like in the playground (playground/src/chromeShim.ts). Importing src/pages/background
 * registers the real background, importing playground/src/mockBackground the offline one; a test can also answer a
 * message itself with `chrome.runtime.sendMessage.mockResolvedValueOnce(...)`.
 */
import { vi } from "vitest";

type Message = { type?: string } & Record<string, unknown>;
type MessageListener = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => boolean | void;
type StorageKeys = string | string[] | Record<string, unknown> | null | undefined;
type StorageItems = Record<string, unknown>;

// Messages are serialized between extension contexts
const serialize = <T>(value: T): T => (value === undefined ? value : JSON.parse(JSON.stringify(value)));

const storage = new Map<string, string>();
const messageListeners: MessageListener[] = [];
const installedListeners: ((details: { reason: string }) => void)[] = [];

// chrome.storage answers asynchronously; keep that so stores rehydrate after their modules evaluate, as in the
// extension
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
        ? [...storage.keys()]
        : typeof keys === "string"
          ? [keys]
          : Array.isArray(keys)
            ? keys
            : Object.keys(defaults);
    const items: StorageItems = { ...defaults };
    for (const name of names) {
      if (storage.has(name)) items[name] = JSON.parse(storage.get(name));
    }
    return respond(items, callback);
  },
  set(items: StorageItems, callback?: () => void) {
    for (const [name, value] of Object.entries(items)) storage.set(name, JSON.stringify(value));
    return respond(undefined, callback);
  },
  remove(keys: string | string[], callback?: () => void) {
    for (const name of typeof keys === "string" ? [keys] : keys) storage.delete(name);
    return respond(undefined, callback);
  },
  clear(callback?: () => void) {
    storage.clear();
    return respond(undefined, callback);
  },
};

// Every listener gets the message, the first sendResponse answers it; nothing answers without listeners
function dispatchMessage(message: Message) {
  return new Promise<unknown>((resolve) => {
    const sender = { id: chromeMock.runtime.id };
    const listeners = [...messageListeners];
    if (listeners.length === 0) resolve(undefined);
    for (const listener of listeners) listener(serialize(message), sender, (response) => resolve(serialize(response)));
  });
}

export const chromeMock = {
  runtime: {
    id: "easysubs-test",
    lastError: undefined as chrome.runtime.LastError | undefined,
    getURL: (path: string) => `chrome-extension://easysubs-test/${path}`,
    sendMessage: vi.fn((message: Message, callback?: (response: unknown) => void) =>
      dispatchMessage(message).then((response) => {
        callback?.(response);
        return response;
      }),
    ),
    onMessage: {
      addListener: (listener: MessageListener) => void messageListeners.push(listener),
      removeListener: (listener: MessageListener) =>
        void messageListeners.splice(messageListeners.indexOf(listener), 1),
      hasListener: (listener: MessageListener) => messageListeners.includes(listener),
    },
    onInstalled: {
      addListener: (listener: (details: { reason: string }) => void) => installedListeners.push(listener),
    },
    OnInstalledReason: { INSTALL: "install", UPDATE: "update" },
  },
  storage: { local: storageLocal },
  tabs: { create: vi.fn() },
};

export function installChrome() {
  globalThis.chrome = chromeMock as unknown as typeof chrome;
}

// Between tests: storage is emptied and lastError cleared; listeners stay, they are registered on import
export function resetChrome() {
  storage.clear();
  chromeMock.runtime.lastError = undefined;
}

// What the content scripts sent, oldest first
export const sentMessages = (type?: string) =>
  chromeMock.runtime.sendMessage.mock.calls
    .map(([message]) => message)
    .filter((message) => !type || message.type === type);

// Sends a message the way a content script does and waits for the background's answer
export const sendToBackground = (message: Message) => dispatchMessage(message);

export const dispatchInstalled = (reason: "install" | "update") =>
  installedListeners.forEach((listener) => listener({ reason }));

export const storedItems = () =>
  Object.fromEntries([...storage].map(([name, value]) => [name, JSON.parse(value)])) as StorageItems;
