import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { toggleEnableState } from "../../event";
import { enableState } from "../../store";

function Toggle() {
  enableState.watch(console.log);
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
    <label className="easysubs-label">
      <div className="easysubs-label-text">Enable extension:</div>
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
    </label>
  );
}
enableState.on(toggleEnableState, (state: any, isEnabled: boolean) => isEnabled);

export default Toggle;
