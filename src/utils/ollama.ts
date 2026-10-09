import { ChatGPTLLMTranslator } from "anylang/translators";

import type { TWordTranslation } from "@src/models/types";
import { WORD_INSTRUCTIONS, wordQuestion, wordTranslation, type TWordAnswer, type TWordRequest } from "./llmWord";
import { DEFAULT_OLLAMA_URL } from "./ollamaUrl";

// Ollama on the user's computer (https://ollama.com): the background talks to its OpenAI-compatible API like it does
// to ChatGPT's. Ollama refuses requests from extensions unless OLLAMA_ORIGINS lets them in, so a session rule gives
// the extension's requests to it Ollama's own origin (allowOllamaOrigin).

export { DEFAULT_OLLAMA_URL };

export type TOllamaSettings = { ollamaUrl?: string; ollamaModel?: string };

const ORIGIN_RULE_ID = 4711;

const origin = (url: string) => new URL(url || DEFAULT_OLLAMA_URL).origin;

// The extension's requests to Ollama look like they come from Ollama's own page, which it always accepts. Only
// requests made outside tabs, the extension's own: pages still can't reach Ollama.
let allowedOrigin: string | null = null;
export async function allowOllamaOrigin(url: string) {
  const server = origin(url);
  if (allowedOrigin === server || !chrome.declarativeNetRequest?.updateSessionRules) return;
  try {
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [ORIGIN_RULE_ID],
      addRules: [
        {
          id: ORIGIN_RULE_ID,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: [
              { header: "origin", operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: server },
            ],
          },
          condition: {
            urlFilter: `|${server}/`,
            tabIds: [chrome.tabs?.TAB_ID_NONE ?? -1],
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
          },
        },
      ],
    });
    allowedOrigin = server;
  } catch (error) {
    // Firefox may not let the header change; OLLAMA_ORIGINS does it then
    console.warn("Can't set the Origin of requests to Ollama:", error);
  }
}

// Ollama's errors in words that say what to do
async function explain(error: unknown, url: string, model: string): Promise<never> {
  const message = (error as Error)?.message ?? String(error);
  if (/status 403/.test(message)) {
    throw new Error(
      "Ollama refused EasySubs. Start it with OLLAMA_ORIGINS=chrome-extension://*,moz-extension://* and try again",
    );
  }
  if (/status 404/.test(message)) throw new Error(`Ollama has no model "${model}". Run: ollama pull ${model}`);
  if (/fetch|network|Load failed/i.test(message))
    throw new Error(`Can't reach Ollama at ${origin(url)}. Is it running?`);
  throw new Error(`Ollama: ${message}`);
}

function translator({ ollamaUrl, ollamaModel }: TOllamaSettings) {
  if (!ollamaModel) throw new Error("Pick an Ollama model in the settings");
  return new ChatGPTLLMTranslator({ apiKey: "ollama", model: ollamaModel, apiOrigin: origin(ollamaUrl ?? "") });
}

export async function ollamaTranslate(text: string, language: string, settings: TOllamaSettings): Promise<string> {
  const url = settings.ollamaUrl ?? DEFAULT_OLLAMA_URL;
  await allowOllamaOrigin(url);
  try {
    return await translator(settings).translate(text, "auto", language);
  } catch (error) {
    return explain(error, url, settings.ollamaModel ?? "");
  }
}

// Several lines in one prompt, one translation per line in the same order
export async function ollamaTranslateBatch(texts: string[], language: string, settings: TOllamaSettings) {
  const url = settings.ollamaUrl ?? DEFAULT_OLLAMA_URL;
  await allowOllamaOrigin(url);
  try {
    const translations = await translator(settings).translateBatch(texts, "auto", language);
    return translations.map((translation) => translation ?? "");
  } catch (error) {
    return explain(error, url, settings.ollamaModel ?? "");
  }
}

// The models Ollama has pulled, for the settings
export async function ollamaModels(url: string): Promise<string[]> {
  await allowOllamaOrigin(url);
  let response: Response;
  try {
    response = await fetch(new URL("/api/tags", origin(url)));
  } catch (error) {
    return explain(error, url, "");
  }
  if (!response.ok) return explain(new Error(`status ${response.status}`), url, "");
  const answer = (await response.json()) as { models?: { name: string }[] };
  return (answer.models ?? []).map((model) => model.name);
}

// A chat request to Ollama's OpenAI-compatible API that answers with JSON
export async function ollamaJson<T>(system: string, user: unknown, settings: TOllamaSettings): Promise<T> {
  const url = settings.ollamaUrl ?? DEFAULT_OLLAMA_URL;
  if (!settings.ollamaModel) throw new Error("Pick an Ollama model in the settings");
  await allowOllamaOrigin(url);
  let response: Response;
  try {
    response = await fetch(new URL("/v1/chat/completions", origin(url)), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: settings.ollamaModel,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify(user) },
        ],
      }),
    });
  } catch (error) {
    return explain(error, url, settings.ollamaModel);
  }
  if (!response.ok) return explain(new Error(`status ${response.status}`), url, settings.ollamaModel);
  const content = (await response.json())?.choices?.[0]?.message?.content;
  try {
    return JSON.parse(content) as T;
  } catch {
    throw new Error("Ollama didn't answer with JSON. Try another model");
  }
}

// A hovered word looked up like in a dictionary
export async function ollamaWord(request: TWordRequest, settings: TOllamaSettings): Promise<TWordTranslation> {
  const answer = await ollamaJson<TWordAnswer>(WORD_INSTRUCTIONS, wordQuestion(request), settings);
  return wordTranslation(answer, request, "Ollama");
}
