import { beforeEach, describe, expect, it, vi } from "vitest";
import { createBergamotEngine } from "./engine";
import { BERGAMOT_MODELS_URL, type TModelsIndex } from "./registry";
import { json, stubFetch } from "@root/test/fetch";

// Bergamot's worker as the engine talks to it: { id, name, args } in, { id, result | error } out. It "translates" by
// naming the models a text went through.
type TCall = { name: string; args: unknown[] };
let calls: TCall[] = [];

class FakeWorker {
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  constructor(public url: string) {}
  postMessage({ id, name, args }: { id: number } & TCall) {
    calls.push({ name, args });
    let result: unknown = null;
    if (name === "translate") {
      const { models, texts } = args[0] as { models: { from: string; to: string }[]; texts: { text: string }[] };
      result = texts.map(({ text }) => ({
        target: { text: `${text} (${models.map((model) => `${model.from}>${model.to}`).join(", ")})` },
      }));
    }
    queueMicrotask(() => this.onmessage?.({ data: { id, result } } as MessageEvent));
  }
}

// The Cache API, which jsdom lacks
function stubCaches() {
  const kept = new Map<string, Response>();
  vi.stubGlobal("caches", {
    open: async () => ({
      match: async (url: string) => kept.get(url)?.clone(),
      put: async (url: string, response: Response) => void kept.set(url, response),
    }),
  });
}

// The mirror's list (scripts/bergamot-models/mirror.ts) with 4-byte files
const model = (from: string, to: string): TModelsIndex["models"][number] => ({
  from,
  to,
  version: "2.0",
  model: { name: `${from}-${to}.model`, size: 4 },
  lex: { name: `${from}-${to}.lex`, size: 4 },
  vocabs: [{ name: `${from}-${to}.vocab`, size: 4 }],
});
const INDEX: TModelsIndex = {
  source: "test",
  license: "MPL-2.0",
  models: [model("en", "ru"), model("es", "en"), model("en", "de"), model("en", "fr")],
};

function stubMirror() {
  return stubFetch({
    [`${BERGAMOT_MODELS_URL}models.json`]: () => json(INDEX),
    [BERGAMOT_MODELS_URL]: () => new Response(new Uint8Array([1, 2, 3, 4])),
  });
}

const fileRequests = (fetchMock: ReturnType<typeof stubFetch>) =>
  fetchMock.mock.calls.map(([url]) => String(url)).filter((url) => !url.endsWith("models.json"));

beforeEach(() => {
  calls = [];
  vi.stubGlobal("Worker", FakeWorker);
  stubCaches();
});

describe("createBergamotEngine", () => {
  it("translates through English with both models, downloading each file once", async () => {
    const fetchMock = stubMirror();
    const engine = createBergamotEngine("worker.js");

    expect(await engine.translate(["Hola", "Adiós"], "es", "ru")).toEqual([
      "Hola (es>en, en>ru)",
      "Adiós (es>en, en>ru)",
    ]);
    expect(await engine.translate(["Gracias"], "es", "ru")).toEqual(["Gracias (es>en, en>ru)"]);

    expect(calls.map((call) => call.name)).toEqual([
      "initialize",
      "loadTranslationModel",
      "loadTranslationModel",
      "translate",
      "translate",
    ]);
    expect(calls[1].args[0]).toEqual({ from: "es", to: "en" });
    expect(fileRequests(fetchMock)).toHaveLength(6);
  });

  it("keeps three models loaded, freeing the one used longest ago", async () => {
    stubMirror();
    const engine = createBergamotEngine("worker.js");

    for (const to of ["ru", "de", "fr"]) await engine.translate(["Hi"], "en", to);
    await engine.translate(["Hi"], "en", "ru");
    await engine.translate(["Hola"], "es", "en");

    expect(calls.filter((call) => call.name === "freeTranslationModel").map((call) => call.args[0])).toEqual([
      { from: "en", to: "de" },
    ]);
  });

  it("tells what a pair needs: nothing for pairs without models, the size before the download", async () => {
    stubMirror();
    const engine = createBergamotEngine("worker.js");

    expect(await engine.status("ru", "de")).toEqual({ state: "unavailable" });
    expect(await engine.status("es", "ru")).toEqual({ state: "missing", size: 24 });
    await engine.prepare("es", "ru");
    expect(await engine.status("es", "ru")).toEqual({ state: "ready" });
    await expect(engine.translate(["Привет"], "ru", "de")).rejects.toThrow("There's no model for ru → de");
  });
});
