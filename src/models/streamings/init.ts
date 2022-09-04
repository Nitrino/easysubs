import { $streaming, fetchCurrentStreamingFx } from './'
import { getCurrentService } from '@/utils/getCurrentService'

$streaming.on(fetchCurrentStreamingFx.doneData, (_, streaming) => streaming)
fetchCurrentStreamingFx.use(() => getCurrentService())
