import { afterEach, describe, expect, it, vi } from "vitest";
import { allowOllamaOrigin, ollamaModels, ollamaTranslate, ollamaWord } from "./ollama";
import { json, stubFetch } from "@root/test/fetch";
import { chromeMock } from "@root/test/chrome";

const SETTINGS = { ollamaUrl: "http://localhost:11434", ollamaModel: "translategemma:4b" };
const COMPLETIONS = "http://localhost:11434/v1/chat/completions";
const answer = (content: unknown) => json({ choices: [{ message: { content: JSON.stringify(content) } }] });

describe("ollamaWord", () => {
  it("looks a word up like a dictionary and shows its meanings", async () => {
    const fetchMock = stubFetch({
      [COMPLETIONS]: () =>
        answer({
          lemma: "go",
          transcription: "/ɡəʊ/",
          meanings: [
            { translation: "идти", partOfSpeech: "verb", note: "пешком" },
            { translation: "ехать", partOfSpeech: "verb" },
            { translation: "" },
          ],
        }),
    });

    expect(await ollamaWord({ text: "Went", from: "en", to: "ru" }, SETTINGS)).toEqual({
      source: "went",
      mainTranslation: "идти",
      targetLanguage: "ru",
      transcription: "ɡəʊ",
      lemma: "go",
      translations: [
        { word: "идти", partOfSpeech: "verb", synonyms: [], popularity: 0, note: "пешком" },
        { word: "ехать", partOfSpeech: "verb", synonyms: [], popularity: 1 },
      ],
    });
    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body).toMatchObject({ model: "translategemma:4b", response_format: { type: "json_object" } });
    expect(JSON.parse(body.messages[1].content)).toEqual({
      word: "Went",
      language: "English",
      learnerLanguage: "Russian",
    });
  });

  it("needs a model", async () => {
    await expect(ollamaWord({ text: "go", from: "en", to: "ru" }, { ollamaUrl: SETTINGS.ollamaUrl })).rejects.toThrow(
      "Pick an Ollama model in the settings",
    );
  });
});

describe("Ollama's errors", () => {
  it("says how to let EasySubs in, pull a model or start Ollama", async () => {
    stubFetch({ [COMPLETIONS]: () => new Response("", { status: 403 }) });
    await expect(ollamaWord({ text: "go", from: "en", to: "ru" }, SETTINGS)).rejects.toThrow("OLLAMA_ORIGINS");

    stubFetch({ [COMPLETIONS]: () => new Response("", { status: 404 }) });
    await expect(ollamaTranslate("Hello", "ru", SETTINGS)).rejects.toThrow("Run: ollama pull translategemma:4b");

    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new TypeError("Failed to fetch"))),
    );
    await expect(ollamaModels("http://localhost:11434")).rejects.toThrow(
      "Can't reach Ollama at http://localhost:11434. Is it running?",
    );
  });

  it("lists the models Ollama has", async () => {
    stubFetch({
      "http://localhost:11434/api/tags": () => json({ models: [{ name: "gemma3:4b" }, { name: "qwen3:8b" }] }),
    });

    expect(await ollamaModels("http://localhost:11434/")).toEqual(["gemma3:4b", "qwen3:8b"]);
  });
});

describe("allowOllamaOrigin", () => {
  afterEach(() => {
    delete (chromeMock as Record<string, unknown>).declarativeNetRequest;
  });

  it("gives the extension's requests to Ollama Ollama's own origin, not the pages' requests", async () => {
    const updateSessionRules = vi.fn(() => Promise.resolve());
    Object.assign(chromeMock, {
      declarativeNetRequest: {
        updateSessionRules,
        RuleActionType: { MODIFY_HEADERS: "modifyHeaders" },
        HeaderOperation: { SET: "set" },
        ResourceType: { XMLHTTPREQUEST: "xmlhttprequest" },
      },
    });

    await allowOllamaOrigin("http://127.0.0.1:8080/");
    await allowOllamaOrigin("http://127.0.0.1:8080");

    expect(updateSessionRules).toHaveBeenCalledTimes(1);
    expect(updateSessionRules).toHaveBeenCalledWith({
      removeRuleIds: [4711],
      addRules: [
        {
          id: 4711,
          priority: 1,
          action: {
            type: "modifyHeaders",
            requestHeaders: [{ header: "origin", operation: "set", value: "http://127.0.0.1:8080" }],
          },
          condition: { urlFilter: "|http://127.0.0.1:8080/", tabIds: [-1], resourceTypes: ["xmlhttprequest"] },
        },
      ],
    });
  });
});
