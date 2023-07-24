import { fetchSubsFx, $rawSubs } from ".";

$rawSubs.on(fetchSubsFx.doneData, (_, subs) => subs);
// fetchSubsFx.use(async ({ streaming, language }) => streaming.getSubs(language));
