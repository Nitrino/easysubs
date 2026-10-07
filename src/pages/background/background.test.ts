import { beforeEach, describe, expect, it, vi } from "vitest";
import "./index";
import { Anki } from "@src/learning-service/anki";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { chromeMock, dispatchInstalled, sendToBackground } from "@root/test/chrome";
import { audio, json, stubFetch } from "@root/test/fetch";

// The translators of the anylang package call their services; these answer like them
vi.mock("anylang/translators", () => {
  const translator = (name: string) =>
    class {
      translate = vi.fn(async (text: string, from: string, to: string) => {
        if (text === "fail") throw new Error(`${name} is unavailable`);
        return `${name} ${from}→${to}: ${text}`;
      });
      translateBatch = vi.fn(async (texts: string[], from: string, to: string) =>
        texts.map((text) => (text === "skip" ? null : `${name} ${from}→${to}: ${text}`)),
      );
    };
  return {
    MicrosoftTranslator: translator("Bing"),
    YandexTranslator: translator("Yandex"),
    ChatGPTLLMTranslator: translator("ChatGPT"),
  };
});

// The page Google Translate serves with the tokens of its batchexecute requests
const GOOGLE_PAGE =
  '<script>window.WIZ_global_data = {"FdrFJe":"-4242","cfb2h":"boq_translate-webserver_1","SNlM0e":"AT-token"};</script>';

// A batchexecute answer: a JSON chunk with the RPC result, then service chunks
function batchexecuteAnswer(content: unknown) {
  const rpc = JSON.stringify([["wrb.fr", "MkEWBc", JSON.stringify(content), null, null, null, "generic"]]);
  const service = JSON.stringify([
    ["di", 42],
    ["af.httprm", 41, "-123", 7],
  ]);
  return new Response(`)]}'\n\n${rpc.length}\n${rpc}\n${service.length}\n${service}\n`);
}

const KEYS_TRANSLATION = [
  [null],
  [
    [[null, null, null, null, null, [["ключи", null, null, null, [["ключи", [5]]]]]]],
    "ru",
    1,
    "en",
    ["keys", "auto", "ru", true],
  ],
  "en",
  [null, null, null, null, null, [[["keys", [["ключи", null, ["keys"], 1, true]], "keys", "keys", 1]]]],
];

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("background: installation", () => {
  it("opens the onboarding page after installation", () => {
    dispatchInstalled("install");

    expect(chromeMock.tabs.create).toHaveBeenCalledWith(
      { url: "https://easysubs.cc/onboarding/" },
      expect.any(Function),
    );
  });

  it("doesn't open it after an update", () => {
    dispatchInstalled("update");

    expect(chromeMock.tabs.create).not.toHaveBeenCalled();
  });
});

describe("background: Google Translate", () => {
  function stubGoogle(content: unknown) {
    return stubFetch({
      "https://translate.google.com/_/TranslateWebserverUi/data/batchexecute": () => batchexecuteAnswer(content),
      "https://translate.google.com": () => new Response(GOOGLE_PAGE),
    });
  }

  it("sends the page tokens and the text with the batchexecute request", async () => {
    const fetchMock = stubGoogle(KEYS_TRANSLATION);

    await sendToBackground({ type: "translateWordFull", text: "keys", language: "ru" });

    const [url, init] = fetchMock.mock.calls[1];
    const query = new URL(String(url)).searchParams;
    expect(query.get("rpcids")).toBe("MkEWBc");
    expect(query.get("f.sid")).toBe("-4242");
    expect(query.get("bl")).toBe("boq_translate-webserver_1");
    const body = new URLSearchParams(String(init.body));
    expect(body.get("at")).toBe("AT-token");
    expect(JSON.parse(body.get("f.req"))).toEqual([[["MkEWBc", '[["keys","auto","ru",1],[]]', null, "generic"]]]);
  });

  it("answers a word translation with Google's data", async () => {
    stubGoogle(KEYS_TRANSLATION);

    expect(await sendToBackground({ type: "translateWordFull", text: "keys", language: "ru" })).toEqual(
      KEYS_TRANSLATION,
    );
  });

  it("answers a short word translation", async () => {
    stubGoogle(KEYS_TRANSLATION);

    expect(await sendToBackground({ type: "translateWord", text: "keys", language: "ru" })).toEqual({
      original: "keys",
      lang: "ru",
      main: "ключи",
      alternatives: KEYS_TRANSLATION[3][5][0],
    });
  });

  it("detects the language of a text", async () => {
    stubGoogle(KEYS_TRANSLATION);

    expect(await sendToBackground({ type: "getTextLanguage", text: "keys", language: "en" })).toBe("en");
  });

  it("translates a line", async () => {
    const answer = JSON.stringify({ sentences: [{ trans: "Почти. Только ключи возьму." }] });
    const fetchMock = stubFetch({ "https://translate.google.com/translate_a/single": () => new Response(answer) });

    const translation = await sendToBackground({
      type: "translateFullText",
      text: "Almost. I need my keys.",
      language: "ru",
    });

    expect(translation).toBe(answer);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(Object.fromEntries(new URLSearchParams(String(init.body)))).toEqual({
      sl: "auto",
      tl: "ru",
      q: "Almost. I need my keys.",
    });
  });
});

describe("background: other translation services", () => {
  const translate = (translationService: string, extra: Record<string, unknown> = {}, text = "Hello") =>
    sendToBackground({ type: "translateFullText", text, language: "ru", translationService, ...extra });

  it("translates with DeepL using the API key", async () => {
    const fetchMock = stubFetch({
      "https://api-free.deepl.com/v2/translate": () => json({ translations: [{ text: "Привет" }] }),
    });

    expect(await translate("deepl", { deeplApiKey: "secret:fx" })).toBe("Привет");
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers).toMatchObject({ Authorization: "DeepL-Auth-Key secret:fx" });
    expect(JSON.parse(String(init.body))).toEqual({ text: ["Hello"], target_lang: "ru" });
  });

  it("sends DeepL Pro keys to the Pro API", async () => {
    const fetchMock = stubFetch({
      "https://api.deepl.com/v2/translate": () => json({ translations: [{ text: "Привет" }] }),
    });

    expect(await translate("deepl", { deeplApiKey: "secret" })).toBe("Привет");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("explains a rejected DeepL key", async () => {
    stubFetch({ "https://api-free.deepl.com/v2/translate": () => json({}, 403) });

    expect(await translate("deepl", { deeplApiKey: "wrong:fx" })).toEqual({
      error: "Invalid DeepL API key or quota exceeded",
    });
  });

  it.each([
    ["bing", "Bing auto→ru: Hello"],
    ["yandex", "Yandex auto→ru: Hello"],
  ])("translates with %s", async (translationService, translation) => {
    expect(await translate(translationService)).toBe(translation);
  });

  it("translates with ChatGPT using the API key", async () => {
    expect(await translate("chatgpt", { chatGPTApiKey: "sk-test", chatGPTModel: "gpt-4o-mini" })).toBe(
      "ChatGPT auto→ru: Hello",
    );
  });

  it("asks for a ChatGPT API key", async () => {
    expect(await translate("chatgpt", { chatGPTApiKey: "" })).toEqual({
      error: "ChatGPT API key is required for translation",
    });
  });

  it("answers with the error of a failed translation", async () => {
    expect(await translate("bing", {}, "fail")).toEqual({ error: "Bing is unavailable" });
  });
});

describe("background: lines of the second subtitle line", () => {
  const LINES = ["Almost. I need my keys.", "- Right. - Let's go.", "Yes."];
  const translateBatch = (translator: string, extra: Record<string, unknown> = {}, texts = LINES) =>
    sendToBackground({ type: "translateBatch", texts, language: "ru", translator, ...extra });
  // Google's dj=1 answer: sentences keep the line breaks of the text, then a transliteration entry
  const googleAnswer = (...lines: string[]) =>
    new Response(
      JSON.stringify({
        sentences: [
          ...lines.map((line, index) => ({ trans: index < lines.length - 1 ? `${line}\n` : line, orig: "" })),
          { translit: "Pochti" },
        ],
      }),
    );

  it("translates the lines with Google in one request and splits them back", async () => {
    const fetchMock = stubFetch({
      "https://translate.google.com/translate_a/single": () => googleAnswer("Почти. Ключи.", "- Да. - Идём.", "Да."),
    });

    expect(await translateBatch("google")).toEqual(["Почти. Ключи.", "- Да. - Идём.", "Да."]);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0];
    expect(new URLSearchParams(String(init.body)).get("q")).toBe(LINES.join("\n"));
  });

  it("translates line by line when Google merges lines", async () => {
    const fetchMock = stubFetch({
      "https://translate.google.com/translate_a/single": (_, init) => {
        const text = new URLSearchParams(String(init.body)).get("q");
        return text.includes("\n") ? googleAnswer("Почти. Ключи. - Да. - Идём.", "Да.") : googleAnswer(`[ru] ${text}`);
      },
    });

    expect(await translateBatch("google")).toEqual(LINES.map((line) => `[ru] ${line}`));
    expect(fetchMock).toHaveBeenCalledTimes(1 + LINES.length);
  });

  it("keeps a line with a line break as one line", async () => {
    const fetchMock = stubFetch({
      "https://translate.google.com/translate_a/single": () => googleAnswer("Да. Идём."),
    });

    expect(await translateBatch("google", {}, ["Yes.\nLet's go."])).toEqual(["Да. Идём."]);
    expect(new URLSearchParams(String(fetchMock.mock.calls[0][1].body)).get("q")).toBe("Yes. Let's go.");
  });

  it("explains Google refusing the requests", async () => {
    stubFetch({
      "https://translate.google.com/translate_a/single": () =>
        new Response("<html>Our systems have detected unusual traffic</html>", { status: 429 }),
    });

    expect(await translateBatch("google")).toEqual({
      error: "it refused the request, probably after too many of them. Try again later or pick DeepL or ChatGPT",
    });
  });

  it("sends the lines to DeepL as one list", async () => {
    const fetchMock = stubFetch({
      "https://api-free.deepl.com/v2/translate": () =>
        json({ translations: [{ text: "Почти." }, { text: "- Да." }, { text: "Да." }] }),
    });

    expect(await translateBatch("deepl", { deeplApiKey: "secret:fx" })).toEqual(["Почти.", "- Да.", "Да."]);
    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body))).toEqual({ text: LINES, target_lang: "ru" });
  });

  it("explains DeepL's quota", async () => {
    stubFetch({ "https://api-free.deepl.com/v2/translate": () => json({}, 456) });

    expect(await translateBatch("deepl", { deeplApiKey: "secret:fx" })).toEqual({ error: "DeepL quota exceeded" });
  });

  it("gives ChatGPT the lines together, as context", async () => {
    expect(await translateBatch("chatgpt", { chatGPTApiKey: "sk-test" }, ["Hello", "skip"])).toEqual([
      "ChatGPT auto→ru: Hello",
      "",
    ]);
  });

  it("asks for a ChatGPT API key", async () => {
    expect(await translateBatch("chatgpt", { chatGPTApiKey: "" })).toEqual({
      error: "ChatGPT API key is required for translation",
    });
  });
});

describe("background: pronunciation", () => {
  it("answers with the audio of the chosen service as a data: URL", async () => {
    stubFetch({ "https://dict.youdao.com/dictvoice": () => audio([1, 2, 3]) });

    const answer = await sendToBackground({ type: "pronounce", text: "keys", language: "en", service: "youdao" });

    expect(answer).toEqual({ audio: "data:audio/mpeg;base64,AQID", service: "youdao" });
  });

  it("answers with the error when no service has the audio", async () => {
    stubFetch({ "https://translate.google.com/translate_tts": () => json({}, 500) });

    const answer = await sendToBackground({ type: "pronounce", text: "keys", language: "en", service: "google" });

    expect(answer).toEqual({ error: 'Google has no pronunciation of "keys"' });
  });
});

describe("background: requests of learning services", () => {
  it("posts JSON for AnkiConnect", async () => {
    const fetchMock = stubFetch({ "http://localhost:8765": () => json({ result: 1, error: null }) });

    const answer = await sendToBackground({ type: "post", url: "http://localhost:8765", data: { action: "version" } });

    expect(answer).toEqual({ result: 1, error: null });
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8765", { method: "POST", body: '{"action":"version"}' });
  });

  it("answers with the HTTP status of a failed post", async () => {
    stubFetch({ "http://localhost:8765": () => json({}, 500) });

    expect(await sendToBackground({ type: "post", url: "http://localhost:8765", data: {} })).toEqual({
      error: "HTTP error! status: 500",
    });
  });

  it("answers a post nobody answered with a connection error", async () => {
    stubFetch({
      "http://localhost:8765": () => {
        throw new TypeError("Failed to fetch");
      },
    });

    expect(await sendToBackground({ type: "post", url: "http://localhost:8765", data: {} })).toEqual({
      error: "connection error",
    });
  });
});

describe("background: LinguaLeo", () => {
  const PROFILE = { data: { targetLang: "English", nativeLang: "ru" } };

  it("adds a word in the user's language pair", async () => {
    const fetchMock = stubFetch({
      "https://api.lingualeo.com/getUserProfile": () => json(PROFILE),
      "https://api.lingualeo.com/SetWords": () => json({ data: [{ word: { id: 1 } }] }),
    });

    const answer = await sendToBackground({ type: "addWordToLingualeo", word: "keys", translation: "ключи" });

    expect(answer).toEqual({ lingualeoResponse: { data: [{ word: { id: 1 } }] } });
    const [, init] = fetchMock.mock.calls[1];
    expect(init.credentials).toBe("include");
    expect(JSON.parse(String(init.body)).data[0].valueList).toMatchObject({
      wordValue: "keys",
      langPair: { source: "en", target: "ru" },
      translation: { tr: "ключи" },
    });
  });

  it.each([
    ["the session expired", () => json({}, 401)],
    ["the profile has no languages", () => json({ data: {} })],
  ])("asks to log in when %s", async (_, profile) => {
    stubFetch({ "https://api.lingualeo.com/getUserProfile": profile });

    expect(await sendToBackground({ type: "addWordToLingualeo", word: "keys", translation: "ключи" })).toEqual({
      error: "not_authenticated",
    });
  });

  it("answers with LinguaLeo's error message", async () => {
    stubFetch({
      "https://api.lingualeo.com/getUserProfile": () => json(PROFILE),
      "https://api.lingualeo.com/SetWords": () => json({ error_msg: "Word limit reached" }),
    });

    expect(await sendToBackground({ type: "addWordToLingualeo", word: "keys", translation: "ключи" })).toEqual({
      error: "Word limit reached",
    });
  });
});

describe("background: Puzzle English", () => {
  it("previews the word, then adds the preview", async () => {
    const previewWords = [{ word: "keys", translation: "ключи" }];
    const fetchMock = stubFetch({
      "https://puzzle-english.com/api2/dictionary/checkWordsFromMassImport": () => json({ previewWords }),
      "https://puzzle-english.com/api2/dictionary/addWordsFromMassImport": () => json({ status: true }),
    });

    expect(await sendToBackground({ type: "addWordToPuzzleEnglish", word: "keys" })).toEqual({ status: true });
    const [check, add] = fetchMock.mock.calls.map(([, init]) => init.body as FormData);
    expect(check.get("words")).toBe("keys");
    expect(JSON.parse(String(add.get("words")))).toEqual(previewWords);
    expect(add.get("idSet")).toBe("0");
  });

  it("answers with an error when the word can't be previewed", async () => {
    stubFetch({
      "https://puzzle-english.com/api2/dictionary/checkWordsFromMassImport": () => json({ message: "Not logged in" }),
    });

    expect(await sendToBackground({ type: "addWordToPuzzleEnglish", word: "keys" })).toEqual({
      error: "Failed to preview words for Puzzle English",
      detail: { message: "Not logged in" },
    });
  });
});

// The learning services in content scripts with the real background answering them
describe("learning services through the background", () => {
  it("adds a word to Anki", async () => {
    stubFetch({
      "http://localhost:8765": (_, init) => {
        const { action } = JSON.parse(String(init.body));
        return json(action === "modelNames" ? { result: ["Easysubs"], error: null } : { result: 1, error: null });
      },
    });

    await expect(new Anki().addWord("keys", "ключи", { partOfSpeech: "noun" })).resolves.toBe("Word added to Anki");
  });

  it("asks to start Anki when AnkiConnect doesn't answer", async () => {
    stubFetch({
      "http://localhost:8765": () => {
        throw new TypeError("Failed to fetch");
      },
    });

    await expect(new Anki().addWord("keys", "ключи", { partOfSpeech: "noun" })).rejects.toBe(
      "Error connecting to Anki. Please make sure Anki is running and AnkiConnect is installed.",
    );
  });

  it("adds a word to LinguaLeo", async () => {
    stubFetch({
      "https://api.lingualeo.com/getUserProfile": () => json({ data: { targetLang: "English", nativeLang: "ru" } }),
      "https://api.lingualeo.com/SetWords": () => json({ data: [{ word: { id: 1 } }] }),
    });

    await expect(new LinguaLeo().addWord("keys", "ключи", {})).resolves.toBe("Word added to LinguaLeo");
  });
});

describe("subtitles found online", () => {
  it("looks titles up on Cinemeta", async () => {
    stubFetch({
      "https://v3-cinemeta.strem.io/catalog/series/top/search=Dark.json": () =>
        json({ metas: [{ imdb_id: "tt5753856", name: "Dark", releaseInfo: "2017-2020" }] }),
    });
    expect(await sendToBackground({ type: "lookupTitle", title: "Dark", kind: "episode" })).toEqual([
      { imdbId: "tt5753856", name: "Dark", year: 2017, type: "episode" },
    ]);
  });

  it("searches the sources, through the mirror without an OpenSubtitles key", async () => {
    stubFetch({
      "https://opensubtitles-v3.strem.io/subtitles/movie/tt0133093.json": () =>
        json({
          subtitles: [{ id: "1", url: "https://subs5.strem.io/1", lang: "eng", movieReleaseName: "The.Matrix.1999" }],
        }),
    });
    expect(
      await sendToBackground({
        type: "searchSubtitles",
        query: { title: "The Matrix", type: "movie", imdbId: "tt0133093", language: "en" },
        sources: ["opensubtitles"],
        auth: {},
        mirror: true,
      }),
    ).toEqual({
      results: [
        { source: "stremio", id: "1", language: "en", release: "The.Matrix.1999", url: "https://subs5.strem.io/1" },
      ],
      failed: [],
      mirrored: true,
    });
  });

  it("downloads a file, and says what went wrong when it can't", async () => {
    stubFetch({
      "https://subs5.strem.io/1": () => new Response("1\n00:00:01,000 --> 00:00:02,000\nHi\n"),
      "https://subs5.strem.io/2": () => new Response("", { status: 404 }),
    });
    const result = { source: "stremio", id: "1", language: "en", release: "", url: "https://subs5.strem.io/1" };
    expect(await sendToBackground({ type: "downloadSubtitle", result, auth: {} })).toEqual({
      text: "1\n00:00:01,000 --> 00:00:02,000\nHi\n",
    });
    expect(
      await sendToBackground({
        type: "downloadSubtitle",
        result: { ...result, url: "https://subs5.strem.io/2" },
        auth: {},
      }),
    ).toEqual({ error: "The Stremio mirror answered 404", kind: "failed", status: 404 });
  });
});
