import { FC, HTMLProps } from "react";
import { useUnit } from "effector-react";

import { $learningService, learningServiceChanged } from "@src/models/settings";
import { Select } from "../ui/Select";
import { TLearningService } from "@src/models/types";

export const LearningService: FC<HTMLProps<HTMLSelectElement>> = (props) => {
  const [learningService, handleTranslateLanguageChanged] = useUnit([$learningService, learningServiceChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Learning service</div>
      <div className="es-settings-content__element__right">
        <Select
          {...props}
          value={learningService}
          onChange={(e) => handleTranslateLanguageChanged(e.currentTarget.value as TLearningService)}
          options={services}
        />
      </div>
    </div>
  );
};

const services = [
  { label: "Disabled", value: "disabled" },
  { label: "Anki", value: "anki" },
  { label: "LinguaLeo", value: "lingualeo" },
  { label: "Puzzle English", value: "puzzle-english" },
];
