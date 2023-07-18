import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import App from "./app";
import { $streaming, fetchCurrentStreamingFx } from "@src/models/streamings";
import { esRenderSetings } from "@src/models/settings";
import { esSubsChanged } from "@src/models/subs";
import { $video, getCurrentVideoFx, videoTimeUpdate } from "@src/models/videos";
import { Settings } from "@src/pages/content/components/Settings";

refreshOnUpdate("pages/content");

fetchCurrentStreamingFx();

const handleTimeUpdate = () => {
  videoTimeUpdate();
};

$streaming.watch((streaming) => {
  console.log("streaming changed", streaming);

  document.body.classList.toggle(
    "es-" + streaming.constructor.name.toLowerCase()
  );

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
      video?.removeEventListener(
        "timeupdate",
        handleTimeUpdate as EventListener
      );
      video?.addEventListener("timeupdate", handleTimeUpdate as EventListener);
    });
    createRoot(settingNode).render(
      <Settings contentContainer={contentContainer} />
    );
  });

  // esSubsChanged.watch((language) => {
  //   fetchServiceSubsFx(language);
  //   console.log("Event:", "esSubsChanged");
  //   console.log("Language:", language);

  //   document.querySelectorAll("#es").forEach((e) => e.remove());
  //   const subsContainer = streaming.getSubsContainer();
  //   const subsNode = document.createElement("div");
  //   subsNode.id = "es";
  //   subsContainer?.appendChild(subsNode);

  //   render(() => <Subs />, subsNode);
  // });

  const root = document.createElement("div");
  root.id = "easysubs";
  document.body.append(root);
  createRoot(root).render(<App />);

  streaming.init();
});
