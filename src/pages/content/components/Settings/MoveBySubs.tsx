import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $moveBySubsEnabled, moveBySubsEnabledChanged } from "@src/models/settings";

export const MoveBySubs: FC = () => {
  const [moveBySubsEnabled, handleMoveBySubsEnabled] = useUnit([$moveBySubsEnabled, moveBySubsEnabledChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Move by subs</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={moveBySubsEnabled} onChange={handleMoveBySubsEnabled} />
      </div>
    </div>
  );
};
