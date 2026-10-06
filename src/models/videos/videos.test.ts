import { describe, expect, it } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import { $video, moveFx, moveKeyPressed, moveToTimeRequested } from ".";
import { $currentSubs, $rawSubs, $subs } from "../subs";
import { $streaming } from "../streamings";
import type { Captions, TMoveDirection } from "../types";
import { captions, playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import { convertRawSubs } from "@src/utils/convertRawSubs";

// Two cues far apart, to tell a jump to a cue from a 5 s seek
const FAR_APART = captions([1, 2, "First."], [20, 22, "Second."]);

function setup(currentTime: number, rawSubs: Captions = playgroundCaptions("en")) {
  const video = createVideo({ currentTime });
  const currentSubs = getCurrentSubs(convertRawSubs(rawSubs), currentTime * 1000);
  const scope = fork({
    values: [
      [$video, video],
      [$streaming, createService()],
      [$rawSubs, rawSubs],
      [$currentSubs, currentSubs],
    ],
  });
  const press = (direction: TMoveDirection, force = false) =>
    allSettled(moveKeyPressed, { scope, params: { direction, force } });
  return { scope, video, press };
}

describe("moving by subtitles", () => {
  it("jumps to the next cue", async () => {
    const { video, press } = setup(5);

    await press("next");

    expect(video.currentTime).toBe(7.2);
  });

  it("jumps to the next cue from a pause between cues", async () => {
    const { video, press } = setup(3.7);

    await press("next");

    expect(video.currentTime).toBe(4);
  });

  it("seeks 5 s forward when the next cue is farther", async () => {
    const { video, press } = setup(1.5, FAR_APART);

    await press("next");

    expect(video.currentTime).toBe(6.5);
  });

  it("jumps to a far next cue with Alt", async () => {
    const { video, press } = setup(1.5, FAR_APART);

    await press("next", true);

    expect(video.currentTime).toBe(20);
  });

  it("jumps to the previous cue", async () => {
    const { video, press } = setup(8);

    await press("prev");

    expect(video.currentTime).toBe(4);
  });

  it("seeks 5 s back when the previous cue is farther", async () => {
    const { video, press } = setup(21, FAR_APART);

    await press("prev");

    expect(video.currentTime).toBe(16);
  });

  it("jumps to a far previous cue with Alt", async () => {
    const { video, press } = setup(21, FAR_APART);

    await press("prev", true);

    expect(video.currentTime).toBe(1);
  });

  it("skips a previous cue too short to read, as YouTube auto-generated subtitles have", async () => {
    const { video, press } = setup(5, captions([1, 2, "First."], [3, 3.01, "Second."], [4, 6, "Third."]));

    await press("prev");

    expect(video.currentTime).toBe(1);
  });

  it("replays the current cue", async () => {
    const { video, press } = setup(6);

    await press("current");

    expect(video.currentTime).toBe(4);
    expect(video.play).toHaveBeenCalled();
  });

  it("doesn't replay between cues", async () => {
    const { video, press } = setup(3.7);

    await press("current");

    expect(video.currentTime).toBe(3.7);
    expect(video.play).not.toHaveBeenCalled();
  });

  it("does nothing without a video", async () => {
    const scope = fork({ values: [[$video, null]] });

    const result = await allSettled(moveFx, {
      scope,
      params: { video: null, subs: [], currentSubs: [], streaming: createService(), direction: "next", force: false },
    });

    expect(result.status).toBe("done");
  });

  it("jumps to the cue that has just ended from a pause between cues", async () => {
    const { video, press } = setup(3.7);

    await press("prev");

    expect(video.currentTime).toBe(1);
  });

  it("seeks 5 s back from the first cue", async () => {
    const { video, press } = setup(21, captions([20, 22, "Only line."]));

    await press("prev");

    expect(video.currentTime).toBe(16);
  });

  it("goes back without errors", async () => {
    const { scope, video } = setup(3.7);

    const result = await allSettled(moveFx, {
      scope,
      params: {
        video,
        subs: scope.getState($subs),
        currentSubs: [],
        streaming: createService(),
        direction: "prev",
        force: false,
      },
    });

    expect(result.status).toBe("done");
  });
});

describe("seeking", () => {
  it("seeks the video to a time in milliseconds", async () => {
    const { scope, video } = setup(20);

    await allSettled(moveToTimeRequested, { scope, params: 4250 });

    expect(video.currentTime).toBe(4.25);
  });
});
