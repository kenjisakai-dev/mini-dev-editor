const { app, BrowserWindow, globalShortcut } = require("electron");
const { createMainWindow, win } = require("./src/pages/mainWindow");

app.whenReady().then(() => {
  createMainWindow();

  globalShortcut.register("CmdOrCtrl+Shift+I", () => {
    win.webContents.toggleDevTools();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.commandLine.appendSwitch("log-level", "3");
