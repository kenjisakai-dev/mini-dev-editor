import { BrowserWindow, app } from 'electron'
import path from 'path'
import config from '@main/preferences/config'
import { setTheme } from '@main/preferences/theme'
import { is } from '@electron-toolkit/utils'

export function createAboutWindow() {
  const mainWindow = BrowserWindow.getFocusedWindow()

  if (mainWindow) {
    const iconPath = app.isPackaged
      ? path.join(process.resourcesPath, 'app.asar.unpacked', 'resources', 'icon.png')
      : path.join(__dirname, '../../resources/icon.png')

    const aboutWindow = new BrowserWindow({
      width: 320,
      height: 160,
      icon: iconPath,
      autoHideMenuBar: true,
      resizable: is.dev,
      minimizable: is.dev,
      parent: mainWindow,
      modal: true,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js')
      }
    })

    aboutWindow.loadFile(path.join(__dirname, '../renderer/src/pages/about/about.html'))

    aboutWindow.on('ready-to-show', () => {
      setTheme(aboutWindow, config.getTheme())
      aboutWindow.show()
    })
  }
}
