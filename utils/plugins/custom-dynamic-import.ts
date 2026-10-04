import type { PluginOption } from 'vite';

// Firefox resolves relative dynamic imports in content scripts against the page URL,
// so point them at the extension root instead (e.g. "../../../assets/js/x.js" -> "assets/js/x.js").
const RELATIVE_DYNAMIC_IMPORT = /\bimport\((["'`])((?:\.\.?\/)+)([^"'`]+)\1\)/g;

export default function customDynamicImport(): PluginOption {
  return {
    name: 'custom-dynamic-import',
    renderChunk(code) {
      if (!process.env.__FIREFOX__) {
        return null;
      }
      const replaced = code.replace(
        RELATIVE_DYNAMIC_IMPORT,
        (_, quote, _relativePrefix, path) => `import(browser.runtime.getURL(${quote}${path}${quote}))`,
      );
      return replaced === code ? null : { code: replaced, map: null };
    },
  };
}
