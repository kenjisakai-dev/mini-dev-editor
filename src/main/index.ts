import { app, BrowserWindow, globalShortcut } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { mainWindowMenu } from '@main/menu/mainWindowMenu'
import config from '@main/preferences/config'
import { setColorText } from '@main/preferences/color'
import { setTheme } from '@main/preferences/theme'
import { setFont } from '@main/preferences/font'
import { dialogConfirmExit } from '@main/helpers/contentFile'

function createWindow(): void {
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
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('did-finish-load', () => {
    setColorText(mainWindow, config.getColorText())
    setTheme(mainWindow, config.getTheme())
    setFont(mainWindow, config.getFont())

    mainWindowMenu(mainWindow)
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    dialogConfirmExit(mainWindow)
  })

  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+I', () => {
      mainWindow.webContents.toggleDevTools()
    })

    globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.webContents.reload()
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
