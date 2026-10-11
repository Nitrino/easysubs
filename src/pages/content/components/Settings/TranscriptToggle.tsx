import { FC } from "react";
import { useUnit } from "effector-react";
import { Toggle } from "../ui/Toggle";
import { $transcriptOpen, transcriptToggled } from "@src/models/transcript";

// The transcript sidebar, see src/models/transcript; Shift+T does the same
export const TranscriptToggle: FC = () => {
  const [open, toggle] = useUnit([$transcriptOpen, transcriptToggled]);

  return (
    <div className="es-settings-content__element">
      <div className="es-settings-content__element__left">Transcript (Shift+T)</div>
      <div className="es-settings-content__element__right">
        <Toggle isEnabled={open} onChange={() => toggle()} />
      </div>
    </div>
  );
};
