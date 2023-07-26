import { FC } from "react";
import { Toggle } from "../ui/Toggle";
import { useUnit } from "effector-react";
import { $subsBackground, subsBackgroundButtonPressed } from "@src/models/settings";

export const SubsBackground: FC = () => {
  const [subsBackground, handleSubsBackgroundButtonPressed] = useUnit([$subsBackground, subsBackgroundButtonPressed]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Show background</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={subsBackground} onChange={handleSubsBackgroundButtonPressed} />
      </div>
    </div>
  );
};
