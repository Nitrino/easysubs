import { useStore } from "effector-react";
import React, { useState } from "react";
import { updateSubs } from "../../event";
import { subsStore } from "../../store";
import { resync } from "subtitle";

const timeDelayStep = 250;

function ResyncSubs() {
  const subs = useStore(subsStore);
  const [delay, setDelay] = useState(0);

  function increaseSubsDelay() {
    setDelay(delay + timeDelayStep);
    updateSubs(resync(subs, timeDelayStep));
  }

  function decreaseSubsTimeGap() {
    setDelay(delay - timeDelayStep);
    updateSubs(resync(subs, -1 * timeDelayStep));
  }

  return (
    <div className="easysubs-settings__learning-service easysubs-settings__item">
      <div className="easysubs-settings__item__left">
        <span>Subtitles delay: </span>
      </div>
      <div className="easysubs-settings__item__right">
        <div className="easysubs-settings__delay">
          <div className="easysubs-settings__button -transparent -minus" onClick={decreaseSubsTimeGap} />
          <div className="easysubs-settings__delay__text">
            {delay / 1000}s
          </div>
          <div className="easysubs-settings__button -transparent -plus" onClick={increaseSubsDelay} />
        </div>
      </div>
    </div>
  );
}

export default ResyncSubs;
