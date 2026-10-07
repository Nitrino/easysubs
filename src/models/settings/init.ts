import { createEffect, sample } from "effector";

import {
  $secondarySubsTranslator,
  $translateLanguage,
  $translationService,
  secondarySubsTranslatorChanged,
  translateLanguageChanged,
  translationServiceChanged,
} from ".";
import { $subsLanguage } from "../subs";
import { prepareChromeTranslator } from "@src/utils/chromeTranslator";

// Chrome downloads a language pair's model only during a click or key press on the page: picking its translator, or
// a language while it's picked, starts the download for the subtitles on screen
export const prepareChromeTranslatorFx = createEffect<{ source: string; target: string }, void>(({ source, target }) =>
  prepareChromeTranslator(source, target),
);

sample({
  clock: [translationServiceChanged, secondarySubsTranslatorChanged],
  source: { source: $subsLanguage, target: $translateLanguage },
  filter: ({ source }, translator) => translator === "chrome" && source !== "auto",
  fn: ({ source, target }) => ({ source, target }),
  target: prepareChromeTranslatorFx,
});

sample({
  clock: translateLanguageChanged,
  source: { source: $subsLanguage, service: $translationService, secondaryTranslator: $secondarySubsTranslator },
  filter: ({ source, service, secondaryTranslator }) =>
    source !== "auto" && (service === "chrome" || secondaryTranslator === "chrome"),
  fn: ({ source }, target) => ({ source, target }),
  target: prepareChromeTranslatorFx,
});
