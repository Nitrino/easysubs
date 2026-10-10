import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

import { $dictionaryService, $secondarySubsTranslator, $translateLanguage, $translationService } from "../settings";
import { $subsLanguage } from "../subs";
import { usesDictionary } from "@src/utils/dictionaries";
import type { TDownload, TDownloadUse } from "@src/utils/downloads";

// The settings' Downloaded sheet: what the on-device translators and the speech models keep on the device, with
// their sizes, to delete (src/utils/downloads.ts, the background's downloads and deleteDownloads messages). It opens
// in place of the settings panel, like the search for subtitles, from the General tab's Downloaded row and the Manage
// link under an on-device translator's status.

export const $downloadsOpen = createStore(false);
export const downloadsOpened = createEvent();
export const downloadsClosed = createEvent();
// The Downloaded row asks for the list when it shows, to tell their total
export const DownloadsGate = createGate("DownloadsGate");

export const $downloads = createStore<TDownload[] | null>(null);
export const $downloadsError = createStore<string | null>(null);
export const downloadsDeleted = createEvent<string[]>();

async function downloadsAnswer(message: { type: string; ids?: string[] }): Promise<TDownload[]> {
  const answer = await chrome.runtime.sendMessage(message);
  if (!Array.isArray(answer?.downloads)) throw new Error(answer?.error ?? "No list of downloads");
  return answer.downloads;
}

export const fetchDownloadsFx = createEffect(() => downloadsAnswer({ type: "downloads" }));
export const deleteDownloadsFx = createEffect((ids: string[]) => downloadsAnswer({ type: "deleteDownloads", ids }));

$downloadsOpen.on(downloadsOpened, () => true).reset(downloadsClosed);

sample({ clock: [DownloadsGate.open, downloadsOpened], target: fetchDownloadsFx });
sample({ clock: downloadsDeleted, target: deleteDownloadsFx });

$downloads.on([fetchDownloadsFx.doneData, deleteDownloadsFx.doneData], (_, downloads) => downloads);
$downloadsError
  .on([fetchDownloadsFx.failData, deleteDownloadsFx.failData], (_, error) => error.message)
  .reset(fetchDownloadsFx.done, deleteDownloadsFx.done, downloadsOpened);

export const $deletingDownloads = deleteDownloadsFx.pending;

// What the current settings use, for the In use mark (src/utils/downloads.ts, downloadInUse)
export const $downloadUse = combine(
  {
    from: $subsLanguage,
    to: $translateLanguage,
    dictionary: $dictionaryService,
    service: $translationService,
    secondary: $secondarySubsTranslator,
  },
  ({ from, to, dictionary, service, secondary }): TDownloadUse => ({
    from,
    to,
    dictionary: usesDictionary(dictionary),
    bergamot:
      dictionary === "bergamot" || dictionary === "wiktionary-bergamot" || [service, secondary].includes("bergamot"),
  }),
);
