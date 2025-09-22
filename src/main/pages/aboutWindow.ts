import { BrowserWindow } from 'electron'
import path from 'path'
import config from '@main/preferences/config'
import { setTheme } from '@main/preferences/theme'

export function createAboutWindow() {
  const mainWindow = BrowserWindow.getFocusedWindow()

  if (mainWindow) {
    const aboutWindow = new BrowserWindow({
      width: 320,
      height: 160,
      //   icon: path.join(__dirname, '..', 'public', 'icons', 'icon.png'),
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: mainWindow,
      modal: true,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js')
      }
    })

    aboutWindow.loadFile(path.join(__dirname, '../../src/renderer/src/pages/about/about.html'))

    aboutWindow.on('ready-to-show', () => {
      setTheme(aboutWindow, config.getTheme())
      aboutWindow.show()
    })
  }
}
