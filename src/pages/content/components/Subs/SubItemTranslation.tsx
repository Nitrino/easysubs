import { CSSProperties, FC, Fragment, useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";
import { $learningService, $translateLanguage } from "@src/models/settings";

import { $currentWordTranslation, $wordTranslationsPendings, WordTranslationsGate } from "@src/models/translations";
import toast from "react-hot-toast";
import { SoundIcon } from "./assets/SoundIcon";
import { PlusIcon } from "./assets/PlusIcon";
import { ExternalIcon } from "./assets/ExternalIcon";
import { joinTranslations } from "@src/utils/joinTranslations";

import ILearningService from "@src/learning-service/learningService";
import { TWordTranslationItem } from "@src/models/types";
import { $subsLanguage } from "@src/models/subs";
import { getLearningService } from "@src/utils/getLearningService";
import { TranslateSelect } from "../ui/TranslateSelect";
import { Popover } from "../ui/Popover";
import { Spinner } from "../ui/Spinner";

const DICTIONARIES: [string, (word: string) => string][] = [
  ["Cambridge", (word) => `https://dictionary.cambridge.org/dictionary/english/${word}`],
  ["Forvo", (word) => `https://forvo.com/search/${word}`],
  ["Urban", (word) => `https://www.urbandictionary.com/define.php?term=${word}`],
  ["YouGlish", (word) => `https://youglish.com/pronounce/${word}/english`],
];

export const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  useGate(WordTranslationsGate, text);
  const [currentWordTranslation, learningService, subsLanguage, translateLanguage, wordTranslationsPendings] = useUnit([
    $currentWordTranslation,
    $learningService,
    $subsLanguage,
    $translateLanguage,
    $wordTranslationsPendings,
  ]);

  const [service, setService] = useState<ILearningService>(null);

  useEffect(() => {
    setService(getLearningService(learningService));
  }, [learningService]);

  const source = text.toLowerCase();

  if (subsLanguage === translateLanguage) {
    return (
      <Popover variant="word">
        <div className="es-title es-title-small">{text}</div>
        <div className="es-note">Select the translation language:</div>
        <div className="es-picker">
          <TranslateSelect />
        </div>
      </Popover>
    );
  }

  // Translations are keyed by the lowercased word; a result for another word may still be in flight.
  if (currentWordTranslation?.source !== source) {
    if (!wordTranslationsPendings[source]) {
      return null;
    }
    return (
      <Popover variant="word">
        <div className="es-loading">
          <Spinner />
          <span className="es-loading-word">{text}</span>
        </div>
      </Popover>
    );
  }

  const handleAddWord = (word: string, translation: TWordTranslationItem) => {
    if (service) {
      service
        .addWord(word.toLowerCase(), translation.word, { partOfSpeech: translation.partOfSpeech })
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handlePlaySound = async () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = currentWordTranslation.source;
    msg.lang = subsLanguage;
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  const { transcription } = currentWordTranslation;
  const showTranscription =
    typeof transcription === "string" && transcription && transcription.toLowerCase() !== source;

  return (
    <Popover variant="word" style={service ? ({ "--es-service": service.color } as CSSProperties) : undefined}>
      <div
        className={service ? "es-title es-addable" : "es-title"}
        onClick={() =>
          handleAddWord(currentWordTranslation.source, {
            word: currentWordTranslation.mainTranslation,
            partOfSpeech: "unknown",
            popularity: 0,
            synonyms: [],
          })
        }
      >
        {service && (
          <span className="es-add">
            <PlusIcon />
          </span>
        )}
        <span dir="auto">{currentWordTranslation.mainTranslation}</span>
      </div>
      <div className="es-src">
        <button className="es-speak" title="Pronounce" onClick={handlePlaySound}>
          <SoundIcon />
        </button>
        <span className="es-src-word" dir="auto">
          {source}
        </span>
        {showTranscription && <span className="es-translit">[{transcription}]</span>}
      </div>
      {currentWordTranslation.translations.length > 0 && (
        <>
          <div className="es-sep" />
          <div className="es-alts">
            {currentWordTranslation.translations.map((translation) => (
              <Fragment key={`${translation.partOfSpeech}-${translation.word}`}>
                <span
                  className={service ? "es-alt-word es-addable" : "es-alt-word"}
                  dir="auto"
                  onClick={() => handleAddWord(currentWordTranslation.source, translation)}
                >
                  {service && (
                    <span className="es-add">
                      <PlusIcon />
                    </span>
                  )}
                  {translation.word}
                </span>
                <span className="es-alt-pos">{translation.partOfSpeech}</span>
                <span className="es-alt-back" dir="auto">
                  {joinTranslations(translation.synonyms)}
                </span>
              </Fragment>
            ))}
          </div>
        </>
      )}
      {subsLanguage === "en" && (
        <>
          <div className="es-sep" />
          <div className="es-links">
            {DICTIONARIES.map(([name, url]) => (
              <a key={name} className="es-link" href={url(encodeURIComponent(source))} target="_blank" rel="noreferrer">
                {name}
                <ExternalIcon />
              </a>
            ))}
          </div>
        </>
      )}
    </Popover>
  );
};
