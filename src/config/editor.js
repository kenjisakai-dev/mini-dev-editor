const { saveConfigApp } = require("./config");

const setEditorType = async (win, editorType, editorName) => {
  try {
    win.webContents.send("set-editor-type", { editorType, editorName });
    saveConfigApp({ editorTypeApp: editorType, editorNameApp: editorName });
  } catch (err) {
    console.error(`Erro ao mudar editor: ${err?.message}`);
  }
};

module.exports = {
  setEditorType,
};
