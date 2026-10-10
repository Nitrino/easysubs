// Mozilla's translation models for Firefox Translations, which Bergamot runs: Firefox's Remote Settings lists them and
// its CDN serves them, but only to Firefox, so scripts/bergamot-models/mirror.ts mirrors the ones EasySubs uses to the
// GitHub release BERGAMOT_MODELS_RELEASE with a list of its own, models.json. Each direction between English and
// another language has a model, its lexical shortlist and its vocabulary (two for Chinese, Japanese and Korean).
// No imports: the mirror script runs it in Node.

export const MODELS_URL =
  "https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/translations-models/records";
export const ATTACHMENTS_URL = "https://firefox-settings-attachments.cdn.mozilla.net/";

// Bumped with a new release when the mirrored models change: extensions already out keep reading the one they know
export const BERGAMOT_MODELS_RELEASE = "bergamot-models-1";
export const BERGAMOT_MODELS_URL = `https://github.com/Nitrino/easysubs/releases/download/${BERGAMOT_MODELS_RELEASE}/`;
// Mirrored in both directions with English
export const MIRRORED_LANGUAGES = ["ru", "uk", "es", "de", "fr", "it", "pt", "nl", "pl", "tr", "ja", "zh-Hans", "ko"];

// A release can't have folders: every file is named after its pair
export const mirroredName = (from: string, to: string, name: string) => `${from}-${to}.${name}`;

// models.json of the mirror
export type TModelsIndex = {
  source: string;
  license: string;
  models: {
    from: string;
    to: string;
    version: string;
    model: { name: string; size: number };
    lex: { name: string; size: number };
    vocabs: { name: string; size: number }[];
  }[];
};

export type TModelRecord = {
  name: string;
  fromLang: string;
  toLang: string;
  version: string;
  fileType: string;
  filter_expression?: string;
  attachment: { location: string; size: number };
};

export type TModelFile = { name: string; url: string; size: number };
export type TPairModel = {
  from: string;
  to: string;
  version: string;
  model: TModelFile;
  lex: TModelFile;
  // One shared vocabulary, or the source's and the target's
  vocabs: TModelFile[];
};

// Records meant for desktop Firefox: for every build, or for all but Android's release builds. Others are for
// Nightly or for Android only.
const DESKTOP_FILTERS = new Set(["", "env.appinfo.OS != 'Android' || env.channel != 'release'"]);
// The engine EasySubs ships (@browsermt/bergamot-translator 0.4.9) reads the models of these major versions
export const MAX_MAJOR_VERSION = 2;

const versionParts = (version: string) => version.split(".").map(Number);
const newer = (a: string, b: string) => {
  const [x, y] = [versionParts(a), versionParts(b)];
  for (let index = 0; index < Math.max(x.length, y.length); index++) {
    if ((x[index] ?? 0) !== (y[index] ?? 0)) return (x[index] ?? 0) > (y[index] ?? 0);
  }
  return false;
};

export const pairKey = (from: string, to: string) => `${from}:${to}`;

// The newest complete model of each direction the engine reads
export function pickModels(records: TModelRecord[]): Map<string, TPairModel> {
  const byVersion = new Map<string, TModelRecord[]>();
  for (const record of records) {
    if (!DESKTOP_FILTERS.has(record.filter_expression ?? "")) continue;
    // Alpha and beta versions ("2.0a1") are being tried in Nightly
    if (!/^\d+(\.\d+)*$/.test(record.version) || versionParts(record.version)[0] > MAX_MAJOR_VERSION) continue;
    const key = `${pairKey(record.fromLang, record.toLang)}@${record.version}`;
    byVersion.set(key, [...(byVersion.get(key) ?? []), record]);
  }

  const models = new Map<string, TPairModel>();
  for (const files of byVersion.values()) {
    const { fromLang: from, toLang: to, version } = files[0];
    const file = (type: string) => {
      const record = files.find((candidate) => candidate.fileType === type);
      return (
        record && { name: record.name, url: ATTACHMENTS_URL + record.attachment.location, size: record.attachment.size }
      );
    };
    const [model, lex, vocab, srcvocab, trgvocab] = ["model", "lex", "vocab", "srcvocab", "trgvocab"].map(file);
    const vocabs = vocab ? [vocab] : srcvocab && trgvocab ? [srcvocab, trgvocab] : null;
    if (!model || !lex || !vocabs) continue;
    const known = models.get(pairKey(from, to));
    if (!known || newer(version, known.version))
      models.set(pairKey(from, to), { from, to, version, model, lex, vocabs });
  }
  return models;
}

// The mirror's models, its files at `baseUrl`
export function mirroredModels(index: TModelsIndex, baseUrl: string): Map<string, TPairModel> {
  const file = ({ name, size }: { name: string; size: number }) => ({ name, size, url: new URL(name, baseUrl).href });
  return new Map(
    index.models.map((model) => [
      pairKey(model.from, model.to),
      { ...model, model: file(model.model), lex: file(model.lex), vocabs: model.vocabs.map(file) },
    ]),
  );
}

// The models a translation goes through, the languages in Mozilla's codes (src/bergamot/languages.ts): one between
// English and another language, two through English otherwise
export function planTranslation(source: string, target: string, models: Map<string, TPairModel>): TPairModel[] | null {
  if (source === target) return null;
  const direct = models.get(pairKey(source, target));
  if (direct) return [direct];
  const first = models.get(pairKey(source, "en"));
  const second = models.get(pairKey("en", target));
  return first && second ? [first, second] : null;
}

export const modelSize = (models: TPairModel[]) =>
  models.reduce((sum, model) => sum + [model.model, model.lex, ...model.vocabs].reduce((s, f) => s + f.size, 0), 0);
