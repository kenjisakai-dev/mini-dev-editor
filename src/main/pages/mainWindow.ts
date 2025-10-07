import { BrowserWindow } from 'electron'
import path, { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { mainWindowMenu } from '@main/menu/mainWindowMenu'
import config from '@main/preferences/config'
import { setColorText } from '@main/preferences/color'
import { setTheme, setThemeCode } from '@main/preferences/theme'
import { setFont } from '@main/preferences/font'
import { dialogConfirmExit } from '@main/helpers/dialogs/dialogConfirm'
import { setEditor } from '@main/preferences/editor'
import createTerminal from '@main/helpers/terminal'
import createShortcuts from '@main/helpers/shortcuts'

export function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: path.join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../../src/renderer/about.html'))
  }

  mainWindow.webContents.on('did-finish-load', () => {
    setColorText(mainWindow, config.getColorText())
    setEditor(mainWindow, config.getEditor())
    setTheme(mainWindow, config.getTheme())
    setThemeCode(mainWindow, config.getThemeCode())
    setFont(mainWindow, config.getFont())

    mainWindowMenu(mainWindow)
  })

  createTerminal(mainWindow)
  createShortcuts(mainWindow)

  mainWindow.on('close', (event) => {
    event.preventDefault()
    dialogConfirmExit(mainWindow)
  })
}
