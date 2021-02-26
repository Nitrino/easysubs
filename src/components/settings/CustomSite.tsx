import { useStore } from "effector-react";
import React from "react";
import { setCustomSite } from "../../event";
import { customSiteStore } from "../../store";

function CustomSite() {
  const currentSite = useStore(customSiteStore);

  function changeCustomSite(site: string) {
    setCustomSite(site)
  }

  return (
    <div className="easysubs-settings__learning-service easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <span>{chrome.i18n.getMessage("customSite")}</span>
      </div>
      <div className="easysubs-settings__item__right-side">
        <input type="text" style={{color: 'black'}}
          value={currentSite || ""}
          onChange={e => changeCustomSite(e.target.value || null)}
        />
      </div>
    </div>
  );
}
customSiteStore.on(setCustomSite, (state: any, site: object) => site);

export default CustomSite;
