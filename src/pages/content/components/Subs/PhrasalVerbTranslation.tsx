import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { TPhrasalVerb } from "@src/models/types";
import { $learningService } from "@src/models/settings";
import ILearningService from "@src/learning-service/learningService";
import { getLearningService } from "@src/utils/getLearningService";
import toast from "react-hot-toast";
import { PlusIcon } from "./assets/PlusIcon";

export const PhrasalVerbTranslation: FC<{ phrasalVerb: TPhrasalVerb }> = ({ phrasalVerb }) => {
  const [learningService] = useUnit([$learningService]);

  const [service, setService] = useState<ILearningService>(null);

  useEffect(() => {
    setService(getLearningService(learningService));
  }, [learningService]);

  const handleAddWord = (word: string, translation: string) => {
    if (service) {
      service
        .addWord(word.toLowerCase(), translation, { partOfSpeech: "phrase" })
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div className="es-word-translation">
      <div className="es-word-main">{phrasalVerb.text}</div>
      <hr className="es-word-original-hr" />
      <div className="es-word-original-info">
        <div className="es-word-original">phrasal verb</div>
      </div>
      <div className="es-translation-phrasal-verbs-variants">
        {phrasalVerb.translations.map((translation) => (
          <div className="es-translation-variant-word">
            {service && (
              <button
                className="es-settings-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddWord(phrasalVerb.text, translation);
                }}
              >
                <PlusIcon fill={service.color} />
              </button>
            )}
            {translation}
          </div>
        ))}
      </div>
    </div>
  );
};
