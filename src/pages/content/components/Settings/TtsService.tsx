import { FC, HTMLProps } from "react";
import { useUnit } from "effector-react";

import { $ttsService, ttsServiceChanged } from "@src/models/settings";
import { TTtsService } from "@src/models/types";
import { Select } from "../ui/Select";

const getServiceOption = (service: string) => {
  return services.find((option) => option.value === service);
};

export const TtsService: FC<HTMLProps<HTMLSelectElement>> = () => {
  const [ttsService, handleTtsServiceChanged] = useUnit([$ttsService, ttsServiceChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Pronunciation</div>
      <div className="es-settings-content__element__right">
        <Select
          value={getServiceOption(ttsService)}
          onChange={(option: { value: TTtsService }) => handleTtsServiceChanged(option.value)}
          options={services}
        />
      </div>
    </div>
  );
};

const services = [
  { label: "Google Translate", value: "google" },
  { label: "Youdao", value: "youdao" },
  { label: "Wiktionary", value: "wiktionary" },
  { label: "ChatGPT", value: "chatgpt" },
  { label: "Browser voice", value: "browser" },
];
