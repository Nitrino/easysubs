import { combine, createEvent, createStore, sample } from "effector";

import { withPersist } from "@src/utils/withPersist";
import type { TSavedWord, TSub, TWordColoring, TWordStatus } from "../types";
import { $subs, $subsLanguage } from "../subs";
import { $streaming } from "../streamings";
import { episodeScore, normalizeWord, reviewWord, wordKey, wordsLanguage, type TReviewGrade } from "@src/utils/words";
import { timedUrl, titleLabel } from "@src/utils/wordContext";

// The words the user knows and learns, kept on the device by language (src/utils/words.ts). The subtitles color their
// words by it, the settings' Words tab tells how much of the episode is known, and the Saved words sheet lists them
// with a review and a CSV file. A word saved with "+" in its popover is learning, whatever the learning service.

export const $words = withPersist(createStore<Record<string, TSavedWord>>({}, { name: "words" }));
export const $wordColoring = withPersist(createStore<TWordColoring>("all", { name: "wordColoring" }));
export const wordColoringChanged = createEvent<TWordColoring>();

// The subtitles' language as words are kept under it; null until it's detected
export const $wordsLanguage = $subsLanguage.map((language) =>
  language && language !== "auto" ? wordsLanguage(language) : null,
);

export type TWordStatusChange = {
  // The word as the subtitles show it
  text: string;
  status: TWordStatus;
  translation?: string;
  // The cue it's in, for the line it's saved with
  cueId?: number;
  // A word of another language than the subtitles', from the saved words
  language?: string;
};
export const wordStatusChanged = createEvent<TWordStatusChange>();
export const wordsRemoved = createEvent<string[]>();
export const wordReviewed = createEvent<{ key: string; grade: TReviewGrade }>();
// Every word of the episode that's neither known nor learned becomes known: what LingQ does when a lesson is finished
export const episodeWordsMarkedKnown = createEvent();
export const wordsImported = createEvent<TSavedWord[]>();
// Another tab changed the words
const wordsSynced = createEvent<Record<string, TSavedWord>>();

export const $savedWordsOpen = createStore(false);
export const savedWordsOpened = createEvent();
export const savedWordsClosed = createEvent();
$savedWordsOpen.on(savedWordsOpened, () => true).reset(savedWordsClosed);

export const $episodeScore = combine($subs, $words, $wordsLanguage, (subs, words, language) =>
  language && subs.length ? episodeScore(subs, words, language) : null,
);

function contextOf(sub: TSub | undefined, streaming: { name: string } | null): TSavedWord["context"] | undefined {
  if (!sub) return undefined;
  return {
    line: sub.cleanedText,
    source: titleLabel(null, document.title) || undefined,
    url: timedUrl(location.href, streaming?.name ?? "", sub.start),
    time: sub.start,
  };
}

sample({
  clock: wordStatusChanged,
  source: { words: $words, language: $wordsLanguage, subs: $subs, streaming: $streaming },
  filter: ({ language }, change) => Boolean((change.language ?? language) && normalizeWord(change.text)),
  fn: ({ words, language: subsLanguage, subs, streaming }, { text, status, translation, cueId, ...change }) => {
    const language = change.language ? wordsLanguage(change.language) : subsLanguage;
    const word = normalizeWord(text)!;
    const key = wordKey(language!, word);
    const { [key]: saved, ...others } = words;
    if (status === "new") return others;
    const context =
      saved?.context ??
      contextOf(
        subs.find((sub) => sub.id === cueId),
        streaming,
      );
    return {
      ...words,
      [key]: {
        ...saved,
        word,
        language: language!,
        status,
        ...((translation ?? saved?.translation) && { translation: translation ?? saved?.translation }),
        ...(context && { context }),
        added: saved?.added ?? Date.now(),
        // A known word has nothing to review; one learned again starts over
        review: status === "learning" && saved?.status === "learning" ? saved.review : undefined,
      },
    };
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
  filter: ({ language, score }) => Boolean(language && score?.newWords.length),
  fn: ({ words, language, score }) => {
    const now = Date.now();
    const next = { ...words };
    for (const word of score!.newWords) {
      next[wordKey(language!, word)] = { word, language: language!, status: "known", added: now };
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

$words.on(wordsSynced, (_, words) => words);
$wordColoring.on(wordColoringChanged, (_, coloring) => coloring);

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
