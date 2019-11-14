import React, { useState } from "react";
import Content from "./Content";
import logo from "../../images/logo.svg";

function Settings() {
  const [showSettings, toggleShowSettings] = useState(false);

  return (
    <div className="easysubs-settings-container">
      <div
        dangerouslySetInnerHTML={{ __html: logo }}
        onClick={() => toggleShowSettings(!showSettings)}
      ></div>
      <Content
        display={showSettings ? "block" : "none"}
        toggleShowSettings={toggleShowSettings}
      />
    </div>
  );
}

export default Settings;
