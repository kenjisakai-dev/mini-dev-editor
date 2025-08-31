jest.mock("electron", () => ({
  app: {
    getPath: jest.fn(() => "tests/mocks"),
  },
  ipcMain: {
    on: jest.fn(),
  },
  dialog: {
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
  },
}));
