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
  }
  // {
  //   label: "Quizlet",
  //   value: "quizlet"
  // }
];

function LearningService() {
  const currentService = useStore(learningServiceStore);

  return (
    <div className="easysubs-settings-language">
      <span>Learning service: </span>
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
  );
}
learningServiceStore.on(setLearningService, (state: any, service: object) => service);

export default LearningService;
