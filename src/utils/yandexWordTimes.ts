import VOTClient from "@vot.js/core";
import { VOTNextWorkerProvider } from "@vot.js/core/providers/votworker";
import { availableLangs } from "@vot.js/shared/consts";

import type { TTimedWord } from "@src/models/types";

// Yandex's speech recognition of a video, for the times of spoken words (an experiment, see src/models/spokenWord).
// Yandex Browser shows these subtitles with every word timed. The API isn't public: vot.js signs requests the way
// Yandex Browser does, and Yandex answers 402 to them from outside its browser, so they go through the VOT project's
// proxy (github.com/FOSWLY/vot-worker), the one its extension uses. Videos Yandex can download only: YouTube and other
// public sites, no DRM.

const PROXY_HOST = "vot-worker.eu.cc";

type TYandexSubtitles = {
  subtitles?: {
    text: string;
    startMs: number;
    durationMs: number;
    tokens?: { text: string; startMs: number; durationMs: number }[];
  }[];
};

let client: VOTClient<string, typeof VOTNextWorkerProvider> | null = null;

export async function yandexWordTimes({
  url,
  language,
}: {
  url: string;
  language: string;
}): Promise<{ words: TTimedWord[] } | { waiting: true } | { error: string }> {
  const requestLang = language.split("-")[0];
  if (!(availableLangs as readonly string[]).includes(requestLang)) {
    return { error: `Yandex doesn't recognize ${language}` };
  }

  client ??= new VOTClient({ provider: VOTNextWorkerProvider, host: PROXY_HOST });
  const answer = await client.getSubtitles({
    videoData: { url, videoId: url, host: "custom" } as Parameters<typeof client.getSubtitles>[0]["videoData"],
    requestLang: requestLang as (typeof availableLangs)[number],
  });

  // The recognized speech is the track in the video's own language; the others are Yandex's translations of it
  const track = answer.subtitles.find((subtitle) => subtitle.language === requestLang && subtitle.url);
  if (!track) return answer.waiting ? { waiting: true } : { words: [] };

  const response = await fetch(track.url);
  if (!response.ok) return { error: `Yandex subtitles: HTTP ${response.status}` };
  const data: TYandexSubtitles = await response.json();
  const words = (data.subtitles ?? []).flatMap((line) =>
    (line.tokens ?? []).map((token) => ({
      text: token.text,
      start: token.startMs,
      end: token.startMs + token.durationMs,
    })),
  );
  return { words };
}
