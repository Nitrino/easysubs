import { describe, expect, it } from "vitest";
import { gzipSync } from "node:zlib";
import { createDictionaries } from ".";
import { DICTIONARIES_URL, type TDictionary } from "./format";
import { stubFetch } from "@root/test/fetch";

const enRu: TDictionary = {
  from: "en",
  to: "ru",
  source: "test",
  license: "test",
  words: { keys: ["keys", "kiːz", [["noun", [[["ключи"]]]]]] },
  forms: {},
};

const gzipped = (dictionary: TDictionary) =>
  new Response(gzipSync(JSON.stringify(dictionary)), { headers: { "content-length": "100" } });

describe("createDictionaries", () => {
  it("downloads a pair's dictionary from the release once and looks words up in it", async () => {
    const fetchMock = stubFetch({ [`${DICTIONARIES_URL}en-ru.json.gz`]: () => gzipped(enRu) });
    const dictionaries = createDictionaries();

    expect(await dictionaries.status("en", "ru")).toEqual({ state: "missing" });
    expect(await dictionaries.lookUp("en", "ru", "Keys")).toEqual({
      word: "keys",
      transcription: "kiːz",
      entries: enRu.words.keys[2],
    });
    expect(await dictionaries.lookUp("en-US", "ru", "door")).toBeNull();
    expect(await dictionaries.status("en", "ru")).toEqual({ state: "ready" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("has nothing for pairs without a dictionary", async () => {
    const dictionaries = createDictionaries();

    expect(await dictionaries.lookUp("es", "ru", "llaves")).toBeNull();
    expect(await dictionaries.status("es", "ru")).toEqual({ state: "unavailable" });
  });

  it("tells a failed download and tries again with the next word", async () => {
    let fail = true;
    stubFetch({
      [`${DICTIONARIES_URL}en-ru.json.gz`]: () => (fail ? new Response("", { status: 404 }) : gzipped(enRu)),
    });
    const dictionaries = createDictionaries();

    await expect(dictionaries.lookUp("en", "ru", "keys")).rejects.toThrow("Download failed with status 404");
    expect(await dictionaries.status("en", "ru")).toEqual({
      state: "error",
      error: "Download failed with status 404",
    });

    fail = false;
    expect(await dictionaries.lookUp("en", "ru", "keys")).not.toBeNull();
  });
});
