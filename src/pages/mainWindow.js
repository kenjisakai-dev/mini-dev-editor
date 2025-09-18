const { BrowserWindow } = require("electron");
const path = require("path");
const { buildTemplateMenu } = require("../menu/menuMainWindow");
const { themeApp, zoomApp, editorLanguage } = require("../config/config");
const { dialogConfirmExit } = require("../menu/dialogFile");
const shortcuts = require("../helpers/shortcuts");
const { EVENTS_PREFERENCES, EVENTS_CODE } = require("../shared/constants");

const createMainWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1010,
    height: 720,
    icon: path.join(__dirname, "..", "public", "icons", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "..", "..", "preload.js"),
    },
  });

  buildTemplateMenu(mainWindow);

  mainWindow.loadFile("src/views/index.html");

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.setZoomFactor(zoomApp());
    mainWindow.webContents.send(
      EVENTS_CODE.SET_EDITOR_LANGUAGE,
      editorLanguage()
    );
    mainWindow.webContents.send(EVENTS_PREFERENCES.SET_THEME, themeApp());
  });

  mainWindow.on("close", (event) => {
    event.preventDefault();
    dialogConfirmExit(mainWindow);
  });

  shortcuts(mainWindow);
};

module.exports = {
  createMainWindow,
};
