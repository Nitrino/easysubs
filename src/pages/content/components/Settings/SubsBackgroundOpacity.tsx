import { $subsBackgroundOpacity, subsBackgroundOpacityButtonPressed } from "@src/models/settings";
import { FC } from "react";
import { useUnit } from "effector-react";
import { MinusIcon } from "./assets/MinusIcon";
import { PlusIcon } from "./assets/PlusIcon";

const OPACITY_STEP = 5;

export const SubsBackgroundOpacity: FC = () => {
  const [subsBackgroundOpacity, handleSubsBackgroundOpacity] = useUnit([
    $subsBackgroundOpacity,
    subsBackgroundOpacityButtonPressed,
  ]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Background opacity</div>
      <div className="es-settings-content__element__right">
        <button
          className="es-settings-button"
          onClick={() => handleSubsBackgroundOpacity(subsBackgroundOpacity - OPACITY_STEP)}
        >
          <MinusIcon />
        </button>
        <div className="es-settings-button__value">{subsBackgroundOpacity}%</div>
        <button
          className="es-settings-button"
          onClick={() => handleSubsBackgroundOpacity(subsBackgroundOpacity + OPACITY_STEP)}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
