import { type NodeList } from "subtitle";
import { type TSubItem } from "@src/models/types";
import { type TSub } from "@src/models/types";
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

export const convertRawSubs = (rawSubs: NodeList): TSub[] => {
  return rawSubs.map((sub, index) => {
    if (sub.type !== 'cue') return
    const words = textToWords(sub.data.text).filter((word) => word);
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
      start: sub.data.start,
      end: sub.data.end,
      text: sub.data.text,
      cleanedText: cleanText(sub.data.text),
      items: items,
    };
  }).filter(x => !!x);
};
