import { FC } from "react";
import { useGate, useUnit } from "effector-react";

import { $currentSubTranslation, $subTranslationPendings, SubTranslationGate } from "@src/models/translations";

export const SubFullTranslation: FC<{ text: string }> = ({ text }) => {
  useGate(SubTranslationGate, text);
  const [currentSubTranslation, subTranslationPendings] = useUnit([$currentSubTranslation, $subTranslationPendings]);

  if (!currentSubTranslation || subTranslationPendings[text]) {
    return null;
  }

  return <div className="es-full-translation">{currentSubTranslation}</div>;
};
