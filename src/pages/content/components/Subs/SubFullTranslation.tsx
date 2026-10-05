import { FC } from "react";
import { useGate, useUnit } from "effector-react";

import { $currentSubTranslation, $subTranslationPendings, SubTranslationGate } from "@src/models/translations";
import { Popover } from "../ui/Popover";
import { Spinner } from "../ui/Spinner";

export const SubFullTranslation: FC<{ text: string }> = ({ text }) => {
  useGate(SubTranslationGate, text);
  const [currentSubTranslation, subTranslationPendings] = useUnit([$currentSubTranslation, $subTranslationPendings]);

  if (subTranslationPendings[text]) {
    return (
      <Popover variant="line">
        <div className="es-loading">
          <Spinner />
          <span>Translating…</span>
        </div>
      </Popover>
    );
  }

  if (!currentSubTranslation) {
    return null;
  }

  return (
    <Popover variant="line">
      <div className="es-line-text" dir="auto">
        {currentSubTranslation}
      </div>
    </Popover>
  );
};
