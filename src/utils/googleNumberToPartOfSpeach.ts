export const googleNumberToPartOfSpeach = (val: number) => {
  switch (val) {
    case 1:
      return "noun";
    case 2:
      return "verb";
    case 3:
      return "adjective";
    case 4:
      return "adverb";
    case 5:
      return "preposition";
    case 6:
      return "abbreviation";
    case 7:
      return "conjunction";
    case 8:
      return "pronoun";
    case 9:
      return "interjection";
    case 10:
      return "phrase";
    case 11:
      return "prefix";
    case 12:
      return "suffix";
    case 13:
      return "article";
    case 14:
      return "combining form";
    case 15:
      return "numeral";
    case 16:
      return "auxiliary verb";
    case 17:
      return "exclamation";
    case 18:
      return "plural";
    case 19:
      return "particle";
    default:
      return `unknown number ${val}`;
  }
};
