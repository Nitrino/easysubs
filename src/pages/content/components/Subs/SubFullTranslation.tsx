import { FC } from "react";
import { useGate, useUnit } from "effector-react";

import { $currentSubTranslation, $subTranslationPendings, SubTranslationGate } from "@src/models/translations";
import { $translationService } from "@src/models/settings";
import { TRANSLATION_SERVICES } from "../Settings/TranslationService";
import { Popover } from "../ui/Popover";
import { Spinner } from "../ui/Spinner";

export const SubFullTranslation: FC<{ text: string }> = ({ text }) => {
  useGate(SubTranslationGate, text);
  const [currentSubTranslation, subTranslationPendings, translationService] = useUnit([
    $currentSubTranslation,
    $subTranslationPendings,
    $translationService,
  ]);

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

  const serviceName = TRANSLATION_SERVICES.find((service) => service.value === translationService)?.label;

  return (
    <Popover variant="line">
      <div className="es-line-text" dir="auto">
        {currentSubTranslation}
      </div>
      {serviceName && <div className="es-foot">via {serviceName}</div>}
    </Popover>
  );
};
