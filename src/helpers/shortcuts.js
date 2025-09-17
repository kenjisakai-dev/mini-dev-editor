const { globalShortcut, app } = require("electron");

module.exports = (win) => {
  app.on("browser-window-focus", () => {
    globalShortcut.register("CommandOrControl+I", () => {
      win.webContents.toggleDevTools();
    });

    globalShortcut.register("CommandOrControl+R", () => {
      win.webContents.reload();
    });
  });

  app.on("browser-window-blur", () => {
    globalShortcut.unregisterAll();
  });
};
