import {LearningService} from "./LearningService";

class Lingualeo implements LearningService{
  public readonly id: string = "lingualeo";
  public readonly label: string = "LinguaLeo";
  public readonly color: string = "#FFC900";

  public addWord(word: string, translate: string, _: string, context: string): Promise<string> {
    const url = new URL("https://api.lingualeo.com/addword");
    const data = {
      word: word,
      tword: translate,
      port: 1001,
      context: context,
      context_url: window.location.href,
      context_title: document.title
    };
    const params: any = { port: 1001 };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return new Promise<string>((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "postFormDataRequest", url: url.toString(), data: data }, response => {
        response.hasOwnProperty('error_msg')
          ? reject(chrome.i18n.getMessage("lingualeoError"))
          : resolve(chrome.i18n.getMessage("wordAddedToLinguaLeo"));
      });
    });
  }
}

export default Lingualeo;
