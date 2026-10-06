import { describe, expect, it } from "vitest";
import { audio, json, stubFetch } from "@root/test/fetch";
import { fetchGoogleSpeech } from "./google";
import { fetchYoudaoSpeech } from "./youdao";
import { fetchWiktionarySpeech, rankRecording } from "./wiktionary";
import { fetchChatGPTSpeech } from "./chatgpt";
import { fetchSpeech, toDataUrl } from ".";

const WIKTIONARY_API = "https://en.wiktionary.org/w/api.php";
const UPLOADS = "https://upload.wikimedia.org/wikipedia/commons";

// The images of a Wiktionary page as the API lists them, recordings and pictures alike
const wiktionaryFiles = (...titles: string[]) =>
  json({
    batchcomplete: true,
    query: {
      pages: titles.map((title) => ({
        title: `File:${title}`,
        imageinfo: [{ url: `${UPLOADS}/${encodeURIComponent(title)}`, mime: "application/ogg" }],
      })),
    },
  });

describe("Google pronunciation", () => {
  it("asks Google Translate's speech for the text in the language", async () => {
    const fetchMock = stubFetch({ "https://translate.google.com/translate_tts": () => audio([1, 2]) });

    const speech = await fetchGoogleSpeech({ text: "give up", lang: "en" });

    expect(speech.type).toBe("audio/mpeg");
    expect([...new Uint8Array(speech.data)]).toEqual([1, 2]);
    const url = new URL(String(fetchMock.mock.calls[0][0]));
    expect(Object.fromEntries(url.searchParams)).toEqual({ ie: "UTF-8", client: "tw-ob", tl: "en", q: "give up" });
  });

  it("doesn't take a page for audio", async () => {
    stubFetch({
      "https://translate.google.com/translate_tts": () =>
        new Response("<html>Sorry</html>", { headers: { "content-type": "text/html" } }),
    });

    await expect(fetchGoogleSpeech({ text: "keys", lang: "en" })).rejects.toThrow(
      'Google has no pronunciation of "keys"',
    );
  });
});

describe("Youdao pronunciation", () => {
  it.each([
    ["en", { audio: "keys", type: "2" }],
    ["en-GB", { audio: "keys", type: "2" }],
    ["es", { audio: "keys", le: "es" }],
    ["ja", { audio: "keys", le: "ja" }],
  ])("asks for %s in the dictionary's voice", async (lang, params) => {
    const fetchMock = stubFetch({ "https://dict.youdao.com/dictvoice": () => audio([1]) });

    await fetchYoudaoSpeech({ text: "keys", lang });

    expect(Object.fromEntries(new URL(String(fetchMock.mock.calls[0][0])).searchParams)).toEqual(params);
  });

  it("fails for a language Youdao has no voice for", async () => {
    stubFetch({ "https://dict.youdao.com/dictvoice": () => json({ code: 500, msg: "error" }, 500) });

    await expect(fetchYoudaoSpeech({ text: "casa", lang: "pt" })).rejects.toThrow(
      'Youdao has no pronunciation of "casa"',
    );
  });
});

describe("Wiktionary recordings", () => {
  it.each([
    ["File:En-us-keys.ogg", "keys", "en", 0],
    ["File:En-uk-keys.ogg", "keys", "en", 1],
    ["File:EN-AU ck1 gobsmacked.ogg", "gobsmacked", "en", 1],
    ["File:LL-Q1860 (eng)-Back ache-keys.wav", "keys", "en", 2],
    ["File:Es-hola.oga", "hola", "es", 1],
    ["File:LL-Q7737 (rus)-Tatiana Kerbush-привет.wav", "привет", "ru", 2],
    ["File:De-Häuser.ogg", "Haus", "de", 4],
  ])("ranks %s for %s in %s as %s", (file, text, lang, rank) => {
    expect(rankRecording(file, text, lang)).toBe(rank);
  });

  it.each([
    ["File:Nl-hola.ogg", "hola", "es"],
    ["File:LL-Q7026 (cat)-Unjoanqualsevol-hola.wav", "hola", "es"],
    ["File:Hola.ogg", "hola", "es"],
    ["File:Keys on a ring.jpg", "keys", "en"],
  ])("skips %s for %s in %s", (file, text, lang) => {
    expect(rankRecording(file, text, lang)).toBeUndefined();
  });

  it("downloads the best recording on the word's page", async () => {
    const fetchMock = stubFetch({
      [WIKTIONARY_API]: () => wiktionaryFiles("Keys.jpg", "En-uk-keys.ogg", "En-us-keys.ogg"),
      [UPLOADS]: () => audio([7], "application/ogg"),
    });

    const speech = await fetchWiktionarySpeech({ text: "Keys", lang: "en" });

    expect(speech.type).toBe("application/ogg");
    const [apiUrl, apiInit] = fetchMock.mock.calls[0];
    expect(new URL(String(apiUrl)).searchParams.get("titles")).toBe("Keys|keys");
    expect(apiInit.headers).toMatchObject({ "Api-User-Agent": expect.stringContaining("EasySubs") });
    expect(fetchMock.mock.calls[1][0]).toBe(`${UPLOADS}/En-us-keys.ogg`);
  });

  it("looks up German nouns capitalized", async () => {
    const fetchMock = stubFetch({
      [WIKTIONARY_API]: () => wiktionaryFiles("De-Haus.ogg"),
      [UPLOADS]: () => audio([7], "application/ogg"),
    });

    await fetchWiktionarySpeech({ text: "haus", lang: "de" });

    expect(new URL(String(fetchMock.mock.calls[0][0])).searchParams.get("titles")).toBe("haus|Haus");
  });

  it.each([
    ["only has recordings in other languages", wiktionaryFiles("Nl-hola.ogg")],
    ["has no files", json({ batchcomplete: true })],
  ])("fails when the page %s", async (_, answer) => {
    stubFetch({ [WIKTIONARY_API]: () => answer });

    await expect(fetchWiktionarySpeech({ text: "hola", lang: "es" })).rejects.toThrow(
      'Wiktionary has no pronunciation of "hola"',
    );
  });
});

describe("ChatGPT pronunciation", () => {
  it("asks OpenAI's speech model to say the text in the language", async () => {
    const fetchMock = stubFetch({ "https://api.openai.com/v1/audio/speech": () => audio([1]) });

    await fetchChatGPTSpeech({ text: "hola", lang: "es", chatGPTApiKey: "sk-test" });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer sk-test" });
    expect(JSON.parse(String(init.body))).toEqual({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      input: "hola",
      instructions: expect.stringContaining("Spanish"),
      response_format: "mp3",
    });
  });

  it("needs an API key", async () => {
    const fetchMock = stubFetch({});

    await expect(fetchChatGPTSpeech({ text: "hola", lang: "es" })).rejects.toThrow("ChatGPT API key is required");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("explains a rejected key", async () => {
    stubFetch({ "https://api.openai.com/v1/audio/speech": () => json({}, 401) });

    await expect(fetchChatGPTSpeech({ text: "hola", lang: "es", chatGPTApiKey: "wrong" })).rejects.toThrow(
      "Invalid OpenAI API key",
    );
  });

  it("passes on OpenAI's error", async () => {
    stubFetch({
      "https://api.openai.com/v1/audio/speech": () => json({ error: { message: "Rate limit reached" } }, 429),
    });

    await expect(fetchChatGPTSpeech({ text: "hola", lang: "es", chatGPTApiKey: "sk-test" })).rejects.toThrow(
      "ChatGPT: Rate limit reached",
    );
  });
});

describe("fetchSpeech", () => {
  it("falls back to Google when the chosen service has no audio", async () => {
    stubFetch({
      [WIKTIONARY_API]: () => json({ batchcomplete: true }),
      "https://translate.google.com/translate_tts": () => audio([1, 2, 3]),
    });

    const speech = await fetchSpeech({ text: "keys", language: "en", service: "wiktionary" });

    expect(speech).toEqual({ audio: "data:audio/mpeg;base64,AQID", service: "google" });
  });

  it("asks Google once when Google is chosen", async () => {
    const fetchMock = stubFetch({ "https://translate.google.com/translate_tts": () => json({}, 503) });

    await expect(fetchSpeech({ text: "keys", language: "en", service: "google" })).rejects.toThrow(
      'Google has no pronunciation of "keys"',
    );
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("fails with Google's error when both services fail", async () => {
    stubFetch({
      "https://dict.youdao.com/dictvoice": () => json({}, 500),
      "https://translate.google.com/translate_tts": () => json({}, 503),
    });

    await expect(fetchSpeech({ text: "keys", language: "en", service: "youdao" })).rejects.toThrow(
      'Google has no pronunciation of "keys"',
    );
  });

  it("encodes long audio", () => {
    const bytes = Array.from({ length: 100_000 }, (_, index) => (index * 7) % 256);

    const dataUrl = toDataUrl({ type: "audio/mpeg", data: new Uint8Array(bytes).buffer });

    expect(dataUrl).toBe(`data:audio/mpeg;base64,${Buffer.from(bytes).toString("base64")}`);
  });
});
