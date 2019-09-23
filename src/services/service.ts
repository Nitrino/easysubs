import { subTitleType } from "subtitle";
interface Service {
  getSubs(language: string): Promise<subTitleType[]>
  createSubsElement(): HTMLElement
  createSubsTranslateElement(subs: HTMLElement, originalText: string, translatedText: string): HTMLDivElement
  createSubsProgressBarElement(): HTMLDivElement
}

export default Service;
