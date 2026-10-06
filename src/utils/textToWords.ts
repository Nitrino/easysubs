import { TSubItem } from "@src/models/types";

export type TTaggedWord = { text: string; tag: TSubItem["tag"] };

const STYLE_TAGS = new Set(["i", "b", "u"]);

// The innermost <i>, <b> or <u> around a text node of the cue, "span" for plain text
const styleTag = (textNode: Node, cue: Node): TSubItem["tag"] => {
  for (let element = textNode.parentElement; element && element !== cue; element = element.parentElement) {
    const name = element.tagName.toLowerCase();
    if (STYLE_TAGS.has(name)) return name as TSubItem["tag"];
  }
  return "span";
};

// The words of a node, each with the style of its first letter
const nodeWords = (node: Node, cue: Node): TTaggedWord[] => {
  const textNodes: Node[] = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);
  }

  const letterTags = textNodes.flatMap((textNode) =>
    Array<TSubItem["tag"]>(textNode.textContent.length).fill(styleTag(textNode, cue)),
  );
  return Array.from((node.textContent || "").matchAll(/[^ ]+/g), (match) => ({
    text: match[0],
    tag: letterTags[match.index],
  }));
};

export const textToTaggedWords = (text: string): TTaggedWord[] => {
  const tmpDiv = document.createElement("div") as HTMLDivElement;
  tmpDiv.innerHTML = text.replace(/(<\d+:\d+:\d+.\d+>)?<[/]?[c].*?>/g, "").replace(/[\r\n]+/g, "\r\n ");

  return Array.from(tmpDiv.childNodes).flatMap((item) => nodeWords(item, tmpDiv));
};

export const textToWords = (text: string): string[] => textToTaggedWords(text).map((word) => word.text);
