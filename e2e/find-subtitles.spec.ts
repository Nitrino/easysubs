import { test, expect } from "./playground";

// The search for subtitles online, against the mock background: the sample is "The Night Train" S1 E2, its Spanish
// file found as a Netflix release (in step), an Addic7ed one 2.4 s late, a BluRay one timed for 25 fps and a machine
// translation (playground/src/mockSubtitles.ts)

const NF_RELEASE = "The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb";
const ADDIC7ED_RELEASE = "the night train S01E02 WEB";
const PAL_RELEASE = "The.Night.Train.S01E02.720p.BluRay.x264-GROUP";
const ALMOST = "Almost. I just need to pick up my keys.";
const CASI = "Casi. Solo tengo que buscar mis llaves.";

test.describe("finding subtitles online", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(ALMOST);
  });

  test("searches for the episode playing", async ({ playground }) => {
    await playground.openSearch();

    await expect(playground.sheet.getByLabel("Title")).toHaveValue("The Night Train");
    await expect(playground.sheet.getByLabel("Season")).toHaveValue("1");
    await expect(playground.sheet.getByLabel("Episode")).toHaveValue("2");
    await expect(playground.sheet).toContainText("From the playground");
    // The main line's language: English
    await expect(playground.result(NF_RELEASE)).toBeVisible();
    expect(await playground.messages("searchSubtitles")).toMatchObject([
      { query: { title: "The Night Train", language: "en", season: 1, episode: 2 } },
    ]);
    // Machine translations stay hidden until asked for
    await expect(playground.sheet.locator(".es-found__result")).toHaveCount(3);
    await playground.sheet.locator(".es-found__toggle .es-switch").click();
    await expect(playground.sheet.locator(".es-found__result")).toHaveCount(4);
    await expect(playground.sheet).toContainText("5 of 5 left today");
  });

  test("loads a Spanish file as the second line, synced to the video", async ({ playground }) => {
    await playground.openSearch();
    await playground.choose("Language", "Spanish");
    await playground.sheet.getByRole("radio", { name: "Second line" }).click();

    await playground.result(ADDIC7ED_RELEASE).getByRole("button", { name: /^Load/ }).click();

    await expect(playground.loadedFile()).toContainText("Auto-synced: −2.40 s.");
    await expect(playground.loadedFile()).toContainText("Addic7ed");
    await playground.closeSettings();
    await expect(playground.secondLine).toHaveText(CASI);

    await playground.openSettings("Second line");
    await expect(playground.secondLineStatus()).toHaveText("FoundSpanish from Addic7ed, for this video.");
  });

  test("undoes Auto-sync to show the file's own timing", async ({ playground }) => {
    await playground.openSearch();
    await playground.choose("Language", "Spanish");
    await playground.sheet.getByRole("radio", { name: "Second line" }).click();
    await playground.result(ADDIC7ED_RELEASE).getByRole("button", { name: /^Load/ }).click();
    await expect(playground.loadedFile()).toContainText("Auto-synced");

    await playground.loadedFile().getByRole("button", { name: "Undo" }).click();

    await expect(playground.loadedFile()).toContainText("The file's own timing.");
    await expect(playground.secondLine).toHaveText("¡Hola! ¿Estás lista para salir?");
  });

  test("loads a file timed for 25 fps as the main line", async ({ playground, page }) => {
    await playground.openSearch();
    await playground.choose("Language", "Spanish");

    await playground.result(PAL_RELEASE).getByRole("button", { name: /^Load/ }).click();

    await expect(playground.loadedFile()).toContainText("Auto-synced: −1.67 s, 25 → 23.976 fps.");
    await expect(playground.sheet).toContainText("4 of 5 left today");
    await playground.closeSettings();
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(CASI);
    await playground.seek(22);
    await expect(playground.subs.locator(".es-sub").first()).toHaveText("Sí. Y le pedí a Sam que cuidara al gato.");

    // Back to the video's own subtitles
    await playground.openSettings("Subtitles");
    await playground.settingsRow("Subtitles from").locator(".es-select").click();
    await page.getByRole("option", { name: "From the playground", exact: true }).click();
    await playground.closeSettings();
    await expect(playground.subs.locator(".es-sub").first()).toHaveText("Yes. And I asked Sam to look after the cat.");
  });

  test("brings the file back after a reload without downloading it again", async ({ playground, page }) => {
    await playground.openSearch();
    await playground.choose("Language", "Spanish");
    await playground.result(PAL_RELEASE).getByRole("button", { name: /^Load/ }).click();
    await expect(playground.loadedFile()).toContainText("Auto-synced");

    await page.reload();
    await playground.seek(22);

    await expect(playground.subs.locator(".es-sub").first()).toHaveText("Sí. Y le pedí a Sam que cuidara al gato.");
    expect(await playground.messages("downloadSubtitle")).toHaveLength(0);
  });

  test("goes through the Stremio mirror once today's downloads are used", async ({ playground }) => {
    await playground.mockAnswer("downloadSubtitle", {
      error: "Today's OpenSubtitles downloads are used",
      kind: "limit",
      remaining: 0,
      allowed: 5,
      resetAt: "",
    });
    await playground.openSearch();

    await playground.result(NF_RELEASE).getByRole("button", { name: /^Load/ }).click();

    await expect(playground.sheet).toContainText(
      "Today's OpenSubtitles downloads are used, so its files come from the Stremio mirror",
    );
    await expect(playground.sheet).toContainText("0 of 5 left today");
    await expect(playground.result(NF_RELEASE).locator(".es-tag--source")).toHaveText("Stremio mirror");
    expect(await playground.messages("searchSubtitles")).toMatchObject([
      { limitReached: false },
      { limitReached: true },
    ]);
  });

  test("signs in to OpenSubtitles for 20 downloads a day", async ({ playground }) => {
    await playground.openSearch();
    await playground.sheet.getByRole("button", { name: "Sign in" }).click();
    await expect(playground.sheet.locator(".es-found__title")).toHaveText("Sources");

    await playground.sheet.getByLabel("OpenSubtitles username").fill("learner");
    await playground.sheet.getByLabel("OpenSubtitles password").fill("wrong");
    await playground.sheet.getByRole("button", { name: "Sign in" }).click();
    await expect(playground.sheet).toContainText("Wrong username or password");

    await playground.sheet.getByLabel("OpenSubtitles password").fill("secret");
    await playground.sheet.getByRole("button", { name: "Sign in" }).click();
    await expect(playground.sheet).toContainText("Signed in as learner");

    await playground.sheet.getByRole("button", { name: "Find" }).click();
    await expect(playground.sheet).toContainText("20 of 20 left today");
  });

  test("opens from the second line's picker, in its language", async ({ playground }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Find subtitles");

    await expect(playground.sheet).toBeVisible();
    await expect(playground.sheet.getByRole("radio", { name: "Second line" })).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => playground.messages("searchSubtitles")).toMatchObject([{ query: { language: "ru" } }]);
    await expect(playground.sheet).toContainText("No Russian subtitles for The Night Train S1 E2.");

    await playground.sheet.getByRole("button", { name: "Settings" }).click();
    await expect(playground.settingsRow("Second line")).toBeVisible();
  });

  test("offers a human translation when the second line is translated", async ({ playground }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Russian");

    await playground.settingsPanel.getByRole("button", { name: "Find Russian subtitles online" }).click();

    await expect(playground.sheet).toBeVisible();
    await expect(playground.sheet.getByRole("radio", { name: "Second line" })).toHaveAttribute("aria-checked", "true");
  });

  test("keeps keys typed in the sheet away from the player", async ({ playground, page }) => {
    await playground.openSearch();
    const before = await playground.currentTime();

    await playground.sheet.getByLabel("Title").press("ArrowLeft");
    await playground.sheet.getByLabel("Title").press("Space");

    expect(await playground.currentTime()).toBe(before);
    expect(await playground.isPaused()).toBe(true);
    await expect(page.locator(".es-found")).toBeVisible();
  });
});

test.describe("subtitle files", () => {
  test("opens a file as the main line from the settings", async ({ playground, page }) => {
    await playground.open();
    await playground.openSettings("Subtitles");

    const chooser = page.waitForEvent("filechooser");
    await playground.choose("Subtitles from", "Open a file…");
    await (
      await chooser
    ).setFiles({
      name: "custom.srt",
      mimeType: "text/plain",
      buffer: Buffer.from("1\n00:00:01,000 --> 00:00:09,000\nA line from the settings.\n"),
    });
    await expect(playground.settingsPanel).toContainText("custom.srt");
    await playground.closeSettings();

    await playground.seek(3);
    await expect(playground.subs).toHaveText("A line from the settings.");
  });

  test("loads a file dropped on the player, as the second line with Shift", async ({ playground, page }) => {
    await playground.open();
    await playground.seek(5);

    await page.evaluate(() => {
      const transfer = new DataTransfer();
      transfer.items.add(new File(["1\n00:00:04,000 --> 00:00:06,800\nDropped line.\n"], "dropped.srt"));
      const player = document.querySelector(".pg-player") as HTMLElement;
      const { left, top, width, height } = player.getBoundingClientRect();
      const at = {
        clientX: left + width / 2,
        clientY: top + height / 2,
        dataTransfer: transfer,
        bubbles: true,
        shiftKey: true,
      };
      player.dispatchEvent(new DragEvent("dragover", { ...at, cancelable: true }));
      player.dispatchEvent(new DragEvent("drop", { ...at, cancelable: true }));
    });

    await expect(playground.secondLine).toHaveText("Dropped line.");
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(ALMOST);
  });
});
