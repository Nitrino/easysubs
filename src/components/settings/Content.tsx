import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";
import Language from "./Language";

function Content(props: any) {
  function closeSettings() {
    props.toggleShowSettings(false);
  }
  return (
    <div
      className="easysubs-settings-wrapper"
      style={{ display: props.display }}
    >
      <div className="easysubs-settings-close" onClick={closeSettings}></div>
      <div className="easysubs-settings-header">EasySubs settings</div>
      <div className="easysubs-settings-content">
        <Toggle />
        <Language />
      </div>
    </div>
  );
}

export default Content;
