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
  return {
    default: function () {
      return {
        get: jest.fn(() => 'text'),
        set: jest.fn(),
        clear: jest.fn()
      }
    }
  }
})
