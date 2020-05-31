import {useStore} from "effector-react";
import React from "react";
import {setLearningService} from "../../event";
import {learningServiceStore} from "../../store";
import GoogleAnalytics from "../../ga";
import NoService from "../../learning-services/NoService";
import Lingualeo from "../../learning-services/lingualeo";
import PuzzleEnglish from "../../learning-services/PuzzleEnglish";
import SkyEng from "../../learning-services/SkyEng";
import {LearningService} from "../../learning-services/LearningService";

const skyEng = new SkyEng();

const services: LearningService[] = [
  new NoService(),
  new Lingualeo(),
  new PuzzleEnglish(),
  skyEng
];


function LearningService() {
  const currentServiceId = useStore(learningServiceStore);

  function changeLearningService(service: string) {
    setLearningService(service)
    GoogleAnalytics.trackEvent("learning-service", service)
  }

  return (
    <>
      <div className="easysubs-settings__learning-service easysubs-settings__item">
        <div className="easysubs-settings__item__left">
          <span>{chrome.i18n.getMessage("learningService")}</span>
        </div>
        <div className="easysubs-settings__item__right">
          <select
            className="easysubs-settings__select"
            value={currentServiceId || ""}
            onChange={e => changeLearningService(e.target.value || null)}
          >
            {services.map((service: { id: string; label: string }, index) => {
              return (
                <option value={service.id} key={index}>
                  {service.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}

learningServiceStore.on(setLearningService, (state: any, service: object) => service);

export default LearningService;
