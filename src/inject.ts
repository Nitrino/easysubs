import * as Sentry from "@sentry/browser";
import { subTitleType } from "subtitle";
import { updateSubs } from "./event";
import { subsStore } from "./store";
import UI from "./ui";
import Utils from "./utils";
import GoogleAnalytics from "./ga";

(Sentry as any).init({
  dsn: "https://f0696dfa1f80424f9f0f628d8d1d7796@sentry.io/1849876",
  defaultIntegrations: Sentry.defaultIntegrations.filter(({ name }: any) => name !== "TryCatch")
});

window.addEventListener("unhandledrejection", event => {
  Sentry.captureEvent(event.reason);
});

try {
  const service = Utils.detectService();
  if (service) {
    GoogleAnalytics.run();
    console.log("Easysubs initialized. Service:", service.constructor.name);
    GoogleAnalytics.trackEvent("service", service.constructor.name)
    window.addEventListener("easysubsVideoReady", () => {
      console.log("TCL: EVENT", "easysubsVideoReady");

      window.addEventListener("easysubsSubtitlesChanged", (event: any) => {
        console.log("TCL: EVENT", "easysubsSubtitlesChanged");
        console.log("Language:", event.detail);
        UI.renderSettings(service.settingSelector());

        UI.renderSubs(service.playerContainerSelector());
        UI.renderProgressBar(service.playerContainerSelector());
        UI.renderNotifications();
        service.getSubs(event.detail).then(subs => {
          GoogleAnalytics.trackEvent("subs-loaded", event.detail)
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
