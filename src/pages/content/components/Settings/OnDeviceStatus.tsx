import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $subsLanguage } from "@src/models/subs";
import { $ollamaModel, $ollamaUrl, $translateLanguage, ollamaModalOpened } from "@src/models/settings";
import { isSameLanguage, languageName } from "@src/utils/languages";
import type { TOnDeviceStatus } from "@src/utils/onDeviceFiles";

// What an on-device translator has for the subtitles' language and the translation language, under its row in the
// settings: the Wiktionary dictionary of the pair or Bergamot's models. Showing it starts the download, as the
// translator was picked to be used.

export type TOnDeviceKind = "dictionary" | "bergamot";

const POLL_MS = 1000;

const megabytes = (bytes: number) => `${(bytes / 1e6).toFixed(bytes < 1e7 ? 1 : 0)} MB`;

async function fetchStatus(kind: TOnDeviceKind, from: string, to: string): Promise<TOnDeviceStatus> {
  if (kind === "dictionary") return chrome.runtime.sendMessage({ type: "dictionaryStatus", from, to, prepare: true });
  const answer = await chrome.runtime.sendMessage({ type: "bergamot", request: { type: "status", from, to } });
  if (!answer || answer.error) return { state: "error", error: answer?.error ?? "Bergamot didn't answer" };
  const status = answer.result as TOnDeviceStatus;
  // The models load into Bergamot's worker after they download; the answer comes when they're ready
  if (status.state === "missing")
    chrome.runtime.sendMessage({ type: "bergamot", request: { type: "prepare", from, to } });
  return status;
}

function describe(kind: TOnDeviceKind, status: TOnDeviceStatus, pair: string): string {
  const what = kind === "dictionary" ? `The ${pair} dictionary` : `${pair}`;
  switch (status.state) {
    case "unavailable":
      return kind === "dictionary"
        ? `Wiktionary has no ${pair} dictionary yet: words go to the translation service.`
        : `Mozilla has no model for ${pair}: Google translates instead.`;
    case "missing":
      return kind === "dictionary"
        ? `${what} downloads once, about 5 MB.`
        : `${pair} downloads once from Mozilla${status.size ? `, ${megabytes(status.size)}` : ""}.`;
    case "downloading":
      return status.total > 0
        ? `Downloading ${pair}: ${megabytes(status.loaded)} of ${megabytes(status.total)}`
        : `Downloading ${pair}…`;
    case "ready":
      return kind === "dictionary" ? `${what} is on this device.` : `${pair} translates on this device.`;
    case "error":
      return `Couldn't get ${pair}: ${status.error}. It's tried again on the next translation.`;
  }
}

// `language` is what's translated into when it isn't the translation language: the second line's
export const OnDeviceStatus: FC<{ kind: TOnDeviceKind; language?: string }> = ({ kind, language }) => {
  const [from, translateLanguage] = useUnit([$subsLanguage, $translateLanguage]);
  const to = language ?? translateLanguage;
  // With the pair it's for, so another pair's doesn't show while the new one is asked for
  const [answer, setAnswer] = useState<{ pair: string; status: TOnDeviceStatus } | null>(null);
  const waiting = from === "auto" || isSameLanguage(from, to);
  const pair = `${from}:${to}`;
  const status = answer?.pair === pair ? answer.status : null;

  useEffect(() => {
    if (waiting) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    // Asked again while there's something to wait for
    const poll = async () => {
      let next: TOnDeviceStatus;
      try {
        next = await fetchStatus(kind, from, to);
      } catch (error) {
        next = { state: "error", error: (error as Error).message };
      }
      if (!active) return;
      setAnswer({ pair: `${from}:${to}`, status: next });
      if (next.state === "missing" || next.state === "downloading") timer = setTimeout(poll, POLL_MS);
    };
    poll();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [kind, from, to, waiting]);

  const text = waiting
    ? "Shows what's on this device once the subtitles' language is known."
    : status
      ? describe(kind, status, `${languageName(from)} → ${languageName(to)}`)
      : "…";
  return (
    <p
      className={`es-settings-content__status${status?.state === "error" ? " es-settings-content__status--warning" : ""}`}
    >
      {text}
    </p>
  );
};

// The Ollama model in use, with a way to change it
export const OllamaStatus: FC = () => {
  const [url, model, openModal] = useUnit([$ollamaUrl, $ollamaModel, ollamaModalOpened]);
  return (
    <p className="es-settings-content__status">
      <span>{model ? `${model} at ${url}` : "No model picked yet."}</span>
      <button type="button" className="es-found__link" onClick={() => openModal()}>
        {model ? "Change" : "Pick a model"}
      </button>
    </p>
  );
};
