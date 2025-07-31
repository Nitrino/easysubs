import { FC, HTMLProps } from "react";
import { useUnit } from "effector-react";

import { $translationService, translationServiceChanged } from "@src/models/settings";
import { TTranslationService } from "@src/models/types";
import { Select } from "../ui/Select";

const getServiceOption = (service: string) => {
  return services.find((option) => option.value === service);
};

export const TranslationService: FC<HTMLProps<HTMLSelectElement>> = () => {
  const [translationService, handleTranslationServiceChanged] = useUnit([$translationService, translationServiceChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Translation service</div>
      <div className="es-settings-content__element__right">
        <Select
          value={getServiceOption(translationService)}
          onChange={(option: { value: TTranslationService }) => handleTranslationServiceChanged(option.value)}
          options={services}
        />
      </div>
    </div>
  );
};

const services = [
  { label: "Google Translate", value: "google" },
  { label: "DeepL", value: "deepl" },
];