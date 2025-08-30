const { globalShortcut } = require("electron");

module.exports = (win) => {
  globalShortcut.register("CommandOrControl+I", () => {
    win.webContents.toggleDevTools();
  });

  globalShortcut.register("CommandOrControl+R", () => {
    win.webContents.reload();
  });
};
