import { ready } from "./ready"
import Utils from './utils';
import UI from "./ui"
import EventsHandlers from "./events_handlers"

chrome.runtime.sendMessage({}, function (response) {
  const service = Utils.detectService()
  if (service == null) { return }

  console.log("EasySubs initialized. Service: " + service.constructor.name);
  // ----------------------------------------------------------

  ready('video', function (videoElement: HTMLVideoElement) {
    const playerContainerElement = service.playerContainerElement()

    videoElement.addEventListener("loadeddata", () => {
      let subsElement = UI.createSubsElement(playerContainerElement);
      let subsProgressBarElement = UI.createSubsProgressBarElement(playerContainerElement);

      service.getSubs("eng")
        .then(subs => {
          subsElement.textContent = ""; // Clear subs loading text

          EventsHandlers.resizeSubsProgressBarElement(subsProgressBarElement, videoElement, subs)
          EventsHandlers.videoOntimeupdate(subs, videoElement, subsElement, subsProgressBarElement)

          subsElement.addEventListener("mouseenter", () => { videoElement.pause() });
          subsElement.addEventListener("mouseleave", () => { videoElement.play() });

          document.addEventListener("keyup", event => EventsHandlers.keyup(event, videoElement, subs, subsProgressBarElement), true);

          document.addEventListener("mouseover", EventsHandlers.mouseover);
          document.addEventListener("mouseout", EventsHandlers.mouseout);
        })
    });
  });
});
