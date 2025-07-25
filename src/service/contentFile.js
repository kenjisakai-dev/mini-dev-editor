const path = require("path");
const fs = require("fs");
const { app, dialog, ipcMain } = require("electron");

let fileContent = {};

function newFile(win) {
  fileContent = {
    name: "",
    content: "",
    saved: false,
    currentSaved: false,
    path: path.join(app.getPath("desktop"), "Sem titulo"),
  };

  win.webContents.send("set-file", fileContent);
}

async function openFile(win) {
  try {
    const dialogFile = await dialog.showOpenDialog({
      title: "Abrir arquivo",
      properties: ["openFile"],
    });

    if (dialogFile.canceled) return false;

    const filePath = dialogFile.filePaths[0];
    const content = fs.readFileSync(filePath, { encoding: "utf-8" });

    fileContent = {
      name: path.basename(filePath),
      content: content,
      saved: true,
      currentSaved: true,
      path: filePath,
    };

    win.webContents.send("set-file", fileContent);
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
        filters: [
          {
            name: "Arquivos de Texto",
            extensions: ["txt"],
          },
          {
            name: "Todos os arquivos",
            extensions: ["*"],
          },
        ],
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

    win.webContents.send("set-file", fileContent);

    return true;
  } catch (err) {
    console.log(err?.message);
  }
}

ipcMain.on("update-content", (_event, content) => {
  fileContent.content = content;
  fileContent.currentSaved = false;
});

module.exports = {
  fileContent: () => fileContent,
  newFile,
  openFile,
  saveFile,
};
