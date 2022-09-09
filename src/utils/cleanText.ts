export const cleanText = (text: string): string => {
  const tmpDiv = document.createElement('div')
  tmpDiv.innerHTML = text
    .replace(/<\d+:\d+:\d+.\d+><c>/g, '')
    .replace(/<\/c>/g, '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
  return tmpDiv.textContent || ''
}
