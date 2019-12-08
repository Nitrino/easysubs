class GoogleAnalytics {
  static run() {
    GoogleAnalytics.runFunctionInPageContext(function() {
      (function(i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        (i[r] =
          i[r] ||
          function() {
            (i[r].q = i[r].q || []).push(arguments);
          }), (i[r].l = 1 * new Date());
        a = s.createElement(o);
        a.async = 1;
        a.src = g;
        document.documentElement.appendChild(a);
      })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    });

    // all Google Analytics calls should use our tracker name
    // and be run inside the page's context
    GoogleAnalytics.runFunctionInPageContext(function() {
      ga("create", "UA-154148157-1", "auto", "easySubsTracker");
      ga("easySubsTracker.send", "pageview", document.location.host + document.location.pathname);
    });
  }

  static runFunctionInPageContext(fn) {
    const script = document.createElement("script");
    script.textContent = "(" + fn.toString() + "());";
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
  }
}

export default GoogleAnalytics;
