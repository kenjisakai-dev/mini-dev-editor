const { saveConfigApp } = require("./config");

const setEditorType = (win, editorType) => {
  try {
    win.webContents.send("set-editor-type", editorType);
    saveConfigApp({ editorTypeApp: editorType });
  } catch (err) {
    console.error(`Erro ao mudar editor: ${err?.message}`);
  }
};

module.exports = {
  setEditorType,
};
