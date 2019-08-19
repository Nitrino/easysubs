import { log } from 'util';

class Subtitles {
  static getSubs(language) {
    const base_path = "https://ageofultron.site/api/v1/streaming/serials/"
    const serial = window.location.pathname.split("/")[2]
    const stream = window.location.search.split("&")[0].split("=")[1]
    const season = window.location.search.split("&")[1]
    const episode = window.location.search.split("&")[2]
    // https://ageofultron.site/api/v1/streaming/serials/046cae0eeec8e111/a070a81585fa7856.json?season=7&episode=1
    const url = base_path + serial + "/" + stream + ".json?" + season + "&" + episode

    return fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        const subs_url = data.media_files.vtt.find(el => el.srclang === language).src
        return fetch(subs_url).then((resp) => resp.text())
      })
  }
}

export default Subtitles;