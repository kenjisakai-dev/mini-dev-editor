const { BrowserWindow, nativeTheme } = require("electron");
const path = require("path");
const { buildTemplateMenu } = require("../menu/menuMainWindow");
const {
  themeApp,
  colorTextApp,
  zoomApp,
  editorTypeApp,
  editorNameApp,
  themeAppCode,
  fontApp,
} = require("../config/config");
const { dialogConfirmExit } = require("../menu/dialogFile");
const ipcMainEventsTerminal = require("../helpers/terminal");
const shortcuts = require("../helpers/shortcuts");
const { EVENTS_PREFERENCES } = require("../shared/constants");

const createMainWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1010,
    height: 720,
    icon: path.join(__dirname, "..", "public", "icons", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "..", "..", "preload.js"),
    },
  });

  nativeTheme.themeSource = themeApp();
  buildTemplateMenu(mainWindow);

  mainWindow.loadFile("src/views/index.html");

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send(EVENTS_PREFERENCES.SET_THEME, themeApp());
    mainWindow.webContents.send(EVENTS_PREFERENCES.SET_COLOR, colorTextApp());
    mainWindow.webContents.setZoomFactor(zoomApp());
    mainWindow.webContents.send(EVENTS_PREFERENCES.SET_EDITOR_TYPE, {
      editorType: editorTypeApp(),
      editorName: editorNameApp(),
    });
    mainWindow.webContents.send(
      EVENTS_PREFERENCES.SET_THEME_CODE,
      themeAppCode()
    );
    mainWindow.webContents.send(EVENTS_PREFERENCES.SET_FONT, fontApp());
  });

  mainWindow.on("close", (event) => {
    event.preventDefault();
    dialogConfirmExit(mainWindow);
  });

  shortcuts(mainWindow);
  ipcMainEventsTerminal(mainWindow);
};

module.exports = {
  createMainWindow,
};
