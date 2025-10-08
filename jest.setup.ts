import { jest } from '@jest/globals'

jest.mock('electron', () => ({
  app: {
    getPath: jest.fn(() => 'tests/mocks')
  },
  ipcMain: {
    on: jest.fn()
  },
  dialog: {
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
    showMessageBox: jest.fn()
  }
}))

export class MockBrowserWindow {
  webContents = {
    send: jest.fn()
  }
  destroy = jest.fn(() => {})
}

;(global as any).mainWindow = new MockBrowserWindow()

jest.mock('electron-store', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn((key, def) => {
      if (key === 'editor') return { type: 'text', name: 'txt' }
      if (key === 'theme') return 'system'
      if (key === 'colorText') return 'lightGrey'
      if (key === 'themeCode') return 'material-darker'
      if (key === 'font') return 'Inter'
      if (key === 'zoom') return 1.2
      return def || { type: 'text', name: 'txt' }
    }),
    set: jest.fn(),
    clear: jest.fn()
  }))
})
