import { Script } from 'vm';
import type { Plugin } from 'vite';

/**
 * solution for multiple content scripts
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177#issuecomment-1784112536
 */
export default function inlineVitePreloadScript(): Plugin {
  let __vitePreload = '';
  return {
    name: 'replace-vite-preload-script-plugin',
    async renderChunk(code, chunk, options, meta) {
      if (!/content/.test(chunk.fileName)) {
        return null;
      }
      if (!__vitePreload) {
        const chunkName: string | undefined = Object.keys(meta.chunks).find(key => /preload/.test(key));
        const modules = meta.chunks?.[chunkName]?.modules;
        __vitePreload = modules?.[Object.keys(modules)?.[0]]?.code;
        __vitePreload = __vitePreload?.replaceAll('const ', 'var ');
        if (!__vitePreload) {
          return null;
        }
      }
      return {
        code: __vitePreload + code.split(`\n`).slice(1).join(`\n`),
      };
    },
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || !/content/.test(chunk.fileName)) {
          continue;
        }
        // Content scripts run as classic scripts, where `import.meta` is a syntax error. Vite's preload
        // helper uses it to resolve deps; resolve them against the extension root instead.
        chunk.code = chunk.code
          .replaceAll('import.meta.resolve', 'undefined')
          .replaceAll('import.meta.url', 'chrome.runtime.getURL("/")');
        try {
          new Script(chunk.code, { filename: chunk.fileName });
        } catch (error) {
          this.error(`${chunk.fileName} must be a classic script to work as a content script: ${error.message}`);
        }
      }
    },
  };
}
