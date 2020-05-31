import {LearningService} from "./LearningService";

class NoService implements LearningService {
  public readonly id: string = "";
  public readonly label: string = "Disable";
  public readonly color: string = "#000";

  public async addWord(word: string, translate: string, partOfSpeech: string, context: string): Promise<string> {
    throw new Error("Saving service disabled")
  }

}

export default NoService;
