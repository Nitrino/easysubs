import { $video, getCurrentVideoFx } from './'

$video.on(getCurrentVideoFx.doneData, (_, video) => video)
getCurrentVideoFx.use(async () => document.querySelector('video')!)
