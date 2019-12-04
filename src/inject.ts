import { subTitleType } from "subtitle";
import { updateSubs } from "./event";
import { subsStore } from "./store";
import UI from "./ui";
import Utils from "./utils";

const service = Utils.detectService();
if (service) {
  console.log("EasySubs initialized. Service:", service.constructor.name);

  window.addEventListener("easysubsVideoReady", () => {
    console.log("TCL: EVENT", "easysubsVideoReady");

    window.addEventListener("easysubsSubtitlesChanged", (event: any) => {
      UI.renderSettings(service.settingSelector());
      console.log("TCL: EVENT", "easysubsSubtitlesChanged");
      console.log("Language:", event.detail);

      UI.renderSubs(service.playerContainerSelector());
      UI.renderProgressBar(service.playerContainerSelector());
      UI.renderNotifications();
      service.getSubs(event.detail).then(subs => {
        updateSubs(subs);
      });
    });
  });
  service.init();

  (subsStore as any).on(updateSubs, (state: subTitleType[], subs: subTitleType[]) => subs);
}
