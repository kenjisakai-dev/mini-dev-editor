const { dialog } = require("electron");
const { fileContent, saveFile, newFile } = require("../service/contentFile");

const dialogNewFile = async (win) => {
  if (fileContent().content !== "" && fileContent().currentSaved === false) {
    const dialogConfirm = await dialogConfirmSave("Deseja salvar o conteúdo ?");

    if (dialogConfirm.response === 0) {
      const fileSaved = await saveFile(win, !fileContent().saved);

      if (!fileSaved) return;
    }
  }

  newFile(win);
};

const dialogConfirmSave = async (message) => {
  try {
    const dialogConfirm = await dialog.showMessageBox({
      title: "Salvar",
      message: message,
      type: "question",
      buttons: ["Sim", "Não"],
      defaultId: 0,
      cancelId: 1,
    });

    return dialogConfirm;
  } catch (err) {
    console.log(err?.message);
  }
};

const dialogConfirmExit = async (win) => {
  if (!fileContent().content || fileContent().currentSaved) {
    return win.destroy();
  }

  const dialogConfirm = await dialogConfirmSave(
    "Deseja salvar antes de sair ?"
  );

  if (dialogConfirm.response === 1) return win.destroy();

  const fileSaved = await saveFile(win, false);

  if (fileSaved) return win.destroy();
};

module.exports = {
  dialogNewFile,
  dialogConfirmSave,
  dialogConfirmExit,
};
