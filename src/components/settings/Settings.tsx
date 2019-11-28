import React, { useState } from "react";
import Logo from "../../images/logo.svg";
import Content from "./Content";

function Settings() {
  const [showSettings, toggleShowSettings] = useState(false);

  return (
    <div className="easysubs-settings-container">
      <div className="easysubs-settings-container-logo" onClick={() => toggleShowSettings(!showSettings)}>
        <Logo />
      </div>
      <Content display={showSettings ? "block" : "none"} toggleShowSettings={toggleShowSettings} />
    </div>
  );
}

export default Settings;
