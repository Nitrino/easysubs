import { ready } from "./ready"
import Onvix from './onvix';
import Subs from './subs';
import Video from './video';

chrome.runtime.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js1");
      // ----------------------------------------------------------

      const subsElement = Onvix.createSubsElement();
      const video: HTMLVideoElement = document.querySelector('video');

      Onvix.getSubs("eng")
        .then(function (subs) {
          subsElement.textContent = ""; // Clear subs loading text
          ready('video', function (videoElement: HTMLVideoElement) {
            videoElement.ontimeupdate = (event) => {
              Subs.updateSubs(videoElement, subs, subsElement);
            };

            subsElement.addEventListener("mouseenter", () => {
              videoElement.pause();
            });
            subsElement.addEventListener("mouseleave", () => {
              videoElement.play();
            });

            document.addEventListener("keyup", (event) => {
              event.stopPropagation();
              console.log(event);

              if (event.code == "ArrowLeft") {
                Video.moveToPrevSub(videoElement, subs);
              } if (event.code == "ArrowRight") {
                Video.moveToNextSub(videoElement, subs);
              }
            }, true);
          });
        })
    }
  }, 1000);
});

