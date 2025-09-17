const { BrowserWindow } = require("electron");
const path = require("path");
const { themeApp } = require("../config/config");
const { EVENTS_PREFERENCES } = require("../shared/constants");

const createAboutWindow = () => {
  const mainWindow = BrowserWindow.getFocusedWindow();

  if (mainWindow) {
    const aboutWindow = new BrowserWindow({
      width: 320,
      height: 160,
      icon: path.join(__dirname, "..", "public", "icons", "icon.png"),
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

    aboutWindow.loadFile(path.join(__dirname, "..", "views", "sobre.html"));

    aboutWindow.on("ready-to-show", () => {
      aboutWindow.webContents.send(EVENTS_PREFERENCES.SET_THEME, themeApp());
      aboutWindow.show();
    });
  }
};

module.exports = {
  createAboutWindow,
};
