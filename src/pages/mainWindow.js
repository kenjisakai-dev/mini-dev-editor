const path = require("path");
const { BrowserWindow, nativeImage, nativeTheme } = require("electron");
const { buildTemplateMenu } = require("../menu/menuMainWindow");
const { themeApp, colorTextApp, zoomApp } = require("../config/config");
const { dialogConfirmExit } = require("../menu/dialogFile");

let win;

const createMainWindow = () => {
  const appIcon = nativeImage.createFromPath(
    path.join(__dirname, "..", "public", "icons", "icon.png")
  );

  win = new BrowserWindow({
    width: 1010,
    height: 720,
    icon: appIcon,
    webPreferences: {
      preload: path.join(__dirname, "..", "..", "preload.js"),
    },
  });

  nativeTheme.themeSource = themeApp();
  buildTemplateMenu(win);

  win.loadFile("src/views/index.html");

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("set-theme", themeApp());
    win.webContents.send("set-color", `var(--${colorTextApp()})`);
    win.webContents.setZoomFactor(zoomApp());
  });

  win.on("close", (event) => {
    event.preventDefault();
    dialogConfirmExit(win);
  });
};

module.exports = {
  createMainWindow,
  win,
};
