import { describe, expect, it } from "vitest";
import {
  ATTACHMENTS_URL,
  mirroredModels,
  mirroredName,
  modelSize,
  pickModels,
  planTranslation,
  type TModelRecord,
} from "./registry";
import { bergamotLanguage } from "./languages";

// Records of Mozilla's Remote Settings, reduced to the fields the registry reads
const files = (
  from: string,
  to: string,
  version: string,
  { filter = "", types = ["model", "lex", "vocab"] }: { filter?: string; types?: string[] } = {},
): TModelRecord[] =>
  types.map((fileType) => ({
    name: `${fileType}.${from}${to}.bin`,
    fromLang: from,
    toLang: to,
    version,
    fileType,
    filter_expression: filter,
    attachment: { location: `main-workspace/${from}${to}-${version}-${fileType}.bin`, size: 10 },
  }));

const ANDROID_ONLY = "env.appinfo.OS == 'Android' ";
const NOT_ANDROID_RELEASE = "env.appinfo.OS != 'Android' || env.channel != 'release'";

describe("pickModels", () => {
  it("takes the newest complete desktop model of each direction", () => {
    const models = pickModels([
      ...files("en", "ru", "1.0"),
      ...files("en", "ru", "2.0", { filter: NOT_ANDROID_RELEASE }),
      ...files("en", "ru", "2.1", { filter: ANDROID_ONLY }),
      ...files("en", "ru", "2.2a1"),
      ...files("en", "ru", "3.0"),
      ...files("ru", "en", "2.0", { types: ["model", "lex"] }),
      ...files("en", "ja", "2.3", { types: ["model", "lex", "srcvocab", "trgvocab"] }),
    ]);

    expect([...models.keys()]).toEqual(["en:ru", "en:ja"]);
    expect(models.get("en:ru")).toMatchObject({
      version: "2.0",
      model: { name: "model.enru.bin", url: `${ATTACHMENTS_URL}main-workspace/enru-2.0-model.bin`, size: 10 },
      vocabs: [{ name: "vocab.enru.bin" }],
    });
    expect(models.get("en:ja")!.vocabs.map((vocab) => vocab.name)).toEqual(["srcvocab.enja.bin", "trgvocab.enja.bin"]);
  });
});

describe("planTranslation", () => {
  const models = pickModels([
    ...files("en", "ru", "2.0"),
    ...files("es", "en", "2.0"),
    ...files("en", "zh-Hans", "2.0"),
  ]);

  it("translates directly between English and another language, through English otherwise", () => {
    expect(planTranslation("en", "ru", models)?.map((model) => `${model.from}:${model.to}`)).toEqual(["en:ru"]);
    expect(planTranslation("es", "ru", models)?.map((model) => `${model.from}:${model.to}`)).toEqual([
      "es:en",
      "en:ru",
    ]);
    expect(planTranslation("en", "zh-Hans", models)).toHaveLength(1);
    expect(modelSize(planTranslation("es", "ru", models)!)).toBe(60);
  });

  it("has no plan for pairs without models or within a language", () => {
    expect(planTranslation("ru", "en", models)).toBeNull();
    expect(planTranslation("en", "en", models)).toBeNull();
  });
});

describe("mirroredModels", () => {
  it("reads the mirror's list, the files next to it", () => {
    const models = mirroredModels(
      {
        source: "test",
        license: "MPL-2.0",
        models: [
          {
            from: "en",
            to: "ru",
            version: "2.0",
            model: { name: mirroredName("en", "ru", "model.enru.intgemm.alphas.bin"), size: 40 },
            lex: { name: "en-ru.lex.50.50.enru.s2t.bin", size: 3 },
            vocabs: [{ name: "en-ru.vocab.enru.spm", size: 1 }],
          },
        ],
      },
      "https://example.com/release/models.json",
    );

    expect(models.get("en:ru")).toEqual({
      from: "en",
      to: "ru",
      version: "2.0",
      model: {
        name: "en-ru.model.enru.intgemm.alphas.bin",
        size: 40,
        url: "https://example.com/release/en-ru.model.enru.intgemm.alphas.bin",
      },
      lex: {
        name: "en-ru.lex.50.50.enru.s2t.bin",
        size: 3,
        url: "https://example.com/release/en-ru.lex.50.50.enru.s2t.bin",
      },
      vocabs: [{ name: "en-ru.vocab.enru.spm", size: 1, url: "https://example.com/release/en-ru.vocab.enru.spm" }],
    });
  });
});

describe("bergamotLanguage", () => {
  it("names languages as Mozilla does", () => {
    expect(bergamotLanguage("zh-TW")).toBe("zh-Hant");
    expect(bergamotLanguage("zh")).toBe("zh-Hans");
    expect(bergamotLanguage("pt-BR")).toBe("pt");
  });
});
