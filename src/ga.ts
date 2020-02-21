class GoogleAnalytics {
  public static run() {
    // tslint:disable-next-line: ter-prefer-arrow-callback
    GoogleAnalytics.runFunctionInPageContext(() => {
      ((i: any, s: any, o: any, g: any, r: any) => {
        // tslint:disable-next-line: no-string-literal
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
          i[r] ||
          // tslint:disable-next-line: only-arrow-functions
          function () {
            (i[r].q = i[r].q || []).push(arguments);
          }), (i[r].l = 1 * (new Date() as any));
        const a = s.createElement(o);
        a.async = 1;
        a.src = g;
        document.documentElement.appendChild(a);
      })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    });

    // all Google Analytics calls should use our tracker name
    // and be run inside the page's context
    GoogleAnalytics.runFunctionInPageContext(() => {
      ga("create", "UA-154148157-1", "auto", "easySubsTracker");
      ga("easySubsTracker.send", "pageview");
      ga('easySubsTracker.send', 'event', "browser-language", window.navigator.language.split("-")[0]);
    });
  }

  public static trackEvent(name: string, value: string) {
    return GoogleAnalytics.runFunctionInPageContext((eventName: string, eventValue: string) => {
      ga('easySubsTracker.send', 'event', eventName, eventValue);
    }, name, value)
  }

  public static runFunctionInPageContext(fn: any, name = "name", value = "value") {
    const script = document.createElement("script");
    script.textContent = "(" + fn.toString() + `("${name}", "${value}"));`;
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
  }
}

export default GoogleAnalytics;
