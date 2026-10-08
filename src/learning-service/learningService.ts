// A picture or a sound for the card, base64 without the data: prefix
export type TMediaFile = {
  data: string;
  extension: string;
};

// The subtitle line a word was added from, for services that keep it with the word (Anki)
export type TWordContext = {
  // The line as HTML, the word in <b>
  sentence: string;
  translation?: string;
  // What's playing and when, as HTML: a link back to the page where possible
  source?: string;
  picture?: TMediaFile;
  audio?: TMediaFile;
};

export type TAditionalData = {
  context?: TWordContext;
  partOfSpeech?: string;
};
interface ILearningService {
  addWord: (word: string, translation: string, aditionalData: TAditionalData) => Promise<string>;
}

export default ILearningService;
