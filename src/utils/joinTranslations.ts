export const joinTranslations = (translations: string[]) =>
  translations.map((tr) => tr.replaceAll(" ", "\xa0").toLowerCase()).join(", ");
