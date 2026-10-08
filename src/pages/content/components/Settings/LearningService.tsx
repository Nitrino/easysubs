import { FC, HTMLProps, ReactNode } from "react";
import { useUnit } from "effector-react";

import { $ankiContext, $learningService, ankiContextChanged, learningServiceChanged } from "@src/models/settings";
import { TAnkiContext, TLearningService } from "@src/models/types";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";

const getServiceOption = (service: string) => {
  return services.find((option) => option.value === service);
};
export const LearningService: FC<HTMLProps<HTMLSelectElement>> = () => {
  const [learningService, handleTranslateLanguageChanged] = useUnit([$learningService, learningServiceChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Learning service</div>
      <div className="es-settings-content__element__right">
        <Select
          value={getServiceOption(learningService)}
          onChange={(option: { value: TLearningService }) => handleTranslateLanguageChanged(option.value)}
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

const Row: FC<{ title: ReactNode; children: ReactNode }> = ({ title, children }) => (
  <div className="es-settings-content__item">
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">{title}</div>
      <div className="es-settings-content__element__right">{children}</div>
    </div>
  </div>
);

// What Anki cards get from the line a word was added from; the rest needs the line itself
const LINE_PARTS: { key: Exclude<keyof TAnkiContext, "sentence">; title: string }[] = [
  { key: "translation", title: "Line's translation" },
  { key: "picture", title: "Video frame" },
  { key: "audio", title: "Line's audio" },
];

export const AnkiContext: FC = () => {
  const [learningService, context, onChange] = useUnit([$learningService, $ankiContext, ankiContextChanged]);
  if (learningService !== "anki") return null;

  return (
    <>
      <Row title="Line on Anki cards">
        <Toggle isEnabled={context.sentence} onChange={(sentence) => onChange({ sentence })} />
      </Row>
      {context.sentence &&
        LINE_PARTS.map(({ key, title }) => (
          <Row key={key} title={title}>
            <Toggle isEnabled={context[key]} onChange={(value) => onChange({ [key]: value })} />
          </Row>
        ))}
    </>
  );
};
