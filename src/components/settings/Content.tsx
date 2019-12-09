import React, { useEffect, useState } from "react";
import Language from "./Language";
import LearningService from "./LearningService";
import Toggle from "./Toggle";
import ShowProgressBar from "./ShowProgressBar";
import SubsFontSize from "./SubsFontSize";
import ResyncSubs from "./ResyncSubs";

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
        <LearningService />
        <ShowProgressBar />
        <SubsFontSize />
        <ResyncSubs />
      </div>
    </div>
  );
}

export default Content;
