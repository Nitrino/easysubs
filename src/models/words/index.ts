import { attach, combine, createEffect, createEvent, createStore, sample } from "effector";

import { withPersist } from "@src/utils/withPersist";
import type { TSavedWord, TSub, TWordColoring, TWordLine, TWordStatus } from "../types";
import { $subs, $subsLanguage } from "../subs";
import { $streaming } from "../streamings";
import { $learningService } from "../settings";
import {
  episodeScore,
  normalizeWord,
  reviewWord,
  viewWord,
  withLine,
  wordKey,
  wordsLanguage,
  type TReviewGrade,
  type TWordsState,
} from "@src/utils/words";
import { frequencyLanguage, type TWordRank } from "@src/utils/frequency/lookup";
import { timedUrl, titleLabel } from "@src/utils/wordContext";
import { Anki } from "@src/learning-service/anki";

// The words the user knows and learns, kept on the device by language and dictionary form (src/utils/words.ts). A
// word is known when the user marked it known or, unless they marked it otherwise, when it's within their level: a
// rank in the language's frequency list (src/utils/frequency), set once by the level check or a CEFR level. The
// subtitles color their words by it, the settings' Words tab tells how much of the episode is known, and the Saved
// words sheet lists the words with a review and a CSV file. With Anki as the learning service, the Easysubs cards are
// read back: a card Anki shows three weeks apart or more is a known word.

export const $words = withPersist(createStore<Record<string, TSavedWord>>({}, { name: "words" }));
export const $wordColoring = withPersist(createStore<TWordColoring>("all", { name: "wordColoring" }));
export const wordColoringChanged = createEvent<TWordColoring>();
// The rank each language's words are known up to, 0 when the user marks words themselves
export const $wordLevels = withPersist(createStore<Record<string, number>>({}, { name: "wordLevels" }));
export const levelSet = createEvent<{ language: string; rank: number }>();

// The subtitles' language as words are kept under it; null until it's detected
export const $wordsLanguage = $subsLanguage.map((language) =>
  language && language !== "auto" ? wordsLanguage(language) : null,
);
export const $wordLevel = combine($wordLevels, $wordsLanguage, (levels, language) =>
  language && language in levels ? levels[language] : null,
);

// The dictionary forms and ranks of the track's words, null for the ones the frequency list lacks
export const $wordRanks = createStore<{ language: string; ranks: Record<string, TWordRank | null> }>({
  language: "",
  ranks: {},
});
async function requestWordRanks({ language, words }: { language: string; words: string[] }) {
  const answer = await chrome.runtime.sendMessage({ type: "wordRanks", language, words });
  if (!answer?.ranks) throw new Error(answer?.error ?? "No word ranks");
  return Object.fromEntries(words.map((word) => [word, answer.ranks[word] ?? null])) as Record<
    string,
    TWordRank | null
  >;
}
export const fetchWordRanksFx = createEffect(requestWordRanks);

// What the words are matched with: null ranks for languages without a frequency list, where no level is needed
export const $wordsState = combine(
  $words,
  $wordsLanguage,
  $wordRanks,
  $wordLevel,
  (words, language, ranks, level): TWordsState | null => {
    if (!language) return null;
    if (!frequencyLanguage(language)) return { words, language, ranks: null, level: null };
    const own = ranks.language === language ? ranks.ranks : {};
    return { words, language, ranks: own as Record<string, TWordRank>, level };
  },
);

// New words are colored once the level is set, in languages with a frequency list; at once in the others. Learning
// words are colored whatever the level.
export const $newWordsColored = combine(
  $wordColoring,
  $wordsState,
  (coloring, state) => coloring === "all" && Boolean(state) && (state!.ranks === null || state!.level !== null),
);

export type TWordStatusChange = {
  // The word as the subtitles show it
  text: string;
  // "new" forgets the user's mark: the word is known by their level again, or new
  status: TWordStatus;
  translation?: string;
  partOfSpeech?: string;
  // The cue it's in, for the line it's saved with
  cueId?: number;
  // A word of another language than the subtitles', from the saved words, kept as it is
  language?: string;
};
export const wordStatusChanged = createEvent<TWordStatusChange>();
export const wordsRemoved = createEvent<string[]>();
export const wordReviewed = createEvent<{ key: string; grade: TReviewGrade }>();
// Every word of the episode that isn't known becomes known: what LingQ does when a lesson is finished
export const episodeWordsMarkedKnown = createEvent();
export const wordsImported = createEvent<TSavedWord[]>();
// Another tab changed the words
const wordsSynced = createEvent<Record<string, TSavedWord>>();

export const $savedWordsOpen = createStore(false);
export const savedWordsOpened = createEvent();
export const savedWordsClosed = createEvent();
$savedWordsOpen.on(savedWordsOpened, () => true).reset(savedWordsClosed);

// The level check, in place of the settings panel like the saved words
export const $levelSetupOpen = createStore(false);
export const levelSetupOpened = createEvent();
export const levelSetupClosed = createEvent();
$levelSetupOpen.on(levelSetupOpened, () => true).reset(levelSetupClosed, levelSet);
export const levelSampleFx = createEffect(async (language: string): Promise<{ word: string; rank: number }[]> => {
  const answer = await chrome.runtime.sendMessage({ type: "frequencySample", language, perBand: 6 });
  if (!answer?.words) throw new Error(answer?.error ?? "No words to check");
  return answer.words;
});

export const $episodeScore = combine($subs, $wordsState, (subs, state) =>
  state && subs.length ? episodeScore(subs, state) : null,
);

function lineOf(sub: TSub | undefined, streaming: { name: string } | null): TWordLine | undefined {
  if (!sub) return undefined;
  return {
    line: sub.cleanedText,
    source: titleLabel(null, document.title) || undefined,
    url: timedUrl(location.href, streaming?.name ?? "", sub.start),
    time: sub.start,
  };
}

// ---- Ranks of the track's words ----

sample({
  clock: [$subs, $wordsLanguage],
  source: { subs: $subs, language: $wordsLanguage, ranks: $wordRanks },
  filter: ({ language }) => Boolean(language && frequencyLanguage(language)),
  fn: ({ subs, language, ranks }) => {
    const known = ranks.language === language ? ranks.ranks : {};
    const words = new Set<string>();
    for (const sub of subs) {
      for (const item of sub.items) {
        const word = normalizeWord(item.text, language!);
        if (word && !(word in known)) words.add(word);
      }
    }
    return { language: language!, words: [...words] };
  },
  target: fetchWordRanksFx,
});

$wordRanks.on(fetchWordRanksFx.done, (current, { params, result }) => ({
  language: params.language,
  ranks: current.language === params.language ? { ...current.ranks, ...result } : result,
}));

// ---- Changes ----

sample({
  clock: wordStatusChanged,
  source: { state: $wordsState, subs: $subs, streaming: $streaming },
  filter: ({ state }, change) => Boolean(change.language || (state && normalizeWord(change.text, state.language))),
  fn: ({ state, subs, streaming }, { text, status, translation, partOfSpeech, cueId, ...change }) => {
    const words = state?.words ?? {};
    const language = change.language ? wordsLanguage(change.language) : state!.language;
    // A saved word is kept as it is; a word of the subtitles by its dictionary form
    const view = change.language ? null : viewWord(state!, text);
    const word = view?.lemma ?? text;
    const key = wordKey(language, word);
    // Words saved before by the form they were said in go with their dictionary form
    const formKey = view && view.word !== view.lemma ? wordKey(language, view.word) : null;
    const saved = words[key] ?? (formKey ? words[formKey] : undefined);
    const next = { ...words };
    delete next[key];
    if (formKey) delete next[formKey];
    if (status === "new") return next;
    const lines = withLine(
      saved?.lines,
      lineOf(
        subs.find((sub) => sub.id === cueId),
        streaming,
      ),
    );
    next[key] = {
      ...saved,
      word,
      language,
      status,
      ...((translation ?? saved?.translation) && { translation: translation ?? saved?.translation }),
      ...((translation ? partOfSpeech : saved?.partOfSpeech) && {
        partOfSpeech: translation ? partOfSpeech : saved?.partOfSpeech,
      }),
      ...(lines && { lines }),
      added: saved?.added ?? Date.now(),
      // A known word has nothing to review; one learned again starts over
      review: status === "learning" && saved?.status === "learning" ? saved.review : undefined,
    };
    return next;
  },
  target: $words,
});

$words.on(wordsRemoved, (words, keys) => {
  const next = { ...words };
  for (const key of keys) delete next[key];
  return next;
});

$words.on(wordReviewed, (words, { key, grade }) =>
  words[key] ? { ...words, [key]: reviewWord(words[key], grade, Date.now()) } : words,
);

sample({
  clock: episodeWordsMarkedKnown,
  source: { words: $words, language: $wordsLanguage, score: $episodeScore },
  filter: ({ language, score }) => Boolean(language && score?.unknown.length),
  fn: ({ words, language, score }) => {
    const now = Date.now();
    const next = { ...words };
    for (const word of score!.unknown) {
      const key = wordKey(language!, word);
      // Words the user learns stay learning
      if (next[key]?.status !== "learning") next[key] = { word, language: language!, status: "known", added: now };
    }
    return next;
  },
  target: $words,
});

// Imported words are added; the ones already kept stay as they are
$words.on(wordsImported, (words, imported) => {
  const next = { ...words };
  for (const word of imported) {
    const key = wordKey(word.language, word.word);
    if (!next[key]) next[key] = word;
  }
  return next;
});

$wordLevels.on(levelSet, (levels, { language, rank }) => ({ ...levels, [wordsLanguage(language)]: rank }));

$words.on(wordsSynced, (_, words) => words);
$wordColoring.on(wordColoringChanged, (_, coloring) => coloring);

// ---- Anki ----

// Three weeks between reviews: Anki calls such a card mature
export const MATURE_INTERVAL_DAYS = 21;

export const ankiSyncRequested = createEvent();
export const syncAnkiFx = attach({
  source: { words: $words, language: $wordsLanguage },
  effect: createEffect(async ({ words, language }: { words: Record<string, TSavedWord>; language: string | null }) => {
    if (!language) throw "Open subtitles first: the cards' words are kept in their language";
    const cards = await new Anki().readWords();
    const forms = cards.map((card) => normalizeWord(card.word, language)).filter((word): word is string => !!word);
    const ranks = frequencyLanguage(language)
      ? await requestWordRanks({ language, words: [...new Set(forms)] }).catch(() => ({}))
      : {};
    const next = { ...words };
    const now = Date.now();
    let changed = 0;
    for (const card of cards) {
      const form = normalizeWord(card.word, language);
      if (!form) continue;
      const word = (ranks as Record<string, TWordRank | null>)[form]?.[0] ?? form;
      const key = wordKey(language, word);
      const status = card.interval >= MATURE_INTERVAL_DAYS ? "known" : "learning";
      const saved = next[key];
      // A word the user knows stays known whatever Anki says
      if (saved?.status === "known" || (saved?.status === status && saved.anki)) continue;
      next[key] = {
        ...saved,
        word,
        language,
        status,
        ...((saved?.translation ?? card.translation) && { translation: saved?.translation ?? card.translation }),
        added: saved?.added ?? now,
        anki: true,
        review: undefined,
      };
      changed += 1;
    }
    return { words: next, cards: cards.length, changed };
  }),
});
sample({ clock: ankiSyncRequested, target: syncAnkiFx });
$words.on(syncAnkiFx.doneData, (_, { words }) => words);

// Anki reviews the words when it's the learning service
export const $ankiReviews = $learningService.map((service) => service === "anki");

// Every tab keeps the words in memory; one tab's change reaches the others through the storage. The same words come
// back from the tab that saved them, and stop there.
chrome.storage.onChanged?.addListener((changes, area) => {
  const change = changes["persist:words"];
  if (area !== "local" || typeof change?.newValue !== "string") return;
  if (change.newValue === JSON.stringify($words.getState())) return;
  try {
    wordsSynced(JSON.parse(change.newValue));
  } catch {
    // Not words
  }
});
