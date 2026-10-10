import type { TSecondaryTranslator } from "@src/models/types";
import { googleTranslateSingleFetcher } from "./googleTranslateSingleFetcher";
import { deeplTranslateFetcher, SUPPORTED_LANGUAGES as DEEPL_LANGUAGES } from "./deeplTranslateFetcher";
import { chatGPTTranslateFetcher, SUPPORTED_LANGUAGES as CHATGPT_LANGUAGES } from "./chatGPTTranslateFetcher";
import { ollamaTranslateBatch } from "./ollama";
import { bergamotTranslate } from "@src/bergamot/client";

export type TTranslateBatchRequest = {
  texts: string[];
  language: string;
  translator: TSecondaryTranslator;
  deeplApiKey?: string;
  chatGPTApiKey?: string;
  chatGPTModel?: string;
  ollamaUrl?: string;
  ollamaModel?: string;
  // The lines' language, for Bergamot, which can't detect it
  sourceLanguage?: string;
};

// How many lines are translated at once when a batch has to be retried line by line
const LINE_BY_LINE_CONCURRENCY = 5;

// The text of Google's `dj=1` answer: its sentences, without the transliteration entry. When Google stops answering
// an address that sent too many requests, it serves a page instead of JSON.
function googleText(answer: string): string {
  let sentences: { trans?: string }[];
  try {
    sentences = JSON.parse(answer).sentences;
  } catch {
    throw new Error(
      "it refused the request, probably after too many of them. Try again later or pick DeepL or ChatGPT",
    );
  }
  return sentences
    .filter((sentence) => typeof sentence.trans === "string")
    .map((sentence) => sentence.trans)
    .join("");
}

async function translateLineByLine(texts: string[], translate: (text: string) => Promise<string>) {
  const translations: string[] = [];
  for (let start = 0; start < texts.length; start += LINE_BY_LINE_CONCURRENCY) {
    const chunk = texts.slice(start, start + LINE_BY_LINE_CONCURRENCY);
    translations.push(...(await Promise.all(chunk.map(translate))));
  }
  return translations;
}

// Google takes one text, and keeps its line breaks: the lines go as one text and are split back. When the answer has
// a different number of lines, the batch is translated line by line instead.
async function translateWithGoogle(texts: string[], lang: string) {
  const translate = async (text: string) =>
    googleText(await googleTranslateSingleFetcher.getFullTextTranslation({ text, lang })).trim();

  const lines = googleText(
    await googleTranslateSingleFetcher.getFullTextTranslation({ text: texts.join("\n"), lang }),
  ).split("\n");
  if (lines.length === texts.length) return lines.map((line) => line.trim());
  return translateLineByLine(texts, translate);
}

// Translates the lines of the second subtitle line in as few requests as the translator allows. The answer has one
// translation per text, in the same order.
export async function translateBatch(request: TTranslateBatchRequest): Promise<string[]> {
  // A line break inside a line would split it in two on the way back
  const texts = request.texts.map((text) => text.replace(/\s*\n\s*/g, " ").trim());
  if (texts.length === 0) return [];

  switch (request.translator) {
    case "deepl":
      deeplTranslateFetcher.setApiKey(request.deeplApiKey ?? "");
      return deeplTranslateFetcher.getBatchTranslation({
        texts,
        lang: request.language as (typeof DEEPL_LANGUAGES)[number],
      });
    case "chatgpt":
      chatGPTTranslateFetcher.setApiKey(request.chatGPTApiKey ?? "", request.chatGPTModel);
      return chatGPTTranslateFetcher.getBatchTranslation({
        texts,
        lang: request.language as (typeof CHATGPT_LANGUAGES)[number],
      });
    case "ollama":
      return ollamaTranslateBatch(texts, request.language, request);
    case "bergamot":
      return bergamotTranslate(texts, request.sourceLanguage ?? "", request.language);
    default:
      return translateWithGoogle(texts, request.language);
  }
}
