import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import { $streaming, fetchCurrentStreamingFx } from "@src/models/streamings";
import { esRenderSetings } from "@src/models/settings";
import { esSubsChanged, subsReloadRequested } from "@src/models/subs";
import { $video, getCurrentVideoFx, videoTimeUpdate } from "@src/models/videos";
import { Settings } from "@src/pages/content/components/Settings";
import { Subs } from "./components/Subs";
import { ProgressBar } from "./components/ProgressBar";
import { removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";

refreshOnUpdate("pages/content");

fetchCurrentStreamingFx();

const handleTimeUpdate = () => {
  videoTimeUpdate();
};

$streaming.watch((streaming) => {
  console.log("streaming changed", streaming);
  let name = streaming.constructor.name.toLowerCase();
  if (name == "netflixonflight") {
    name = "netflix";
  }
  document.body.classList.add("es-" + name);

  if (streaming == null) {
    return;
  }

  esRenderSetings.watch(() => {
    console.log("Event:", "esRenderSetings");
    document.querySelectorAll(".es-settings").forEach((e) => e.remove());
    const buttonContainer = streaming.getSettingsButtonContainer();
    const contentContainer = streaming.getSettingsContentContainer();

    const parentNode = buttonContainer?.parentNode;
    const settingNode = document.createElement("div");
    settingNode.className = "es-settings";
    parentNode?.insertBefore(settingNode, buttonContainer);

    getCurrentVideoFx();
    $video.watch((video) => {
      video?.removeEventListener("timeupdate", handleTimeUpdate as EventListener);
      video?.addEventListener("timeupdate", handleTimeUpdate as EventListener);
    });
    createRoot(settingNode).render(<Settings contentContainer={contentContainer} />);
  });

  streaming.init();
});

esSubsChanged.watch((language) => {
  console.log("Event:", "esSubsChanged");
  console.log("Language:", language);
  removeKeyboardEventsListeners();
  document.querySelectorAll("#es").forEach((e) => e.remove());
  const subsContainer = $streaming.getState().getSubsContainer();
  const subsNode = document.createElement("div");
  subsNode.id = "es";
  subsContainer?.appendChild(subsNode);
  createRoot(subsNode).render(<Subs />);

  if (!$streaming.getState().isOnFlight()) {
    document.querySelectorAll(".es-progress-bar").forEach((e) => e.remove());
    const progressBarNode = document.createElement("div");
    progressBarNode.classList.add("es-progress-bar");
    subsContainer?.appendChild(progressBarNode);
    createRoot(progressBarNode).render(<ProgressBar />);
  }
});
