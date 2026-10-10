import { FC, useEffect, useMemo } from "react";
import { useUnit } from "effector-react";
import cn from "classnames";
import { FormatOptionLabelMeta } from "react-select";

import {
  $secondarySubs,
  $secondarySubsBackground,
  $secondarySubsColor,
  $secondarySubsPosition,
  $secondarySubsReveal,
  $secondarySubsSize,
  $secondarySubsTranslator,
  $translateLanguage,
  SECONDARY_SUBS_COLORS,
  SECONDARY_SUBS_SIZE_MAX,
  SECONDARY_SUBS_SIZE_MIN,
  secondarySubsBackgroundChanged,
  secondarySubsChanged,
  secondarySubsColorChanged,
  secondarySubsPositionChanged,
  secondarySubsRevealChanged,
  secondarySubsSizeButtonPressed,
  secondarySubsTranslatorChanged,
} from "@src/models/settings";
import { $otherTracks, $secondaryError, $secondarySource, secondaryTracksRequested } from "@src/models/secondarySubs";
import { $subsLanguage } from "@src/models/subs";
import { $streaming } from "@src/models/streamings";
import type { TSecondaryPosition, TSecondaryReveal, TSecondaryTranslator } from "@src/models/types";
import { languageName } from "@src/utils/languages";
import { isChromeTranslatorSupported } from "@src/utils/chromeTranslator";
import { OllamaStatus, OnDeviceStatus } from "./OnDeviceStatus";
import {
  FILE_OPTION,
  FIND_OPTION,
  FOUND_OPTION,
  TSecondaryOption,
  TRANSLATOR_TITLES,
  describeSecondarySource,
  secondarySubsChoice,
  secondarySubsOptions,
  secondarySubsValue,
} from "@src/utils/secondarySubsOptions";
import { secondaryLanguage } from "@src/utils/resolveSecondarySubs";
import { $foundSecondResult, foundRemoved, sheetOpened } from "@src/models/foundSubs";
import { pickSubtitleFile } from "@src/utils/subtitleFiles";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";
import { MinusIcon } from "./assets/MinusIcon";
import { PlusIcon } from "./assets/PlusIcon";

const SIZE_STEP = 5;

const Row: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="es-settings-content__element">
    <div className="es-settings-content__element__left">{label}</div>
    <div className="es-settings-content__element__right">{children}</div>
  </div>
);

const STATUS_TAGS = { track: "Track", translate: "Auto-translate", found: "Found" } as const;

// The menu shows where each language comes from; the button only its name
const formatLanguageOption = (option: TSecondaryOption, { context }: FormatOptionLabelMeta<TSecondaryOption>) =>
  context === "value" ? (
    option.label
  ) : (
    <span className="es-option">
      <span className="es-option__label">{option.label}</span>
      {option.hint && <span className="es-option__hint">{option.hint}</span>}
      {option.tag && <span className={`es-tag es-tag--${option.tagKind}`}>{option.tag}</span>}
    </span>
  );

// The language of the second line, and a status line naming its source: a track of the video, a file found online
// or a translator
export const SecondarySubsLanguage: FC = () => {
  const [choice, handleChanged, tracks, source, translateLanguage, subsLanguage, translator, streaming, error, found] =
    useUnit([
      $secondarySubs,
      secondarySubsChanged,
      $otherTracks,
      $secondarySource,
      $translateLanguage,
      $subsLanguage,
      $secondarySubsTranslator,
      $streaming,
      $secondaryError,
      $foundSecondResult,
    ]);
  const requestTracks = useUnit(secondaryTracksRequested);

  // Players may list their tracks only after the subtitles loaded; ask again when the tab opens
  useEffect(() => {
    requestTracks();
  }, [requestTracks]);

  const groups = useMemo(
    () =>
      secondarySubsOptions({
        tracks,
        translateLanguage,
        subsLanguage,
        translator,
        service: streaming.name,
        isOnFlight: streaming.isOnFlight(),
        found,
      }),
    [tracks, translateLanguage, subsLanguage, translator, streaming, found],
  );
  const options = groups.flatMap((group) => group.options);
  const value = secondarySubsValue(choice, source);
  const selected = options.find((option) => option.value === value) ?? {
    value,
    label: languageName(source.type === "off" ? choice.language : source.language),
  };
  const status = describeSecondarySource({ source, service: streaming.name, translator, error });

  return (
    <>
      <Row label="Second line">
        <Select
          options={groups}
          value={selected}
          isSearchable
          menuWidth={250}
          formatOptionLabel={formatLanguageOption}
          onChange={(option: TSecondaryOption) => {
            if (option.value === FOUND_OPTION) return;
            if (option.value === FIND_OPTION) {
              const language =
                choice.language === "off" ? translateLanguage : secondaryLanguage(choice, translateLanguage);
              sheetOpened({ role: "second", language });
              return;
            }
            if (option.value === FILE_OPTION) {
              pickSubtitleFile("second");
              return;
            }
            const next = secondarySubsChoice(option.value, tracks);
            if (!next) return;
            // Another source replaces the file loaded on this video's second line
            if (found) foundRemoved("second");
            handleChanged(next);
          }}
        />
      </Row>
      <p className="es-settings-content__status">
        {status.tag && <span className={`es-tag es-tag--${status.tag}`}>{STATUS_TAGS[status.tag]}</span>}
        <span>{status.text}</span>
      </p>
      {/* A human translation instead of the translator's */}
      {source.type === "translate" && (
        <p className="es-settings-content__status">
          <button
            type="button"
            className="es-found__link"
            onClick={() => sheetOpened({ role: "second", language: source.language })}
          >
            Find {languageName(source.language)} subtitles online
          </button>
        </p>
      )}
    </>
  );
};

// Chrome only where the browser has its built-in translator
const TRANSLATOR_OPTIONS: { label: string; value: TSecondaryTranslator }[] = [
  { label: TRANSLATOR_TITLES.google, value: "google" },
  { label: TRANSLATOR_TITLES.deepl, value: "deepl" },
  { label: TRANSLATOR_TITLES.chatgpt, value: "chatgpt" },
  { label: TRANSLATOR_TITLES.chrome, value: "chrome" },
  { label: TRANSLATOR_TITLES.bergamot, value: "bergamot" },
  { label: TRANSLATOR_TITLES.ollama, value: "ollama" },
];
const translatorOptions = (translator: TSecondaryTranslator) =>
  TRANSLATOR_OPTIONS.filter(
    (option) => option.value !== "chrome" || isChromeTranslatorSupported() || translator === "chrome",
  );

const TRANSLATOR_NOTES: Record<TSecondaryTranslator, { text: string; warning?: boolean }> = {
  // A film is many requests, and Google's free endpoint stops answering an address that sends too many
  google: {
    text: "Google may block frequent requests for a while. If lines stop translating, pick DeepL or ChatGPT.",
    warning: true,
  },
  deepl: { text: "Uses your DeepL API key. A film is about 50–70k characters." },
  chatgpt: { text: "Uses your ChatGPT API key, billed by OpenAI." },
  chrome: {
    text: "Translates on this device, free and without limits. Chrome downloads each language pair once; Google translates where it can't.",
  },
  bergamot: {
    text: "Translates on this device with the models of Firefox Translations, free and without limits. Each language pair downloads once from Mozilla; Google translates pairs it has no model for.",
  },
  ollama: { text: "Translates with the model you run in Ollama on your computer." },
};

// Google unless DeepL or ChatGPT is picked here. It stays editable while the line comes from a track: it's what
// translates languages picked under Auto-translate and videos without the track.
export const SecondarySubsTranslator: FC = () => {
  const [translator, handleChanged, source] = useUnit([
    $secondarySubsTranslator,
    secondarySubsTranslatorChanged,
    $secondarySource,
  ]);
  const note =
    source.type === "track" ? { text: "Used when the second line is translated." } : TRANSLATOR_NOTES[translator];

  return (
    <>
      <Row label="Translator">
        <Select
          options={translatorOptions(translator)}
          value={TRANSLATOR_OPTIONS.find((option) => option.value === translator)}
          onChange={(option: (typeof TRANSLATOR_OPTIONS)[number]) => handleChanged(option.value)}
        />
      </Row>
      <p className={cn("es-settings-content__status", { "es-settings-content__status--warning": note.warning })}>
        {note.text}
      </p>
      {translator === "bergamot" && source.type === "translate" && (
        <OnDeviceStatus kind="bergamot" language={source.language} />
      )}
      {translator === "ollama" && <OllamaStatus />}
    </>
  );
};

const POSITION_OPTIONS: { label: string; value: TSecondaryPosition }[] = [
  { label: "Below the subtitles", value: "below" },
  { label: "Above the subtitles", value: "above" },
  { label: "Top of the player", value: "top" },
];

export const SecondarySubsPosition: FC = () => {
  const [position, handleChanged] = useUnit([$secondarySubsPosition, secondarySubsPositionChanged]);
  return (
    <Row label="Position">
      <Select
        options={POSITION_OPTIONS}
        value={POSITION_OPTIONS.find((option) => option.value === position)}
        onChange={(option: (typeof POSITION_OPTIONS)[number]) => handleChanged(option.value)}
      />
    </Row>
  );
};

export const SecondarySubsSize: FC = () => {
  const [size, handlePressed] = useUnit([$secondarySubsSize, secondarySubsSizeButtonPressed]);
  return (
    <Row label="Size">
      <div className="es-stepper">
        <button
          className="es-stepper__button"
          aria-label="Smaller"
          disabled={size <= SECONDARY_SUBS_SIZE_MIN}
          onClick={() => handlePressed(size - SIZE_STEP)}
        >
          <MinusIcon />
        </button>
        <div className="es-stepper__value">{size}%</div>
        <button
          className="es-stepper__button"
          aria-label="Larger"
          disabled={size >= SECONDARY_SUBS_SIZE_MAX}
          onClick={() => handlePressed(size + SIZE_STEP)}
        >
          <PlusIcon />
        </button>
      </div>
    </Row>
  );
};

export const SecondarySubsColor: FC = () => {
  const [color, handleChanged] = useUnit([$secondarySubsColor, secondarySubsColorChanged]);
  return (
    <Row label="Color">
      <div className="es-swatches" role="radiogroup" aria-label="Color">
        {SECONDARY_SUBS_COLORS.map((swatch) => (
          <button
            key={swatch.value}
            type="button"
            role="radio"
            aria-checked={color === swatch.value}
            aria-label={swatch.name}
            title={swatch.name}
            className={cn("es-swatches__swatch", { "es-swatches__swatch--selected": color === swatch.value })}
            style={{ background: swatch.value }}
            onClick={() => handleChanged(swatch.value)}
          />
        ))}
      </div>
    </Row>
  );
};

export const SecondarySubsBackground: FC = () => {
  const [background, handleChanged] = useUnit([$secondarySubsBackground, secondarySubsBackgroundChanged]);
  return (
    <Row label="Background">
      <Toggle isEnabled={background} onChange={handleChanged} />
    </Row>
  );
};

const REVEAL_OPTIONS: { label: string; value: TSecondaryReveal }[] = [
  { label: "Always", value: "always" },
  { label: "On hover", value: "hover" },
  { label: "When paused", value: "paused" },
];

export const SecondarySubsReveal: FC = () => {
  const [reveal, handleChanged] = useUnit([$secondarySubsReveal, secondarySubsRevealChanged]);
  return (
    <>
      <Row label="Show">
        <Select
          options={REVEAL_OPTIONS}
          value={REVEAL_OPTIONS.find((option) => option.value === reveal)}
          onChange={(option: (typeof REVEAL_OPTIONS)[number]) => handleChanged(option.value)}
        />
      </Row>
      <p className="es-settings-content__status">
        <kbd className="es-kbd">V</kbd> shows or hides it, hold <kbd className="es-kbd">R</kbd> to reveal it
      </p>
    </>
  );
};
