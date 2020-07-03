import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { toggleEnableState } from "../../event";
import { enableState } from "../../store";

function Toggle() {
  const isEnable = useStore(enableState);
  addEnableClass(isEnable);

  useEffect(() => {
    addEnableClass(isEnable);
  });

  function changeEnableState(isEnabled: boolean) {
    window.isEnabled = isEnabled;
    toggleEnableState(isEnabled);
    addEnableClass(isEnabled);
  }

  function addEnableClass(isEnabled: boolean) {
    document.documentElement.classList.toggle("easysubs-enable", isEnabled);
  }

  return (
    <label className="easysubs-label easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <div className="easysubs-label-text">
          {chrome.i18n.getMessage("enable")}
        </div>
      </div>
      <div className="easysubs-settings__item__right-side">
        <div className="toggle">
          <input
            className="toggle-state setting-toggle"
            type="checkbox"
            name="check"
            value="check"
            defaultChecked={isEnable}
            // tslint:disable-next-line: jsx-no-lambda
            onChange={() => changeEnableState(!isEnable)}
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
enableState.on(toggleEnableState, (state: any, isEnabled: boolean) => isEnabled);

export default Toggle;
