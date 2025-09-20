import { BrowserWindow } from 'electron'
import { store } from '@main/store/store'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import { ColorText } from '@main/shared/types/colorText'

export function setColorText(mainWindow: BrowserWindow, color: ColorText) {
  store.set('colorText', color)
  mainWindow.webContents.send(IPC_HANDLER.SET_COLOR, color)
}
