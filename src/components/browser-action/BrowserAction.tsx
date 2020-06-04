import React from "react";
import {useStore} from "effector-react";
import {createEvent} from "effector";
import {learningServiceSkyEngEmail, learningServiceSkyEngToken} from "../../store";
import {sendToken} from "../../learning-services/SkyEng";
import {toast} from "react-toastify";

function BrowserAction() {
  const skyEngSettingsEmail = useStore(learningServiceSkyEngEmail);
  const skyEngSettingsToken = useStore(learningServiceSkyEngToken);

  const handleEmail = createEvent()
  const handleToken = createEvent()
  const handleSendToken = createEvent()

  learningServiceSkyEngEmail.on(handleEmail, (state: any, params: any) => params)
  learningServiceSkyEngToken.on(handleToken, (state: any, params: any) => params)
  handleSendToken.watch(() => {
    sendToken(skyEngSettingsEmail)
      .then((text) => {
        console.log('OKI', text);
      })
      .catch((error: any) => {
        console.log('Err', error);
        (toast as any).error(error.toString())
      });
  });

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

      <div className="header">{chrome.i18n.getMessage("SkyEng_Settings_Title")}</div>
      <menu>
        <li>
          {chrome.i18n.getMessage("SkyEng_Settings_Email")}
          <input
            type="text"
            defaultValue={skyEngSettingsEmail}
            onChange={e => handleEmail(e.target.value)}
          />
        </li>
        <li>
          {chrome.i18n.getMessage("SkyEng_Settings_Token")}
          <input
            type="text"
            defaultValue={skyEngSettingsToken}
            onChange={e => handleToken(e.target.value)}
          />
          <button onClick={handleSendToken}>
            {chrome.i18n.getMessage("SkyEng_Settings_GetToken")}
          </button>
        </li>
      </menu>
    </div>
  );
}

export default BrowserAction;
