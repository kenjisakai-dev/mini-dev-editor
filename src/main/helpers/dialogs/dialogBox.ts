import { app, dialog } from 'electron'
import config from '@main/preferences/config'

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
      name: 'JavaScript',
      extensions: ['js'],
      editorName: 'javascript'
    },
    {
      name: 'TypeScript',
      extensions: ['ts'],
      editorName: 'text/typescript'
    },
    {
      name: 'Python',
      extensions: ['py'],
      editorName: 'python'
    },
    {
      name: 'C#',
      extensions: ['cs'],
      editorName: 'text/x-csharp'
    },
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
  ].filter((item) => item.editorName === config.getEditor().name)
}
