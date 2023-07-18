import { Captions } from "subtitle";
import { textToSubItems } from "./textToSubItems";
import { TSub } from "@src/models/types";

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
    return {
      id: index,
      start: sub.start,
      end: sub.end,
      text: sub.text,
      cleanedText: cleanText(sub.text),
      items: textToSubItems(sub.text),
    };
  });
};
