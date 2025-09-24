import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import { dialogSaveFileBox, dialogSelectFileBox } from '@main/helpers/dialogs/dialogBox'
import { FileContent } from '@main/shared/interfaces/fileContent'
import { dialogSaveFile } from '@main/helpers/dialogs/dialogConfirm'

let fileContent: FileContent = {
  name: '',
  content: '',
  saved: false,
  currentSaved: false,
  filePath: path.join(app.getPath('desktop'), 'Sem titulo')
}

export const getFileContent = () => fileContent

export async function newFile(mainWindow: BrowserWindow) {
  const savedCorrectly = await dialogSaveFile(mainWindow)
  if (savedCorrectly === false) return

  fileContent = {
    name: '',
    content: '',
    saved: false,
    currentSaved: false,
    filePath: path.join(app.getPath('desktop'), 'Sem titulo')
  }

  mainWindow.webContents.send(IPC_HANDLER.SET_FILE, fileContent)
}

export async function openFile(mainWindow: BrowserWindow) {
  const contentSaved = await dialogSaveFile(mainWindow)
  if (contentSaved === false) return

  const dialogFile = await dialogSelectFileBox('Abrir arquivo')

  if (dialogFile.canceled) return

  const filePath = dialogFile.filePaths[0]
  const contentFileOpened = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const filename = path.basename(filePath)

  fileContent = {
    name: filename,
    content: contentFileOpened,
    saved: true,
    currentSaved: true,
    filePath: filePath
  }

  mainWindow.webContents.send(IPC_HANDLER.SET_FILE, fileContent)
}

export async function saveFile(mainWindow: BrowserWindow, saveAs: boolean) {
  const { content, saved, filePath } = getFileContent()

  let newFilePath = filePath

  if (saveAs || !saved) {
    const dialogFileSave = await dialogSaveFileBox('Salvar arquivo', newFilePath)

    if (dialogFileSave.canceled) return false

    newFilePath = dialogFileSave.filePath
  }

  fs.writeFileSync(newFilePath, content || '', {
    encoding: 'utf-8'
  })

  fileContent.name = path.basename(newFilePath)
  fileContent.saved = true
  fileContent.currentSaved = true
  fileContent.filePath = newFilePath

  mainWindow.webContents.send(IPC_HANDLER.SET_FILE, fileContent)

  return true
}

ipcMain.on(IPC_HANDLER.UPDATE_CONTENT, (_event, content) => {
  fileContent.content = content
  fileContent.currentSaved = false
})
