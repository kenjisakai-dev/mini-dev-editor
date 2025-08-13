const path = require("path");
const { BrowserWindow } = require("electron");
const { themeApp } = require("../config/config");

const createAboutWindow = () => {
  const mainWindow = BrowserWindow.getFocusedWindow();

  if (mainWindow) {
    const appIcon = path.join(__dirname, "..", "public", "icons", "icon.png");

    const win = new BrowserWindow({
      width: 320,
      height: 160,
      icon: appIcon,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      parent: mainWindow,
      modal: true,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, "..", "..", "preload.js"),
      },
    });

    win.loadFile(path.join(__dirname, "..", "views", "sobre.html"));

    win.on("ready-to-show", () => {
      win.webContents.send("set-theme", themeApp());
      win.show();
    });
  }
};

module.exports = {
  createAboutWindow,
};
