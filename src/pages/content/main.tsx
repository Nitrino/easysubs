import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import { $streaming, fetchCurrentStreamingFx } from "@src/models/streamings";
import { esRenderSetings } from "@src/models/settings";
import { esSubsChanged } from "@src/models/subs";
import { $video, getCurrentVideoFx, videoTimeUpdate } from "@src/models/videos";
import { Settings } from "@src/pages/content/components/Settings";
import { Subs } from "./components/Subs";
import { ProgressBar } from "./components/ProgressBar";
import { Transcript } from "./components/Transcript/Transcript";
import { addKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { addSecondarySubsKeyListeners } from "@src/utils/secondarySubsKeys";
import { addSubsDelayKeyListeners } from "@src/utils/subsDelayKeys";
import { addSubtitleDropListeners } from "@src/utils/subtitleDrop";
import { addTranscriptKeyListeners } from "@src/utils/transcriptKeys";

refreshOnUpdate("pages/content");

fetchCurrentStreamingFx();

const handleTimeUpdate = () => {
  videoTimeUpdate();
};

let detectionRetries = 0;

// The React roots EasySubs renders into the page. A removed node's root has to be unmounted too: a detached tree keeps
// its store subscriptions, listeners and the progress bar's animation loop running.
const roots = new Map<Element, Root>();

const unmountRoot = (node: Element) => {
  const root = roots.get(node);
  if (!root) return;
  roots.delete(node);
  // Deferred: these events can fire while React is rendering, and a root can't unmount synchronously then
  queueMicrotask(() => root.unmount());
};

const removeNodes = (selector: string) =>
  document.querySelectorAll(selector).forEach((node) => {
    unmountRoot(node);
    node.remove();
  });

const renderRoot = (node: Element, element: ReactNode) => {
  // Players that rebuild their controls remove our nodes themselves
  roots.forEach((_, mounted) => !mounted.isConnected && unmountRoot(mounted));
  const root = createRoot(node);
  roots.set(node, root);
  root.render(element);
};

let listenedVideo: HTMLVideoElement | null = null;
$video.watch((video) => {
  listenedVideo?.removeEventListener("timeupdate", handleTimeUpdate);
  video?.addEventListener("timeupdate", handleTimeUpdate);
  listenedVideo = video;
});

let unwatchRenderSettings: (() => void) | undefined;

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
  addKeyboardEventsListeners();
  addSecondarySubsKeyListeners();
  addSubsDelayKeyListeners();
  addSubtitleDropListeners();
  addTranscriptKeyListeners();

  unwatchRenderSettings?.();
  unwatchRenderSettings = esRenderSetings.watch(() => {
    console.log("Event:", "esRenderSetings");
    removeNodes(".es-settings");
    const buttonContainer = streaming.getSettingsButtonContainer();
    const contentContainer = streaming.getSettingsContentContainer();

    const parentNode = buttonContainer?.parentNode;
    const settingNode = document.createElement("div");
    settingNode.className = "es-settings";
    parentNode?.insertBefore(settingNode, buttonContainer);

    getCurrentVideoFx();
    renderRoot(settingNode, <Settings contentContainer={contentContainer} />);
  });

  streaming.init();
});

esSubsChanged.watch((language) => {
  console.log("Event:", "esSubsChanged");
  console.log("Language:", language);
  removeNodes("#es, #es-top, #es-transcript");
  const subsContainer = $streaming.getState().getSubsContainer();
  const subsNode = document.createElement("div");
  subsNode.id = "es";
  subsContainer?.appendChild(subsNode);
  // The second subtitle line's own block, for its Top position
  const topNode = document.createElement("div");
  topNode.id = "es-top";
  subsContainer?.appendChild(topNode);
  renderRoot(subsNode, <Subs topContainer={topNode} />);
  // Every line, to jump to and search, see src/models/transcript
  const transcriptNode = document.createElement("div");
  transcriptNode.id = "es-transcript";
  subsContainer?.appendChild(transcriptNode);
  renderRoot(transcriptNode, <Transcript />);

  if (!$streaming.getState().isOnFlight()) {
    removeNodes(".es-progress-bar");
    const progressBarNode = document.createElement("div");
    progressBarNode.classList.add("es-progress-bar");
    subsContainer?.appendChild(progressBarNode);
    renderRoot(progressBarNode, <ProgressBar />);
  }
});
