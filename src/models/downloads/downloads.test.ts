import { describe, expect, it } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $downloadUse,
  $downloads,
  $downloadsError,
  $downloadsOpen,
  downloadsClosed,
  downloadsDeleted,
  downloadsOpened,
} from ".";
import { $dictionaryService, $secondarySubsTranslator, $translateLanguage, $translationService } from "../settings";
import { $subsLanguage } from "../subs";
import { answerNextMessage, sentMessages } from "@root/test/chrome";

// The mock background keeps the en-ru dictionary and Bergamot's en-ru and es-en models

describe("downloads", () => {
  it("opens the sheet with the list of downloads and closes it", async () => {
    const scope = fork();

    await allSettled(downloadsOpened, { scope });

    expect(scope.getState($downloadsOpen)).toBe(true);
    expect(sentMessages()).toEqual([{ type: "downloads" }]);
    expect(scope.getState($downloads)?.map((download) => download.id)).toEqual([
      "dictionary:en-ru",
      "bergamot:en-ru",
      "bergamot:es-en",
    ]);

    await allSettled(downloadsClosed, { scope });
    expect(scope.getState($downloadsOpen)).toBe(false);
  });

  it("shows why the list couldn't be read", async () => {
    const scope = fork();
    answerNextMessage("downloads", { error: "The Cache API is unavailable" });

    await allSettled(downloadsOpened, { scope });

    expect(scope.getState($downloadsError)).toBe("The Cache API is unavailable");
  });

  it("tells what the settings use: Bergamot anywhere, the dictionary with a Wiktionary service", () => {
    const scope = fork({
      values: [
        [$subsLanguage, "es"],
        [$translateLanguage, "ru"],
        [$dictionaryService, "google"],
        [$translationService, "google"],
        [$secondarySubsTranslator, "bergamot"],
      ],
    });

    expect(scope.getState($downloadUse)).toEqual({ from: "es", to: "ru", dictionary: false, bergamot: true });
  });

  it("deletes downloads by their ids and shows what's left", async () => {
    const scope = fork();
    await allSettled(downloadsOpened, { scope });

    await allSettled(downloadsDeleted, { scope, params: ["bergamot:es-en"] });

    expect(sentMessages("deleteDownloads")).toEqual([{ type: "deleteDownloads", ids: ["bergamot:es-en"] }]);
    expect(scope.getState($downloads)?.map((download) => download.id)).toEqual(["dictionary:en-ru", "bergamot:en-ru"]);
  });
});
