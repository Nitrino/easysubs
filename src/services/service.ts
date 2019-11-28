import { subTitleType } from "subtitle";
interface Service {
  getSubs(language: string): Promise<subTitleType[]>;
  playerContainerSelector(): string;
  settingSelector(): string;
}

export default Service;
