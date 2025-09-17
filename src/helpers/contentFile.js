const path = require("path");
const fs = require("fs");
const { app, dialog, ipcMain } = require("electron");
const { EVENTS_FILE } = require("../shared/constants");

let fileContent = {};

function newFile(win) {
  fileContent = {
    name: "",
    content: "",
    saved: false,
    currentSaved: false,
    path: path.join(app.getPath("desktop"), "Sem titulo"),
  };

  win.webContents.send(EVENTS_FILE.SET_FILE, fileContent);
}

async function openFile(win) {
  try {
    const dialogFile = await dialog.showOpenDialog({
      title: "Abrir arquivo",
      properties: ["openFile"],
      filters: getExtensions(),
    });

    if (dialogFile.canceled) return false;

    const filePath = dialogFile.filePaths[0];
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });
    const filename = path.basename(filePath);

    fileContent = {
      name: filename,
      content: content,
      saved: true,
      currentSaved: true,
      path: filePath,
    };

    win.webContents.send(EVENTS_FILE.SET_FILE, fileContent);
  } catch (err) {
    console.log(err?.message);
  }
}

async function saveFile(win, salvarComo) {
  try {
    let filePath = fileContent.path;

    if (salvarComo || !fileContent.saved) {
      const dialogFile = await dialog.showSaveDialog({
        title: "Salvar arquivo",
        defaultPath: filePath || app.getPath("desktop"),
        filters: getExtensions(),
      });

      if (dialogFile.canceled) return false;

      filePath = dialogFile.filePath;
    }

    fs.writeFileSync(filePath, fileContent.content || "", {
      encoding: "utf-8",
    });

    fileContent.name = path.basename(filePath);
    fileContent.saved = true;
    fileContent.currentSaved = true;
    fileContent.path = filePath;

    win.webContents.send(EVENTS_FILE.SET_FILE, fileContent);

    return true;
  } catch (err) {
    console.log(err?.message);
  }
}

function getExtensions() {
  return [
    {
      name: "Arquivos de Texto",
      extensions: ["txt"],
      editorName: "text",
    },
    {
      name: "Todos os arquivos",
      extensions: ["*"],
      editorName: "text",
    },
  ];
}

ipcMain.on(EVENTS_FILE.UPDATE_CONTENT, (_event, content) => {
  fileContent.content = content;
  fileContent.currentSaved = false;
});

module.exports = {
  fileContent: () => fileContent,
  newFile,
  openFile,
  saveFile,
};
