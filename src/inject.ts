import { ready } from "./ready"
import Onvix from './services/onvix';
import KinoPub from './services/kinopub';
import YouTube from './services/youtube';
import Netflix from './services/netflix';
import Service from './services/service';
import Subs from './subs';
import Video from './video';

chrome.runtime.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      const service = detectService()
      if (service == null) {
        return;
      }
      console.log("EasySubs initialized. Service: " + service.constructor.name);
      // ----------------------------------------------------------

      ready('video', function (videoElement: HTMLVideoElement) {
        videoElement.addEventListener("loadstart", () => {
          let subsElement = service.createSubsElement();
          let subsProgressBarElement = service.createSubsProgressBarElement();

          service.getSubs("eng")
            .then(function (subs) {
              subsElement.textContent = ""; // Clear subs loading text
              videoElement.ontimeupdate = () => {
                Subs.updateSubs(videoElement, subs, subsElement);
                Subs.updateSubsProgressBar(subsProgressBarElement, videoElement, subs);
              };

              subsElement.addEventListener("mouseenter", () => {
                videoElement.pause();
              });
              subsElement.addEventListener("mouseleave", () => {
                videoElement.play();
              });

              document.addEventListener("keyup", (event) => {
                if (event.code == "ArrowLeft") {
                  event.stopPropagation();
                  Video.moveToPrevSub(videoElement, subs, subsProgressBarElement);
                } if (event.code == "ArrowRight") {
                  event.stopPropagation();
                  Video.moveToNextSub(videoElement, subs, subsProgressBarElement);
                }
              }, true);


              document.addEventListener("mouseover", (event) => {
                let element = <HTMLSpanElement>event.target;

                if (element.className === 'easysubs-word') {
                  if (element.getElementsByClassName("easysubs-word-translate").length != 0) { return; }
                  const word = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)[0]
                  chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: word, lang: "ru" }, (response) => {
                    removeElements(document.querySelectorAll(".easysubs-word-translate"));
                    service.createSubsTranslateElement(element, word, response.data[0]);
                  });
                }
              });

              document.addEventListener("mouseout", (event) => {
                let element = <HTMLSpanElement>event.target;
                if (element.className === 'easysubs-word') {
                  if (element.getElementsByClassName("easysubs-word-translate").length === 0) { return; }
                  removeElements(document.querySelectorAll(".easysubs-word-translate"));
                }
              });

              const resizeObserver = new ResizeObserver(() => {
                Subs.updateSubsProgressBar(subsProgressBarElement, videoElement, subs, true);
              });
              resizeObserver.observe(subsProgressBarElement);
            })
        });
      });

      function removeElements(elms: NodeListOf<Element>) {
        elms.forEach(el => el.remove());
      }

      function detectService(): YouTube | Netflix | Onvix | KinoPub {
        const titleContent = document.querySelector('title').textContent
        if (titleContent.includes("YouTube") || window.location.host == "www.youtube.com") { return new YouTube }
        else if (titleContent.includes("Netflix") || window.location.host == "www.netflix.com") { return new Netflix }
        else if (titleContent.includes("Onvix") || document.querySelector('meta[content="ONVIX"]')) { return new Onvix }
        else if (titleContent.includes("Кинопаб") || document.querySelector('meta[content="Кинопаб"]')) { return new KinoPub }
        else { return null }
      }
    }
  }, 1000);
});

