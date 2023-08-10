import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $learningService } from "@src/models/settings";
import { $currentWordTranslation, cleanWordTranslation, requestWordTranslation } from "@src/models/translations";
import { Anki } from "@src/learning-service/anki";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { PuzzleEnglish } from "@src/learning-service/puzzleEnglish";
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

export const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  const [currentWordTranslation, learningService, handleRequestWordTranslation, handleCleanWordTranslation] = useUnit([
    $currentWordTranslation,
    $learningService,
    requestWordTranslation,
    cleanWordTranslation,
  ]);

  const [service, setService] = useState<ILearningService>(null);

  useEffect(() => {
    if (learningService === "anki") {
      setService(new Anki());
    }
    if (learningService === "lingualeo") {
      setService(new LinguaLeo());
    }
    if (learningService === "puzzle-english") {
      setService(new PuzzleEnglish());
    }
  }, [learningService]);

  useEffect(() => {
    handleRequestWordTranslation(text);
    return () => {
      handleCleanWordTranslation();
    };
  }, []);

  if (!currentWordTranslation) {
    return null;
  }

  const handleAddWord = (wors: string, translation: TWordTranslationItem) => {
    if (service) {
      service
        .addWord(wors.toLowerCase(), translation.word, {})
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handlePlaySound = async () => {
    await chrome.runtime.sendMessage({ type: "speak", text: currentWordTranslation.source });
  };

  return (
    <div className="es-word-translation" onClick={(e) => e.stopPropagation()}>
      <div className="es-word-main">{currentWordTranslation.mainTranslation}</div>
      <hr className="es-word-original-hr" />
      <div className="es-word-original-info">
        <div className="es-word-original">{text.toLowerCase()}</div>
        {currentWordTranslation.transcription && <div>/{currentWordTranslation.transcription}/</div>}
        <div className="es-word-original-sound-icon" onClick={handlePlaySound}>
          <SoundIcon />
        </div>
      </div>
      <div className="es-translation-variants">
        <table>
          <tbody>
            {currentWordTranslation.translations.length > 0 &&
              currentWordTranslation.translations.map((translation) => (
                <tr className="es-translation-variant">
                  {service && (
                    <td>
                      <button
                        className="es-settings-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddWord(currentWordTranslation.source, translation);
                        }}
                      >
                        <PlusIcon fill={service.color} />
                      </button>
                    </td>
                  )}
                  <td className="es-translation-variant-word">{translation.word}</td>
                  <td className="es-translation-variant-part-of-speach">{translation.partOfSpeech}</td>
                  <td className="es-translation-variant-synonyms">{joinTranslations(translation.synonyms)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <hr className="es-translation-services-hr" />
      <div className="es-translation-services">
        <a
          className="es-translation-service"
          href={`https://dictionary.cambridge.org/dictionary/english/${text.toLowerCase()}`}
          target="_blank"
        >
          <img src={cambridgeIcon} alt="cambridge dictionary" />
        </a>
        <a className="es-translation-service" href={`https://forvo.com/search/${text.toLowerCase()}`} target="_blank">
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
    </div>
  );
};
