import { FC, ReactNode } from "react";
import { useUnit } from "effector-react";

import {
  $spokenWordAligner,
  $spokenWordAudio,
  $spokenWordCompare,
  $spokenWordDetector,
  $spokenWordEnabled,
  $spokenWordSource,
  $spokenWordWhisper,
  $spokenWordYandex,
  spokenWordAlignerChanged,
  spokenWordAudioChanged,
  spokenWordCompareChanged,
  spokenWordDetectorChanged,
  spokenWordEnabledChanged,
  spokenWordSourceChanged,
  spokenWordWhisperChanged,
  spokenWordYandexChanged,
} from "@src/models/settings";
import { $sourceStatus, SOURCE_NAMES, SOURCE_ORDER } from "@src/models/spokenWord";
import type { TSpeechDetector, TSpokenWordAudio, TSpokenWordSource } from "@src/models/types";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";

// The spoken-word experiment in the Experiments tab: highlighting the word being said, with every source of word
// times to pick from and compare (src/models/spokenWord)

const SOURCE_OPTIONS: { label: string; value: TSpokenWordSource }[] = [
  { label: "Best available", value: "auto" },
  ...SOURCE_ORDER.map((source) => ({ label: SOURCE_NAMES[source], value: source })),
];
const AUDIO_OPTIONS: { label: string; value: TSpokenWordAudio }[] = [
  { label: "Off", value: "off" },
  { label: "While it plays", value: "element" },
  { label: "Also buffered ahead", value: "ahead" },
];
const DETECTOR_OPTIONS: { label: string; value: TSpeechDetector }[] = [
  { label: "Loudness", value: "energy" },
  { label: "Silero VAD", value: "silero" },
];

const Row: FC<{ title: ReactNode; children: ReactNode }> = ({ title, children }) => (
  <div className="es-settings-content__item">
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">{title}</div>
      <div className="es-settings-content__element__right">{children}</div>
    </div>
  </div>
);

export const SpokenWord: FC = () => {
  const [enabled, source, compare, yandex, audio, detector, whisper, aligner, status] = useUnit([
    $spokenWordEnabled,
    $spokenWordSource,
    $spokenWordCompare,
    $spokenWordYandex,
    $spokenWordAudio,
    $spokenWordDetector,
    $spokenWordWhisper,
    $spokenWordAligner,
    $sourceStatus,
  ]);
  const [onEnabled, onSource, onCompare, onYandex, onAudio, onDetector, onWhisper, onAligner] = useUnit([
    spokenWordEnabledChanged,
    spokenWordSourceChanged,
    spokenWordCompareChanged,
    spokenWordYandexChanged,
    spokenWordAudioChanged,
    spokenWordDetectorChanged,
    spokenWordWhisperChanged,
    spokenWordAlignerChanged,
  ]);
  const withStatus = (title: string, state?: string) => (state ? `${title} (${state})` : title);

  return (
    <>
      <Row title="Highlight spoken word">
        <Toggle isEnabled={enabled} onChange={onEnabled} />
      </Row>
      {enabled && (
        <>
          <Row title="Word times">
            <Select
              value={SOURCE_OPTIONS.find((option) => option.value === source)}
              onChange={(option: { value: TSpokenWordSource }) => onSource(option.value)}
              options={SOURCE_OPTIONS}
            />
          </Row>
          <Row title="Compare sources">
            <Toggle isEnabled={compare} onChange={onCompare} />
          </Row>
          <Row title={withStatus("Yandex", yandex ? status.yandex : undefined)}>
            <Toggle isEnabled={yandex} onChange={onYandex} />
          </Row>
          <Row title="Listen to audio">
            <Select
              value={AUDIO_OPTIONS.find((option) => option.value === audio)}
              onChange={(option: { value: TSpokenWordAudio }) => onAudio(option.value)}
              options={AUDIO_OPTIONS}
            />
          </Row>
          {audio !== "off" && (
            <>
              <Row title={withStatus("Speech detector", status.speech)}>
                <Select
                  value={DETECTOR_OPTIONS.find((option) => option.value === detector)}
                  onChange={(option: { value: TSpeechDetector }) => onDetector(option.value)}
                  options={DETECTOR_OPTIONS}
                />
              </Row>
              <Row title={withStatus("Whisper", whisper ? status.whisper : undefined)}>
                <Toggle isEnabled={whisper} onChange={onWhisper} />
              </Row>
              <Row title={withStatus("wav2vec2 (English)", aligner ? status.aligned : undefined)}>
                <Toggle isEnabled={aligner} onChange={onAligner} />
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};
