interface ILearningService {
  color: string;
  addWord: (word: string, translation: string, aditionalData: Record<string, string>) => Promise<string>;
}

export default ILearningService;
