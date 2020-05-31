export interface LearningService {
  readonly id: string;
  readonly label: string;
  readonly color: string;

  addWord(word: string, translate: string, partOfSpeech: string, context: string): Promise<string>;
}
