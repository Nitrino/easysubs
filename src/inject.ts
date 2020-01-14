import * as Sentry from "@sentry/browser";
import { subTitleType } from "subtitle";
import { updateSubs } from "./event";
import { subsStore } from "./store";
import UI from "./ui";
import Utils from "./utils";
import GoogleAnalytics from "./google-analytics";

(Sentry as any).init({ dsn: "https://f0696dfa1f80424f9f0f628d8d1d7796@sentry.io/1849876" });

window.addEventListener("unhandledrejection", event => {
  Sentry.captureEvent(event.reason);
});

try {
  const service = Utils.detectService();
  if (service) {
    GoogleAnalytics.run();
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
} catch (e) {
  console.error("Easysubs unknown error:", e);
  Sentry.captureEvent(e);
}
