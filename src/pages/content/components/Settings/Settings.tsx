import { FC, useState, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";

import "../../style.scss";
import { useStore } from "effector-react";
import { SettingsContent } from "./SettingsContent";
import { MonoLogo } from "./assets/MonoLogo";
import { Toaster } from "react-hot-toast";

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useStore($streaming);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };
  return (
    <>
      <div className="es-settings-icon" onClick={handleClick}>
        <MonoLogo />
      </div>
      {showSettings &&
        createPortal(
          <SettingsContent onClose={() => setShowSettings(false)} />,
          streaming.getSettingsContentContainer()
        )}
      {createPortal(
        <div className="es-toast">
          <Toaster />
        </div>,
        document.querySelector("body")
      )}
    </>
  );
};
