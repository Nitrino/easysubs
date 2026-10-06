import { beforeEach, describe, expect, it, vi } from "vitest";
import "./index";
import { Anki } from "@src/learning-service/anki";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { chromeMock, dispatchInstalled, sendToBackground } from "@root/test/chrome";

// The translators of the anylang package call their services; these answer like them
vi.mock("anylang/translators", () => {
  const translator = (name: string) =>
    class {
      translate = vi.fn(async (text: string, from: string, to: string) => {
        if (text === "fail") throw new Error(`${name} is unavailable`);
        return `${name} ${from}→${to}: ${text}`;
      });
    };
  return {
    MicrosoftTranslator: translator("Bing"),
    YandexTranslator: translator("Yandex"),
    ChatGPTLLMTranslator: translator("ChatGPT"),
  };
});

type Handler = (url: string, init: RequestInit) => Response | Promise<Response>;

// fetch() answered by URL; a request nobody answers fails the test
function stubFetch(handlers: Record<string, Handler>) {
  const fetchMock = vi.fn(async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    const prefix = Object.keys(handlers).find((key) => url.startsWith(key));
    if (!prefix) throw new Error(`Unexpected request: ${url}`);
    return handlers[prefix](url, init);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

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
