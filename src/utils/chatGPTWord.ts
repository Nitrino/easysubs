import type { TWordTranslation } from "@src/models/types";
import { WORD_INSTRUCTIONS, wordQuestion, wordTranslation, type TWordAnswer, type TWordRequest } from "./llmWord";

const DEFAULT_MODEL = "gpt-4o-mini";

// A hovered word looked up like in a dictionary by ChatGPT, with the user's key
export async function chatGPTWord(
  request: TWordRequest,
  { chatGPTApiKey, chatGPTModel }: { chatGPTApiKey?: string; chatGPTModel?: string },
): Promise<TWordTranslation> {
  if (!chatGPTApiKey) throw new Error("ChatGPT API key is required for translation");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${chatGPTApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: chatGPTModel || DEFAULT_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: WORD_INSTRUCTIONS },
        { role: "user", content: JSON.stringify(wordQuestion(request)) },
      ],
    }),
  });
  if (response.status === 401) throw new Error("Invalid OpenAI API key");
  if (!response.ok) {
    const error = await response.json().catch(() => undefined);
    throw new Error(`ChatGPT: ${error?.error?.message ?? `request failed with status ${response.status}`}`);
  }
  let answer: TWordAnswer;
  try {
    answer = JSON.parse((await response.json())?.choices?.[0]?.message?.content);
  } catch {
    throw new Error("ChatGPT didn't answer with the word's meanings");
  }
  return wordTranslation(answer, request, "ChatGPT");
}
