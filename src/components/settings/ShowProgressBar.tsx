import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { toggleShowProgressBarState } from "../../event";
import { showProgressBarState } from "../../store";
import ga from '../../ga'

function ShowProgressBar() {
  const showProgressBar = useStore(showProgressBarState);
  addEnableClass(showProgressBar);

  useEffect(() => {
    addEnableClass(showProgressBar);
  });

  function changeShowState(showed: boolean) {
    toggleShowProgressBarState(showed);
    addEnableClass(showed);
    ga('easySubsTracker.send', 'event', "show-progress-bar", showed.toString());
  }

  function addEnableClass(showed: boolean) {
    document.documentElement.classList.toggle("easysubs-progress-bar-enable", showed);
  }

  return (
    <label className="easysubs-label easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <div className="easysubs-label-text">
          {chrome.i18n.getMessage("showProgressBar")}
        </div>
      </div>
      <div className="easysubs-settings__item__right-side">
        <div className="toggle">
          <input
            className="toggle-state setting-toggle"
            type="checkbox"
            name="check"
            value="check"
            defaultChecked={showProgressBar}
            // tslint:disable-next-line: jsx-no-lambda
            onChange={() => changeShowState(!showProgressBar)}
          />
          <div className="toggle-inner">
            <div className="indicator" />
          </div>
          <div className="active-bg" />
        </div>
      </div>
    </label>
  );
}
showProgressBarState.on(toggleShowProgressBarState, (state: any, showed: boolean) => showed);

export default ShowProgressBar;
