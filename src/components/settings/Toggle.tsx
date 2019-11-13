import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { enableState } from "../../store";
import { toggleEnableState } from "../../event";

function Toggle() {
  enableState.watch(console.log);
  let isEnable = useStore(enableState);
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
      <div className="toggle">
        <input
          className="toggle-state setting-toggle"
          type="checkbox"
          name="check"
          value="check"
          defaultChecked={isEnable}
          onChange={() => changeEnableState(!isEnable)}
        />
        <div className="toggle-inner">
          <div className="indicator"></div>
        </div>
        <div className="active-bg"></div>
      </div>
      <div className="easysubs-label-text">{isEnable ? "On" : "Off"}</div>
    </label>
  );
}
enableState.on(
  toggleEnableState,
  (state: any, isEnabled: boolean) => isEnabled
);

export default Toggle;
