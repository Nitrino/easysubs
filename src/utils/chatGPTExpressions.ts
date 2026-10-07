import type { TExpressionTranslation } from "@src/models/types";
import { languageName } from "./languages";

export type TTranslateExpressionsRequest = {
  // The subtitle line the expressions are in
  text: string;
  // Their dictionary forms: "pick up" for "picked it up"
  expressions: string[];
  language: string;
  chatGPTApiKey?: string;
  chatGPTModel?: string;
};

const DEFAULT_MODEL = "gpt-4o-mini";
const MAX_ALTERNATIVES = 4;

const INSTRUCTIONS = `You help someone learn a language by watching films with subtitles. You get a subtitle line, \
expressions found in it (phrasal verbs, idioms, set phrases) and a language. For each expression, translate the \
expression itself (not the whole line) into that language the way it is used in this line, and give up to \
${MAX_ALTERNATIVES} other common translations of it. Answer with JSON only: \
{"expressions":[{"expression":"<as given>","translation":"...","alternatives":["..."]}]}`;

type TAnswer = { expressions?: { expression?: string; translation?: string; alternatives?: string[] }[] };

// All the expressions of a line in one ChatGPT request, translated as they're used in it. The answer has the
// expressions ChatGPT translated, by their dictionary form.
export async function translateExpressionsWithChatGPT({
  text,
  expressions,
  language,
  chatGPTApiKey,
  chatGPTModel,
}: TTranslateExpressionsRequest): Promise<Record<string, TExpressionTranslation>> {
  if (!chatGPTApiKey) throw new Error("ChatGPT API key is required for translation");
  if (expressions.length === 0) return {};

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${chatGPTApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: chatGPTModel || DEFAULT_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: INSTRUCTIONS },
        { role: "user", content: JSON.stringify({ line: text, expressions, language: languageName(language) }) },
      ],
    }),
  });
  if (response.status === 401) throw new Error("Invalid OpenAI API key");
  if (!response.ok) {
    const error = await response.json().catch(() => undefined);
    throw new Error(`ChatGPT: ${error?.error?.message ?? `request failed with status ${response.status}`}`);
  }

  const content = (await response.json())?.choices?.[0]?.message?.content;
  let answer: TAnswer;
  try {
    answer = JSON.parse(content);
  } catch {
    throw new Error("ChatGPT didn't answer with the translations");
  }

  // Matched back to the expressions asked for, whatever case ChatGPT wrote them in
  const byName = new Map(expressions.map((expression) => [expression.toLowerCase(), expression]));
  const translations: Record<string, TExpressionTranslation> = {};
  for (const item of answer.expressions ?? []) {
    const expression = byName.get(String(item.expression ?? "").toLowerCase());
    const main = typeof item.translation === "string" ? item.translation.trim() : "";
    if (!expression || !main) continue;
    const alternatives = (Array.isArray(item.alternatives) ? item.alternatives : [])
      .filter((alternative): alternative is string => typeof alternative === "string" && alternative.trim() !== "")
      .map((alternative) => alternative.trim())
      .filter((alternative) => alternative !== main)
      .slice(0, MAX_ALTERNATIVES);
    translations[expression] = { main, alternatives: alternatives.map((alternative) => ({ text: alternative })) };
  }
  return translations;
}
