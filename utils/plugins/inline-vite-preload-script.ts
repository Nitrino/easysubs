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
        __vitePreload = modules?.[Object.keys(modules)?.[0]]?.code;
        __vitePreload = __vitePreload?.replaceAll("const ", "var ");
        if (!__vitePreload) {
          return null;
        }
      }
      return {
        code: __vitePreload + code.split(`\n`).slice(1).join(`\n`),
      };
    },
  };
}
