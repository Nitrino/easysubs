import { Captions, TSubItem, TTimedWord } from "@src/models/types";
import { TSub } from "@src/models/types";
import { inertElement, textToTaggedWords } from "./textToWords";
import { cleanWord } from "./cleanWord";
import { inlineTimedWords, itemTimes } from "./wordTiming/fileWords";

const cleanText = (text: string): string => {
  const tmpDiv = inertElement();
  tmpDiv.innerHTML = text
    .replace(/<\d+:\d+:\d+.\d+><c>/g, "")
    .replace(/<\/c>/g, "")
    .replace(/(\r\n|\n|\r)/gm, " ");
  return tmpDiv.textContent || "";
};

export const convertRawSubs = (rawSubs: Captions): TSub[] => {
  return rawSubs.map((sub, index) => {
    const items: TSubItem[] = textToTaggedWords(sub.text).map(({ text, tag }) => {
      return {
        text: text,
        cleanedText: cleanWord(text),
        type: "word",
        tag: tag,
      };
    });

    const start = Number(sub.start);
    const end = Number(sub.end);
    const words = wordTimes(
      items.map((item) => item.text),
      sub.words ?? inlineTimedWords(sub.text, start, end),
      start,
    );

    return {
      id: index,
      start,
      end,
      text: sub.text,
      cleanedText: cleanText(sub.text),
      items: items,
      ...(words && { words }),
    };
  });
};

// When the cue's words are said, from the times the subtitles give, relative to the cue's start
function wordTimes(items: string[], timed: TTimedWord[] | null, cueStart: number) {
  if (!timed?.length) return null;
  const absolute = timed.map((word) => ({ ...word, start: word.start + cueStart, end: word.end + cueStart }));
  return itemTimes(items, absolute);
}
