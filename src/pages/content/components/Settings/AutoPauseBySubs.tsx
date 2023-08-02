import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $autoPause, autoPauseChanged } from "@src/models/settings";

export const AutoPauseBySubs: FC = () => {
  const [autoPause, handleAutoPauseChanged] = useUnit([$autoPause, autoPauseChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Auto pause</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={autoPause} onChange={handleAutoPauseChanged} />
      </div>
    </div>
  );
};
