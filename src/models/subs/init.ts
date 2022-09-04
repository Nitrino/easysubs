import { updateSubsEvent, $subs, fetchCurrentService, $streaming } from './'
import { getCurrentService } from '@/utils/getCurrentService'

$subs.on(updateSubsEvent, (_, subs) => subs)

fetchCurrentService.use(() => getCurrentService())
$streaming.on(fetchCurrentService.doneData, (_, streaming) => streaming)
