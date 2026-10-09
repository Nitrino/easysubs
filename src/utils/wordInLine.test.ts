import { describe, expect, it } from "vitest";
import { markedLine, markedTranslation, repeatsTranslation } from "./wordInLine";

const items = (line: string) => line.split(" ").map((text) => ({ text, cleanedText: text.replace(/[.,!?"]/g, "") }));

describe("markedLine", () => {
  it("marks the words, leaving their punctuation outside", () => {
    expect(markedLine(items("Did you turn off the light, Sam?"), [2, 3])).toBe(
      "Did you <b>turn</b> <b>off</b> the light, Sam?",
    );
    expect(markedLine(items('"Late," she said.'), [0])).toBe('"<b>Late</b>," she said.');
  });

  it("escapes what HTML would read as markup", () => {
    expect(markedLine(items("Tom & <Jerry> run"), [3])).toBe("Tom &amp; &lt;Jerry&gt; <b>run</b>");
  });
});

describe("markedTranslation", () => {
  it("takes what the marks hold, without punctuation", () => {
    expect(markedTranslation("Я <b>заберу</b> тебя в восемь.")).toBe("заберу");
    expect(markedTranslation("Она всегда <b>так говорит,</b> и мы никогда не опаздываем.")).toBe("так говорит");
    expect(markedTranslation("<b>Выключили</b> <b></b>свет на кухне?")).toBe("Выключили");
    expect(markedTranslation("Tom <b>&amp; Jerry</b>")).toBe("& Jerry");
  });

  it("has nothing when the word merged into another", () => {
    expect(markedTranslation("Я заберу тебя <b></b>в восемь.")).toBeNull();
    expect(markedTranslation("Я заберу тебя в восемь.")).toBeNull();
  });
});

describe("repeatsTranslation", () => {
  it("takes another form of the same word as a repeat", () => {
    expect(repeatsTranslation("ключи", ["ключ"])).toBe(true);
    expect(repeatsTranslation("Проиграл", ["проигрывать"])).toBe(true);
    expect(repeatsTranslation("ёлки", ["елка"])).toBe(true);
    expect(repeatsTranslation("так говорит", ["говорить"])).toBe(true);
  });

  it("shows a word the dictionary has in a form far from the line's, or another word", () => {
    expect(repeatsTranslation("заберу", ["забрать"])).toBe(false);
    expect(repeatsTranslation("взять", ["брать", "поднять"])).toBe(false);
    expect(repeatsTranslation("присмотреть за", ["присматривать"])).toBe(false);
    expect(repeatsTranslation("выключили", ["выключить свет"])).toBe(false);
  });
});
