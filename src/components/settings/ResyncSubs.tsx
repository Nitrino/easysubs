import { useStore } from "effector-react";
import React, { useState } from "react";
import { updateSubs } from "../../event";
import { subsStore } from "../../store";
import { resync } from "subtitle";

function ResyncSubs() {
  const subs = useStore(subsStore);
  const [delay, setDelay] = useState(0);

  function increaseSubsDelay(event: any) {
    event.stopPropagation();
    const timeDelayStep = getTimeDelayStep(event);
    setDelay(delay + timeDelayStep);
    updateSubs(resync(subs, timeDelayStep));
  }

  function decreaseSubsTimeGap(event: any) {
    event.stopPropagation();
    const timeDelayStep = getTimeDelayStep(event);
    setDelay(delay - timeDelayStep);
    updateSubs(resync(subs, -1 * timeDelayStep));
  }

  function getTimeDelayStep(event: any) {
    if (event.altKey) return 1000;
    if (event.shiftKey) return 5000;
    return 250;
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
