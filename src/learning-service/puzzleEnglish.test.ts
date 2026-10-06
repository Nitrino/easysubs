import { describe, expect, it } from "vitest";
import { PuzzleEnglish } from "./puzzleEnglish";
import { chromeMock, sentMessages } from "@root/test/chrome";

function answer(response: unknown, lastError?: chrome.runtime.LastError) {
  chromeMock.runtime.sendMessage.mockImplementation(async (_message, callback) => {
    chromeMock.runtime.lastError = lastError;
    callback?.(response);
    chromeMock.runtime.lastError = undefined;
    return response;
  });
}

const addWord = () => new PuzzleEnglish().addWord("keys", "ключи", {});

describe("Puzzle English", () => {
  it("adds a word, which Puzzle English translates itself", async () => {
    answer({ status: true });

    await expect(addWord()).resolves.toBe("Word added to Puzzle English");
    expect(sentMessages()).toEqual([{ type: "addWordToPuzzleEnglish", word: "keys" }]);
  });

  it("shows request errors", async () => {
    answer({ error: "Failed to preview words for Puzzle English" });

    await expect(addWord()).rejects.toBe("Puzzle English Error: Failed to preview words for Puzzle English");
  });

  it("tells when the word wasn't added", async () => {
    answer({ status: false });

    await expect(addWord()).rejects.toBe("Puzzle English failed to add word. Might already exist.");
  });

  it("shows extension errors", async () => {
    answer(undefined, { message: "Could not establish connection." });

    await expect(addWord()).rejects.toBe("Extension Error: Could not establish connection.");
  });
});
