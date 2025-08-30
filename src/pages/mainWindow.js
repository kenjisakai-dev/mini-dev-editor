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
} = require("../config/config");
const { dialogConfirmExit } = require("../menu/dialogFile");
const ipcMainEventsTerminal = require("../helpers/terminal");
const shortcuts = require("../helpers/shortcuts");

let win;

const createMainWindow = () => {
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    icon: path.join(__dirname, "..", "public", "icons", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "..", "..", "preload.js"),
    },
  });

  nativeTheme.themeSource = themeApp();
  buildTemplateMenu(win);

  win.loadFile("src/views/index.html");

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("set-theme", themeApp());
    win.webContents.send("set-color", colorTextApp());
    win.webContents.setZoomFactor(zoomApp());
    win.webContents.send("set-editor-type", {
      editorType: editorTypeApp(),
      editorName: editorNameApp(),
    });
    win.webContents.send("set-theme-code", themeAppCode());
  });

  win.on("close", (event) => {
    event.preventDefault();
    dialogConfirmExit(win);
  });

  shortcuts(win);
  ipcMainEventsTerminal(win);
};

module.exports = {
  createMainWindow,
  win,
};
