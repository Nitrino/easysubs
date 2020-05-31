import {LearningService} from "./LearningService";

class PuzzleEnglish implements LearningService{
  public readonly id: string = "puzzle-english";
  public readonly label: string = "Puzzle English";
  public readonly color: string = "#88BA28";

  public addWord(word: string, translate: string, partOfSpeech: string, _: string): Promise<string> {
    const url = "https://puzzle-english.com/api2/userDictionary/addWord";
    const data = { post_id: 0, word: word, translation: translate, piece_index: 0, part_of_speech: partOfSpeech };

    return new Promise<string>((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "postFormDataRequest", url: url, data: data }, response => {
        response.word_id.error
          ? reject("Puzzle English Error: " + response.word_id.error)
          : resolve(chrome.i18n.getMessage("wordAddedToPuzzleEnglish"));
      });
    });
  }
}

export default PuzzleEnglish;
