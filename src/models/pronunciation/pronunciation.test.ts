import { beforeEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import { toneWav } from "@root/playground/src/mockBackground";
import { wordPronounced } from ".";
import { $chatGPTApiKey, $ttsService } from "../settings";
import { $subsLanguage } from "../subs";
import type { TTtsService } from "../types";
import { playAudio } from "@src/utils/playAudio";
import { speak } from "@src/utils/speak";
import { chromeMock, sentMessages } from "@root/test/chrome";

// jsdom can neither decode audio nor speak
vi.mock("@src/utils/playAudio", () => ({ playAudio: vi.fn() }));
vi.mock("@src/utils/speak", () => ({ speak: vi.fn() }));

const pronounce = async (text: string, service: TTtsService, language = "en", chatGPTApiKey = "") => {
  const scope = fork({
    values: [
      [$ttsService, service],
      [$subsLanguage, language],
      [$chatGPTApiKey, chatGPTApiKey],
    ],
  });
  await allSettled(wordPronounced, { scope, params: text });
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("pronunciation", () => {
  it("plays the audio of the chosen service", async () => {
    await pronounce("keys", "youdao");

    expect(sentMessages("pronounce")).toEqual([{ type: "pronounce", text: "keys", language: "en", service: "youdao" }]);
    expect(playAudio).toHaveBeenCalledWith(toneWav());
    expect(speak).not.toHaveBeenCalled();
  });

  it("sends the ChatGPT API key along to ChatGPT only", async () => {
    await pronounce("door", "chatgpt", "en", "sk-test");
    await pronounce("door", "google", "en", "sk-test");

    expect(sentMessages("pronounce")).toEqual([
      expect.objectContaining({ service: "chatgpt", chatGPTApiKey: "sk-test" }),
      { type: "pronounce", text: "door", language: "en", service: "google" },
    ]);
  });

  it("speaks with the browser voice when it's chosen", async () => {
    await pronounce("keys", "browser");

    expect(speak).toHaveBeenCalledWith("keys", "en");
    expect(sentMessages("pronounce")).toEqual([]);
  });

  it("speaks with the browser voice until the subtitles' language is detected", async () => {
    await pronounce("keys", "google", "auto");

    expect(speak).toHaveBeenCalledWith("keys", "auto");
    expect(sentMessages("pronounce")).toEqual([]);
  });

  it("speaks with the browser voice when no service has the audio", async () => {
    chromeMock.runtime.sendMessage.mockResolvedValueOnce({ error: 'Google has no pronunciation of "mumble"' });

    await pronounce("mumble", "wiktionary");

    expect(playAudio).not.toHaveBeenCalled();
    expect(speak).toHaveBeenCalledWith("mumble", "en");
  });

  it("speaks with the browser voice when the audio can't be played", async () => {
    vi.mocked(playAudio).mockRejectedValueOnce(new DOMException("Unable to decode audio data", "EncodingError"));

    await pronounce("ring", "google", "es");

    expect(speak).toHaveBeenCalledWith("ring", "es");
  });

  it("plays a word again without asking the background", async () => {
    await pronounce("again", "google");
    await pronounce("again", "google");
    await pronounce("again", "google", "es");

    expect(sentMessages("pronounce")).toEqual([
      expect.objectContaining({ text: "again", language: "en" }),
      expect.objectContaining({ text: "again", language: "es" }),
    ]);
    expect(playAudio).toHaveBeenCalledTimes(3);
  });
});
