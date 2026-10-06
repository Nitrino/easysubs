import { vi } from "vitest";

type Handler = (url: string, init: RequestInit) => Response | Promise<Response>;

// fetch() answered by URL prefix; a request nobody answers fails the test
export function stubFetch(handlers: Record<string, Handler>) {
  const fetchMock = vi.fn(async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    const prefix = Object.keys(handlers).find((key) => url.startsWith(key));
    if (!prefix) throw new Error(`Unexpected request: ${url}`);
    return handlers[prefix](url, init);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export const audio = (bytes: number[], type = "audio/mpeg") =>
  new Response(new Uint8Array(bytes), { headers: { "content-type": type } });
