import type { TFoundResult } from "@src/models/types";

// Rips of a streaming service carry its tag in the release name, and their subtitles have the service's timing: on
// Netflix an "…NF.WEB-DL…" file lines up without a shift. Keyed by Service.name.
const SERVICE_RELEASE_TAGS: Record<string, RegExp> = {
  netflix: /\b(NF|Netflix)\b/i,
  amazon: /\b(AMZN|Amazon)\b/i,
  disney: /\b(DSNP|DSNY)\b/i,
  apple: /\bATVP\b/i,
  max: /\b(HMAX|MAX)\b/i,
  hulu: /\bHULU\b/i,
};

// Dots and underscores separate the words of a release name
const words = (release: string) => release.replace(/[._]/g, " ");

export const isSameServiceRelease = (release: string, service: string) =>
  SERVICE_RELEASE_TAGS[service]?.test(words(release)) ?? false;

// "The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb" → "NTb"
export function releaseGroup(release: string): string | undefined {
  return release.match(/-([A-Za-z0-9]+)(?:\.(?:srt|ass|vtt))?\s*$/)?.[1];
}

// Best first: the service's own release, the release group of the last episode, human translations, trusted
// uploaders, then downloads
export function rankResults(results: TFoundResult[], { service, group }: { service: string; group?: string }) {
  const score = (result: TFoundResult) => [
    Number(isSameServiceRelease(result.release, service)),
    Number(Boolean(group) && releaseGroup(result.release)?.toLowerCase() === group?.toLowerCase()),
    Number(!result.machineTranslated),
    Number(Boolean(result.trusted)),
    result.downloads ?? 0,
  ];
  return results
    .map((result, index) => ({ result, index, score: score(result) }))
    .sort((a, b) => {
      for (let field = 0; field < a.score.length; field++) {
        if (a.score[field] !== b.score[field]) return b.score[field] - a.score[field];
      }
      return a.index - b.index;
    })
    .map(({ result }) => result);
}
