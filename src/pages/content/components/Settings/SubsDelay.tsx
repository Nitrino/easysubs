import { FC } from "react";
import { useUnit } from "effector-react";
import { $subsDelay, subsDelayButtonPressed } from "@src/models/subs";
import { ArrowBackDouble } from "./assets/ArrowBackDouble";
import { ArrowForward } from "./assets/ArrowForward";
import { ArrowBack } from "./assets/ArrowBack";
import { ArrowForwardDouble } from "./assets/ArrowForwardDouble";

const SUBS_DELAY_SMALL_STEP = 0.25;
const SUBS_DELAY_LARGE_STEP = 1;

export const SubsDelay: FC = () => {
  const [subsDelay, handleSubsDelayButtonPressed] = useUnit([$subsDelay, subsDelayButtonPressed]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Subtitles delay</div>
      <div className="es-settings-content__element__right">
        <button
          className="es-settings-button"
          onClick={() => handleSubsDelayButtonPressed(subsDelay - SUBS_DELAY_LARGE_STEP)}
        >
          <ArrowBackDouble />
        </button>
        <button
          className="es-settings-button"
          onClick={() => handleSubsDelayButtonPressed(subsDelay - SUBS_DELAY_SMALL_STEP)}
        >
          <ArrowBack />
        </button>
        <div className="es-settings-button__value">{subsDelay}s</div>
        <button
          className="es-settings-button"
          onClick={() => handleSubsDelayButtonPressed(subsDelay + SUBS_DELAY_SMALL_STEP)}
        >
          <ArrowForward />
        </button>
        <button
          className="es-settings-button"
          onClick={() => handleSubsDelayButtonPressed(subsDelay + SUBS_DELAY_LARGE_STEP)}
        >
          <ArrowForwardDouble />
        </button>
      </div>
    </div>
  );
};
