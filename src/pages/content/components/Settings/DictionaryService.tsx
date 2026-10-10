import { FC } from "react";
import { useUnit } from "effector-react";
import type { FormatOptionLabelMeta } from "react-select";

import { $dictionaryService, dictionaryServiceChanged } from "@src/models/settings";
import type { TDictionaryService } from "@src/models/types";
import { isChromeTranslatorSupported } from "@src/utils/chromeTranslator";
import { DICTIONARY_DETAILS, DICTIONARY_TITLES, usesDictionary } from "@src/utils/dictionaries";
import { Select } from "../ui/Select";
import { OllamaStatus, OnDeviceStatus } from "./OnDeviceStatus";

// Where hovered words are looked up, see TDictionaryService. The menu tells which services give a word's meanings
// and which translate it like any text.
type TOption = { label: string; value: TDictionaryService };

const OPTIONS: TOption[] = (Object.keys(DICTIONARY_TITLES) as TDictionaryService[]).map((value) => ({
  label: DICTIONARY_TITLES[value],
  value,
}));

// Chrome only where the browser has its built-in translator
const availableOptions = (current: TDictionaryService) =>
  OPTIONS.filter((option) => option.value !== "chrome" || isChromeTranslatorSupported() || current === "chrome");

const formatOption = (option: TOption, { context }: FormatOptionLabelMeta<TOption>) =>
  context === "value" ? (
    option.label
  ) : (
    <span className="es-option">
      <span className="es-option__label">{option.label}</span>
      {/* The row's note says the same of the picked one, so options keep their names alone */}
      {DICTIONARY_DETAILS[option.value] ? (
        <span className="es-tag es-tag--rich" aria-hidden="true">
          Meanings
        </span>
      ) : (
        <span className="es-tag es-tag--plain" aria-hidden="true">
          One translation
        </span>
      )}
    </span>
  );

const NOTES: Partial<Record<TDictionaryService, string>> = {
  wiktionary: "Meanings with parts of speech. Words it lacks go to the translation service.",
  "wiktionary-bergamot":
    "Wiktionary's meanings, with Bergamot's translation of the word in its line on top when it differs. Bergamot " +
    "translates the words Wiktionary lacks.",
  chatgpt: "Meanings with parts of speech, and the word as it's used in its line, from your ChatGPT API key.",
  ollama: "Meanings with parts of speech, and the word as it's used in its line.",
  bergamot: "One translation of the word, and how it's translated in its line when that differs.",
};
const ONE_TRANSLATION = "One translation of the word, without its other meanings or parts of speech.";

export const DictionaryService: FC = () => {
  const [service, handleChanged] = useUnit([$dictionaryService, dictionaryServiceChanged]);
  const note = NOTES[service] ?? (DICTIONARY_DETAILS[service] ? undefined : ONE_TRANSLATION);

  return (
    <>
      <div className="es-settings-content__element">
        <div className="es-settings-content__element__left">Dictionary</div>
        <div className="es-settings-content__element__right">
          <Select
            value={OPTIONS.find((option) => option.value === service)}
            onChange={(option: TOption) => handleChanged(option.value)}
            options={availableOptions(service)}
            formatOptionLabel={formatOption}
            menuWidth={300}
          />
        </div>
      </div>
      {note && <p className="es-settings-content__status">{note}</p>}
      {usesDictionary(service) && (
        <OnDeviceStatus kind="dictionary" fallback={service === "wiktionary" ? undefined : "Bergamot"} />
      )}
      {(service === "bergamot" || service === "wiktionary-bergamot") && <OnDeviceStatus kind="bergamot" />}
      {service === "ollama" && <OllamaStatus />}
    </>
  );
};
