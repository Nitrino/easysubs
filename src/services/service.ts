import { subTitleType } from "subtitle";
interface Service {
  getSubs(language: string): Promise<subTitleType[]>
  playerContainerElement(): HTMLElement;
}

export default Service;
