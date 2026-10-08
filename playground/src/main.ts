// Must stay the first import: the extension models touch chrome.storage while their modules evaluate
import "./chromeShim";
import "@pages/content/style.scss";
import "./style.css";

import "@src/models/init";
import { fetchCurrentStreamingFx } from "@src/models/streamings";
import Playground from "./playgroundService";
import { setupPlayer } from "./player";
import { setupInspector } from "./inspector";
import { setupScreenshots } from "./screenshot";
import { setupAudioWorker } from "./audioWorker";

setupPlayer();
setupInspector();
setupScreenshots();
setupAudioWorker();

// Replaces the hostname-based detection of src/utils/getCurrentService.ts
fetchCurrentStreamingFx.use(() => new Playground());

// The same entry the extension's content script loads
import("@pages/content/main");
