/**
 * Regular expression to clear a word from extra characters
 */
export const clearWord = (word: string): string => {
  return word.replace(/[~!@#№$%^&*()_|+\-=?;:",.<>{}[\]\\/]/gi, '')
}
