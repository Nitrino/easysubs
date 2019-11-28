import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "./components/progress/ProgressBar";
import SettingsComponent from "./components/settings/Settings";
import SubsComponent from "./components/subs/SubsComponent";

class UI {
  public static renderSubs(playerContainerElementSelector: string) {
    const prevSubsContainerElement = document.getElementById("easysubs");
    if (prevSubsContainerElement != null) return;

    const playerContainerElement = document.querySelector(playerContainerElementSelector);
    const subsContainerElement = document.createElement("div");
    subsContainerElement.id = "easysubs";
    playerContainerElement.appendChild(subsContainerElement);

    ReactDOM.render(<SubsComponent />, document.querySelector("#easysubs"));
  }

  public static renderProgressBar(playerContainerElementSelector: string) {
    const prevProgressBarElement = document.querySelector(".easysubs-progress-bar");
    if (prevProgressBarElement != null) {
      prevProgressBarElement.remove();
    }

    const playerContainerElement = document.querySelector(playerContainerElementSelector);
    const progressBarElement = document.createElement("div");
    progressBarElement.className = "easysubs-progress-bar";
    playerContainerElement.appendChild(progressBarElement);

    ReactDOM.render(<ProgressBar />, document.querySelector(".easysubs-progress-bar"));
  }

  public static renderSettings(settingSelector: string) {
    const prevNode = document.querySelector(".easysubs-settings");
    if (prevNode) return;
    const referenceNode = document.querySelector(settingSelector);
    const parentNode = referenceNode.parentNode;
    const settingNode = document.createElement("div");
    settingNode.className = "easysubs-settings";
    parentNode.insertBefore(settingNode, referenceNode);

    ReactDOM.render(<SettingsComponent />, document.querySelector(".easysubs-settings"));
  }
}

export default UI;
