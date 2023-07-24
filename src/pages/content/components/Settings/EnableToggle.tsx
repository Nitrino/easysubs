import { FC } from "react";
import { Toggle, ToggleProps } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $enabled, enableToggleChanged } from "@src/models/settings";

export const EnableToggle: FC = () => {
  const [enabled, handleEnableToggleChanged] = useUnit([$enabled, enableToggleChanged]);

  return (
    <div className="es-settings-content__element">
      <label className="es-label">
        <span>Enabled</span>
        <Toggle isEnabled={enabled} onChange={handleEnableToggleChanged} />
      </label>
    </div>
  );
};
