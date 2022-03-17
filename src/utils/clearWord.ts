export const clearWord = (word: string): string => {
  return word.replace(/[~!@#№$%^&*()_|+\-=?;:",.<>{}[\]\\/]/gi, '')
}
