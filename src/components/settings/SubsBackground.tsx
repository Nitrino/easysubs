import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { toggleShowSubsBackgroundState } from "../../event";
import { showSubsBackgroundState } from "../../store";
import GoogleAnalytics from "../../ga";

function SubsBackground() {
  const showSubsBackground = useStore(showSubsBackgroundState);
  addEnableClass(showSubsBackground);

  useEffect(() => {
    addEnableClass(showSubsBackground);
  });

  function changeShowState(showed: boolean) {
    toggleShowSubsBackgroundState(showed);
    addEnableClass(showed);
    GoogleAnalytics.trackEvent("show-subs-background", showed.toString())
  }

  function addEnableClass(showed: boolean) {
    document.documentElement.classList.toggle("easysubs-show-subtitles-background", showed);
  }

  return (
    <label className="easysubs-label easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <div className="easysubs-label-text">
          {chrome.i18n.getMessage("showSubsBackground")}
        </div>
      </div>
      <div className="easysubs-settings__item__right-side">
        <div className="toggle">
          <input
            className="toggle-state setting-toggle"
            type="checkbox"
            name="check"
            value="check"
            defaultChecked={showSubsBackground}
            // tslint:disable-next-line: jsx-no-lambda
            onChange={() => changeShowState(!showSubsBackground)}
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
showSubsBackgroundState.on(toggleShowSubsBackgroundState, (state: any, showed: boolean) => showed);

export default SubsBackground;
