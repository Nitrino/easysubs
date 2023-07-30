import { $subsFontSize, subsFontSizeButtonPressed } from "@src/models/settings";
import { FC } from "react";
import { useUnit } from "effector-react";
import { MinusIcon } from "./assets/MinusIcon";
import { PlusIcon } from "./assets/PlusIcon";

const FONT_SIZE_STEP = 5;

export const SubsFontSize: FC = () => {
  const [subsFontSize, handleSubsSizeButtonPressed] = useUnit([$subsFontSize, subsFontSizeButtonPressed]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Subtitles size</div>
      <div className="es-settings-content__element__right">
        <button
          className="es-settings-button"
          onClick={() => handleSubsSizeButtonPressed(subsFontSize - FONT_SIZE_STEP)}
        >
          <MinusIcon />
        </button>
        <div className="es-settings-button__value">{subsFontSize}%</div>
        <button
          className="es-settings-button"
          onClick={() => handleSubsSizeButtonPressed(subsFontSize + FONT_SIZE_STEP)}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
