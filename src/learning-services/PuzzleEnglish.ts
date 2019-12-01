class PuzzleEnglish {
  public color: string;

  constructor() {
    this.color = "#88BA28";
  }

  public addWord(word: string, translate: string, partOfSpeech: string) {
    const url = "https://puzzle-english.com/api2/userDictionary/addWord";
    const data = { post_id: 0, word: word, translation: translate, piece_index: 0, part_of_speech: partOfSpeech };

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ contentScriptQuery: "postFormDataRequest", url: url, data: data }, response => {
        response.word_id.error
          ? reject("Puzzle English Error: " + response.word_id.error)
          : resolve("Word added to Puzzle English");
      });
    });
  }
}

export default PuzzleEnglish;
