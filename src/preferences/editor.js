const { store } = require("./store");

const setEditorType = async (win, editorType, editorName) => {
  try {
    win.webContents.send("set-editor-type", { editorType, editorName });
    store.set("preferences.editorTypeApp", editorType);
    store.set("preferences.editorNameApp", editorName);
  } catch (err) {
    console.error(`Erro ao mudar editor: ${err?.message}`);
  }
};

module.exports = {
  setEditorType,
};
