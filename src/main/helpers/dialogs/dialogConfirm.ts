import { BrowserWindow } from 'electron'
import { getFileContent, saveFile } from '@main/helpers/contentFile'
import { dialogQuestionBox } from '@main/helpers/dialogs/dialogBox'

export async function dialogConfirmExit(mainWindow: BrowserWindow) {
  const fileContent = getFileContent()

  if (fileContent.content === '' || fileContent.currentSaved) {
    return mainWindow.destroy()
  }

  const dialogConfirm = await dialogQuestionBox('Deseja salvar o conteúdo antes de sair ?')
  if (dialogConfirm.response === 1) return mainWindow.destroy()

  const fileSaved = await saveFile(mainWindow, false)
  if (fileSaved) return mainWindow.destroy()
}

export async function dialogSaveFile(mainWindow: BrowserWindow) {
  const { content, saved, currentSaved } = getFileContent()

  if (content !== '' && currentSaved === false) {
    const dialogResponse = await dialogQuestionBox('Deseja salvar o conteúdo ?')

    if (dialogResponse.response === 0) {
      const fileSaved = await saveFile(mainWindow, !saved)
      if (!fileSaved) return false
    }

    return true
  }

  return true
}
