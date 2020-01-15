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
          <a target="_blank" href="http://nitrino.io/easysubs/">
            Home page
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            Report bugs
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues">
            Suggest features
          </a>
        </li>
      </menu>
    </div>
  );
}

export default BrowserAction;
