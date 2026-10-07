import { describe, expect, it } from "vitest";
import { translateExpressionsWithChatGPT } from "./chatGPTExpressions";
import { json, stubFetch } from "@root/test/fetch";

const OPENAI = "https://api.openai.com/v1/chat/completions";
const LINE = "What if we run out of time at the station?";

// OpenAI's chat completion with `content` as the model's answer
const completion = (content: unknown) =>
  json({ choices: [{ message: { content: typeof content === "string" ? content : JSON.stringify(content) } }] });

const request = { text: LINE, expressions: ["run out", "out of time"], language: "ru", chatGPTApiKey: "sk-test" };

describe("translateExpressionsWithChatGPT", () => {
  it("translates all the expressions of a line in one JSON request", async () => {
    const fetchMock = stubFetch({
      [OPENAI]: () =>
        completion({
          expressions: [
            { expression: "run out", translation: "закончиться", alternatives: ["иссякнуть", "закончиться", "", 5] },
            { expression: "Out of Time", translation: "не успеть", alternatives: [] },
          ],
        }),
    });

    expect(await translateExpressionsWithChatGPT({ ...request, chatGPTModel: "gpt-4.1-mini" })).toEqual({
      "run out": { main: "закончиться", alternatives: [{ text: "иссякнуть" }] },
      "out of time": { main: "не успеть", alternatives: [] },
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers).toMatchObject({ Authorization: "Bearer sk-test" });
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ model: "gpt-4.1-mini", response_format: { type: "json_object" } });
    expect(JSON.parse(body.messages[1].content)).toEqual({
      line: LINE,
      expressions: ["run out", "out of time"],
      language: "Russian",
    });
  });

  it("uses gpt-4o-mini when no model is set", async () => {
    const fetchMock = stubFetch({ [OPENAI]: () => completion({ expressions: [] }) });

    await translateExpressionsWithChatGPT(request);

    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body)).model).toBe("gpt-4o-mini");
  });

  it("leaves out expressions it wasn't asked for or didn't translate", async () => {
    stubFetch({
      [OPENAI]: () =>
        completion({
          expressions: [
            { expression: "at the station", translation: "на вокзале" },
            { expression: "run out", translation: "" },
          ],
        }),
    });

    expect(await translateExpressionsWithChatGPT(request)).toEqual({});
  });

  it("fails without a key, with a wrong key, and on an answer that isn't JSON", async () => {
    await expect(translateExpressionsWithChatGPT({ ...request, chatGPTApiKey: "" })).rejects.toThrow(
      "ChatGPT API key is required",
    );

    stubFetch({ [OPENAI]: () => json({ error: { message: "Incorrect API key" } }, 401) });
    await expect(translateExpressionsWithChatGPT(request)).rejects.toThrow("Invalid OpenAI API key");

    stubFetch({ [OPENAI]: () => json({ error: { message: "Rate limit reached" } }, 429) });
    await expect(translateExpressionsWithChatGPT(request)).rejects.toThrow("ChatGPT: Rate limit reached");

    stubFetch({ [OPENAI]: () => completion("Sure! Here are the translations") });
    await expect(translateExpressionsWithChatGPT(request)).rejects.toThrow("didn't answer with the translations");
  });

  it("asks nothing for a line without expressions", async () => {
    const fetchMock = stubFetch({});

    expect(await translateExpressionsWithChatGPT({ ...request, expressions: [] })).toEqual({});
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
