console.log('injection')
console.log('injection22', window.playerInstance)

if (window.playerInstance) {
  window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))

  window.playerInstance.on('captionsChanged', () => {
    console.log('captionsChanged')

    const track = window.playerInstance.getConfig().captionsTrack
    const label = track ? track.label : null
    window.dispatchEvent(new CustomEvent('kinopubCaptionsChanged', { detail: label }))
  })

  window.playerInstance.on('firstFrame', () => {
    console.log('firstFrame')

    const playlistUrl = window.playerInstance.getConfig().playlistItem.file
    window.dispatchEvent(new CustomEvent('kinopubPlaylistChanged', { detail: playlistUrl }))
  })
}
