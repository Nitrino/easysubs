import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $autoStopEnabled, autoStopEnabledChanged } from "@src/models/settings";

export const EnableAutoStop: FC = () => {
  const [autoStopEnabled, handleAutoStopEnabledEnabled] = useUnit([$autoStopEnabled, autoStopEnabledChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Enable auto stop</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={autoStopEnabled} onChange={handleAutoStopEnabledEnabled} />
      </div>
    </div>
  );
};
