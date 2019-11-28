import React, { useEffect, useState } from "react";
import Language from "./Language";
import Toggle from "./Toggle";

function Content(props: any) {
  function closeSettings() {
    props.toggleShowSettings(false);
  }
  return (
    <div className="easysubs-settings-wrapper" style={{ display: props.display }}>
      <div className="easysubs-settings-close" onClick={closeSettings} />
      <div className="easysubs-settings-header">EasySubs settings</div>
      <div className="easysubs-settings-content">
        <Toggle />
        <Language />
      </div>
    </div>
  );
}

export default Content;
