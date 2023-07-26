import { $subsSize, subsSizeButtonPressed } from "@src/models/settings";
import { FC } from "react";
import { useUnit } from "effector-react";
import { MinusIcon } from "./assets/MinusIcon";
import { PlusIcon } from "./assets/PlusIcon";

const FONT_SIZE_STEP = 5;

export const SubsSize: FC = () => {
  const [subsSize, handleSubsSizeButtonPressed] = useUnit([$subsSize, subsSizeButtonPressed]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Subtitles size</div>
      <div className="es-settings-content__element__right">
        <button className="es-settings-button" onClick={() => handleSubsSizeButtonPressed(subsSize - FONT_SIZE_STEP)}>
          <MinusIcon />
        </button>
        <div className="es-settings-button__value">{subsSize}%</div>
        <button className="es-settings-button" onClick={() => handleSubsSizeButtonPressed(subsSize + FONT_SIZE_STEP)}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
