export type TAditionalData = {
  context?: string;
  partOfSpeech?: string;
};
export interface ILearningService {
  color: string;
  addWord: (word: string, translation: string, aditionalData: TAditionalData) => Promise<string>;
}
