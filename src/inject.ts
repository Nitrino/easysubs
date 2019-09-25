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
          console.log("Subtitles loaded. subs count: " + subs.length)

          subsElement.textContent = ""; // Clear subs loading text

          EventsHandlers.resizeSubsProgressBarElement(subsProgressBarElement, videoElement, subs)
          EventsHandlers.videoOnTimeUpdate(subs, videoElement, subsElement, subsProgressBarElement)

          EventsHandlers.subsElementMouseEnter(subsElement, videoElement)
          EventsHandlers.subsElementMouseLeave(subsElement, videoElement)

          EventsHandlers.keyUp(videoElement, subs, subsProgressBarElement)

          EventsHandlers.subsWordMouseOver()
          EventsHandlers.subsWordMouseOut()
        })
    });
  });
});
