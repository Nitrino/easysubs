import React from "react";
import ReactDOM from "react-dom";
import SettingsComponent from "./components/settings/Settings";

class Settings {
  render(settingSelector: string) {
    const prevNode = document.querySelector(".easysubs-settings");
    if (prevNode) prevNode.remove();
    const referenceNode = document.querySelector(settingSelector);
    const parentNode = document.querySelector(settingSelector).parentNode;
    const settingNode = document.createElement("div");
    settingNode.className = "easysubs-settings";
    parentNode.insertBefore(settingNode, referenceNode);

    ReactDOM.render(
      <SettingsComponent />,
      document.querySelector(".easysubs-settings")
    );
  }
}

export default Settings;
