import { describe, expect, it } from "vitest";
import { LinguaLeo } from "./linguaLeo";
import { chromeMock, sentMessages } from "@root/test/chrome";

// The background's answer to addWordToLingualeo, given to the sendMessage callback
function answer(response: unknown, lastError?: chrome.runtime.LastError) {
  chromeMock.runtime.sendMessage.mockImplementation(async (_message, callback) => {
    chromeMock.runtime.lastError = lastError;
    callback?.(response);
    chromeMock.runtime.lastError = undefined;
    return response;
  });
}

const addWord = () => new LinguaLeo().addWord("keys", "ключи", {});

describe("LinguaLeo", () => {
  it("adds a word with its translation", async () => {
    answer({ lingualeoResponse: { data: [{ word: { id: 1 } }] } });

    await expect(addWord()).resolves.toBe("Word added to LinguaLeo");
    expect(sentMessages()).toEqual([{ type: "addWordToLingualeo", word: "keys", translation: "ключи" }]);
  });

  it("asks to log in", async () => {
    answer({ error: "not_authenticated" });

    await expect(addWord()).rejects.toBe("LinguaLeo: please log in at lingualeo.com");
  });

  it("explains that Premium is required", async () => {
    answer({ lingualeoResponse: { data: [{ error: { code: "6" } }] } });

    await expect(addWord()).rejects.toBe("LinguaLeo: Premium required (meatballs error).");
  });

  it("shows other API errors", async () => {
    answer({ lingualeoResponse: { data: [{ error: { code: "1", msg: "Bad word" } }] } });

    await expect(addWord()).rejects.toBe('LinguaLeo API Error: {"code":"1","msg":"Bad word"}');
  });

  it("shows request errors", async () => {
    answer({ error: "HTTP error! status: 500" });

    await expect(addWord()).rejects.toBe("LinguaLeo Fetch Error: HTTP error! status: 500");
  });

  it("rejects an empty answer", async () => {
    answer(undefined);

    await expect(addWord()).rejects.toBe("LinguaLeo Error: Empty response from background script.");
  });

  it("shows extension errors", async () => {
    answer(undefined, { message: "Could not establish connection." });

    await expect(addWord()).rejects.toBe("Extension Error: Could not establish connection.");
  });
});
