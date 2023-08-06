import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-128.png",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  permissions: ["webNavigation", "scripting", "tabs", "storage"],
  host_permissions: ["https://translate.google.com/*", "http://localhost:8765/*"],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon-128.png", "icon-34.png"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;

// export default defineManifest(async (env) => ({
//   manifest_version: 3,
//   name: "Easysubs",
//   version: `${major}.${minor}.${patch}.${label}`,
//   version_name: version,
//   action: {
//     default_popup: "index.html",
//   },
//   background: {
//     service_worker: "src/background.ts",
//     type: "module",
//   },
//   permissions: ["webNavigation", "scripting", "tabs"],
//   content_scripts: [
//     {
//       js: ["src/main.tsx"],
//       run_at: "document_end",
//       matches: ["<all_urls>"],
//     },
//   ],
//   host_permissions: ["https://translate.google.com/*", "http://localhost:4000/*"],
//   content_security_policy: {
//     extension_pages: "script-src 'self'; object-src 'self'",
//   },
// }));
