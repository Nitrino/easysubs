import { CSSProperties, FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { TPhrasalVerb } from "@src/models/types";
import { $learningService } from "@src/models/settings";
import ILearningService from "@src/learning-service/learningService";
import { getLearningService } from "@src/utils/getLearningService";
import toast from "react-hot-toast";
import { PlusIcon } from "./assets/PlusIcon";
import { Popover } from "../ui/Popover";

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
    <Popover variant="word" style={service ? ({ "--es-service": service.color } as CSSProperties) : undefined}>
      <div className="es-title" dir="auto">
        {phrasalVerb.text}
      </div>
      <div className="es-label">phrasal verb</div>
      <div className="es-sep" />
      <div className="es-pv-list">
        {phrasalVerb.translations.map((translation) => (
          <div
            key={translation}
            className={service ? "es-pv-item es-addable" : "es-pv-item"}
            dir="auto"
            onClick={() => handleAddWord(phrasalVerb.text, translation)}
          >
            {service && (
              <span className="es-add">
                <PlusIcon />
              </span>
            )}
            {translation}
          </div>
        ))}
      </div>
    </Popover>
  );
};
