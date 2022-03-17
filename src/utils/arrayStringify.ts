export const arrayStringify = (data: string[]): string => {
  return data.map((item) => `q=${encodeURIComponent(item)}`).join('&')
}
