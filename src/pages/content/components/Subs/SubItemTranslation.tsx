import { FC, useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";
import { $learningService, $translateLanguage } from "@src/models/settings";

import { $currentWordTranslation, $wordTranslationsPendings, WordTranslationsGate } from "@src/models/translations";
import toast from "react-hot-toast";
import { SoundIcon } from "./assets/SoundIcon";
import { PlusIcon } from "./assets/PlusIcon";
import { joinTranslations } from "@src/utils/joinTranslations";

import cambridgeIcon from "@assets/img/icons/cambridge.png";
import forvoIcon from "@assets/img/icons/forvo.png";
import urbandictionaryIcon from "@assets/img/icons/urbandictionary.png";
import youglishIcon from "@assets/img/icons/youglish.png";
import ILearningService from "@src/learning-service/learningService";
import { TWordTranslationItem } from "@src/models/types";
import { $subsLanguage } from "@src/models/subs";
import { getLearningService } from "@src/utils/getLearningService";
import { TranslateSelect } from "../ui/TranslateSelect";

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

  if (!currentWordTranslation || wordTranslationsPendings[text]) {
    return null;
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

  if (subsLanguage === translateLanguage) {
    return (
      <div className="es-word-translation" onClick={(e) => e.stopPropagation()}>
        <div className="es-word-translation-languages">
          <div>Select the translation language:</div>
          <TranslateSelect />
        </div>
      </div>
    );
  }

  return (
    <div className="es-word-translation" onClick={(e) => e.stopPropagation()}>
      <div className="es-word-main">
        <div
          className="es-translation-variant-word"
          onClick={(e) => {
            e.stopPropagation();
            handleAddWord(currentWordTranslation.source, {
              word: currentWordTranslation.mainTranslation,
              partOfSpeech: "unknown",
              popularity: 0,
              synonyms: [],
            });
          }}
        >
          {service && (
            <button className="es-settings-button">
              <PlusIcon fill={service.color} />
            </button>
          )}
          <div>{currentWordTranslation.mainTranslation}</div>
        </div>
      </div>
      <hr className="es-word-original-hr" />
      <div className="es-word-original-info">
        <div className="es-word-original-sound-icon" onClick={handlePlaySound}>
          <SoundIcon />
        </div>
        <div className="es-word-original">{text.toLowerCase()}</div>
      </div>
      <div className="es-translation-variants">
        {currentWordTranslation.translations.length > 0 &&
          currentWordTranslation.translations.map((translation) => (
            <>
              <div
                className="es-translation-variant-word"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddWord(currentWordTranslation.source, translation);
                }}
              >
                {service && (
                  <button className="es-settings-button">
                    <PlusIcon fill={service.color} />
                  </button>
                )}
                <div>{translation.word}</div>
              </div>
              <div className="es-translation-variant-part-of-speach">{translation.partOfSpeech}</div>
              <div className="es-translation-variant-synonyms">{joinTranslations(translation.synonyms)}</div>
            </>
          ))}
      </div>
      {subsLanguage === "en" && (
        <>
          <hr className="es-translation-services-hr" />
          <div className="es-translation-services">
            <a
              className="es-translation-service"
              href={`https://dictionary.cambridge.org/dictionary/english/${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={cambridgeIcon} alt="cambridge dictionary" />
            </a>
            <a
              className="es-translation-service"
              href={`https://forvo.com/search/${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={forvoIcon} alt="forvo" />
            </a>
            <a
              className="es-translation-service"
              href={`https://www.urbandictionary.com/define.php?term=${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={urbandictionaryIcon} alt="urban dictionary" />
            </a>
            <a
              className="es-translation-service"
              href={`https://youglish.com/pronounce/${text.toLowerCase()}/english`}
              target="_blank"
            >
              <img src={youglishIcon} alt="youglish" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};
