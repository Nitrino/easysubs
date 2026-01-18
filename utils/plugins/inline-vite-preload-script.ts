import { type RenderedChunk, type NormalizedOutputOptions } from "rollup";

/**
 * solution for multiple content scripts
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/177#issuecomment-1784112536
 */
export default function inlineVitePreloadScript() {
  let __vitePreload: string | null | undefined = "";
  return {
    name: "replace-vite-preload-script-plugin",
    async renderChunk(
      code: string,
      chunk: RenderedChunk,
      _options: NormalizedOutputOptions,
      meta: { chunks: Record<string, RenderedChunk> },
    ) {
      if (!/content/.test(chunk.fileName)) {
        return null;
      }
      if (!__vitePreload) {
        const chunkName: string | undefined = Object.keys(meta.chunks).find((key) => /preload/.test(key));
        if (!chunkName) return null;
        const modules = meta.chunks?.[chunkName]?.modules;
        if (!modules) return null;
        const firstKey = Object.keys(modules)[0];
        if (!firstKey) return null;
        const code = modules[firstKey]?.code;
        if (!code) return null;
        __vitePreload = code.replaceAll("const ", "var ");
      }
      return {
        code: __vitePreload + code.split(`\n`).slice(1).join(`\n`),
      };
    },
  };
}
