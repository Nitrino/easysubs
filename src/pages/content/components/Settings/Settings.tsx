import { FC, useState, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";

import "../../style.scss";
import { useStore } from "effector-react";
import { SettingsContent } from "./SettingsContent";
import { MonoLogo } from "./assets/MonoLogo";

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useStore($streaming);
  return (
    <>
      <div className="es-settings-icon" onClick={() => setShowSettings(!showSettings)}>
        <MonoLogo />
      </div>
      {showSettings &&
        createPortal(
          <SettingsContent onClose={() => setShowSettings(false)} />,
          streaming.getSettingsContentContainer()
        )}
    </>
  );
};
