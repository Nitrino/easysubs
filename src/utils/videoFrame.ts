import type { TMediaFile } from "@src/learning-service/learningService";

// The frame on screen as a JPEG for a card. Null when the video can't be read: DRM-protected video draws black, and
// video from another origin without CORS can't be read back from the canvas.

const MAX_WIDTH = 640;
const QUALITY = 0.8;
// Pixels looked at to tell a black frame, and how dark they may be
const SAMPLES = 400;
const BLACK = 4;

function isBlack(context: CanvasRenderingContext2D, width: number, height: number): boolean {
  const { data } = context.getImageData(0, 0, width, height);
  const pixels = width * height;
  const step = Math.max(1, Math.floor(pixels / SAMPLES));
  for (let pixel = 0; pixel < pixels; pixel += step) {
    const at = pixel * 4;
    if (data[at] > BLACK || data[at + 1] > BLACK || data[at + 2] > BLACK) return false;
  }
  return true;
}

export function captureFrame(video: HTMLVideoElement): TMediaFile | null {
  if (!video.videoWidth || !video.videoHeight) return null;

  const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const context = canvas.getContext("2d");
  if (!context) return null;

  try {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (isBlack(context, canvas.width, canvas.height)) return null;
    const url = canvas.toDataURL("image/jpeg", QUALITY);
    return { data: url.slice(url.indexOf(",") + 1), extension: "jpg" };
  } catch (error) {
    console.warn("Can't read the video frame:", error);
    return null;
  }
}
