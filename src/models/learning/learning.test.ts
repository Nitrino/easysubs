import { describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import { addWordFx, clipLineFx, type TWordToAdd } from ".";
import { $ankiContext, $learningService, $secondarySubs, $translateLanguage } from "../settings";
import { $rawSubs, $subs, $subsLanguage } from "../subs";
import { $streaming } from "../streamings";
import { $secondaryTranslations } from "../secondarySubs";
import type { TAnkiContext, TLearningService } from "../types";
import { answerNextMessage, sentMessages } from "@root/test/chrome";
import { offlineTranslations, playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";

const CUE = "Almost. I just need to pick up my keys.";
const enRu = offlineTranslations("en-ru");

type TNote = { note: { fields: Record<string, string> } };

async function setup({
  service = "anki" as TLearningService,
  context = {} as Partial<TAnkiContext>,
  subsLanguage = "en",
  // The second line in Russian, translated
  secondaryTranslations = null as Record<string, string> | null,
  clip = vi.fn(async () => null as { data: string; extension: string } | null),
} = {}) {
  const streaming = createService({
    getTitle: vi.fn(async () => ({ title: "The Night Train", type: "episode" as const, season: 1, episode: 2 })),
  });
  const scope = fork({
    values: [
      [$learningService, service],
      [$ankiContext, { sentence: true, translation: true, picture: true, audio: true, ...context }],
      [$translateLanguage, "ru"],
      [$streaming, streaming],
      [$secondarySubs, secondaryTranslations ? { language: "ru" } : { language: "off" }],
      [$secondaryTranslations, secondaryTranslations ?? {}],
    ],
    handlers: [[clipLineFx, clip]],
  });
  await allSettled($rawSubs, { scope, params: playgroundCaptions("en") });
  await allSettled($subsLanguage, { scope, params: subsLanguage });
  const cue = scope.getState($subs).find((sub) => sub.cleanedText === CUE);
  return { scope, cue };
}

async function add(scope: ReturnType<typeof fork>, word: TWordToAdd) {
  return allSettled(addWordFx, { scope, params: word });
}

const addedFields = () => {
  const addNote = sentMessages("post").find((message) => (message.data as { action: string }).action === "addNote");
  return ((addNote.data as { params: TNote }).params as TNote).note.fields;
};

describe("adding a word", () => {
  it("adds the word to Anki with its line, the line's translation and where it's from", async () => {
    const { scope, cue } = await setup();

    const result = await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(result).toEqual({ status: "done", value: "Word added to Anki" });
    expect(addedFields()).toMatchObject({
      Word: "keys",
      Translation: "ключи",
      Context: "Almost. I just need to pick up my <b>keys</b>.",
      "Context Translation": enRu.lines[CUE],
    });
    expect(addedFields().Source).toMatch(/^<a href="[^"]+">The Night Train · S1E2 · 0:0\d<\/a>$/);
    expect(sentMessages("translateFullText")).toMatchObject([{ text: CUE, language: "ru" }]);
  });

  it("adds the sound of the line the player buffered", async () => {
    const clip = vi.fn(async () => ({ data: "UklGRg==", extension: "wav" }));
    const { scope, cue } = await setup({ clip });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(clip).toHaveBeenCalledWith({ start: cue.start, end: cue.end });
    const stored = sentMessages("post")
      .map((message) => message.data as { action: string; params: { filename: string; data: string } })
      .find((data) => data.action === "storeMediaFile").params;
    expect(stored).toMatchObject({ filename: expect.stringMatching(/\.wav$/), data: "UklGRg==" });
    expect(addedFields().Audio).toBe(`[sound:${stored.filename}]`);
  });

  it("adds the line without a sound when it's turned off or the player didn't buffer it", async () => {
    const clip = vi.fn(async () => null);
    const { scope, cue } = await setup({ clip, context: { audio: false } });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });
    expect(clip).not.toHaveBeenCalled();

    const buffered = await setup({ clip });
    await add(buffered.scope, { word: "keys", translation: "ключи", cueId: buffered.cue.id, indexes: [8] });
    expect(clip).toHaveBeenCalledTimes(1);
    expect(addedFields()).toMatchObject({ Context: expect.stringContaining("keys"), Audio: "" });
  });

  it("bolds every word of an expression", async () => {
    const { scope, cue } = await setup();

    await add(scope, {
      word: "pick up",
      translation: "забрать",
      partOfSpeech: "phrase",
      cueId: cue.id,
      indexes: [5, 6],
    });

    expect(addedFields().Context).toBe("Almost. I just need to <b>pick up</b> my keys.");
  });

  it("takes the translation the second line shows", async () => {
    const { scope, cue } = await setup({ secondaryTranslations: { [CUE]: "Из второй строки." } });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(addedFields()["Context Translation"]).toBe("Из второй строки.");
    expect(sentMessages("translateFullText")).toEqual([]);
  });

  it("adds the line without its translation when the translation fails", async () => {
    answerNextMessage("translateFullText", { error: "Too many requests" });
    const { scope, cue } = await setup();

    const result = await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(result.status).toBe("done");
    expect(addedFields()).toMatchObject({ Context: expect.stringContaining("<b>keys</b>"), "Context Translation": "" });
  });

  it("translates nothing when the subtitles are in the translation language", async () => {
    const { scope, cue } = await setup({ subsLanguage: "ru" });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(addedFields()["Context Translation"]).toBe("");
    expect(sentMessages("translateFullText")).toEqual([]);
  });

  it("leaves out the line's translation when it's turned off", async () => {
    const { scope, cue } = await setup({ context: { translation: false } });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(addedFields()).toMatchObject({ Context: expect.stringContaining("keys"), "Context Translation": "" });
    expect(sentMessages("translateFullText")).toEqual([]);
  });

  it("adds the word alone when the line is turned off", async () => {
    const { scope, cue } = await setup({ context: { sentence: false } });

    await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(addedFields()).toEqual({ Word: "keys", Translation: "ключи", "Part of Speech": "", Context: "" });
  });

  it("sends other services the word alone", async () => {
    const { scope, cue } = await setup({ service: "lingualeo" });

    const result = await add(scope, { word: "keys", translation: "ключи", cueId: cue.id, indexes: [8] });

    expect(result).toEqual({ status: "done", value: "Word added to LinguaLeo" });
    expect(sentMessages("addWordToLingualeo")).toEqual([
      { type: "addWordToLingualeo", word: "keys", translation: "ключи" },
    ]);
    expect(sentMessages("translateFullText")).toEqual([]);
  });

  it("fails without a learning service", async () => {
    const { scope } = await setup({ service: "disabled" });

    expect(await add(scope, { word: "keys", translation: "ключи" })).toEqual({
      status: "fail",
      value: "Pick a learning service in the settings",
    });
  });
});
