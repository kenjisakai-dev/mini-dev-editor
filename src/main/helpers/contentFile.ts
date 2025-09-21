import path from 'path'
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'
import fs from 'fs'

export interface FileContent {
  name: string
  content: string
  saved: boolean
  currentSaved: boolean
  filePath: string
}

let fileContent: FileContent = {
  name: '',
  content: '',
  saved: false,
  currentSaved: false,
  filePath: path.join(app.getPath('desktop'), 'Sem titulo')
}

export const getFileContent = () => fileContent

export async function openFile(mainWindow: BrowserWindow) {
  const contentSaved = await dialogSaveFile(mainWindow)
  if (contentSaved === false) return

  const dialogFile = await dialog.showOpenDialog({
    title: 'Abrir arquivo',
    properties: ['openFile'],
    filters: getExtensions()
  })

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

async function dialogSaveFile(mainWindow: BrowserWindow) {
  const { content, saved, currentSaved } = getFileContent()

  if (content !== '' && currentSaved === false) {
    const dialogResponse = await dialog.showMessageBox({
      title: 'Salvar',
      message: 'Deseja salvar o conteúdo ?',
      type: 'question',
      buttons: ['Sim', 'Não'],
      defaultId: 0,
      cancelId: 1
    })

    if (dialogResponse.response === 0) {
      const fileSaved = await saveFile(mainWindow, !saved)

      if (!fileSaved) return false
    }

    return true
  }

  return true
}

export async function saveFile(mainWindow: BrowserWindow, saveAs: boolean) {
  const { content, saved, filePath } = getFileContent()

  let newFilePath = filePath

  if (saveAs || !saved) {
    const dialogFile = await dialog.showSaveDialog({
      title: 'Salvar arquivo',
      defaultPath: newFilePath || app.getPath('desktop'),
      filters: getExtensions()
    })

    if (dialogFile.canceled) return false

    newFilePath = dialogFile.filePath
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

function getExtensions() {
  return [
    {
      name: 'Arquivos de Texto',
      extensions: ['txt'],
      editorName: 'text'
    },
    {
      name: 'Todos os arquivos',
      extensions: ['*'],
      editorName: 'text'
    }
  ]
}

ipcMain.on(IPC_HANDLER.UPDATE_CONTENT, (_event, content) => {
  fileContent.content = content
  fileContent.currentSaved = false
})
