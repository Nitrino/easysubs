import { beforeEach } from "vitest";
import { installChrome, resetChrome } from "./chrome";

// Before any module under test is imported: the models read chrome.storage while their modules evaluate
installChrome();

beforeEach(() => {
  resetChrome();
  document.body.className = "";
  document.body.replaceChildren();
});
