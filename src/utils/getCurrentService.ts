import KinoPub from "@src/streamings/kinopub";
import Youtube from "@src/streamings/youtube";
import Coursera from "@src/streamings/coursera";
import Netflix from "@src/streamings/netflix";
import NetflixOnFlight from "@src/streamings/netflixOnFlight";
import Service from "@src/streamings/service";
import ServiceStub from "@src/streamings/serviceStub";
import Plex from "@src/streamings/plex";
import Udemy from "@src/streamings/udemy";
import Kinopoisk from "@src/streamings/kinopoisk";
import Amazon from "@src/streamings/amazon";
import Inoriginal from "@src/streamings/inoriginal";

export const getCurrentService = (): Service => {
  const titleContent = document.querySelector("title")?.textContent;
  if (titleContent?.includes("YouTube") || window.location.host === "www.youtube.com") {
    document.querySelector("html")?.setAttribute("id", "youtube");
    if (!!document.querySelector(".ytp-delhi-modern")) {
      // Add class for new youtube delphi design
      document.body.classList.add("es-youtube-delphi");
    }
    return new Youtube();
  }
  if (titleContent?.includes("Netflix") || window.location.host === "www.netflix.com") {
    document.querySelector("html")?.setAttribute("id", "netflix");
    if (document.body.classList.contains("es-netflix-on-flight")) {
      return new NetflixOnFlight();
    } else {
      return new Netflix();
    }
  }
  // if (window.location.host === "app.plex.tv" || document.querySelector("body div")?.id === "plex") {
  //   return new Plex();
  // }

  // if (window.location.host === "www.udemy.com" || titleContent?.includes("Udemy")) {
  //   return new Udemy();
  // }
  // if (window.location.host === "hd.kinopoisk.ru") {
  //   return new Kinopoisk();
  // }
  if (
    titleContent?.includes("Кинопаб") ||
    document.querySelector('meta[content="Кинопаб"]') != null ||
    window.location.host === "moviesjoy.is"
  ) {
    document.querySelector("html")?.setAttribute("id", "kinopub");
    return new KinoPub();
  }
  if (titleContent?.includes("Coursera") || window.location.host === "www.coursera.org") {
    document.querySelector("html")?.setAttribute("id", "coursera");
    return new Coursera();
  }

  if (window.location.host === "inoriginal.online") {
    return new Inoriginal();
  }
  // if (
  //   titleContent?.includes("Prime Video") ||
  //   window.location.host.includes("amazon") ||
  //   window.location.host.includes("primevideo")
  // ) {
  //   return new Amazon();
  // }

  return new ServiceStub();
};
