import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $enabled, enableToggleChanged } from "@src/models/settings";

export const EnableToggle: FC = () => {
  const [enabled, handleEnableToggleChanged] = useUnit([$enabled, enableToggleChanged]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Enabled</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={enabled} onChange={handleEnableToggleChanged} />
      </div>
    </div>
  );
};
