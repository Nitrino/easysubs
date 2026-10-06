export type TAditionalData = {
  context?: string;
  partOfSpeech?: string;
};
interface ILearningService {
  addWord: (word: string, translation: string, aditionalData: TAditionalData) => Promise<string>;
}

export default ILearningService;
