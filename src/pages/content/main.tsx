import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import { $streaming, fetchCurrentStreamingFx } from "@src/models/streamings";
import { esRenderSetings } from "@src/models/settings";
import { esSubsChanged } from "@src/models/subs";
import { $video, getCurrentVideoFx, videoTimeUpdate } from "@src/models/videos";
import { Settings } from "@src/pages/content/components/Settings";
import { Subs } from "./components/Subs";
import { ProgressBar } from "./components/ProgressBar";
import { removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { addSecondarySubsKeyListeners } from "@src/utils/secondarySubsKeys";

refreshOnUpdate("pages/content");

fetchCurrentStreamingFx();

const handleTimeUpdate = () => {
  videoTimeUpdate();
};

let detectionRetries = 0;

$streaming.watch((streaming) => {
  console.log("streaming changed", streaming);

  if (streaming.name === "stub") {
    if (detectionRetries < 5) {
      detectionRetries++;
      setTimeout(() => fetchCurrentStreamingFx(), 1500);
    }
    return;
  }

  detectionRetries = 0;
  document.body.classList.add("es-" + streaming.name);
  addSecondarySubsKeyListeners();

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
  document.querySelectorAll("#es, #es-top").forEach((e) => e.remove());
  const subsContainer = $streaming.getState().getSubsContainer();
  const subsNode = document.createElement("div");
  subsNode.id = "es";
  subsContainer?.appendChild(subsNode);
  // The second subtitle line's own block, for its Top position
  const topNode = document.createElement("div");
  topNode.id = "es-top";
  subsContainer?.appendChild(topNode);
  createRoot(subsNode).render(<Subs topContainer={topNode} />);

  if (!$streaming.getState().isOnFlight()) {
    document.querySelectorAll(".es-progress-bar").forEach((e) => e.remove());
    const progressBarNode = document.createElement("div");
    progressBarNode.classList.add("es-progress-bar");
    subsContainer?.appendChild(progressBarNode);
    createRoot(progressBarNode).render(<ProgressBar />);
  }
});
