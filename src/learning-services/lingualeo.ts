class Lingualeo {
  public color: string;

  constructor() {
    this.color = "#FFAA52";
  }
  public addWord(word: string, translate: string, _: string) {
    const url = new URL("https://api.lingualeo.com/addword");
    const params: any = { word: word, tword: translate };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "getRequest", url: url.toString() }, response => {
        response.error_msg === "" ? resolve("Word added to LinguaLeo") : reject("LinguaLeo authorization required");
      });
    });
  }
}

export default Lingualeo;
