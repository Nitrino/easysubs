import { $translateLanguage, translateLanguageChanged } from "@root/src/models/settings";
import { useUnit } from "effector-react";
import { FC } from "react";

import { LANGUAGES } from "@src/utils/languages";
import { Select } from "../Select";

export const TranslateSelect: FC = () => {
  const [translateLanguage, handleTranslateLanguageChanged] = useUnit([$translateLanguage, translateLanguageChanged]);

  const getValue = (value) => {
    return LANGUAGES.find((lang) => lang.value === value);
  };

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={LANGUAGES}
        value={getValue(translateLanguage)}
        onChange={(option: { value: string }) => handleTranslateLanguageChanged(option.value)}
      />
    </div>
  );
};
