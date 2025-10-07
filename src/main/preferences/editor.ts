import { BrowserWindow } from 'electron'
import { store } from '@main/store/settings'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import { EditorType } from '@main/shared/types/editor'

export async function setEditor(mainWindow: BrowserWindow, editor: EditorType) {
  store.set('editor.type', editor.type)
  store.set('editor.name', editor.name)
  mainWindow.webContents.send(IPC_HANDLER.SET_EDITOR, editor)
}
