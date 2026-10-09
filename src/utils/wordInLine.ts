import type { TSubItem } from "@src/models/types";

// A word's translation in its line, from Bergamot: in its HTML mode it carries the tags of the source to the words of
// the translation they became, so the hovered words are marked and the line translated ("I'll <b>pick</b> you up" →
// "Я <b>заберу</b> тебя"). A particle that merged into another word comes back with an empty mark.

export const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The line with the words at `indexes` marked; the punctuation around a word stays outside its mark
export function markedLine(items: Pick<TSubItem, "text" | "cleanedText">[], indexes: number[]): string {
  return items
    .map(({ text, cleanedText }, index) => {
      if (!indexes.includes(index)) return escapeHtml(text);
      const at = cleanedText ? text.indexOf(cleanedText) : -1;
      if (at < 0) return `<b>${escapeHtml(text)}</b>`;
      const [before, after] = [text.slice(0, at), text.slice(at + cleanedText.length)];
      return `${escapeHtml(before)}<b>${escapeHtml(cleanedText)}</b>${escapeHtml(after)}`;
    })
    .join(" ");
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decodeHtml = (text: string) =>
  text.replace(/&(#\d+|[a-z]+);/gi, (entity, name: string) =>
    name.startsWith("#") ? String.fromCodePoint(Number(name.slice(1))) : (ENTITIES[name.toLowerCase()] ?? entity),
  );

// The text of a translation made in HTML mode
export const htmlText = (html: string) => decodeHtml(html.replace(/<[^>]*>/g, "")).trim();

// What the marks of the translation hold, without the punctuation around it; null when they hold nothing
export function markedTranslation(html: string): string | null {
  const parts = Array.from(html.matchAll(/<b>([\s\S]*?)<\/b>/g), (match) =>
    decodeHtml(match[1].replace(/<[^>]*>/g, "")).trim(),
  ).filter(Boolean);
  const text = parts
    .join(" ")
    .replace(/^[\s"“”„«»'.,;:!?…—–-]+|[\s"“”„«»'.,;:!?…—–-]+$/g, "")
    .trim();
  return text || null;
}

const comparable = (text: string) => text.toLowerCase().replace(/ё/g, "е").trim();

// Whether a word's translation in its line only repeats a translation in another form ("ключи" of "ключ", "проиграл"
// of "проигрывать"), or with a word of the line around it ("так говорит" of "говорить"): a word of it that differs from
// a word of the translation in its last letters only. "заберу" and "забрать" differ more, and the line's is worth
// showing.
export function repeatsTranslation(inLine: string, translations: string[]): boolean {
  const lineWords = comparable(inLine).split(/\s+/).filter(Boolean);
  return translations.some((translation) => {
    const words = comparable(translation).split(/\s+/).filter(Boolean);
    if (words.join(" ") === lineWords.join(" ")) return true;
    // A phrase repeats only as a whole; a word of one word may sit among the line's
    return words.length === 1 && lineWords.some((word) => sameWord(word, words[0]));
  });
}

function sameWord(a: string, b: string) {
  if (a === b) return true;
  let common = 0;
  while (common < a.length && common < b.length && a[common] === b[common]) common++;
  return common >= 3 && common >= Math.min(a.length, b.length) - 2;
}
