import { useStore } from "effector-react";
import React from "react";
import { setLearningService } from "../../event";
import { learningServiceStore } from "../../store";
import GoogleAnalytics from "../../ga";

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
];

function LearningService() {
  const currentService = useStore(learningServiceStore);

  function changeLearningService(service: string) {
    setLearningService(service)
    GoogleAnalytics.trackEvent("learning-service", service)
  }

  return (
    <div className="easysubs-settings__learning-service easysubs-settings__item">
      <div className="easysubs-settings__item__left">
        <span>{chrome.i18n.getMessage("learningService")}</span>
      </div>
      <div className="easysubs-settings__item__right">
        <select
          className="easysubs-settings__select"
          value={currentService || ""}
          onChange={e => changeLearningService(e.target.value || null)}
        >
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
