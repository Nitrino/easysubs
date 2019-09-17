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
      console.log("EasySubs initialized");
      // ----------------------------------------------------------

      ready('video', function (videoElement: HTMLVideoElement) {
        videoElement.addEventListener("loadstart", () => {
          let subsElement = Onvix.createSubsElement();
          let subsProgressBarElement = Onvix.createSubsProgressBarElement();

          Onvix.getSubs("eng")
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
                  Video.moveToPrevSub(videoElement, subs);
                } if (event.code == "ArrowRight") {
                  event.stopPropagation();
                  Video.moveToNextSub(videoElement, subs);
                }
              }, true);
  
  
              document.addEventListener("mouseover", (event) => {
                let element = <HTMLSpanElement>event.target;
  
                if (element.className === 'easysubs-word') {
                  if (element.getElementsByClassName("easysubs-word-translate").length != 0) { return; }
                  const word = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)[0]
                  chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: word, lang: "ru" }, (response) => {
                    removeElements(document.querySelectorAll(".easysubs-word-translate"));
                    Onvix.createSubsTranslateElement(element, word, response.data[0]);
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
            })
        });
      });

      function removeElements(elms: NodeListOf<Element>) {
        elms.forEach(el => el.remove());
      }
    }
  }, 1000);
});

