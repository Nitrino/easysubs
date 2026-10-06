/**
 * The playground's data for unit tests, so they work with the same subtitles and translations as the e2e tests:
 * subtitles from playground/public/subs and the offline translations from playground/fixtures/translations.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "subtitle";
import type { TranslationFixture } from "@root/playground/src/translationPairs";
import { convertRawSubs } from "@src/utils/convertRawSubs";
import type { Captions } from "@src/models/types";

const playgroundDir = resolve(import.meta.dirname, "../playground");

// Raw captions of playground/public/subs/<language>.srt, as Service.getSubs() returns them
export const playgroundCaptions = (language: "en" | "es"): Captions =>
  parse(readFileSync(resolve(playgroundDir, `public/subs/${language}.srt`), "utf8"));

export const playgroundSubs = (language: "en" | "es") => convertRawSubs(playgroundCaptions(language));

export const offlineTranslations = (pair: string): TranslationFixture =>
  JSON.parse(readFileSync(resolve(playgroundDir, `fixtures/translations/${pair}.json`), "utf8"));

// Captions from SRT-like [start, end, text] tuples in seconds
export const captions = (...cues: [number, number, string][]): Captions =>
  cues.map(([start, end, text]) => ({ start: start * 1000, end: end * 1000, text }));
