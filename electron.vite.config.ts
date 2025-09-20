import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

const tsConfigPaths = tsconfigPaths({
  projects: [path.resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths]
  },
  renderer: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths]
  }
})
