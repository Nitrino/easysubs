import { describe, expect, it } from "vitest";
import { chatGPTWord } from "./chatGPTWord";
import { json, stubFetch } from "@root/test/fetch";

const COMPLETIONS = "https://api.openai.com/v1/chat/completions";

describe("chatGPTWord", () => {
  it("looks a word up like a dictionary with the user's key and model", async () => {
    const fetchMock = stubFetch({
      [COMPLETIONS]: () =>
        json({
          choices: [
            {
              message: {
                content: JSON.stringify({ lemma: "key", meanings: [{ translation: "ключ", partOfSpeech: "noun" }] }),
              },
            },
          ],
        }),
    });

    expect(
      await chatGPTWord({ text: "keys", from: "en", to: "ru" }, { chatGPTApiKey: "sk-test", chatGPTModel: "gpt-4o" }),
    ).toEqual({
      source: "keys",
      mainTranslation: "ключ",
      targetLanguage: "ru",
      transcription: "",
      lemma: "key",
      translations: [{ word: "ключ", partOfSpeech: "noun", synonyms: [], popularity: 0 }],
    });
    const [, init] = fetchMock.mock.calls[0];
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer sk-test");
    expect(JSON.parse(String(init?.body))).toMatchObject({ model: "gpt-4o", response_format: { type: "json_object" } });
  });

  it("sends the line, and keeps the word's translation in it unless it repeats the first meaning", async () => {
    const answer = (inLine: string) =>
      json({
        choices: [
          {
            message: {
              content: JSON.stringify({ inLine, meanings: [{ translation: "забрать", partOfSpeech: "verb" }] }),
            },
          },
        ],
      });
    let inLine = "заберу";
    const fetchMock = stubFetch({ [COMPLETIONS]: () => answer(inLine) });
    const request = { text: "pick", from: "en", to: "ru", line: "I'll pick you up at eight." };

    expect(await chatGPTWord(request, { chatGPTApiKey: "sk-test" })).toMatchObject({
      mainTranslation: "забрать",
      inLine: "заберу",
    });
    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(JSON.parse(body.messages[1].content)).toMatchObject({ word: "pick", line: "I'll pick you up at eight." });

    inLine = "забрать";
    expect(await chatGPTWord(request, { chatGPTApiKey: "sk-test" })).not.toHaveProperty("inLine");
    expect(await chatGPTWord({ ...request, line: undefined }, { chatGPTApiKey: "sk-test" })).not.toHaveProperty(
      "inLine",
    );
  });

  it("needs a key, and tells a wrong one", async () => {
    await expect(chatGPTWord({ text: "keys", from: "en", to: "ru" }, {})).rejects.toThrow(
      "ChatGPT API key is required",
    );
    stubFetch({ [COMPLETIONS]: () => json({}, 401) });
    await expect(chatGPTWord({ text: "keys", from: "en", to: "ru" }, { chatGPTApiKey: "bad" })).rejects.toThrow(
      "Invalid OpenAI API key",
    );
  });
});
