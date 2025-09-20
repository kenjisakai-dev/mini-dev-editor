import { BrowserWindow, nativeTheme } from 'electron'
import { store } from '@main/store/store'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import { Theme } from '@main/shared/types/theme'

export function setTheme(mainWindow: BrowserWindow, theme: Theme) {
  nativeTheme.themeSource = theme
  store.set('theme', theme)
  mainWindow.webContents.send(IPC_HANDLER.SET_THEME, theme)
}
