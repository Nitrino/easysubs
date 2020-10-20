import React, { useState } from "react";
import Logo from "../../images/logo.svg";
import Content from "./Content";
import Portal from './Portal'

function Settings(props: {settingsContentSelector: string}) {
  const [showSettings, toggleShowSettings] = useState(false);

  return (
    <div className="easysubs-settings-container">
      <div className="easysubs-settings-container-logo" onClick={() => toggleShowSettings(!showSettings)}>
        <Logo />
      </div>
      <Portal id={props.settingsContentSelector}>
        <Content display={showSettings ? "block" : "none"} toggleShowSettings={toggleShowSettings} />
      </Portal>
    </div>
  );
}

export default Settings;
