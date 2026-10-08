import { inertElement } from "@src/utils/textToWords";
import type { TWordContext } from "./learningService";

// EasySubs' own note type in Anki, so cards don't depend on the user's note types or Anki UI language. A word's card
// shows the subtitle line it was added from on the front; adding the word from another line puts that line on the
// front and keeps the ones before it on the back, as examples.

export const ANKI_MODEL = "Easysubs";
export const ANKI_CARD_TEMPLATE = "Word";
export const ANKI_MODEL_FIELDS = [
  "Word",
  "Translation",
  "Part of Speech",
  "Context",
  "Context Translation",
  "Picture",
  "Audio",
  "Source",
  "Examples",
];
// The lines a card keeps, the newest on the front
export const MAX_EXAMPLES = 3;

export const ANKI_MODEL_CSS = `.card {
  font-family: arial;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
}

.word {
  font-size: 28px;
}

.picture img {
  max-width: 100%;
  max-height: 260px;
  border-radius: 6px;
}

.context {
  margin-top: 8px;
}

.part-of-speech,
.context-translation,
.source,
.es-example-translation,
.es-example-source {
  font-size: 16px;
  opacity: 0.6;
}

.source a,
.es-example-source a {
  color: inherit;
}

.examples {
  margin-top: 24px;
  font-size: 16px;
  text-align: left;
}

.es-example {
  padding: 12px 0;
  border-top: 1px solid rgba(128, 128, 128, 0.3);
}

.es-example img {
  display: block;
  max-height: 90px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.es-example audio {
  display: block;
  height: 32px;
  margin: 4px 0;
}`;
export const ANKI_MODEL_FRONT = `{{#Picture}}<div class="picture">{{Picture}}</div>{{/Picture}}
<div class="word">{{Word}}</div>
{{#Context}}<div class="context">{{Context}}</div>{{/Context}}
{{Audio}}`;
export const ANKI_MODEL_BACK = `{{FrontSide}}

<hr id=answer>

<div class="translation">{{Translation}}</div>
{{#Part of Speech}}<div class="part-of-speech">{{Part of Speech}}</div>{{/Part of Speech}}
{{#Context Translation}}<div class="context-translation">{{Context Translation}}</div>{{/Context Translation}}
{{#Source}}<div class="source">{{Source}}</div>{{/Source}}
{{#Examples}}<div class="examples">{{Examples}}</div>{{/Examples}}`;

export type TNoteFields = Record<string, string>;
// The context with its picture and sound stored in Anki's media folder, by file name
export type TStoredContext = Omit<TWordContext, "picture" | "audio"> & { picture?: string; audio?: string };

const escapeAttribute = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

export function contextFields(context: TStoredContext): TNoteFields {
  return {
    Context: context.sentence,
    "Context Translation": context.translation ?? "",
    Picture: context.picture ? `<img src="${escapeAttribute(context.picture)}">` : "",
    Audio: context.audio ? `[sound:${context.audio}]` : "",
    Source: context.source ?? "",
  };
}

const parse = (html: string) => {
  const element = inertElement();
  element.innerHTML = html;
  return element;
};

const lineText = (html: string) => (parse(html).textContent ?? "").replace(/\s+/g, " ").trim().toLowerCase();

const exampleBlocks = (examples: string) =>
  Array.from(parse(examples).children).filter((child) => child.classList.contains("es-example"));

// Whether the note has the line already, on the front or among the examples
export function hasLine(fields: TNoteFields, sentence: string): boolean {
  const line = lineText(sentence);
  const sentences = [
    fields.Context ?? "",
    ...exampleBlocks(fields.Examples ?? "").map(
      (block) => block.querySelector(".es-example-sentence")?.innerHTML ?? "",
    ),
  ];
  return sentences.some((sentence) => lineText(sentence) === line);
}

// The line on the front as an example on the back. Anki plays every [sound:] of a side when it's shown, so the
// examples' sounds are players that wait for a click.
function exampleBlock(fields: TNoteFields): string {
  const audio = (fields.Audio ?? "").replace(
    /\[sound:([^\]]+)\]/g,
    (_, file: string) => `<audio controls preload="none" src="${escapeAttribute(file)}"></audio>`,
  );
  const parts = [
    fields.Picture ?? "",
    `<div class="es-example-sentence">${fields.Context}</div>`,
    fields["Context Translation"] ? `<div class="es-example-translation">${fields["Context Translation"]}</div>` : "",
    audio,
    fields.Source ? `<div class="es-example-source">${fields.Source}</div>` : "",
  ];
  return `<div class="es-example">${parts.join("")}</div>`;
}

// The fields of a note with the word that change for a new line: the line goes on the front, and the one that was
// there becomes the first example. The oldest examples go when there are more than MAX_EXAMPLES lines.
export function withNewLine(fields: TNoteFields, context: TStoredContext): TNoteFields {
  if (!fields.Context?.trim()) return contextFields(context);

  const examples = [exampleBlock(fields), ...exampleBlocks(fields.Examples ?? "").map((block) => block.outerHTML)];
  return { ...contextFields(context), Examples: examples.slice(0, MAX_EXAMPLES - 1).join("") };
}
