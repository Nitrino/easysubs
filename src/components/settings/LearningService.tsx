import * as locale from "@cospired/i18n-iso-languages/langs/en.json";
import { useStore } from "effector-react";
import React from "react";
import { setLearningService } from "../../event";
import { learningServiceStore } from "../../store";

const services = [
  {
    label: "Disable",
    value: ""
  },
  {
    label: "LinguaLeo",
    value: "lingualeo"
  },
  {
    label: "Puzzle English",
    value: "puzzle-english"
  }
  // {
  //   label: "Quizlet",
  //   value: "quizlet"
  // }
];

function LearningService() {
  const currentService = useStore(learningServiceStore);

  return (
    <div className="easysubs-settings__learning-service easysubs-settings__item">
      <div className="easysubs-settings__item__left">
        <span>Learning service: </span>
      </div>
      <div className="easysubs-settings__item__right">
        <select value={currentService || ""} onChange={e => setLearningService(e.target.value || null)}>
          {services.map((service: { value: string; label: string }, index) => {
            return (
              <option value={service.value} key={index}>
                {service.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
learningServiceStore.on(setLearningService, (state: any, service: object) => service);

export default LearningService;
