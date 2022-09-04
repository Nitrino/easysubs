function getCurrentService() {
  const titleContent = document.querySelector('title')?.textContent
  if (titleContent?.includes('YouTube') ?? window.location.host === 'www.youtube.com') {
    document.querySelector('html')?.setAttribute('id', 'youtube')
    return 'youtube'
  }
  if (titleContent?.includes('Netflix') ?? window.location.host === 'www.netflix.com') {
    document.querySelector('html')?.setAttribute('id', 'netflix')
    return 'netflix'
  }
  if (
    titleContent?.includes('\u041A\u0438\u043D\u043E\u043F\u0430\u0431') ??
    document.querySelector('meta[content="\u041A\u0438\u043D\u043E\u043F\u0430\u0431"]') != null
  ) {
    document.querySelector('html')?.setAttribute('id', 'kinopub')
    return 'kinopub'
  }
  if (titleContent?.includes('English-With-Fun') ?? window.location.host === 'english-with-fun.com') {
    document.querySelector('html')?.setAttribute('id', 'english-with-fun')
    return 'englishwithfun'
  }
  if (titleContent?.includes('Coursera') ?? window.location.host === 'www.coursera.org') {
    document.querySelector('html')?.setAttribute('id', 'coursera')
    return 'coursera'
  }
  return undefined
}
chrome.runtime.sendMessage({ type: 'detectService', service: getCurrentService() }, function (response) {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL(response.file)
  script.type = 'module'
  document.head.prepend(script)
})
