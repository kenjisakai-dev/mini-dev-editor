import { app, dialog } from 'electron'

export async function dialogQuestionBox(message: string) {
  return await dialog.showMessageBox({
    title: 'Salvar',
    message,
    type: 'question',
    buttons: ['Sim', 'Não'],
    defaultId: 0,
    cancelId: 1
  })
}

export async function dialogSaveFileBox(title: string, newFilePath: string) {
  return await dialog.showSaveDialog({
    title,
    defaultPath: newFilePath || app.getPath('desktop'),
    filters: getExtensions()
  })
}

export async function dialogSelectFileBox(title: string) {
  return await dialog.showOpenDialog({
    title,
    properties: ['openFile'],
    filters: getExtensions()
  })
}

function getExtensions() {
  return [
    {
      name: 'Arquivos de Texto',
      extensions: ['txt']
    },
    {
      name: 'Todos os arquivos',
      extensions: ['*']
    }
  ]
}
