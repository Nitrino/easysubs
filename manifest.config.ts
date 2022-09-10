import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: 'Easysubs',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  action: {
    default_popup: 'index.html',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  permissions: ['webNavigation', 'scripting', 'tabs'],
  content_scripts: [
    {
      js: ['src/main.tsx'],
      run_at: 'document_end',
      matches: ['<all_urls>'],
    },
  ],
  host_permissions: ['https://translate.google.com/*'],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
}))
