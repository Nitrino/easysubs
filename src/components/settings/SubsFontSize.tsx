import { useStore } from "effector-react";
import React from "react";
import { setSubsFontSize } from "../../event";
import { subsFontSizeStore } from "../../store";

const fontSizeStep = 5;

function SubsFontSize() {
  const subsFontSize = useStore(subsFontSizeStore);

  function increaseSubsFontSize() {
    setSubsFontSize(subsFontSize + fontSizeStep);
  }

  function decreaseSubsFontSize() {
    setSubsFontSize(subsFontSize - fontSizeStep);
  }

  return (
    <div className="easysubs-settings__learning-service easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <span>{chrome.i18n.getMessage("subtitlesSize")}</span>
      </div>
      <div className="easysubs-settings__item__right-side">
        <div className="easysubs-settings__font-size">
          <div className="easysubs-settings__button -transparent -minus" onClick={decreaseSubsFontSize} />
          <div className="easysubs-settings__font-size__text">
            {subsFontSize}%
          </div>
          <div className="easysubs-settings__button -transparent -plus" onClick={increaseSubsFontSize} />
        </div>
      </div>
    </div>
  );
}
subsFontSizeStore.on(setSubsFontSize, (state: any, fontSize: number) => fontSize);

export default SubsFontSize;
