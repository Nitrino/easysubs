import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $progressBarEnabled, progressBarEnabledChanged } from "@src/models/settings";

export const EnableProgressBar: FC = () => {
  const [progressBarEnabled, handleProgressBarEnabled] = useUnit([$progressBarEnabled, progressBarEnabledChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Progress bar</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={progressBarEnabled} onChange={handleProgressBarEnabled} />
      </div>
    </div>
  );
};
