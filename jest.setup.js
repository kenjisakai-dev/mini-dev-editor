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

jest.mock("electron-store", () => {
  return {
    default: function () {
      return {
        get: jest.fn(() => "javascript"),
        set: jest.fn(),
        clear: jest.fn(),
      };
    },
  };
});
