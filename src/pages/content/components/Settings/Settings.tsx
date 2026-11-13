import { FC, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";
import { sheetClosed } from "@src/models/foundSubs";
import { downloadsClosed } from "@src/models/downloads";
import { levelSetupClosed, savedWordsClosed } from "@src/models/words";

import { useUnit } from "effector-react";
import { SettingsContent } from "./SettingsContent";
import { MonoLogo } from "./assets/MonoLogo";
import { Toaster, ToasterProps } from "react-hot-toast";
import { usePortalTarget } from "@src/hooks/usePortalTarget";

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

// Events of the panel that the player around it must not get. Players handle them for themselves: Coursera's takes
// the focus back on a mousedown, so the panel's drop-downs never opened, and keys typed in the panel are the players'
// shortcuts. React listens on the portal's own node, so the panel still gets them.
const PANEL_EVENTS = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "pointerdown",
  "pointerup",
  "touchstart",
  "touchend",
  "wheel",
  "keydown",
  "keyup",
  "keypress",
  "focusin",
  "focusout",
] as const;

// The panel's own node in the service's container while it's open
const usePanelNode = (container: HTMLElement | null) => {
  const [node] = useState(() => {
    const panelNode = document.createElement("div");
    panelNode.className = "es-settings-portal";
    PANEL_EVENTS.forEach((type) => panelNode.addEventListener(type, (event) => event.stopPropagation()));
    return panelNode;
  });
  useLayoutEffect(() => {
    if (!container) return;
    container.appendChild(node);
    return () => node.remove();
  }, [container, node]);
  return node;
};

type TSettingsProps = {
  contentContainer: HTMLElement;
};

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useUnit($streaming);
  const portalTarget = usePortalTarget();
  const panelNode = usePanelNode(showSettings ? streaming.getSettingsContentContainer() : null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (showSettings) {
      sheetClosed();
      downloadsClosed();
      savedWordsClosed();
      levelSetupClosed();
    }
    setShowSettings(!showSettings);
  };
  const close = () => {
    sheetClosed();
    downloadsClosed();
    savedWordsClosed();
    levelSetupClosed();
    setShowSettings(false);
  };
  return (
    <>
      <div className="es-settings-icon" onClick={handleClick}>
        <MonoLogo />
      </div>
      {showSettings && createPortal(<SettingsContent onClose={close} />, panelNode)}
      {createPortal(
        <div className="es-toast">
          <Toaster toastOptions={TOAST_OPTIONS} />
        </div>,
        portalTarget,
      )}
    </>
  );
};
