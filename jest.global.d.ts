import { MockBrowserWindow } from './jest.setup'

declare namespace NodeJS {
  interface Global {
    mainWindow: MockBrowserWindow
  }
}
