import React, { useEffect, useRef } from "react";
import Language from "./Language";
import LearningService from "./LearningService";
import Toggle from "./Toggle";
import ShowProgressBar from "./ShowProgressBar";
import SubsFontSize from "./SubsFontSize";
import ResyncSubs from "./ResyncSubs";
import CustomSubs from "./CustomSubs";
import onClickOutside from "react-onclickoutside";

// tslint:disable-next-line: variable-name
const Content = (props: any) => {
  function closeSettings() {
    props.toggleShowSettings(false);
  }

  (Content as any).handleClickOutside = () => {
    props.toggleShowSettings(false);
  };

  return (
    <div className="easysubs-settings-wrapper" style={{ display: props.display }}>
      <div className="easysubs-settings-close" onClick={closeSettings} />
      <div className="easysubs-settings-header">EasySubs settings</div>
      <div className="easysubs-settings__content">
        <div className="easysubs-settings__content__header">Global</div>
        <Toggle />
        <ShowProgressBar />
        <Language />
        <LearningService />
        {/* <div className="easysubs-settings__content__header">Interface</div> */}
        <div className="easysubs-settings__content__header">Subtitles</div>
        <SubsFontSize />
        <ResyncSubs />
        <CustomSubs />
      </div>
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => (Content as any).handleClickOutside
};

export default onClickOutside(Content, clickOutsideConfig);
