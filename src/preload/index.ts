import { contextBridge, ipcRenderer } from 'electron'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import { ColorText } from '@main/shared/types/colorText'
import { Theme } from '@main/shared/types/theme'
import { Font } from '@main/shared/types/font'
import { FileContent } from '../main/helpers/contentFile'

export const api = {
  setColorText: (callback: (color: ColorText) => void) =>
    ipcRenderer.on(IPC_HANDLER.SET_COLOR, (_event, color: ColorText) => callback(color)),

  setTheme: (callback: (theme: Theme) => void) =>
    ipcRenderer.on(IPC_HANDLER.SET_THEME, (_event, theme: Theme) => callback(theme)),

  setFont: (callback: (font: Font) => void) =>
    ipcRenderer.on(IPC_HANDLER.SET_FONT, (_event, font: Font) => callback(font)),

  setFile: (callback: (file: FileContent) => void) =>
    ipcRenderer.on(IPC_HANDLER.SET_FILE, (_event, file: FileContent) => callback(file)),

  updateContent: (content: string) => ipcRenderer.send(IPC_HANDLER.UPDATE_CONTENT, content)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
