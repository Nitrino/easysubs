import { LANGUAGES } from "../languages";

// The languages Whisper transcribes, of those EasySubs names. Whisper doesn't tell the language by itself in
// transformers.js, so the user picks the one spoken.
const WHISPER_CODES = new Set(
  (
    "en zh de es ru ko fr ja pt tr pl ca nl ar sv it id hi fi vi he uk el ms cs ro da hu ta no th ur hr bg lt la mi " +
    "ml cy sk te fa lv bn sr az sl kn et mk br eu is hy ne mn bs kk sq sw gl mr pa si km sn yo so af oc ka be tg sd " +
    "gu am yi lo uz fo ht ps tk nn mt sa lb my bo tl mg as tt haw ln ha ba jw su"
  ).split(" "),
);

export const AI_SUBS_LANGUAGES: { label: string; value: string }[] = [
  { label: "Chinese", value: "zh" },
  { label: "Javanese", value: "jw" },
  ...LANGUAGES.filter((language) => WHISPER_CODES.has(language.value)),
].sort((a, b) => a.label.localeCompare(b.label));
