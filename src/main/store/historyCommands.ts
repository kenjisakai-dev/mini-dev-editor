import Store from 'electron-store'
import config from '@main/preferences/config'
import { AllHistoryCommands } from '@main/shared/interfaces/historyCommands'

const store = new Store<AllHistoryCommands>({
  defaults: {
    pwsh: { commands: [], lastCommand: '' },
    cmd: { commands: [], lastCommand: '' },
    powershell: { commands: [], lastCommand: '' }
  },
  name: 'history-commands'
})

export function appendCommand(command: string) {
  const name = config.getEditor().name
  const editorName = name.replace('.exe', '')

  const commands = store.get(`${editorName}.commands`, [])
  const lastCommand = store.get(`${editorName}.lastCommand`, '')

  if (command && command?.toLowerCase() !== lastCommand?.toLowerCase()) {
    store.set(`${editorName}.commands`, [...commands, command])
    store.set(`${editorName}.lastCommand`, command)
  }
}

export function readCommands() {
  const name = config.getEditor().name
  const editorName = name.replace('.exe', '')
  return store.get(`${editorName}.commands`, [])
}
