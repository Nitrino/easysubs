import { Captions, TSubItem } from "@src/models/types";
import { TSub } from "@src/models/types";
import { inertElement, textToTaggedWords } from "./textToWords";
import { cleanWord } from "./cleanWord";

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

    return {
      id: index,
      start: Number(sub.start),
      end: Number(sub.end),
      text: sub.text,
      cleanedText: cleanText(sub.text),
      items: items,
    };
  });
};
