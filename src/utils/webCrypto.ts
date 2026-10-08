// `node:crypto` for libraries that import it outside a window (vot.js signs its requests with it in a service
// worker): the Web Crypto API the worker has. vite.config.ts points `node:crypto` here.
export const subtle = globalThis.crypto.subtle;
export const getRandomValues = globalThis.crypto.getRandomValues.bind(globalThis.crypto);
export const randomUUID = globalThis.crypto.randomUUID.bind(globalThis.crypto);
export default globalThis.crypto;
