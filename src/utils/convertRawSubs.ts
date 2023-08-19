import { Captions, TSubItem } from "@src/models/types";
import { TSub } from "@src/models/types";
import { textToWords } from "./textToWords";
import { cleanWord } from "./cleanWord";

const cleanText = (text: string): string => {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = text
    .replace(/<\d+:\d+:\d+.\d+><c>/g, "")
    .replace(/<\/c>/g, "")
    .replace(/(\r\n|\n|\r)/gm, " ");
  return tmpDiv.textContent || "";
};

export const convertRawSubs = (rawSubs: Captions): TSub[] => {
  return rawSubs.map((sub, index) => {
    const words = textToWords(sub.text).filter((word) => word);
    const items: TSubItem[] = words.map((word: string) => {
      return {
        text: word,
        cleanedText: cleanWord(word),
        type: "word",
        tag: "span",
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
