// import scriptPath from './injections/detectService?script&module'
// import kinopubInjectionPath from './injections/kinopub?script&module'

// chrome.webNavigation.onCompleted.addListener((details) => {
//   console.info('The user has loaded my favorite website!')
//   chrome.scripting.executeScript(
//     {
//       target: { tabId: details.tabId, allFrames: true },
//       files: [scriptPath],
//     },
//     (injectionResults) => {
//       console.log('Injection result: ', injectionResults)
//     },
//   )
// })

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('read: ', request)

//   if (request.type === 'test') {
//     console.log('test: ', request)
//   }
//   // if (request.type === 'detectService') {
//   //   console.log('detectService: ', request.service)
//   //   sendResponse({ file: kinopubInjectionPath })

//   //   // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   //   //   if (tabs[0].id === undefined) return

//   //   //   chrome.scripting.executeScript(
//   //   //     {
//   //   //       target: { tabId: tabs[0].id, allFrames: true },
//   //   //       files: [kinopubInjectionPath],
//   //   //     },
//   //   //     (injectionResults) => {
//   //   //       console.log('Injection result kinopub: ', injectionResults)
//   //   //     },
//   //   //   )
//   //   // })
//   // }
// })
