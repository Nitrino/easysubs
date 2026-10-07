import { FC, useState } from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";
import { sheetClosed } from "@src/models/foundSubs";

import { useUnit } from "effector-react";
import { SettingsContent } from "./SettingsContent";
import { MonoLogo } from "./assets/MonoLogo";
import { Toaster, ToasterProps } from "react-hot-toast";

// Toasts in the HUD material, with the system green/red for the result icons.
const TOAST_OPTIONS: ToasterProps["toastOptions"] = {
  style: {
    padding: "8px 12px",
    border: "0.5px solid var(--es-hud-border)",
    borderRadius: 14,
    background: "var(--es-hud-strong)",
    backdropFilter: "var(--es-hud-blur)",
    WebkitBackdropFilter: "var(--es-hud-blur)",
    boxShadow: "var(--es-glass-edge), 0 10px 30px rgba(0, 0, 0, 0.35)",
    color: "var(--es-primary)",
    fontSize: 13,
    lineHeight: "18px",
  },
  success: { iconTheme: { primary: "#30d158", secondary: "#fff" } },
  error: { iconTheme: { primary: "#ff453a", secondary: "#fff" } },
};

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useUnit($streaming);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (showSettings) sheetClosed();
    setShowSettings(!showSettings);
  };
  const close = () => {
    sheetClosed();
    setShowSettings(false);
  };
  return (
    <>
      <div className="es-settings-icon" onClick={handleClick}>
        <MonoLogo />
      </div>
      {showSettings && createPortal(<SettingsContent onClose={close} />, streaming.getSettingsContentContainer())}
      {createPortal(
        <div className="es-toast">
          <Toaster toastOptions={TOAST_OPTIONS} />
        </div>,
        document.querySelector("body"),
      )}
    </>
  );
};
