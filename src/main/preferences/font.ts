import { BrowserWindow } from 'electron'
import { Font } from '@main/shared/types/font'
import { store } from '@main/store/settings'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'

export function setFont(mainWindow: BrowserWindow, font: Font) {
  store.set('font', font)
  mainWindow.webContents.send(IPC_HANDLER.SET_FONT, font)
}
