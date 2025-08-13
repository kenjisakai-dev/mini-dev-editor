const { app, BrowserWindow } = require("electron");
const { createMainWindow } = require("./src/pages/mainWindow");

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.commandLine.appendSwitch("log-level", "3");
