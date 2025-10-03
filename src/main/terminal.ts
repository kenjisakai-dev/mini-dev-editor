import { BrowserWindow, ipcMain } from 'electron'
import { spawn } from 'child_process'
import config from '@main/preferences/config'
import { readCommands, appendCommand } from '@main/historyCommands'
import IPC_HANDLER from '@main/shared/constants/ipcHandler'

export default (mainWindow: BrowserWindow) => {
  ipcMain.on(IPC_HANDLER.TERMINAL_INPUT, (event, command: string) => {
    let numericMessage = 0
    let shellArgs: string[] = []
    const shellName = config.getEditor().name

    if (shellName === 'cmd.exe') {
      shellArgs = ['/c', command]
    } else {
      shellArgs = [
        '-NoLogo',
        '-NoProfile',
        '-Command',
        `[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8; ${command}`
      ]
    }

    const shell = spawn(shellName, shellArgs)

    shell.stdout.on('data', (data) => {
      mainWindow?.webContents.send(IPC_HANDLER.TERMINAL_OUTPUT, {
        finished: false,
        message: data.toString(),
        editorName: config.getEditor().name,
        numericMessage
      })

      numericMessage++
      event.returnValue = 'OK'
    })

    shell.stderr.on('data', (data) => {
      mainWindow?.webContents.send(IPC_HANDLER.TERMINAL_OUTPUT, {
        finished: false,
        message: data.toString(),
        editorName: config.getEditor().name,
        numericMessage
      })

      numericMessage++
      event.returnValue = 'OK'
    })

    shell.on('close', (code) => {
      mainWindow.webContents.send(IPC_HANDLER.TERMINAL_OUTPUT, {
        finished: true,
        message: `Processo finalizado: ${code}`,
        editorName: config.getEditor().name,
        numericMessage
      })

      numericMessage = 0
    })
  })

  ipcMain.handle(IPC_HANDLER.TERMINAL_GET_HISTORY_COMMANDS, () => {
    return readCommands()
  })

  ipcMain.on(IPC_HANDLER.TERMINAL_APPEND_HISTORY_COMMANDS, (_event, command: string) => {
    appendCommand(command)
  })
}
