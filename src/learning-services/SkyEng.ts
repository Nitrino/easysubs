import {LearningService} from "./LearningService";

class SkyEng implements LearningService {
  public readonly id: string = "skyeng";
  public readonly label: string = "SkyEng";
  public readonly color: string = "#5c97e4";

  public async addWord(word: string, translate: string, partOfSpeech: string, context: string): Promise<string> {
    const meaning = await this.findMeaning(word, translate, partOfSpeech, context)
    return await this.addWordByMeaning(word, meaning)
  }

  private addWordByMeaning(word: string, meaning: Meaning): Promise<string> {
    const url = new URL("https://words.skyeng.ru/api/public/v1/words.json");
    const body = {
      "meaningIds": [meaning.id],
    };
    const params: any = {
      email: 'hardcoded_email',
      token: 'hardcoded_token'
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return new Promise<string>((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "putRequest", url: url.toString(), data: body }, response => {
        response.hasOwnProperty('error_msg')
          ? reject(chrome.i18n.getMessage("SkyEngAddError"))
          : resolve(chrome.i18n.getMessage("SkyEngAddSuccess", [word, meaning.translation]));
      });
    });
  }

  private async findMeaning(word: string, translate: string, partOfSpeech: string, context: string): Promise<Meaning> {
    const url = new URL("https://dictionary.skyeng.ru/api/v2/search-word-exact");
    const params: any = { word: word };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const searchResponse: MeaningResponse = await new Promise<MeaningResponse>((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "getRequest", url: url.toString() }, response => {
        response.hasOwnProperty('error_msg')
          ? reject(chrome.i18n.getMessage("SkyEngMeaningError"))
          : resolve(response as MeaningResponse);
      });
    });

    return searchResponse.meanings[0]
  }
}

interface Meaning {
  id: number;
  translation: string;
  translation_note: string;
  pos_code: string;
  sound_url: string;
  images: any[];
  transcription: string;
}

interface MeaningResponse {
  id: number;
  text: string;
  meanings: Meaning[];
}


export default SkyEng;
