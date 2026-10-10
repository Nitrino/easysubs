import { vi } from "vitest";

// The Cache API, which jsdom lacks: caches by name, each responses by URL
export function stubCaches() {
  const stores = new Map<string, Map<string, Response>>();
  const url = (request: RequestInfo | URL) =>
    typeof request === "string" ? request : request instanceof URL ? request.href : request.url;
  const open = async (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const store = stores.get(name)!;
    return {
      match: async (request: RequestInfo | URL) => store.get(url(request))?.clone(),
      put: async (request: RequestInfo | URL, response: Response) => void store.set(url(request), response),
      delete: async (request: RequestInfo | URL) => store.delete(url(request)),
      keys: async () => [...store.keys()].map((key) => new Request(key)),
    };
  };
  vi.stubGlobal("caches", { open, has: async (name: string) => stores.has(name) });
  return stores;
}
