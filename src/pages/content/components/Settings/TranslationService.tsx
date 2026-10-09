import { FC, HTMLProps } from "react";
import { useUnit } from "effector-react";

import { $translationService, translationServiceChanged } from "@src/models/settings";
import { TTranslationService } from "@src/models/types";
import { isChromeTranslatorSupported } from "@src/utils/chromeTranslator";
import { Select } from "../ui/Select";
import { OllamaStatus, OnDeviceStatus } from "./OnDeviceStatus";

const getServiceOption = (service: string) => {
  return services.find((option) => option.value === service);
};

// Chrome only where the browser has its built-in translator
const availableServices = (current: TTranslationService) =>
  services.filter((option) => option.value !== "chrome" || isChromeTranslatorSupported() || current === "chrome");

export const TranslationService: FC<HTMLProps<HTMLSelectElement>> = () => {
  const [translationService, handleTranslationServiceChanged] = useUnit([
    $translationService,
    translationServiceChanged,
  ]);

  return (
    <>
      <div className="es-settings-content__element">
        <div className="es-settings-content__element__left">Translation service</div>
        <div className="es-settings-content__element__right">
          <Select
            value={getServiceOption(translationService)}
            onChange={(option: { value: TTranslationService }) => handleTranslationServiceChanged(option.value)}
            options={availableServices(translationService)}
          />
        </div>
      </div>
      {translationService === "bergamot" && <OnDeviceStatus kind="bergamot" />}
      {translationService === "ollama" && <OllamaStatus />}
    </>
  );
};

const services: { label: string; value: TTranslationService }[] = [
  { label: "Google Translate", value: "google" },
  { label: "DeepL", value: "deepl" },
  { label: "Bing Translator", value: "bing" },
  { label: "Yandex Translate", value: "yandex" },
  { label: "ChatGPT", value: "chatgpt" },
  { label: "Chrome (on device)", value: "chrome" },
  { label: "Bergamot (on device)", value: "bergamot" },
  { label: "Ollama", value: "ollama" },
];
