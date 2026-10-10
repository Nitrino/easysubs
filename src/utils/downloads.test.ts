import { beforeEach, describe, expect, it } from "vitest";
import { downloadInUse, groupDownloads, usedAgo, type TDownload } from "./downloads";
import { deleteKeptFiles, keptFiles, onDeviceFile } from "./onDeviceFiles";
import { stubCaches } from "@root/test/caches";
import { stubFetch } from "@root/test/fetch";

const RELEASES = "https://github.com/Nitrino/easysubs/releases/download";
const DICTIONARY = `${RELEASES}/dictionaries-1/en-ru.json.gz`;
const MODEL = `${RELEASES}/bergamot-models-1/en-zh-Hans.model.enzh.intgemm.alphas.bin`;
const LEX = `${RELEASES}/bergamot-models-1/en-zh-Hans.lex.50.50.enzh.s2t.bin`;
const WHISPER = "https://huggingface.co/onnx-community/whisper-base_timestamped/resolve/main/onnx/encoder_model.onnx";
const RUNTIME = "chrome-extension://id/assets/ort/ort-wasm-simd-threaded.jsep.wasm";

describe("groupDownloads", () => {
  it("makes a download of each dictionary, model direction and speech model, adding up their files", () => {
    const downloads = groupDownloads([
      { url: WHISPER, size: 50, speech: true },
      { url: RUNTIME, size: 20, speech: true },
      { url: MODEL, size: 30, used: 100 },
      { url: LEX, size: 5, used: 200 },
      { url: DICTIONARY, size: 4, used: 300 },
    ]);

    expect(downloads).toEqual([
      { id: "dictionary:en-ru", kind: "dictionary", from: "en", to: "ru", size: 4, used: 300, urls: [DICTIONARY] },
      {
        id: "bergamot:en-zh-Hans",
        kind: "bergamot",
        from: "en",
        to: "zh-Hans",
        size: 35,
        used: 200,
        urls: [MODEL, LEX],
      },
      {
        id: "speech:onnx-community/whisper-base_timestamped",
        kind: "speech",
        name: "Whisper base",
        about: "word times from speech",
        size: 50,
        urls: [WHISPER],
      },
      {
        id: "speech:runtime",
        kind: "speech",
        name: "ONNX Runtime",
        about: "runs the models",
        size: 20,
        urls: [RUNTIME],
      },
    ]);
  });
});

describe("downloadInUse", () => {
  const download = (kind: TDownload["kind"], from: string, to: string): TDownload => ({
    id: `${kind}:${from}-${to}`,
    kind,
    from,
    to,
    size: 1,
    urls: [],
  });
  const use = { from: "es", to: "ru", dictionary: true, bergamot: true };

  it("marks the dictionary of the subtitles' pair while a Wiktionary service is picked", () => {
    expect(downloadInUse(download("dictionary", "en", "ru"), { ...use, from: "en" })).toBe(true);
    expect(downloadInUse(download("dictionary", "en", "ru"), { ...use, from: "en", dictionary: false })).toBe(false);
    expect(downloadInUse(download("dictionary", "en", "ru"), use)).toBe(false);
  });

  it("marks both models between two languages other than English", () => {
    expect(downloadInUse(download("bergamot", "es", "en"), use)).toBe(true);
    expect(downloadInUse(download("bergamot", "en", "ru"), use)).toBe(true);
    expect(downloadInUse(download("bergamot", "en", "es"), use)).toBe(false);
    expect(downloadInUse(download("bergamot", "en", "ru"), { ...use, bergamot: false })).toBe(false);
  });

  it("marks nothing before the subtitles' language is known", () => {
    expect(downloadInUse(download("bergamot", "en", "ru"), { ...use, from: "auto" })).toBe(false);
  });
});

describe("usedAgo", () => {
  const now = new Date(2026, 9, 11, 15).getTime();

  it("tells the day a download was last read", () => {
    expect(usedAgo(new Date(2026, 9, 11, 1).getTime(), now)).toBe("used today");
    expect(usedAgo(new Date(2026, 9, 10, 23).getTime(), now)).toBe("used yesterday");
    expect(usedAgo(new Date(2026, 8, 29, 12).getTime(), now)).toBe("used 12 days ago");
  });
});

describe("keptFiles", () => {
  let stores: ReturnType<typeof stubCaches>;
  beforeEach(() => {
    stores = stubCaches();
  });

  it("lists the downloaded files with their sizes and when they were last read, and the speech models", async () => {
    stubFetch({ [DICTIONARY]: () => new Response(new Uint8Array(4)) });
    await onDeviceFile(DICTIONARY);
    const speech = await caches.open("transformers-cache");
    await speech.put(WHISPER, new Response(new Uint8Array(7)));
    // Last read is marked without waiting
    await new Promise((resolve) => setTimeout(resolve));

    expect(await keptFiles()).toEqual([
      { url: DICTIONARY, size: 4, used: expect.any(Number) },
      { url: WHISPER, size: 7, speech: true },
    ]);
  });

  it("deletes files with their marks, and doesn't make the speech models' cache", async () => {
    stubFetch({ [DICTIONARY]: () => new Response(new Uint8Array(4)) });
    await onDeviceFile(DICTIONARY);
    await new Promise((resolve) => setTimeout(resolve));

    await deleteKeptFiles([DICTIONARY]);

    expect(await keptFiles()).toEqual([]);
    expect(stores.get("easysubs-on-device-used")?.size).toBe(0);
    expect(stores.has("transformers-cache")).toBe(false);
  });
});
