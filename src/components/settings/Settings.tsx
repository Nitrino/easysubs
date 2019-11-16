import React, { useState } from "react";
import Content from "./Content";
import Logo from "../../images/logo.svg";

function Settings() {
  const [showSettings, toggleShowSettings] = useState(false);

  return (
    <div
      className="easysubs-settings-container"
      onClick={() => toggleShowSettings(!showSettings)}
    >
      <Logo />
      {/* <div
        dangerouslySetInnerHTML={{ __html: logo }}
        onClick={() => toggleShowSettings(!showSettings)}
      ></div> */}
      <Content
        display={showSettings ? "block" : "none"}
        toggleShowSettings={toggleShowSettings}
      />
    </div>
  );
}

export default Settings;
