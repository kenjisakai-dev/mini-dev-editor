const {
  BrowserWindow,
  nativeTheme,
  ipcMain,
  globalShortcut,
} = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const { buildTemplateMenu } = require("../menu/menuMainWindow");
const {
  themeApp,
  colorTextApp,
  zoomApp,
  editorTypeApp,
} = require("../config/config");
const { dialogConfirmExit } = require("../menu/dialogFile");

let win;

const createMainWindow = () => {
  const appIcon = path.join(__dirname, "..", "public", "icons", "icon.png");

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
    win.webContents.send("set-color", colorTextApp());
    win.webContents.setZoomFactor(zoomApp());
    win.webContents.send("set-editor-type", editorTypeApp());
  });

  win.on("close", (event) => {
    event.preventDefault();
    dialogConfirmExit(win);
  });

  globalShortcut.register("CommandOrControl+I", () => {
    win.webContents.toggleDevTools();
  });

  globalShortcut.register("CommandOrControl+R", () => {
    win.webContents.reload();
  });

  ipcMain.on("terminal-input", (event, input) => {
    const shell = spawn(
      "powershell.exe",
      [
        "-NoLogo",
        "-NoProfile",
        "-Command",
        "[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8;",
        input,
      ],
      { encoding: "utf8" }
    );

    shell.stdout.on("data", (data) => {
      win?.webContents.send("terminal-output", {
        finished: false,
        message: data.toString(),
      });
    });

    shell.stderr.on("data", (data) => {
      win?.webContents.send("terminal-output", {
        finished: false,
        message: data.toString(),
      });
    });

    shell.on("close", (code) => {
      win.webContents.send("terminal-output", {
        finished: true,
        message: `Processo finalizado: ${code}`,
      });
    });
  });
};

module.exports = {
  createMainWindow,
  win,
};
