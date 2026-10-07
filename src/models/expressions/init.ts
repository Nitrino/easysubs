import { sample } from "effector";
import { debug } from "patronum";

import {
  $currentExpression,
  $expressionTranslationErrors,
  $expressionTranslationPendings,
  $expressionTranslations,
  $expressionLookups,
  $expressions,
  $hoveredWord,
  ExpressionTranslationGate,
  MAX_CUES_PER_LOOKUP,
  expressionTranslationKey,
  expressionTranslationRequested,
  expressionTranslator,
  findExpressionsFx,
  lookupKey,
  requestedKeys,
  translateExpressionFx,
  wordHovered,
  wordLeft,
  type TFoundExpressions,
  type TTranslateExpressionParams,
} from ".";
import { $subs, $subsLanguage } from "../subs";
import { $chatGPTApiKey, $chatGPTModel, $translateLanguage, $translationService } from "../settings";
import { expressionLanguage } from "@src/utils/expressions/lookup";

// ---- Finding -------------------------------------------------------------------------------------

// The cues neither looked up nor being looked up, when the subtitles or their language change (services that show
// one line at a time add cues as they play)
const lookupPicked = sample({
  clock: [$subs, $subsLanguage],
  source: { subs: $subs, language: $subsLanguage, expressions: $expressions, lookups: $expressionLookups },
  filter: ({ language }) => expressionLanguage(language) !== null,
  fn: ({ subs, language, expressions, lookups }) => {
    const known = expressions.language === language ? expressions.cues : {};
    const cues = new Map<string, string[]>();
    for (const sub of subs) {
      if (cues.size === MAX_CUES_PER_LOOKUP) break;
      if (Object.hasOwn(known, sub.text) || lookups[lookupKey(language, sub.text)] || cues.has(sub.text)) continue;
      cues.set(
        sub.text,
        sub.items.map((item) => item.text),
      );
    }
    return { language, cues: [...cues].map(([text, words]) => ({ text, words })) };
  },
});

$expressionLookups.on(findExpressionsFx, (lookups, { language, cues }) => ({
  ...lookups,
  ...Object.fromEntries(cues.map((cue) => [lookupKey(language, cue.text), true as const])),
}));
$expressionLookups.on(findExpressionsFx.finally, (lookups, { params: { language, cues } }) => {
  const done = new Set(cues.map((cue) => lookupKey(language, cue.text)));
  return Object.fromEntries(Object.entries(lookups).filter(([key]) => !done.has(key))) as Record<string, true>;
});

sample({
  clock: lookupPicked,
  filter: ({ cues }) => cues.length > 0,
  target: findExpressionsFx,
});

const withCues = (
  expressions: TFoundExpressions,
  language: string,
  found: [string, TFoundExpressions["cues"][string]][],
) => ({
  language,
  cues: { ...(expressions.language === language ? expressions.cues : {}), ...Object.fromEntries(found) },
});

sample({
  clock: findExpressionsFx.done,
  source: $expressions,
  fn: (expressions, { params, result }) =>
    withCues(
      expressions,
      params.language,
      params.cues.map((cue, index) => [cue.text, result[index] ?? []]),
    ),
  target: $expressions,
});

// A failed lookup leaves its cues without expressions rather than asking again on every update
sample({
  clock: findExpressionsFx.fail,
  source: $expressions,
  fn: (expressions, { params }) =>
    withCues(
      expressions,
      params.language,
      params.cues.map((cue) => [cue.text, []]),
    ),
  target: $expressions,
});

// ---- Hovering ------------------------------------------------------------------------------------

$hoveredWord.on(wordHovered, (_, word) => word);
$hoveredWord.reset(wordLeft);

// ---- Translation ---------------------------------------------------------------------------------

// When the popover opens, shows another expression, or the language or service changes while it's open
sample({
  clock: ExpressionTranslationGate.open,
  target: expressionTranslationRequested,
});
sample({
  clock: [ExpressionTranslationGate.state.updates, $translateLanguage.updates, $translationService.updates],
  source: { open: ExpressionTranslationGate.status, props: ExpressionTranslationGate.state },
  filter: ({ open, props }) => open && Boolean(props?.expression),
  fn: ({ props }) => props,
  target: expressionTranslationRequested,
});

const translationPicked = sample({
  clock: expressionTranslationRequested,
  source: {
    expressions: $expressions,
    service: $translationService,
    sourceLanguage: $subsLanguage,
    language: $translateLanguage,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
  },
  fn: (
    { expressions, service, sourceLanguage, language, chatGPTApiKey, chatGPTModel },
    { expression, cue },
  ): TTranslateExpressionParams => ({
    translator: expressionTranslator(service),
    expression,
    cue,
    cueExpressions: [...new Set([expression, ...(expressions.cues[cue] ?? []).map((match) => match.expression)])],
    sourceLanguage,
    language,
    chatGPTApiKey,
    chatGPTModel,
  }),
});

sample({
  clock: translationPicked,
  source: { translations: $expressionTranslations, pendings: $expressionTranslationPendings },
  filter: ({ translations, pendings }, params) => {
    const key = expressionTranslationKey(params.translator, params.language, params.expression, params.cue);
    return !translations[key] && !pendings[key];
  },
  fn: (_, params) => params,
  target: translateExpressionFx,
});

$expressionTranslations.on(translateExpressionFx.doneData, (translations, received) => ({
  ...translations,
  ...received,
}));

$expressionTranslationPendings.on(translateExpressionFx, (pendings, params) => ({
  ...pendings,
  ...Object.fromEntries(requestedKeys(params).map((key) => [key, true as const])),
}));
$expressionTranslationPendings.on(translateExpressionFx.finally, (pendings, { params }) => {
  const keys = new Set(requestedKeys(params));
  return Object.fromEntries(Object.entries(pendings).filter(([key]) => !keys.has(key))) as Record<string, true>;
});

// A failure, or an answer without the expression, shows in the popover until it's asked again
$expressionTranslationErrors.on(translateExpressionFx.done, (errors, { params, result }) => ({
  ...Object.fromEntries(Object.entries(errors).filter(([key]) => !requestedKeys(params).includes(key))),
  ...Object.fromEntries(
    requestedKeys(params)
      .filter((key) => !result[key])
      .map((key) => [key, "No translation"]),
  ),
}));
$expressionTranslationErrors.on(translateExpressionFx.fail, (errors, { params, error }) => ({
  ...errors,
  ...Object.fromEntries(requestedKeys(params).map((key) => [key, error.message])),
}));
// Asking again clears the error, so a failed translation is retried the next time the popover opens
$expressionTranslationErrors.on(translateExpressionFx, (errors, params) =>
  Object.fromEntries(Object.entries(errors).filter(([key]) => !requestedKeys(params).includes(key))),
);

debug($expressions, $currentExpression, translateExpressionFx.doneData, translateExpressionFx.failData);
