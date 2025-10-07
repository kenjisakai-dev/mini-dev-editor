import { app, BrowserWindow, globalShortcut } from 'electron'

export default (mainWindow: BrowserWindow) => {
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
