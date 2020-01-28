import React from "react";
import Toggle from "../settings/Toggle";
import Language from "../settings/Language";
import LearningService from "../settings/LearningService";
import ShowProgressBar from "../settings/ShowProgressBar";

function BrowserAction() {
  return (
    <div className="content">
      <div className="header">Easysubs</div>
      <menu>
        <li>
          <a target="_blank" href={chrome.i18n.getMessage("homePageUrl")}>
            {chrome.i18n.getMessage("homePage")}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            {chrome.i18n.getMessage("reportBugs")}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            {chrome.i18n.getMessage("suggestFeatures")}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://t.me/easysubs_ext">
            {chrome.i18n.getMessage("supportChat")}
          </a>
        </li>
      </menu>
    </div>
  );
}

export default BrowserAction;
