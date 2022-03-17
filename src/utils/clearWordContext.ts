/**
 * Clears the context of the selected word from extra characters
 */
export const clearWordContext = (sub: string, word: string): string => {
  const words = sub
    .replace(/[\r\n]+/g, ' ') // remove new line
    .replace('  ', ' ') // Remove double spaces
    .replace(/(<([^>]+)>)/gi, '') // Remove tags
    .match(/([^ \r\n][^!?.\r\n]+[\w!?.]+)/g) || [''] // Split to sentences

  return words.find((element) => element.indexOf(word) >= 0) || ''
}
