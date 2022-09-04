import { defineConfig } from 'vite'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    solidPlugin(),
    crx({ manifest }),
    NodeModulesPolyfillPlugin(),
    GlobalsPolyfills({
      process: true,
      buffer: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
  define: {
    global: {},
  },
})
