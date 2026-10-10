import { createEffect, sample } from "effector";

import {
  $dictionaryService,
  $secondarySubsTranslator,
  $translateLanguage,
  $translationService,
  dictionaryServiceChanged,
  secondarySubsTranslatorChanged,
  translateLanguageChanged,
  translationServiceChanged,
} from ".";
import { $subsLanguage } from "../subs";
import { prepareChromeTranslator } from "@src/utils/chromeTranslator";
import { usesDictionary } from "@src/utils/dictionaries";

// Chrome downloads a language pair's model only during a click or key press on the page: picking its translator, or
// a language while it's picked, starts the download for the subtitles on screen
export const prepareChromeTranslatorFx = createEffect<{ source: string; target: string }, void>(({ source, target }) =>
  prepareChromeTranslator(source, target),
);

sample({
  clock: [translationServiceChanged, secondarySubsTranslatorChanged, dictionaryServiceChanged],
  source: { source: $subsLanguage, target: $translateLanguage },
  filter: ({ source }, translator) => translator === "chrome" && source !== "auto",
  fn: ({ source, target }) => ({ source, target }),
  target: prepareChromeTranslatorFx,
});

sample({
  clock: translateLanguageChanged,
  source: {
    source: $subsLanguage,
    service: $translationService,
    secondaryTranslator: $secondarySubsTranslator,
    dictionary: $dictionaryService,
  },
  filter: ({ source, service, secondaryTranslator, dictionary }) =>
    source !== "auto" && [service, secondaryTranslator, dictionary].includes("chrome"),
  fn: ({ source }, target) => ({ source, target }),
  target: prepareChromeTranslatorFx,
});

// The Wiktionary dictionary of the pair downloads as soon as the subtitles' language is known, ahead of the first word
export const prepareDictionaryFx = createEffect<{ source: string; target: string }, void>(({ source, target }) =>
  chrome.runtime.sendMessage({ type: "dictionaryStatus", from: source, to: target, prepare: true }).then(() => {}),
);

sample({
  clock: [$dictionaryService, $subsLanguage, $translateLanguage],
  source: { dictionary: $dictionaryService, source: $subsLanguage, target: $translateLanguage },
  filter: ({ dictionary, source, target }) => usesDictionary(dictionary) && source !== "auto" && source !== target,
  fn: ({ source, target }) => ({ source, target }),
  target: prepareDictionaryFx,
});
